import os

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from postgrest import APIError
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__, static_folder="frontend", static_url_path="/assets")

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_PUBLISHABLE_KEY"),
)


def api_error(error):
    code = getattr(error, "code", None)
    message = getattr(error, "message", None) or str(error)
    if code in {"42501", "PGRST301", "PGRST302"}:
        return jsonify({"error": "Supabase denied this action. Check the table grants and row-level security policies."}), 403
    if code == "23505":
        return jsonify({"error": "You are already registered for this event."}), 409
    if isinstance(error, (APIError, httpx.HTTPError)):
        return jsonify({"error": message if isinstance(error, APIError) else "Could not reach Supabase. Check the network connection."}), 502
    app.logger.exception("Unexpected API error")
    return jsonify({"error": "Unexpected server error."}), 500


def get_registration_rows():
    rows = []
    start = 0
    page_size = 1000
    while True:
        result = (
            supabase.table("registrations")
            .select("id,event_id,user_id,created_at")
            .range(start, start + page_size - 1)
            .execute()
        )
        rows.extend(result.data or [])
        if len(result.data or []) < page_size:
            return rows
        start += page_size


@app.route("/")
def index():
    return send_from_directory("frontend", "index.html")


@app.get("/api/users")
def list_users():
    try:
        result = supabase.table("users").select("id,email,role").order("email").execute()
        return jsonify({"users": result.data or []})
    except (APIError, httpx.HTTPError) as error:
        return api_error(error)


@app.get("/api/events")
def list_events():
    try:
        event_result = supabase.table("events").select("id,title,capacity,status").order("title").execute()
        registration_rows = get_registration_rows()
        current_user_id = request.args.get("user_id", "")
        counts = {}
        user_registrations = {}
        for registration in registration_rows:
            event_id = registration["event_id"]
            counts[event_id] = counts.get(event_id, 0) + 1
            if current_user_id and registration["user_id"] == current_user_id:
                user_registrations[event_id] = registration["id"]

        events = []
        for event in event_result.data or []:
            event_id = event["id"]
            events.append({
                **event,
                "registered_count": counts.get(event_id, 0),
                "registration_id": user_registrations.get(event_id),
            })
        return jsonify({"events": events})
    except (APIError, httpx.HTTPError) as error:
        return api_error(error)


@app.post("/api/registrations")
def create_registration():
    payload = request.get_json(silent=True) or {}
    user_id = payload.get("user_id")
    event_id = payload.get("event_id")
    if not user_id or not event_id:
        return jsonify({"error": "Choose a profile and an event to register."}), 400

    try:
        user = supabase.table("users").select("id").eq("id", user_id).limit(1).execute()
        if not user.data:
            return jsonify({"error": "The selected profile was not found."}), 404

        event_result = supabase.table("events").select("id,title,capacity,status").eq("id", event_id).limit(1).execute()
        if not event_result.data:
            return jsonify({"error": "Event not found."}), 404
        event = event_result.data[0]
        if str(event.get("status", "")).lower() != "open":
            return jsonify({"error": "Registration is closed for this event."}), 409

        existing = (
            supabase.table("registrations")
            .select("id")
            .eq("user_id", user_id)
            .eq("event_id", event_id)
            .limit(1)
            .execute()
        )
        if existing.data:
            return jsonify({"error": "This profile is already registered for the event."}), 409

        count_result = (
            supabase.table("registrations")
            .select("id", count="exact", head=True)
            .eq("event_id", event_id)
            .execute()
        )
        registered_count = count_result.count or 0
        if registered_count >= int(event["capacity"]):
            return jsonify({"error": "This event is full."}), 409

        inserted = supabase.table("registrations").insert({"user_id": user_id, "event_id": event_id}).execute()
        return jsonify({"registration": (inserted.data or [None])[0]}), 201
    except (APIError, httpx.HTTPError) as error:
        return api_error(error)


@app.delete("/api/registrations/<registration_id>")
def delete_registration(registration_id):
    user_id = request.args.get("user_id", "")
    if not user_id:
        return jsonify({"error": "Choose the profile that owns this registration."}), 400

    try:
        existing = (
            supabase.table("registrations")
            .select("id")
            .eq("id", registration_id)
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        if not existing.data:
            return jsonify({"error": "Registration not found for the selected profile."}), 404

        supabase.table("registrations").delete().eq("id", registration_id).eq("user_id", user_id).execute()
        return jsonify({"message": "Registration cancelled."})
    except (APIError, httpx.HTTPError) as error:
        return api_error(error)


if __name__ == "__main__":
    app.run(debug=True)

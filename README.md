# EventHub

EventHub is a Flask web app that serves the frontend in `frontend/`, exposes its API under `/api`, and reads event and registration data from Supabase.

## Deploy to Render

1. Push this repository to GitHub or another Git provider connected to Render.
2. In Render, choose **New > Blueprint** and select the repository. Render will read `render.yaml` and create the `eventhub` web service.
3. Enter `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` when prompted. These are the project URL and publishable key from your Supabase project's API settings. Do not use a `service_role` or secret key.
4. Deploy. Render installs `requirements.txt` and starts the app with Gunicorn. The root page serves the frontend; API routes are available under `/api`.

The Supabase project must already contain the `users`, `events`, and `registrations` tables expected by the API, with grants and row-level security policies that allow the intended operations.

## Run locally

Create a virtual environment, install `requirements.txt`, copy `.env.example` to `.env`, and fill in the Supabase values. Start the development server with:

```sh
python -m backend.app
```

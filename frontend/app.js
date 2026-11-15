const userPicker = document.querySelector("#user-picker");
const eventGrid = document.querySelector("#event-grid");
const searchInput = document.querySelector("#event-search");
const statusFilter = document.querySelector("#status-filter");
const resultCount = document.querySelector("#result-count");
const toast = document.querySelector("#toast");
const eventModal = document.querySelector("#event-modal");
const modalProfilePicker = document.querySelector("#modal-profile-picker");

let users = [];
let events = [];
let currentUserId = localStorage.getItem("eventhub-demo-user") || "";
let currentView = "events";
let toastTimer;
let selectedEventId = "";

function notify(message, kind = "info") {
  toast.textContent = message;
  toast.className = `toast visible ${kind}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3600);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(`The server returned an unexpected response (${response.status}).`);
  }
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status}).`);
  return payload;
}

function selectedUser() {
  return users.find((user) => String(user.id) === currentUserId);
}

function updateSummary() {
  const openEvents = events.filter((event) => String(event.status).toLowerCase() === "open");
  const registeredEvents = events.filter((event) => event.registration_id);
  document.querySelector("#event-count").textContent = events.length.toLocaleString();
  document.querySelector("#open-count").textContent = openEvents.length.toLocaleString();
  document.querySelector("#mine-count").textContent = registeredEvents.length.toLocaleString();
  const user = selectedUser();
  document.querySelector("#welcome-copy").textContent = user
    ? `Welcome, ${user.email}. Browse events and manage your seats.`
    : "Browse events. Choose a demo profile to register or manage a seat.";
}

function openEvent(eventId) {
  selectedEventId = String(eventId);
  modalProfilePicker.replaceChildren(new Option("Select a demo profile", ""));
  for (const user of users) {
    const option = new Option(`${user.email || "User"}${user.role ? ` · ${user.role}` : ""}`, user.id);
    modalProfilePicker.append(option);
  }
  modalProfilePicker.value = currentUserId;
  updateEventModal();
  eventModal.classList.remove("hidden");
  document.querySelector("#modal-close").focus();
}

function updateEventModal() {
  const event = events.find((item) => String(item.id) === selectedEventId);
  if (!event) return;
  const capacity = Number(event.capacity) || 0;
  const registered = Number(event.registered_count) || 0;
  const available = Math.max(0, capacity - registered);
  const open = String(event.status).toLowerCase() === "open";
  document.querySelector("#modal-title").textContent = event.title || "Untitled event";
  document.querySelector("#modal-summary").textContent = `${open ? "Registration is open" : "Registration is closed"} for this event.`;
  document.querySelector("#modal-seats").textContent = available.toLocaleString();
  document.querySelector("#modal-registered").textContent = registered.toLocaleString();
  document.querySelector("#modal-capacity").textContent = capacity.toLocaleString();
  const status = document.querySelector("#modal-status");
  status.className = `status-pill ${open ? "open" : "closed"}`;
  status.textContent = open ? "Open" : "Closed";

  const registerButton = document.querySelector("#modal-register");
  const unregisterButton = document.querySelector("#modal-unregister");
  const alreadyRegistered = Boolean(event.registration_id);
  registerButton.dataset.eventId = event.id;
  unregisterButton.dataset.eventId = event.id;
  unregisterButton.dataset.registrationId = event.registration_id || "";
  registerButton.disabled = !currentUserId || !open || available < 1;
  registerButton.textContent = !currentUserId ? "Choose a profile to register" : available < 1 ? "Event is full" : "Register for event";
  registerButton.classList.toggle("hidden", alreadyRegistered);
  unregisterButton.classList.toggle("hidden", !alreadyRegistered);
}

function makeEventCard(event) {
  const card = document.createElement("article");
  card.className = "event-card";
  const top = document.createElement("div");
  top.className = "event-card-top";
  const eventType = document.createElement("span");
  eventType.className = "event-type";
  eventType.textContent = "EVENT";
  const status = document.createElement("span");
  const isOpen = String(event.status).toLowerCase() === "open";
  status.className = `status-pill ${isOpen ? "open" : "closed"}`;
  status.textContent = isOpen ? "Open" : "Closed";
  top.append(eventType, status);

  const title = document.createElement("h3");
  const titleButton = document.createElement("button");
  titleButton.className = "event-title";
  titleButton.type = "button";
  titleButton.dataset.openEvent = event.id;
  titleButton.textContent = event.title || "Untitled event";
  title.append(titleButton);
  const summary = document.createElement("p");
  summary.className = "event-summary";
  summary.textContent = `${Number(event.capacity) || 0} total seats · ${Number(event.registered_count) || 0} registered`;

  const capacity = Math.max(0, (Number(event.capacity) || 0) - (Number(event.registered_count) || 0));
  const capacityLabel = document.createElement("div");
  capacityLabel.className = "capacity-row";
  const capacityText = document.createElement("span");
  capacityText.textContent = `${capacity} seats remaining`;
  const progressText = document.createElement("span");
  progressText.textContent = `${Number(event.capacity) ? Math.min(100, Math.round((Number(event.registered_count || 0) / Number(event.capacity)) * 100)) : 0}% filled`;
  capacityLabel.append(capacityText, progressText);

  const track = document.createElement("div");
  track.className = "capacity-track";
  const progress = document.createElement("span");
  progress.style.width = progressText.textContent;
  track.append(progress);

  const actions = document.createElement("div");
  actions.className = "event-actions";
  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "details-button";
  detailsButton.textContent = "Open event";
  detailsButton.dataset.openEvent = event.id;
  const actionButton = document.createElement("button");
  actionButton.type = "button";
  actionButton.className = event.registration_id ? "button secondary" : "button primary";
  actionButton.dataset.eventId = event.id;
  if (event.registration_id) {
    actionButton.dataset.action = "unregister";
    actionButton.dataset.registrationId = event.registration_id;
    actionButton.textContent = "Unregister";
  } else {
    actionButton.dataset.action = "register";
    actionButton.textContent = "Register";
    actionButton.disabled = !selectedUser() || !isOpen || capacity < 1;
  }
  if (!selectedUser() && !event.registration_id) actionButton.title = "Choose a demo profile first";
  if (!isOpen && !event.registration_id) actionButton.disabled = true;
  if (capacity < 1 && !event.registration_id) actionButton.disabled = true;
  actions.append(detailsButton, actionButton);

  card.append(top, title, summary, capacityLabel, track, actions);
  return card;
}

function renderEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  let visible = events.filter((event) => String(event.title || "").toLowerCase().includes(query));
  if (status !== "all") visible = visible.filter((event) => String(event.status).toLowerCase() === status);
  if (currentView === "mine") visible = visible.filter((event) => Boolean(event.registration_id));

  resultCount.textContent = `${visible.length} ${visible.length === 1 ? "event" : "events"}`;
  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty event-empty";
    empty.textContent = currentView === "mine" ? "No registrations for this profile yet." : "No events match these filters.";
    eventGrid.replaceChildren(empty);
    return;
  }
  eventGrid.replaceChildren(...visible.map(makeEventCard));
}

async function loadUsers() {
  try {
    const payload = await requestJson("/api/users");
    users = Array.isArray(payload.users) ? payload.users : [];
    userPicker.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select profile";
    userPicker.append(placeholder);
    for (const user of users) {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = `${user.email || "User"}${user.role ? ` · ${user.role}` : ""}`;
      userPicker.append(option);
    }
    if (!users.some((user) => String(user.id) === currentUserId)) {
      const defaultUser = users.find((user) => String(user.role || "").toLowerCase() === "attendee") || users[0];
      currentUserId = defaultUser ? String(defaultUser.id) : "";
    }
    userPicker.value = currentUserId;
    if (currentUserId) localStorage.setItem("eventhub-demo-user", currentUserId);
    updateSummary();
  } catch (error) {
    userPicker.replaceChildren(new Option("Profiles unavailable", ""));
    notify(error.message, "error");
  }
}

async function loadEvents() {
  eventGrid.innerHTML = '<div class="empty event-empty">Loading events…</div>';
  resultCount.textContent = "Loading from /api/events";
  const query = currentUserId ? `?user_id=${encodeURIComponent(currentUserId)}` : "";
  try {
    const payload = await requestJson(`/api/events${query}`);
    events = Array.isArray(payload.events) ? payload.events : [];
    updateSummary();
    renderEvents();
    updateEventModal();
  } catch (error) {
    const message = document.createElement("div");
    message.className = "empty event-empty error";
    message.textContent = error.message;
    eventGrid.replaceChildren(message);
    resultCount.textContent = "Could not load /api/events";
  }
}

async function registerForEvent(button) {
  if (!currentUserId) {
    notify("Choose a demo profile before registering.", "error");
    return;
  }
  button.disabled = true;
  try {
    await requestJson("/api/registrations", {
      method: "POST",
      body: JSON.stringify({ user_id: currentUserId, event_id: button.dataset.eventId }),
    });
    notify("You’re registered. Your seat is saved.", "success");
    await loadEvents();
  } catch (error) {
    notify(error.message, "error");
    button.disabled = false;
  }
}

async function unregisterFromEvent(button) {
  if (!currentUserId || !button.dataset.registrationId) return;
  const event = events.find((item) => String(item.id) === button.dataset.eventId);
  if (!window.confirm(`Unregister from “${event?.title || "this event"}”?`)) return;
  button.disabled = true;
  const url = `/api/registrations/${encodeURIComponent(button.dataset.registrationId)}?user_id=${encodeURIComponent(currentUserId)}`;
  try {
    await requestJson(url, { method: "DELETE" });
    notify("Your registration was cancelled.", "success");
    await loadEvents();
  } catch (error) {
    notify(error.message, "error");
    button.disabled = false;
  }
}

userPicker.addEventListener("change", async () => {
  currentUserId = userPicker.value;
  if (currentUserId) localStorage.setItem("eventhub-demo-user", currentUserId);
  else localStorage.removeItem("eventhub-demo-user");
  updateSummary();
  await loadEvents();
});
eventGrid.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-event]");
  if (openButton) {
    openEvent(openButton.dataset.openEvent);
    return;
  }
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "register") registerForEvent(button);
  if (button.dataset.action === "unregister") unregisterFromEvent(button);
});
modalProfilePicker.addEventListener("change", async () => {
  currentUserId = modalProfilePicker.value;
  userPicker.value = currentUserId;
  if (currentUserId) localStorage.setItem("eventhub-demo-user", currentUserId);
  else localStorage.removeItem("eventhub-demo-user");
  updateSummary();
  await loadEvents();
});
document.querySelector("#modal-close").addEventListener("click", () => eventModal.classList.add("hidden"));
eventModal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) eventModal.classList.add("hidden");
});
document.querySelector("#modal-register").addEventListener("click", (event) => registerForEvent(event.currentTarget));
document.querySelector("#modal-unregister").addEventListener("click", (event) => unregisterFromEvent(event.currentTarget));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") eventModal.classList.add("hidden");
});
searchInput.addEventListener("input", renderEvents);
statusFilter.addEventListener("change", renderEvents);
document.querySelector("#refresh").addEventListener("click", loadEvents);
document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => {
    currentView = button.dataset.view;
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.toggle("active", item === button));
    const mine = currentView === "mine";
    document.querySelector("#welcome-title").textContent = mine ? "Your events, all in one place." : "Find your next event.";
    document.querySelector("#list-eyebrow").textContent = mine ? "YOUR ACTIVITY" : "DISCOVER";
    document.querySelector("#events-heading").textContent = mine ? "My registrations" : "Upcoming events";
    document.querySelector("#list-copy").textContent = mine ? "Events saved by the selected demo profile." : "Explore the events currently in your database.";
    renderEvents();
  });
});

async function start() {
  await loadUsers();
  await loadEvents();
}

start();

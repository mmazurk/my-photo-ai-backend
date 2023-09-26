# My AI Photo Library: Backend API

## Purpose

The AI Photo Library project provides users a user-friendly interface to create AI-generated images and enhance their prompt engineering skills. 

The backend infrastructure supports:
- Account registration and management
- Login capabilities
- Saving and managing AI prompts

To deliver these features, a custom API was developed using Express for user authentication and prompt storage.

## Quick Start

`npm start`

## Technology Stack

The prototype was built using **Express** and **PostgreSQL** due to their widespread acceptance and robust functionality tailored for prototyping.

Instead of relying on an ORM (Object Relational Model), a custom backend was created. The architecture distinguishes view logic (routing) from model logic (data). This was achieved by:
- Developing classes and static models that interface with the database
- Sanitizing inputs to safeguard against SQL injection

## API and Routing Design

The backend, designed with Express, predominantly adheres to RESTful conventions, barring a few deviations. There's a clear separation between view and model logic.

### Prompt Models
- `Prompt.create(data)`
- `Prompt.getAll(username)`
- `Prompt.get(id)`
- `Prompt.update(id, data)`
- `Prompt.remove(id)`

### Prompt Routes
- `router.post("/")` — uses `Prompt.create()`
- `router.get("/")` — uses `Prompt.getAll()`
- `router.get("/:id")` — uses `Prompt.get(id)`
- `router.patch("/:id")` — uses `Prompt.update(id, data)`
- `router.delete("/:id")` — uses `Prompt.remove(id)`

### User Models
- `User.authenticate(username, password)`
- `User.register({username, password, firstName, lastName, email})`
- `User.findAll()`
- `User.get(username)`
- `User.update(username, data)`
- `User.remove(username)`

### User Routes
- `router.get("/:username")` — uses `User.get()`
- `router.patch("/:username")` — uses `User.update()`
- `router.delete("/:username")` — uses `User.remove()`

### Auth Routes
- `router.post("/token")` — uses `User.authenticate()`
- `router.post("/register")` — uses `User.register()`

> **Note**: Plans are in place to integrate an "admin" indicator within the user table. This will involve modifications to the `User.register()` and `User.authenticate()` models, as well as route logic updates to restrict certain actions to users or admins only.

## Testing

Extensive testing has been implemented. Run all tests using:
`npm test`

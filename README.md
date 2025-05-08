# SpaceX Launch Dashboard 🚀

A modern dashboard for exploring SpaceX launch data with authentication, filtering, and detailed mission views.

🔗 **Live Demo**: (https://spacexlaunchrocket.netlify.app/login)

## Features ✨

- **Secure Authentication** with client-side persistence
- **Complete Launch Catalog** from SpaceX API
- **Interactive Data Table** with:
  - Pagination (10 items per page)
  - Column sorting (name, date, flight number)
  - Real-time search filtering
- **Detailed Mission Views** showing:
  - Mission patches
  - Rocket specifications
  - Launch status (success/failure/upcoming)
  - Media links (webcast, photos)
- **Responsive Design** works on all devices
- **Dark/Light Mode** (system preference aware)

## Tech Stack 🛠️

- **Frontend**: React 18 + TypeScript
- **UI Framework**: [Mantine UI](https://mantine.dev)
- **State Management**: Zustand
- **API Client**: React Query
- **Routing**: React Router 6
- **Hosting**: Netlify

## Login Credentials (No backend involved for this) 🔐

Email: user@example.com
Password: password

## API Usage 📡
This project uses the public SpaceX API v4:

GET /launches - All launches

GET /launches/:id - Specific launch

GET /rockets/:id - Rocket details

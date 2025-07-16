# 🚗 Async Race

A Single Page Application (SPA) for managing a collection of remote-controlled cars, simulating races, and tracking winners — developed using **TypeScript** No frameworks used.

> 🔥 Built during the Rolling Scopes School course to revive a lost project and beat competitors to launch!
>
## 📚 Table of Contents

- [🔗 Live Demo](#-live-demo)
- [✨ Features](#-features)
  - [🏁 Garage View](#-garage-view)
  - [🏆 Winners View](#-winners-view)
  - [⚙️ Tech Highlights](#-tech-highlights)
- [📁 Project Structure](#-project-structure)
- [🛠️ Setup and Run Locally](#-setup-and-run-locally)
- [🧹 Linting and Formatting](#-linting-and-formatting)

## 🔗 Live Demo
[Launch the App](https://tatsianakuryla.github.io/async-race/#/garage)

The app depends on an external server to manage cars and race data.
You must **manually start the server** before running the app:

Go to this link:
   👉 [https://async-race-api-kl4e.onrender.com](https://async-race-api-kl4e.onrender.com)
   *(This will “wake up” the server, which may take ~30 seconds)*

Keep in mind:
- The server session is active for **15 minutes**.
- If you haven’t used the app for more than 15 minutes, **you must revisit the link above to restart the server**.

> ⚠️ Without starting the server, API requests will fail.

---

## ✨ Features

### 🏁 Garage View
- Add, update, delete cars (name + color)
- Display 7 cars per page (pagination included)
- Generate 100 random cars
- Start/stop individual car engines
- Start race for all cars on the current page
- Reset all cars to initial position
- Show winner with time

### 🏆 Winners View
- List all race winners with:
  - Car image and name
  - Number of wins
  - Best time
- Pagination
- Sorting by wins or time (ascending/descending)

### ⚙️ Tech Highlights
- SPA with TypeScript (no frameworks)
- Modular file structure
- Responsive design (≥500px)
- Fetch API for async requests
- Clean car animation via JS + CSS
- Persistent view state (pagination, inputs)
- Unicorn ESLint rules enforced
- CSS-in-JS techniques allowed (no Tailwind used)
- Webpack bundling

---

## 📁 Project Structure

```
src/
  ├── api/
  ├── components/
  ├── images/
  ├── styles/
  ├── utils/
  ├── index.html
  ├── index.ts

```
---

## 🛠️ Setup and Run Locally

```bash
# Install dependencies
npm install
```

```bash
# Start the development server
npm run start
```

```bash
# Build the project for production
npm run build
```

```bash
# Prepare the production build before deployment
npm run predeploy
```

```bash
# Deploy the app to GitHub Pages
npm run deploy
```

## 🧹 Linting and Formatting

```bash
# Lint TypeScript/JavaScript files and auto-fix issues
npm run lint
```

```bash
# Lint and fix CSS/SCSS files
npm run stylelint
```

```bash
# Format all files using Prettier
npm run format
```

```bash
# Check formatting without modifying files
npm run format:check
```

```bash
# Install git hooks via Husky
npm run prepare
```



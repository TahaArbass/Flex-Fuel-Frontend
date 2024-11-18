# Flex Fuel

Flex Fuel is a fitness-focused React application designed to help users explore exercises based on muscle groups, view detailed exercise information, and connect with a community of fitness enthusiasts, or as we like to call them, the **Gym Bro Community**.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

---

## About the Project

Flex Fuel aims to create an engaging platform for fitness enthusiasts. Users can explore exercises categorized by muscle groups, view detailed exercise guides with images and videos, and interact with a community of like-minded individuals. Whether you're a beginner or a seasoned athlete, Flex Fuel provides the tools to fuel your fitness journey.

---

## Features

- **Exercise Library**: Browse and filter exercises by targeted muscle groups.
- **Exercise Details**: View exercise descriptions, steps, photos, and videos for proper guidance.
- **User Profiles**: Check out other users' profiles and follow them for inspiration.
- **Gym Bro Community**: Connect with others and share your fitness journey.
- **Responsive Design**: Optimized for all devices using Material UI for sleek UI/UX.

---

## Built With

The following technologies power Flex Fuel:

- [React](https://reactjs.org/) - Frontend framework
- [Material UI](https://mui.com/) - Component library for UI design
- [Vite](https://vitejs.dev/) - Fast build tool
- [Axios](https://axios-http.com/) - HTTP client for API communication
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Backend framework
- [Postgres](https://www.postgresql.org/) - Relational database for storing data

---

## Getting Started

Follow these steps to run Flex Fuel on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running instance of the backend API (Node.js/Express with MySQL)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/flex-fuel.git
   cd flex-fuel
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Create a `baseUrl.js` file in the root directory for the backend base url and add the following code:

   ```javascript
   export const baseUrl = "http://localhost:3000";
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view Flex Fuel.

---

## Usage

Available scripts:

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build locally

---

## Folder Structure

The project structure is as follows:

```
flex-fuel/
src/
├── api/                   # API services (e.g., axios configurations)
├── assets/                # Static assets like images and videos
├── components/            # Reusable UI components
├── contexts/              # Context providers (e.g., AuthContext)
├── pages/                 # Application pages (e.g., HomePage, ProfilePage)
├── services/              # Business logic (e.g., ExerciseService, UserService)
├── utils/                # Utility functions
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.html             # HTML template
```

# Lexical Task: Payload CMS v3 Project

A custom implementation of Payload CMS v3 featuring a rich text editor powered by Lexical.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
- [Running the Project](#running-the-project)
  - [Standard Mode](#standard-mode)
  - [Docker Mode](#docker-mode)
- [Customizing the Editor](#customizing-the-editor)


## Project Overview

This project is a boilerplate for building powerful content-driven applications using Payload CMS. It comes pre-configured with a basic setup, including user authentication, media uploads, and a posts collection, all managed through Payload's flexible admin UI. The core of this project is the integration with the Lexical rich text editor, providing a modern and extensible writing experience.

## Features

- **Payload CMS v3**: The latest version of the headless CMS built with TypeScript.
- **Next.js 15**: A React framework for production-grade applications.
- **Lexical Rich Text Editor**: A highly extensible rich text editor from Meta.
- **MongoDB Integration**: Uses Mongoose adapter for database connectivity.
- **Pre-configured Collections**: Includes `Users`, `Media`, and `Posts` collections out of the box.
- **Docker Support**: Comes with a `docker-compose.yml` for easy local development environment setup.

## Project Structure

The main application code resides in the `src/` directory:

```
src/
├── app/              # Next.js App Router files, including Payload admin UI
├── collections/      # Payload CMS collection definitions (Users, Posts, etc.)
├── lexical/          # Customizations for the Lexical editor (nodes, plugins, features)
├── payload-types.ts  # Auto-generated TypeScript types for your Payload config
└── payload.config.ts # The main Payload CMS configuration file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.20.2 or >=20.9.0)
- [pnpm](https://pnpm.io/installation)
- A [MongoDB](https://www.mongodb.com/try/download/community) database instance (or [Docker](https://www.docker.com/products/docker-desktop/))

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd lexical-task
    ```

2.  **Set up environment variables:**
    Copy the example `.env` file.
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and add your MongoDB connection string:
    ```
    MONGODB_URI=mongodb://127.0.0.1/<db_name>
    ```

## Running the Project

You can run this project with a local Node.js environment or using Docker.

### Standard Mode

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Access the application:**
    -   Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)
    -   Frontend: [http://localhost:3000](http://localhost:3000)

    Follow the on-screen instructions to create your first admin user.

### Docker Mode

The provided `docker-compose.yml` file will spin up a MongoDB service for you.

1.  Ensure your `.env` file's `MONGODB_URI` points to the Docker service:
    `MONGODB_URI=mongodb://127.0.0.1/<db_name>` (The default is usually fine).

2.  **Start the services:**
    ```bash
    docker-compose up -d
    ```

3.  **Run the project** by following the steps in [Standard Mode](#standard-mode). The application will connect to the MongoDB instance running in Docker.

## Customizing the Editor

The Lexical editor can be extended with custom features. The configuration lives within `src/lexical/`. This is where you would add:
-   **Nodes**: Custom elements for the editor (e.g., `src/lexical/nodes/`).
-   **Plugins**: Custom behavior and logic (e.g., `src/lexical/plugins/`).
-   **Features**: Bundles of nodes, plugins, and toolbar buttons that can be added to the editor via `src/lexical/config.ts`.

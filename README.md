[![CodeQL](https://github.com/Slick-Telemetry/frontend/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/Slick-Telemetry/frontend/actions/workflows/codeql.yml)

# frontend <!-- omit from toc -->

Slick Telemetry frontend written in typescipt with nextjs and vercel.

Table of Contents:

- [Setting up the project](#setting-up-the-project)
  - [What you'll need](#what-youll-need)
- [Getting Started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Run the development server](#run-the-development-server)
  - [Connecting to the backend](#connecting-to-the-backend)
  - [Working with Hasura and GraphQL](#working-with-hasura-and-graphql)
  - [Commit Message Convention](#commit-message-convention)
- [Tests](#tests)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Resources](#resources)

## Setting up the project

### What you'll need

- [VS Code](https://code.visualstudio.com/) / [Intellij WebStorm](https://www.jetbrains.com/webstorm/)
- [Node.js](https://nodejs.org/en) (LTS)
- [pnpm](https://pnpm.io/)

## Getting Started

### Install dependencies

```bash
pnpm i
```

### Run the development server

You can start the server using this command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Connecting to the backend

The backend is running on a remote server. Reach out to Cris or Pratik for credentials. Alternatively, you can run the backend locally. See https://github.com/Slick-Telemetry/pu-es/blob/main/README.md.

**To make calls to API you need to:**

- Run the docker from the PU-ES project
- Follow steps to login to the Hasura console
- Populate your db with data from at least one session, either through the Reflex UI or the CLI tool
- In this repository, duplicate the `.env.example` file to define a graph parameters

### Working with Hasura and GraphQL

All queries can be found and should be added in [`./src/lib/queries.ts`](./src/lib/queries.ts) to allow all proper typing to be compiled.
This will prevent typesript errors when using queries.

- **Add Traefik Support (Mac)**
  To use the local api through Traefik you need to configure hosts for your systen
  **Mac** - add `127.0.0.1 api.localhost` to your `/etc/hosts` file

- **GraphQL Codegen**
  To generate proper graphql types run `pnpm generate`

- **Query Support**
  By running hasura with docker you can access the [hasura console](http://localhost:54323/console) which will help visualize the data you will return without the slowdown of overflowing graphql queries

### Commit Message Convention

This project is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

## Tests

```sh
pnpm cypress install # if you dont have cypress installed
pnpm cy:open
```

Run `pnpm build:test` to **build for testing**, when trying to test production code we need to omit certain components from vercel

- **Background**

  - Cypress uses chai based assertions

- **Running Cypress**

  - `pnpm cy:open`

## Deployment

The site is deployed at https://slicktelemetry.com using Vercel.

## Project Structure

We are using NextJs [App Router](https://nextjs.org/docs/app) for our project.

[In Figma](https://www.figma.com/file/rIYiXNVUyJ6xDo1dhzrnuE/Data-%26-Telemetry-Flow?type=whiteboard&t=3mTQQn5vi5qZrZw3-1), you can view both the data flow as well as the component mapping.

```
`src/`
├── app/
    ├── api/ -> hub for api calls
    ├── dashboard/ -> telemetry home
    ├── schedule/ -> simple schedule for current/upcoming season
    └── ...landing page and layout content
├── components
    ├── Footer/ -> Generic Footer
    ├── QueryNav/ -> Search param nav
    ├── SelectionData/ -> Hub for main data view
    ├── Sidebar/ -> Top level query pages and sub query
    ├── TopNav/ -> Generic navigation Bar
    └── ui/ -> Components imported from shadcn
├── lib/ -> graphql, helpers, constants, & other utils
├── state-mgmt/
```

## Resources

Key tools in use: `shadcn`, `tailwindcss`, `react`, `nextjs`, `pnpm`, `cypress`

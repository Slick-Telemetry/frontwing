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
  - [Contribution Guidelines](#contribution-guidelines)
- [Tests](#tests)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Resources](#resources)

## Setting up the project

### What you'll need

- [VS Code](https://code.visualstudio.com/) / [Intellij WebStorm](https://www.jetbrains.com/webstorm/)
- [Node.js](https://nodejs.org/en) (latest)
- [pnpm](https://pnpm.io/)

## Getting Started

### Install dependencies

It is encouraged to use **yarn** so the husky hooks can work properly.

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

Currently the standard is to run the backend locally. Follow instructions [here](https://github.com/Slick-Telemetry/pu-es/blob/main/README.md) for setup.

**To make calls to API you need to:**

- Run the docker from the PU-ES project
- Follow steps to login to the Hasura console
- Populate your db with data from at least one session, either through the Reflex UI or the CLI tool
- In this repository, duplicate the `.env.example` file to define a graph parameters

### Working with Hasura and GraphQL

All queries can be found and should be added in [`./src/lib/*.ts`](./src/lib) to allow all proper typing to be compiled.
This will prevent typesript errors when using queries.

- **Add Traefik Support (Mac)**
  To use the local api through Traefik you need to configure hosts for your systen
  **Mac** - add `127.0.0.1 api.localhost` to your `/etc/hosts` file

- **GraphQL Codegen**
  To generate proper graphql types run `pnpm generate`

- **Query Support**
  By running hasura with docker you can access the [hasura console](http://localhost:8080/console) which will help visualize the data you will return without the slowdown of overflowing graphql queries

### Commit Message Convention

This project is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

### Contribution Guidelines

- <u> _**NEVER MERGE YOUR OWN CODE; ALWAYS RAISE A PR AGAINST `dev`!**_ </u>

- **Always pull latest changes**

  - There are several developers working on this project. Always pull the latest from the line you intend to commit your changes to. Since we are using `Rebase and merge` PR merge strategy (more information below), there would be times when `git pull` will fail.
  - If there are no local staged/unstaged changes, you can use `git pull --force`.
  - If there are local staged/unstaged changes, please stash or discard them as appropriate and then use `git pull --force`.
  - If you don't want to use git CLI, to simplify these operations and have a visual representation of the git tree, we suggest to use a git GUI -
    - [Github Desktop](https://desktop.github.com/) (free)
    - [GitKraken](https://www.gitkraken.com/) (paid)
    - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (freemium)
    - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) (free)

- **Branches**:

  - `main` is the production mainline.
  - `dev` is the development line.

- **PR merge strategy on Github**
  - Code should flow in the following direction through branches:
    ```
    feature/bug fix -> dev -> main
    ```
  - We'll be keeping a linear commit history and so using a combination of `Rebase and merge` and `Squash and merge` merge strategies.
  - Use `Rebase and merge` as **_default_** to ensure all commits from the branch to be merged are brought in individually to the target branch.
  - `Squash and merge` may be used **_ONLY_** when bringing in changes from a feature/bug fix branch into `dev`.
  - To maintain linear commit history, ensure to use `push force` when:
    - Bringing `dev` on the same commit as `main` (ie rebasing `dev` onto `main`).
  - [More information on git rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase).
  - [More information on PR merge strategies](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github).
- **Jira issue linking**
  - Commits and PRs **_must_** be linked to a Jira issue.
  - To do so, include the Jira issue key in the PR title and/or the commit message after the conventional commit type.
  - [More information on Jira smart commits](https://support.atlassian.com/jira-software-cloud/docs/process-issues-with-smart-commits/).

## Tests

// TODO [cypress](https://www.cypress.io/)

> [!WARNING]
> Cypress does not officially support Next v14. If you enncounter any errors or issues please report them [here](https://github.com/Slick-Telemetry/frontend/issues)

- **Background**

  - Cypress uses chai based assertions

- **Running Cypress**

  - `pnpm run cypress:open`

## Deployment

// TODO [vercel](https://vercel.com/)

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

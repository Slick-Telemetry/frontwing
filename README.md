[![CodeQL](https://github.com/Slick-Telemetry/frontend/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/Slick-Telemetry/frontend/actions/workflows/codeql.yml)

# frontend <!-- omit from toc -->

Slick Telemetry frontend written in typescipt with nextjs and vercel.

Table of Contents:

- [Setting up the project](#setting-up-the-project)
  - [What you'll need](#what-youll-need)
- [Getting Started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Run the development server](#run-the-development-server)
  - [Commit Message Convention](#commit-message-convention)
  - [Contribution Guidelines](#contribution-guidelines)
- [Tests](#tests)
- [Deployment](#deployment)
- [URL Structure](#url-structure)
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

csd
Open [http://localhost:3000](http://localhost:3000) with your browser.

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
  - `staging` is the staging line.
  - `dev` is the development line.

- **PR merge strategy on Github**

  - We'll be keeping a clean commit history and so only using `Rebase and merge` and `Squash and merge` merge strategies.
  - Opt for `Rebase and merge` as the _**default**_ one to ensure all commits from the branch to be merged are brought in individually to the target branch.
  - `Squash and merge` can be used when the commits _**DON'T**_ need to be individually brought in to the target branch.
  - [More information](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github).

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

## URL Structure

```
`/`
├── Results of past seasons
└──`[season]` -> year
    └── `[location]` -> race location of race in season
        └── `[session]` -> session of race
            └── `[driver]` -> driverId in race session
                ├── `/` -> ???
                └── `/telemetry` -> ???
```

## Resources

Key tools in use: `daisy-ui`, `tailwindcss`, `react`, `nextjs`, `pnpm`, `cypress`

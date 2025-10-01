## 0.8.1 (2025-10-01)

### Refactor

- FRON-255 looked into tabs, not as customizable as desired

## 0.8.0 (2025-09-30)

### Feat

- POC vibecode, drag and select for standings table

## 0.7.0 (2025-09-26)

### Feat

- **analytics**: POSTHOG initial integration FRON-249

### Fix

- duplicate key error
- small bug fixes

## 0.6.33 (2025-09-22)

### Fix

- FRON-215 show drivers unless ?chart=constructors

### Refactor

- FRON-200 Refactor toggle logic for standings legend and table

## 0.6.32 (2025-09-17)

### Fix

- type error with hardcoded definition
- checkbox can accept id to prevent label click overlap

### Refactor

- adjust sticky nav styles and remove unnecessary main tag

## 0.6.31 (2025-09-16)

### Refactor

- **graphql**: using client-preset w codegen and optimized queries to align with best practices

## 0.6.30 (2025-09-10)

### Refactor

- migrate quick links to own file

## 0.6.29 (2025-09-09)

### Fix

- missing import adjustments

## 0.6.28 (2025-09-07)

### Fix

- save sidebar state
- FRON-247 Tabs for navigating between drivers & constructor standings

## 0.6.27 (2025-09-07)

### Fix

- error boundary fix for events without certain sessions ex: sprint

## 0.6.26 (2025-09-06)

### Fix

- manual declare types to avoid next type generation dependency

## 0.6.25 (2025-09-03)

### Refactor

- **deps**: FRON-244 migrate to latest cypress and apollo client

## 0.6.24 (2025-09-02)

### Refactor

- **home**: cleaner and more readable

## 0.6.23 (2025-08-19)

### Refactor

- reduce files related to charts

## 0.6.22 (2025-08-19)

### Fix

- **rebase**: issue from rebase

## 0.6.21 (2025-08-03)

### Fix

- **driver-grid**: correctly sort drivers

## 0.6.20 (2025-07-25)

### Fix

- **TOC**: avoid nesting <p> elements

## 0.6.19 (2025-07-20)

### Fix

- omit vercel component when running cypress testing

## 0.6.18 (2025-07-16)

### Fix

- correct export of Standings default component

## 0.6.17 (2025-06-30)

### Fix

- **driver-grid**: FRON-184 handle empty results list

## 0.6.16 (2025-06-17)

### Fix

- FRON-178 show sessions checkbox now respects user's intention

## 0.6.15 (2025-06-13)

### Fix

- **sector-times**: handle missing and null values

## 0.6.14 (2025-06-12)

### Fix

- show laps for race sessions only

## 0.6.13 (2025-06-12)

### Fix

- use total_laps instead of scheduled_laps

## 0.6.12 (2025-06-04)

### Fix

- **event-selector**: FRON-177 overflow outside its parent

## 0.6.11 (2025-06-04)

### Refactor

- reduced size map pop-up

## 0.6.10 (2025-06-01)

### Fix

- **seasons-dropdown**: FRON-171 preload query not utilized
- **seasons-dropdown**: FRON-171 use useQuery for fetching
- **lap-times**: FRON-173 handle empty laps

## 0.6.9 (2025-05-30)

### Fix

- **provisional-grid**: FRON-175 incorrect spacing
- **standings**: FRON-167 disable team legend item with all drivers

## 0.6.8 (2025-05-29)

### Fix

- FRON-164 sorting of quali, proper fastest lap, reuse util time format
- FRON-164 Provisional grid corrections

## 0.6.7 (2025-05-26)

### Fix

- FRON-122 error handling for driver grid

## 0.6.6 (2025-05-26)

### Fix

- **grid**: FRON-166 better visibility for missing constructor

## 0.6.5 (2025-05-25)

### Fix

- **utils**: FRON-170 edge case for Spa-Froncorchamps

## 0.6.4 (2025-05-23)

### Fix

- **sector-times**: axis labels

## 0.6.3 (2025-05-20)

### Refactor

- extract github icon as a component

## 0.6.2 (2025-05-15)

### Fix

- add key prop to Fragment in DeltaToWinner component

## 0.6.1 (2025-05-14)

### Fix

- FRON-155 proper time for next event and event sessions

### Perf

- FRON-162 Utilizing caching methods with next, apollo and hasura

## 0.6.0 (2025-05-12)

### Feat

- lap time comparison and delta to winner
- session charts: sector times and tires used

### Fix

- FRON-155 proper time for next event and event sessions
- **utils**: FRON-160 handle sprint qualifying and shootout
- **session**: FRON-159 qualify DNFs appropriately
- **map**: FRON-154 incorrect ordering of top 3 drivers
- wrong tyre color being applied
- remove moment dependency
- adjusting links to new routing layout

### Refactor

- FRON-118 sector time charts now horizontal and chart for fastest and potential fastest lap

## 0.5.2 (2025-04-19)

### Fix

- FRON-132 landing page bg image to load properly

### Refactor

- small change to server error comp

## 0.5.1 (2025-04-17)

### Fix

- resolve nav link child component error
- FRON-142 hide server icon unless there is an error

## 0.5.0 (2025-04-16)

### Feat

- add nextjs analytics and speed insights

## 0.4.1 (2025-04-09)

### Fix

- **eslint**: formatting not working

## 0.4.0 (2025-03-20)

### Feat

- standings sorted by constructor with most points, season selector, nav addition

### Refactor

- testing server side rendering with apollo client

## 0.3.2 (2025-02-26)

### Fix

- **nav**: bug with nav bar map link

## 0.3.1 (2025-02-11)

### Fix

- corrected next image import

## 0.3.0 (2025-01-21)

### Feat

- FRON-51

## 0.2.0 (2025-01-21)

### Feat

- Server status in Top Nav
- FRON-56 Error toast
- FRON-37 collapsible sidebar
- FRON-37 Build Side Bar Component
- FRON-33 shared secret, bearer token (#33)
- FRON-11 showcase next upcoming event (#26)
- added cypress tests and ci (#14)
- url updates when results change

### Fix

- **types**: With our updated types packages need to adjust types
- **state**: replace atomWithCache with base atom and remove healthcheck safeguard
- FRON-76 remove staging branch (#51)
- FRON-72 temp solution for health check blocking additional fetchings
- Toast won't re-render unless error type changes
- display utc date for next event and schedule page
- **ux**: FRON-59 Dropdowns update view param
- sidebar view updates search params
- health checks
- Remove faker
- FRON-36 Migrate default values from hydrating the state to strictly populating the ui (#39)
- folder structure
- FRON-20 packages and dependencies reinstalled (#27)
- FRON-10 resolving issue with race and session endpoints (#21) (#24)
- commitlint subject update to support jira ticket names
- minor update of race timeline and season tabs
- using next template file structure
- update faker package to latest

### Refactor

- migrate away from atomEffect, FRON-62
- FRON-36 Query Nav with corresponding state mgmt updated (#37)
- FRON-40 reformat project structure and organization (#32)
- simplify landing page, missing imagery so improvised (#30)
- add constants file and revert from axios to fetch
- utilize axios for fetch calls and include status checks to see if server is active
- **results**: shape placeholder data to match mockup

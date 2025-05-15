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

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

1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md
2. Screenshot:
3. Deployment:
4. Done 13.07.2025 / deadline 14.07.2025
5. Score: 100 / 100

## Points

### Student can get 100 points:

- [X] Eslint is set up, when _lint_ command is run it doesn't produce any errors (if there are warnings score might be less) - **15 points**
- [X] Prettier is set up, _format:fix_ command fixes issues - **15 points**
- [X] Husky is set up, linting is run on pre-commit - **10 points**
- [X] Page is split into at least two sections, top one has _Search_ input and "Search" button, main section displays the list of results from the selected api when page is opened for the first time (loader should be shown while app makes a call to the api) - **20 points**
- [ ] When user types something to the _Search_ input and clicks "Search" button, a loader is displayed and the list is changed according to the response results for a provided search term - **15 points**
- [ ] The search term typed into the _Search_ input is saved in the LS when user clicks on "Search" button (check it by closing the tab and open the app in the new one - the initial call should contain previously entered search term) - **15 points**
- [ ] Application is wrapped with ErrorBoundary, which logs error to a console and shows a fallback UI. There should be a button to throw an error - **10 points**

### Penalties

- **1. TypeScript & Code Quality**

  - [ ] TypeScript isn't used: **-95 points**
  - [ ] Usage of _any_: **-20 points per each**
  - [ ] Usage of _ts-ignore_: **-20 points per each**
  - [ ] Presence of _code-smells_ (God-object, chunks of duplicate code), commented code sections: **-10 points per each**
- **2. React Best Practices**

  - [ ] Direct DOM manipulations inside the React components: **-50 points per each**
  - [ ] React hooks are used to get access to either state, or to the component lifecycle: **-70 points**
- **3. External Dependencies**

  - [ ] Usage of Redux or other state management libraries: **-100 points**
  - [ ] Usage of component libraries, e.g. Material UI, Ant Design: **-100 points**
- **4. Project Management**

  - [ ] Pull Request doesn't follow guideline (including checkboxes in Score) [PR example](https://rs.school/docs/en/pull-request-review-process#pull-request-description-must-contain-the-following): **-10 points**

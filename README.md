## Run the Application

All you need to do is ot run:
#### `yarn install && yarn start`

The application is based on CRA so you can go with scripts from there:

#### `yarn start` to run the application
#### `yarn test` to run tests

Application will open automatically in browser window
and will be working on http://localhost:3000

## Notes

Time spent:
1. About **2h** on thinking/drafting the app in head/on paper and getting familiar with Giphy API.
2. About **6-8h** on coding.
3. About **1h** on preparing this document and comments in code.

I leave the comments in code for everything that could be done better or is time-consuming, and I decided NOT to spent too much time on some solutions.

Basically I do not know if **TDD, DDD** or something else here is expected, so I decided to keep simple structure of
files/folders with **Components/API/Context** as I usually do for simple project. Yes, this solution is not such modular as
DDD but still, whole project could be used as a dependency for other project.

Project is relatively small, so I decided to go with Context API instead of advanced state management.

### NOT implemented
1. I thought it makes no sense to spent too much time on **beautiful scrollbars**, so there are **only native**.
2. The same for *Data Storage* (**Redux** for example) and async *middleware* (**Redux-Saga**, **Redux-Thunk** ...).
3. I leave a comment in code about **Error handling**.
4. There are not any requirements about **RWD**, so it's implemented partially.
5. There are not any **E2E** tests, only Unit tests and not for everything due to lack of time.

### Performance
1. **Endless scrolling** is implemented as pagination functionality.
2. **Loading component** is added for fetching data (api calls and individual images).
3. **Manual batching** for state updated is implemented in some places.
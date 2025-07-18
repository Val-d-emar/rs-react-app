# Project: React Search Application with Class Components

This is an educational application created as part of a React assignment. It demonstrates the use of class components, state management, interaction with an external API, error handling, and the use of an Error Boundary.

## 🚀 Key Features

- **API Integration:** The application fetches and displays a list of entities (e.g., Pokémon) from a public API.
- **Search Functionality:** Users can filter the list by name. The search is performed client-side for an instant response.
- **Local Storage Persistence:** The last search query is saved and used when the application is reopened.
- **Loading Indication:** A spinner is displayed during the initial data fetch.
- **Error Handling:** The application correctly handles API errors.
- **Error Boundary:** The application is wrapped in an Error Boundary to prevent a "white screen of death" in case of a rendering failure.

## 🛠️ Tech Stack

- **Vite** as the project bundler
- **React** (v18+)
- **TypeScript**
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

---

## ⚙️ Installation and Setup

To set up this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Val-d-emar/rs-react-app.git -b class-components
   ```

2. **Navigate to the project directory:**

   ```bash
   cd rs-react-app
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the project in development mode:**

   ```bash
   npm run dev
   ```

   The application will then be available at `http://localhost:5173` (or another port specified in the console).

5. **Dockerize:**
   ```
   docker build -t the_name_of_your_image .
   docker run -p 8080:80 the_name_of_your_image
   ```
   The application will then be available at `http://localhost:8080` (or another port specified in the command first).
---

## ✅ Verification Checklist (100 Points)

This section will help you verify that all assignment requirements have been met.

### 1. ESLint, Prettier, Husky Setup (40 points)

- **Requirement:** The code is clean, formatting is applied, and the pre-commit hook is configured.
- **How to Check:**
  1. Run `npm run lint`. There should be no errors in the console.
  2. Intentionally mess up the formatting in any `.tsx` file (e.g., change single quotes to double quotes). Run `npm run format:fix`. The file should be automatically corrected.
  3. Mess up the formatting again, add the file to the stage (`git add .`), and try to make a commit (`git commit -m "test"`). `lint-staged` should automatically fix the file before the commit is created.

### 2. Layout and Initial Load (20 points)

- **Requirement:** The page is divided into two sections. The top section contains an input field and a button. The bottom section displays a list of results from the API on the first load. A loader is visible during the fetch.
- **How to Check:**
  1. Open the application in your browser. Visually confirm that there is a top section with a search bar and a main section for content.
  2. Open Developer Tools (F12) -> "Network" tab.
  3. Reload the page (Ctrl+R or Cmd+R). You should briefly see a **Spinner**, and in the "Network" tab, a request to `https://pokeapi.co/...`. After the request completes, the spinner should disappear, and a list of items should appear on the page.

### 3. Search Functionality (15 points)

- **Requirement:** When a user types text and clicks "Search," the list is filtered according to the query.
- **How to Check:**
  1. In the search input, type a partial name, for example, `ee`.
  2. Click the "Search" button.
  3. The list on the page should be filtered, showing only items that contain `ee` in their name (e.g., `Weedle`).

### 4. Local Storage Persistence (15 points)

- **Requirement:** The search query is saved to Local Storage. When the page is reopened, the saved query is used.
- **How to Check:**
  1. Perform a search (e.g., for the term `char`).
  2. Open Developer Tools (F12) -> "Application" tab -> Local Storage -> http://localhost:5173. You should see a key (e.g., `pokeSearch`) with the value `char`.
  3. **Completely close the browser tab.**
  4. Open a new tab and navigate to your application's address again.
  5. The input field should be pre-filled with the word `char`, and the list should be immediately filtered by this term.

### 5. Error Boundary and Error Handling (10 points)

- **Requirement:** The application is wrapped in an `ErrorBoundary` that catches rendering errors and displays a fallback UI. A button exists to test this functionality.
- **How to Check:**
  **ATTENTION:** React's built-in error overlay in development mode may override the `ErrorBoundary`. **This functionality must be tested in a production build.**
  1. **Stop the development server (Ctrl+C).**
  2. Build the production version of the application:

     ```bash
     npm run build
     ```

  3. Run a local server to preview the build (if `serve` is not installed, run `npm install -g serve`):

     ```bash
     serve -s dist
     ```

  4. Open the application in your browser at the address provided by `serve` (e.g., `http://localhost:3000`).
  5. Click the **"Test Error Boundary"** button.
  6. **Expected Result:** The application **should not crash** with a white or red screen. Instead, the broken part of the UI should be replaced with the fallback UI (e.g., an `<h1>Something went wrong. Please reload the page.</h1>` heading), and a log from `ErrorBoundary caught an error: ...` should appear in the console.
  
### 6. Testing


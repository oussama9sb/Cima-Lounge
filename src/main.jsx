import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Provider } from "./components/ui/provider.jsx";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/search/Search.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import Popular from "./pages/movies/Popular.jsx";
import Toprated from "./pages/movies/Toprated.jsx";
import Upcoming from "./pages/movies/Upcoming.jsx";
import PopularShows from "./pages/shows/PopularShows.jsx";
import TopratedShows from "./pages/shows/TopratedShows.jsx";
import OnTheAirShows from "./pages/shows/OnTheAirShows.jsx";
import "./index.css";
import ContextProvider from "./context/Context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        children: [
          {
            path: "/movies/popular",
            element: <Popular />,
          },
          {
            path: "/movies/top-rated",
            element: <Toprated />,
          },
          {
            path: "/movies/upcoming",
            element: <Upcoming />,
          },
        ],
      },
      {
        path: "/shows",
        children: [
          {
            path: "/shows/popular",
            element: <PopularShows />,
          },
          {
            path: "/shows/top-rated",
            element: <TopratedShows />,
          },
          {
            path: "/shows/on-the-air",
            element: <OnTheAirShows />,
          },
        ],
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ContextProvider>
  </StrictMode>,
);

import { useState } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { Details, Favourites, Home } from "./pages";
import GlobalState from "./contexts/GlobalContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "favourites",
          element: <Favourites />,
        },
        {
          path: "recipe/:id",
          element: <Details />,
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalState>
        <RouterProvider router={router} />
      </GlobalState>
    </>
  );
}

export default App;

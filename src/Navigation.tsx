
import {createBrowserRouter } from "react-router-dom";
import { Elixirs } from "./Views/Elixirs";

export const router = createBrowserRouter([
    {
      path: "/Elixirs/:name?/:difficulty?/:ingredient?/:inventorFullName?/:manufacturer?",
      element: <Elixirs />, 
    },
  ]);

  
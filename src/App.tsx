import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { client } from "./queryClient";
import { loader as countryLoader } from "@pages/Country/countryLoader";
import PageLayout from "@components/ui/PageLayout";
import { lazy } from "react";

const Error = lazy(() => import("@pages/Error"));

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        errorElement: <Error />,
        lazy: () => import("@pages/Home"),
      },
      {
        path: "countries/:countryId",
        errorElement: <Error />,
        loader: countryLoader(client),
        lazy: () => import("@pages/Country"),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

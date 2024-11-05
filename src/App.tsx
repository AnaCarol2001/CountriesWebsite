import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { client } from "./queryClient";
import { loader as countryLoader } from "@pages/Country/countryLoader";
import PageLayout from "@components/ui/PageLayout";
import Home from "@pages/Home";
import Country from "@pages/Country";
import Error from "@pages/Error";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "countries/:countryId",
        element: <Country />,
        loader: countryLoader(client),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

import App from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
import { About } from "@/pages/about";
import { Suspense } from "react";

const routes = [
    {
      path: "/admin",
      element: <App />,
      children: [
        {
          path: "/admin/about",
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <About />
            </Suspense>
          ),
        },
      ],
    },
  ]

export const router = createBrowserRouter(routes);

export default routes
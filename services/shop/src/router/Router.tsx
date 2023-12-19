import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import App from "@/components/App";
import Shop from "@/pages/shop/Shop";

const routes = [
    {
      path: "/shop",
      element: <App />,
      children: [
        {
          path: "/shop/main",
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <Shop />
            </Suspense>
          ),
        },
        {
          path: "/shop/second",
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <div style={{color:'red'}}>sssssssss</div>
            </Suspense>
          ),
        },
      ],
    },
  ]

export const router = createBrowserRouter(routes);

export default routes
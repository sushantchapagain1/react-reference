import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuDataLoader } from "./features/menu/Menu";
import CreateUser from "./features/user/CreateUser";
import Cart from "./features/cart/Cart";
import OrderNew, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderDataLoader } from "./features/order/Order";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuDataLoader,
        errorElement: <Error />,
      },
      {
        path: "/user/new",
        element: <CreateUser />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <OrderNew />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderDataLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

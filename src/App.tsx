import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Cart from "./components/Cart";
import Products from "./components/Products";

function App() {
  const router = createBrowserRouter([
    {
      path: "/welcome",
      element: (
        <>
          <Welcome />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
      children: [
        { index: true, element: <Products /> },
        {
          index: true,
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

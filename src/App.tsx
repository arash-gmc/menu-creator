import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./pages/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const router = createBrowserRouter([
    { path: "/menus/:restaurantName", element: <Menu /> },
  ]);
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;

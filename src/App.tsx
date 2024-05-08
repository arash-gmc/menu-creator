import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./pages/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "./pages/Main";

function App() {
  const router = createBrowserRouter([
    { path: "/menus/:restaurantName", element: <Menu /> },
    { path: "/", element: <MainPage /> },
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

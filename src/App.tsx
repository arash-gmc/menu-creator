import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Providers from "./Providers";
import router from "./routers";
import "./i18next";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;

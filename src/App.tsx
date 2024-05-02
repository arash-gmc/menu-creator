import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get<string>("http://localhost:5000/hello")
      .then((res) => setMessage(res.data));
  });
  return <h1>{message}</h1>;
}

export default App;

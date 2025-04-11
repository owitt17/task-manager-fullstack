import { useEffect, useState } from "react";
import { getHello } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getHello().then(setMessage);
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "@/configs/router.config.ts";

function App() {
  return (
    <>
      <div id="app" className="w-screen h-screen relative">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

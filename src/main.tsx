import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./tailwind.css";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(<App />);

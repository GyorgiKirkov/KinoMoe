import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { RegistrationProvider } from "./components/LogIn/RegistrationContext/RegistrationContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  </BrowserRouter>
);

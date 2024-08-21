import "./App.css";
import { MainRouter } from "./routes/MainRouter";
import { RegistrationProvider } from "./components/LogIn/RegistrationContext/RegistrationContext";

function App() {
  return (
    <RegistrationProvider>
      <MainRouter />
    </RegistrationProvider>
  );
}

export default App;

//resolution 1920 x 1080
// npm install bootstrap
// npm install -g json-server
// npx json-server db.json
// npm install react-router-dom 
// npm install bootstrap
// npm install zustand
// npm install --save @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/free-regular-svg-icons
// npm install @types/react-slick
// npm install slick-carousel
// npm install react-slick
// npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
// npm install chart.js react-chartjs-2
// npm i --save-dev @types/node
// npm install react-share
// json-server --watch db.json
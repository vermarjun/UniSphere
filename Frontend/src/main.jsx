import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
 // PersistGate for persistence
 import { store, persistor } from './components/redux/store'; 
import "./index.css";
import App from "./App";

// Render the application with Redux and PersistGate wrapped around it
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Redux Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* PersistGate for persistence */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


import { UserProvider } from './context/UserContext'; // ✅ import your context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* ✅ Wrap here */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);

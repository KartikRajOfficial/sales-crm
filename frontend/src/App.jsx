import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Root application component.
 *
 * Wires together the three cross-cutting concerns for the whole app:
 *  1. AuthProvider   — exposes the authenticated user + auth actions via context.
 *  2. AppRoutes      — the React Router tree (public + protected routes).
 *  3. ToastContainer — global toast notifications (styled for the dark theme
 *                      via overrides in index.css).
 */
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </AuthProvider>
  );
}

export default App;

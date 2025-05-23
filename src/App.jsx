import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // User authentication context
import { AdminAuthProvider } from './context/AdminAuthContext'; // Admin authentication context
import router from './routes/Route'; // Your router configuration
import { DashboardProvider } from './context/DashboardContext';
import Scroll from './components/Scroll/Scroll';


export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <DashboardProvider>
         <Scroll/>
          <RouterProvider router={router} />
        </DashboardProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}


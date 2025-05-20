import { useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { IoMdMenu, IoMdPerson, IoMdHome, IoMdAnalytics, IoMdPeople, IoMdDocument, IoMdMail } from 'react-icons/io';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AdminLayout = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { admin, setAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setAdmin({ user: null, token: null });
    navigate('/admin-login');
  };

  const adminNavLinks = [
    { path: '/admin-dashboard', icon: <IoMdHome size={20} />, label: 'Dashboard' },
    { path: '/admin-dashboard/users', icon: <IoMdPeople size={20} />, label: 'Users' },
    { path: '/admin-dashboard/statistics', icon: <IoMdAnalytics size={20} />, label: 'Create' }, // Updated icon and label
    { path: '/admin-dashboard/profile', icon: <IoMdPerson size={20} />, label: 'Profile' },
    { path: '/admin-dashboard/blog-manage', icon: <IoMdDocument size={20} />, label: 'Blog' }, // Updated icon
    { path: '/admin-dashboard/subscribers', icon: <IoMdMail size={20} />, label: 'Subscribers' }, // Updated icon and label
  ];

  if (!admin.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar - Fixed */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white fixed inset-0 z-10 h-full">
        <div className="p-4 border-b border-gray-800">
          <NavLink to="/admin-dashboard">
            <img
              src="/assets/images/logo2.webp"
              alt="company_logo"
              loading="lazy"
              className="w-32"
            />
          </NavLink>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {adminNavLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow-lg p-4">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <IoMdMenu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Admin Menu</SheetTitle>
                    <SheetDescription>Navigation and settings</SheetDescription>
                  </SheetHeader>
                  <nav className="mt-6">
                    <ul className="space-y-2">
                      {adminNavLinks.map((link) => (
                        <li key={link.path}>
                          <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}`
                            }
                            onClick={() => setIsSheetOpen(false)}
                          >
                            {link.icon}
                            <span>{link.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="ml-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100">
                    <Avatar>
                      <AvatarImage src="/path/to/avatar.jpg" alt={admin.user.name} />
                      <AvatarFallback>{admin.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{admin.user.name}</span>
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Admin Settings</SheetTitle>
                    <SheetDescription>Manage your admin account</SheetDescription>
                  </SheetHeader>
                  <div className="p-4">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <p className="text-sm text-gray-600">
              <span className="space-x-2">
                <Link to="/privacy-policy" className="text-black hover:underline">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link to="/terms-and-conditions" className="text-black hover:underline">
                  Terms and Conditions
                </Link>
                <span>|</span>
                <Link to="/earning-disclaimer" className="text-black hover:underline">
                  Earning Disclaimer
                </Link>
              </span>
              <br />
              <span className="text-gray-500 mt-2 block">
                © 2025 Arbilo <span className="ml-2">All rights reserved.</span>
              </span>
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
import { LogOut, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../services/token";

interface LayoutAdminProps {
  children: React.ReactNode;
}

export function LayoutAdmin({ children }: LayoutAdminProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Admin Panel
          <PanelRightOpen
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
          />
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Produtos
              </Link>
            </li>
          </ul>
        </nav>
        <div className="fixed bottom-0 w-full p-4 flex justify-start">
          <button onClick={logout} className="flex items-center gap-3">
            <span>Sair</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-screen">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-2 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </header>

        {/* Content */}
        <main className="flex flex-col items-center p-4 lg:ml-64">
          <div className="container px-3">{children}</div>
        </main>
      </div>
    </div>
  );
}

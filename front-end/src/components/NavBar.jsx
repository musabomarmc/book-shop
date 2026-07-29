import { BookOpen, PlusCircle, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        if (isDark) {
            setIsDark(false);
        } else {
            setIsDark(true);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 shadow-sm sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-2 rounded-lg group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-white transition-colors duration-200">
                                <BookOpen size={18} />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Book Shop</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Dark/Light Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Add Book Button */}
                        <Link 
                            to="/add-book" 
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                location.pathname === "/add-book" 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            <PlusCircle size={18} />
                            <span className="hidden sm:inline font-medium">Add Book</span>
                        </Link>
                    </div>

                </div>

            </div>
        </nav>
    );
};

export default NavBar;
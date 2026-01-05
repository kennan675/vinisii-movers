import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Truck } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="text-center p-8 max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vinisee</h2>
            <p className="text-xs text-emerald-600 font-medium -mt-1">MOVERS</p>
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-bold text-emerald-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! Looks like this page has moved to a new location. 
          Let us help you find your way back.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or try one of these pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Services
            </Link>
            <Link to="/book" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Book a Move
            </Link>
            <Link to="/about" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

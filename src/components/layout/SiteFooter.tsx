import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-6 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AeroGap. All rights reserved.</p>
          <span className="hidden sm:inline text-gray-500">|</span>
          <Link to="/#about" className="hover:text-sky-blue transition-colors">
            About
          </Link>
          <span className="hidden sm:inline text-gray-500">|</span>
          <Link to="/pricing" className="hover:text-sky-blue transition-colors">
            Pricing
          </Link>
          <span className="hidden sm:inline text-gray-500">|</span>
          <Link to="/full-assessment" className="hover:text-sky-blue transition-colors">
            Get Assessment
          </Link>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a href="#" className="hover:text-sky-blue transition-colors">
            Privacy Policy
          </a>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a href="#" className="hover:text-sky-blue transition-colors">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}

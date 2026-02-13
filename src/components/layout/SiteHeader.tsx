import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

const ADMIN_EMAIL = 'hofmastershelby@gmail.com';

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20L14 6L15 16L4 20Z" fill="#0ea5e9"/>
    <path d="M18 16L17 26L28 12L18 16Z" fill="#0ea5e9"/>
    <line x1="13" y1="18" x2="19" y2="14" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`;

export default function SiteHeader() {
  const navigate = useNavigate();
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-lg hover:text-sky-blue transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <Logo />
          AeroGap
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
            About
          </Link>
          <Link to="/#what-we-do" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
            What We Do
          </Link>
          <Link to="/#assessment" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
            Get Assessment
          </Link>
          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9',
                },
              }}
            >
              {isAdmin && (
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Admin Reports"
                    labelIcon={<span style={{ fontSize: '14px' }}>&#9881;</span>}
                    onClick={() => navigate('/admin/reports')}
                  />
                </UserButton.MenuItems>
              )}
            </UserButton>
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold px-4 py-1.5 rounded-lg text-sm transition-all duration-200"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

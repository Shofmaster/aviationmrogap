import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import AssessmentForm from './components/AssessmentForm';
import ResultsPage from './components/ResultsPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in environment variables');
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show header on landing, sign-in, or sign-up pages
  if (
    location.pathname === '/' ||
    location.pathname.startsWith('/sign-in') ||
    location.pathname.startsWith('/sign-up')
  ) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white font-bold text-lg hover:text-sky-blue transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20L14 6L15 16L4 20Z" fill="#0ea5e9"/>
            <path d="M18 16L17 26L28 12L18 16Z" fill="#0ea5e9"/>
            <line x1="13" y1="18" x2="19" y2="14" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          AeroGap
        </button>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9',
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <button
              onClick={() => navigate('/sign-in')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/sign-up')}
              className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold px-4 py-1.5 rounded-lg text-sm transition-all duration-200"
            >
              Sign Up
            </button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/assessment" element={<AssessmentForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <AppRoutes />
      </ClerkProvider>
    </BrowserRouter>
  );
}

export default App;

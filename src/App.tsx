import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import AssessmentForm from './components/AssessmentForm';
import ResultsPage from './components/ResultsPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import AdminReportsPage from './components/AdminReportsPage';
import QuizPage from './components/QuizPage';
import FullAssessmentLandingPage from './components/FullAssessmentLandingPage';
import WebsiteLayout from './components/WebsiteLayout';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in environment variables');
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/full-assessment" element={<FullAssessmentLandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/assessment" element={<AssessmentForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <AppRoutes />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </BrowserRouter>
  );
}

export default App;

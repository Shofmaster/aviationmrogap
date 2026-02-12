import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-navy flex items-center justify-center px-4">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/assessment"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-navy-800/90 backdrop-blur-md border border-white/10 shadow-2xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-400',
            formFieldLabel: 'text-gray-300',
            formFieldInput: 'bg-navy-700 border-white/10 text-white placeholder-gray-500',
            formButtonPrimary: 'bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold',
            footerActionLink: 'text-sky-blue hover:text-sky-blue/80',
            identityPreviewEditButton: 'text-sky-blue',
            formFieldAction: 'text-sky-blue',
            dividerLine: 'bg-white/10',
            dividerText: 'text-gray-400',
            socialButtonsBlockButton: 'border-white/10 text-gray-300 hover:bg-white/5',
            socialButtonsBlockButtonText: 'text-gray-300',
          },
        }}
      />
    </div>
  );
}

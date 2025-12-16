import { SEOHead } from '@/components/seo-head';
import { AuthForm } from './_components/auth-form';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <SEOHead
        title="Authentication"
        description="Sign in or create an account to manage your events."
      />
      <AuthForm />
    </div>
  );
}

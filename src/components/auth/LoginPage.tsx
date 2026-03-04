import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const errMsg = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    setLoading(false);
    if (errMsg) setError(errMsg);
  }

  return (
    <div className="min-h-screen bg-[#F5F4F2] dark:bg-[#1C1C1E] flex items-center justify-center">
      <div className="bg-white dark:bg-black rounded-2xl shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] w-full max-w-sm p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] tracking-[-0.02em]">Bark Do</h1>
          <p className="text-[13px] text-[#6C6C70] dark:text-[#98989D]">
            {isSignUp ? 'Create an account to get started.' : 'Sign in to your account.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-[#E5E5EA] dark:border-[#3A3A3C] text-[14px] text-[#1C1C1E] dark:text-[#F5F5F7] placeholder:text-[#AEAEB2] dark:placeholder:text-[#636366] bg-white dark:bg-[#1C1C1E] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-[#E5E5EA] dark:border-[#3A3A3C] text-[14px] text-[#1C1C1E] dark:text-[#F5F5F7] placeholder:text-[#AEAEB2] dark:placeholder:text-[#636366] bg-white dark:bg-[#1C1C1E] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-colors"
          />

          {error && (
            <p className="text-[12px] text-red-500 px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#007AFF] text-white text-[14px] font-medium hover:bg-[#0071EB] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Loading…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp((v) => !v); setError(null); }}
          className="text-[13px] text-[#007AFF] hover:underline text-center"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}

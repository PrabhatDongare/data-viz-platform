import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import AuthForm from '../../components/AuthForm';
import { app } from '../../utils/firebase';
import type { ZodTypeAny } from 'zod';

interface AuthPageProps {
  type: 'login' | 'signup';
  schema: ZodTypeAny;
  firebaseAuthHandler: (auth: any, email: string, password: string) => Promise<any>;
}

const AuthPage: React.FC<AuthPageProps> = ({ type, schema, firebaseAuthHandler }) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [errorMsg, setErrorMsg] = useState('');

  // Initialize form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Handles email/password form submission
  const onSubmit = async (data: any) => {
    try {
      const userCredential = await firebaseAuthHandler(auth, data.email, data.password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('idToken', idToken);
      navigate('/');
    } catch {
      setErrorMsg(`${type === 'login' ? 'Login' : 'Signup'} failed. Please try again.`);
    }
  };

  // Handles Google sign-in
  const handleGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('idToken', idToken);
      navigate('/');
    } catch {
      setErrorMsg('Google auth failed. Please try again.');
    }
  };

  const isLogin = type === 'login';

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="m-3 flex w-full max-w-md flex-col gap-6 rounded-2xl border border-[#424242] bg-[#161618] p-8 shadow-lg">
        {/* Heading and subtext */}
        <div>
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{isLogin ? 'Welcome!' : 'Create an account'}</h1>
          <p className="text-sm text-[#858882]">{isLogin ? 'Log in to AnswerAi to continue to AnswerAi' : 'Sign up to AnswerAi to continue'}</p>
        </div>

        {/* Google sign-in button */}
        <button
          className="flex w-full items-center justify-center gap-4 rounded-lg border border-[#424242] bg-[#0E0D0D] py-3 text-base transition hover:bg-[#080808]"
          type="button"
          onClick={handleGoogle}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-6 w-6" />
          <span>{isLogin ? 'Log in' : 'Sign up'} with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-[#424242]" />
          <span className="text-xs text-[#858882]">OR</span>
          <div className="h-px flex-1 bg-[#424242]" />
        </div>

        {/* Email/password form */}
        <AuthForm buttonText={isLogin ? 'Log in' : 'Sign up'} onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />

        {/* Navigation link and error message */}
        <div>
          <div className="text-center text-sm text-[#858882]">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <Link to="/signup" className="text-[#b0e636] hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-[#b0e636] hover:underline">
                  Log in
                </Link>
              </>
            )}
          </div>
          {errorMsg && <p className="pt-2 text-center text-sm text-red-500">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

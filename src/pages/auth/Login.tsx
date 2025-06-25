import AuthPage from './AuthPage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { z } from 'zod';

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Login page using the shared AuthPage component
const Login = () => (
  <AuthPage type="login" schema={loginSchema} firebaseAuthHandler={(auth, email, password) => signInWithEmailAndPassword(auth, email, password)} />
);

export default Login;

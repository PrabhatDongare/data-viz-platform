import AuthPage from './AuthPage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { z } from 'zod';

// Zod schema for signup form validation
const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Signup page using the shared AuthPage component
const Signup = () => (
  <AuthPage type="signup" schema={signupSchema} firebaseAuthHandler={(auth, email, password) => createUserWithEmailAndPassword(auth, email, password)} />
);

export default Signup;

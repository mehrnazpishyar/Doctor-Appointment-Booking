import type { FormEvent } from "react";
import { useState } from 'react'
import { useAppContext } from "../context/useAppContext";
import { apiRequest } from "../lib/api";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useAppContext()

  const onSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      if (state === "Sign Up") {
        await apiRequest<{ message: string }>("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        setPassword("");
        setState("Login");
        setMessage("Account created successfully. Please log in.");
        return;
      }

      const data = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (typeof data.token !== "string" || !data.token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      // Remove data from the old browser-only demo.
      localStorage.removeItem("users");
      localStorage.removeItem("currentUser");

      const redirectTo = localStorage.getItem("redirectTo");
      localStorage.removeItem("redirectTo");

      const destination =
        redirectTo?.startsWith("/appointment/")
          ? redirectTo
          : "/";

      window.location.replace(destination);
    } catch (error) {
      setMessage(
        error instanceof TypeError
          ? "Could not connect to the backend. Please try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {message && (
          <div className="text-zinc-700 text-sm w-full text-center">
            {message}
          </div>
        )}
        {state === 'Sign Up' && (
          <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} minLength={2}
              maxLength={100} value={name} autoComplete="name" className="border border-zinc-300 rounded w-full p-2 mt-1" type="text"
              required />
          </div>
        )
        }
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email}
            maxLength={254} autoComplete='email' className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} minLength={12}
            maxLength={72} autoComplete={
              state === "Sign Up" ? "new-password" : "current-password"} className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type="submit" disabled={isSubmitting} className='bg-primary text-white w-full py-2 rounded-md text-base disabled:opacity-60 disabled:cursor-not-allowed'>{isSubmitting
          ? "Please wait..."
          : state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => {
            if (isSubmitting) return;
            setState("Login");
            setMessage("");
          }} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => {if (isSubmitting) return; setState('Sign Up'); setMessage('') }} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
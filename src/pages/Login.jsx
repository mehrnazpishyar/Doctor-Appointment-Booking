import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  useEffect(() => {
    const users = getUsers();
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setState('Login');
    }
  }, [email]);

  const handleSignUp = () => {
    const users = getUsers();
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setMessage('Email already exists! Please log in.');
      setState('Login');
    } else {
      const newUser = { name, email, password };
      users.push(newUser);
      saveUsers(users);
      setMessage('Account created successfully! You can log in now.');
      setState('Login'); 
    }
  };

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setMessage(`Welcome back, ${user.name}!`);
      localStorage.setItem('token', JSON.stringify({ email })); 
    
      const redirectTo = localStorage.getItem("redirectTo") || "/my-profile";
      localStorage.removeItem("redirectTo");
      navigate(redirectTo);

    } else {
      setMessage('Invalid email or password.');
    }
  };


  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (state === 'Sign Up') {
      handleSignUp();
    } else {
      handleLogin();
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
      <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
      {message && (
          <div className="text-green-500 text-sm w-full text-center">
            {message}
          </div>
        )}
      {state === 'Sign Up' && (
   <div className='w-full '>
   <p>Full Name</p>
   <input onChange={(e) => setName(e.target.value)} value={name} className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" required />
 </div>
      )
      }
      <div className='w-full '>
        <p>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" required />
      </div>
      <div className='w-full '>
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required />
      </div>
      <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
      {state === 'Sign Up'
        ? <p>Already have an account? <span onClick={() => {setState('Login'),setMessage('')} } className='text-primary underline cursor-pointer'>Login here</span></p>
        : <p>Create an new account? <span onClick={() => {setState('Sign Up'); setMessage('')}} className='text-primary underline cursor-pointer'>Click here</span></p>
      }
    </div>
  </form>
  )
}

export default Login
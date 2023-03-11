import React from 'react'
import "./Login.css"
import amazonImg from "../CommonResources/images/Amazon-Logo.png"
import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { useHistory } from "react-router-use-history"
// import { async } from '@firebase/util';
import { Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
// import { db, auth } from "./firebase";




function Login() {
  const navigate = useNavigate();

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({})
 
 
   
  
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth);
      if (auth) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

     const register = async (e) => {
       e.preventDefault();

      try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(auth)
        if (auth) {
       navigate('/')
        }
      } catch  (error){
        console.log(error.message)
       }
        
     };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={amazonImg} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZONE FAKE CLONE Conditions of use
          Sale. Please see our Privecy Notice, our cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login_registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login
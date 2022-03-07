import React, { useState } from 'react';
import { input, inputWrapper } from './loginform.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const data = {
    user: {
      email: email,
      password: pwd
    }
  }

  return (
    <div>
      <div className={inputWrapper}>
        <input type="text" className={input} id="email-input" placeholder="Email"></input>
        <label htmlFor="email-input">Email</label>
      </div>

      <div className={inputWrapper}>
        <input type="password" className={input} id="password-input" placeholder="Password"></input>
        <label htmlFor="password-input">Password</label>
      </div>
    </div>
  );
};

export default LoginForm;
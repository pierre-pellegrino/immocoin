import React, { useState } from 'react';
import { form, input, inputWrapper, btn } from '../LoginForm/form.module.scss';

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const data = {
    user: {
      email: email,
      password: pwd
    }
  }

  return (
    <div className={form}>
      <h1> Register </h1>

      <div className={inputWrapper}>
        <input type="text" className={input} id="email-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <label htmlFor="email-input">Email</label>
      </div>

      <div className={inputWrapper}>
        <input type="password" className={input} id="password-input" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)}></input>
        <label htmlFor="password-input">Password</label>
      </div>

      <button className={btn} type="button" onClick={() => console.log(data)}>Sign up</button>
    </div>
  );
};

export default RegisterForm;
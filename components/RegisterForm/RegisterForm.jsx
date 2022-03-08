import React, { useState } from "react";
import { form, input, inputWrapper, btn } from "components/LoginForm/form.module.scss";
import APIManager from "pages/api/axiosMethods";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [_user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const data = {
    user: {
      email: email,
      password: pwd,
    },
  };

  const handleRegister = async () => {
    try {
      const response = await APIManager.register(data);
      setUser(response.data);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={form}>
      <h1> Register </h1>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="email-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="email-input">Email</label>
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="password-input"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        ></input>
        <label htmlFor="password-input">Password</label>
      </div>

      <button className={btn} type="button" onClick={() => handleRegister()}>
        Sign up
      </button>
    </div>
  );
};

export default RegisterForm;

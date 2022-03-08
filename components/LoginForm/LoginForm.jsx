import React, { useEffect, useRef, useState } from "react";
import { form, input, inputWrapper, btn } from "./form.module.scss";
import APIManager from "pages/api/axiosMethods";
import { useAtom } from "jotai";
import { userAtom, isConnectedAtom } from "store";
import { useRouter } from "next/router";

const LoginForm = () => {
  const email = useRef();
  const pwd = useRef();
  const [_user, setUser] = useAtom(userAtom);
  const [isConnected] = useAtom(isConnectedAtom);
  const router = useRouter();

  useEffect(() => {
    isConnected && router.back();
  }, [isConnected, router]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const canSave = [
      email.current?.value,
      pwd.current?.value,
    ].every(Boolean);

    if (!canSave) return;
    
    const data = {
      user: {
        email: email.current?.value,
        password: pwd.current?.value,
      },
    };

    try {
      const response = await APIManager.logIn(data);
      setUser(response.data);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={form} onSubmit={handleLogin}>
      <h1> Connexion </h1>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="email-input"
          placeholder="Email"
          ref={email}
        />
        <label htmlFor="email-input">Email</label>
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="password-input"
          placeholder="Mot de passe"
          ref={pwd}
        />
        <label htmlFor="password-input">Mot de passe</label>
      </div>

      <input className={btn} type="submit" role="button" value="Me connecter" />
    </form>
  );
};

export default LoginForm;

import React, { useEffect, useRef, useState } from "react";
import { form, input, inputWrapper, btn } from "./form.module.scss";
import APIManager from "pages/api/axiosMethods";
import { useAtom } from "jotai";
import { userAtom, isConnectedAtom } from "store";
import { useRouter } from "next/router";
import ValidationIcon from "components/ValidationIcon";

const LoginForm = () => {
  const email = useRef();
  const pwd = useRef();
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [_user, setUser] = useAtom(userAtom);
  const [isConnected] = useAtom(isConnectedAtom);
  const router = useRouter();

  useEffect(() => {
    isConnected && router.back();
  }, [isConnected, router]);

  const emailValidation = () => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.current?.value);
  };

  const pwdValidation = () => {
    return pwd.current?.value.length >= 6;
  };

  const canSave = [validEmail, validPwd].every(Boolean);

  const handleLogin = async (e) => {
    e.preventDefault();

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
          onChange={() => setValidEmail(emailValidation())}
        />
        <label htmlFor="email-input">Email</label>
        <ValidationIcon isValid={validEmail} />
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="password-input"
          placeholder="Mot de passe"
          ref={pwd}
          onChange={() => setValidPwd(pwdValidation())}
        />
        <label htmlFor="password-input">Mot de passe</label>
        <ValidationIcon isValid={validPwd} />
      </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="Me connecter"
        disabled={!canSave}
      />
    </form>
  );
};

export default LoginForm;

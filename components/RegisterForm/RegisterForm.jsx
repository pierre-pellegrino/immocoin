import React, { useState, useEffect, useRef } from "react";
import {
  form,
  input,
  inputWrapper,
  btn,
} from "components/LoginForm/form.module.scss";
import APIManager from "pages/api/axiosMethods";
import { useAtom } from "jotai";
import { userAtom, isConnectedAtom } from "store";
import { useRouter } from "next/router";
import ValidationIcon from "components/ValidationIcon";

const RegisterForm = () => {
  const email = useRef();
  const pwd = useRef();
  const pwdConfirm = useRef();
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [errors, setErrors] = useState();
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

  const pwdConfirmValidation = () => {
    return pwdValidation() && pwdConfirm.current?.value === pwd.current?.value;
  };

  const canSave = [validEmail, validPwd, validPwdConfirm].every(Boolean);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    const data = {
      user: {
        email: email.current?.value,
        password: pwd.current?.value,
      },
    };

    try {
      const response = await APIManager.register(data);
      console.log(response);
      setUser(response.data);
      router.push("/");
    } catch (error) {
      console.log(error.response.data.error);
      setErrors(error.response.data.error);
    }
  };

  return (
    <form className={form} onSubmit={handleRegister}>
      <h1> Inscription </h1>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="email-input"
          placeholder="Email"
          ref={email}
          onChange={() => setValidEmail(emailValidation())}
        ></input>
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
          onChange={() => {
            setValidPwd(pwdValidation());
            setValidPwdConfirm(pwdConfirmValidation());
          }}
        />
        <label htmlFor="password-input">Mot de passe</label>
        <ValidationIcon isValid={validPwd} />
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="password-confirmation"
          placeholder="Confirmation du mot de passe"
          ref={pwdConfirm}
          onChange={() => setValidPwdConfirm(pwdConfirmValidation())}
        />
        <label htmlFor="password-confirmation">
          Confirmation du mot de passe
        </label>
        <ValidationIcon isValid={validPwdConfirm} />
      </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="M'inscrire"
        disabled={!canSave}
      />
    </form>
  );
};

export default RegisterForm;

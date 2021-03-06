import React, { useState, useEffect, useRef } from "react";
import {
  form,
  input,
  inputWrapper,
  btn,
} from "styles/form.module.scss";
import APIManager from "pages/api/axiosMethods";
import { useAtom } from "jotai";
import { userAtom, isConnectedAtom } from "store";
import { useRouter } from "next/router";
import ValidationIcon from "components/ValidationIcon";
import Errors from "components/Errors";

const RegisterForm = () => {
  const email = useRef();
  const pwd = useRef();
  const pwdConfirm = useRef();
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const [_user, setUser] = useAtom(userAtom);
  const [isConnected] = useAtom(isConnectedAtom);
  const router = useRouter();

  useEffect(() => {
    isConnected && router.back();
  }, [isConnected, router]);

  const emailValidation = () => {
    setServerErrors("");
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.current?.value);
  };

  const pwdValidation = () => {
    setServerErrors("");
    return pwd.current?.value.length >= 6;
  };

  const pwdConfirmValidation = () => {
    setServerErrors("");
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
      setUser(response.data);
      router.push("/");
    } catch (error) {
      setServerErrors(error.response.data.error.message);
    }
  };

  return (
    <form className={form} onSubmit={handleRegister}>
      <h1> Inscription </h1>

      {serverErrors !== "" && <Errors serverErrors={serverErrors} />}

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
        <ValidationIcon isValid={serverErrors === "" && validEmail} />
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
        <ValidationIcon isValid={serverErrors === "" && validPwd} />
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
        <ValidationIcon isValid={serverErrors === "" && validPwdConfirm} />
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

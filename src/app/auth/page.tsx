"use client";

import { useState } from "react";
import AuthSwitcher from "@/components/ui/Auth/AuthSwitcher/AuthSwitcher";
import RegisterForm from "@/components/ui/Auth/RegisterForm/RegisterForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import { FcGoogle } from "react-icons/fc";
import styles from "./Auth.module.scss";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={`container ${styles.authPage}`}>
      <AuthSwitcher isLogin={isLogin} setIsLogin={setIsLogin} />
      <a href="/api/auth/google" className={styles.googleLink}>
        <FcGoogle />
        Продовжити з Google
      </a>

      <p className={styles.or}>Або</p>
      {isLogin ? (
        <LoginForm />
      ) : (
        <RegisterForm onSuccess={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;

"use client";

import { useState } from "react";
import AuthSwitcher from "@/components/ui/Auth/AuthSwitcher/AuthSwitcher";
import RegisterForm from "@/components/ui/Auth/RegisterForm/RegisterForm";
import LoginForm from "@/components/ui/Auth/LoginForm/LoginForm";
import { FcGoogle } from "react-icons/fc";
import styles from "./Auth.module.scss";
import Image from "next/image";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="container">
      <div className={styles.authPage}>
        <div className={styles.imgWrap}>
          <Image
            src="/images/logoAuth.png"
            alt="Science Be Beautiful"
            width={526}
            height={646}
            className={styles.image}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className={styles.wrapperForm}>
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
      </div>
    </div>
  );
};

export default AuthPage;

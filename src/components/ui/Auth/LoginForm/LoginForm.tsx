"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../InputGroup/InputGroup";
import { schemaLogin } from "@/validation/authValidation";
import styles from "./LoginForm.module.scss";
import { LoginFormInputs } from "@/types/types";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login data:", data);
    setShowSuccessMsg(true);

    setTimeout(() => {
      setShowSuccessMsg(false);
      router.push("/");
    }, 2000);
  };

  return (
    <>
      {showSuccessMsg && (
        <div className={styles.successMessage}>Вхід успішний!</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <InputGroup
              id="email"
              label="E-mail"
              type="text"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputGroup
              id="password"
              label="Пароль"
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
              showToggle
              onToggle={() => setShowPassword((prev) => !prev)}
              {...field}
            />
          )}
        />

        <button type="submit" className={styles.button}>
          Увійти
        </button>
      </form>
    </>
  );
};

export default LoginForm;

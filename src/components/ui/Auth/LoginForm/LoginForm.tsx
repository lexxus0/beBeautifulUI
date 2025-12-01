"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../../InputGroup/InputGroup";
import { schemaLogin } from "@/validation/authValidation";
import styles from "./LoginForm.module.scss";
import { LoginFormInputs } from "@/types/types";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/auth/operations";
import { selectError } from "@/store/auth/selectors";
import { syncCartFromGuest } from "@/store/cart/operations";

interface LoginFormProps {
  redirectTo?: string;
}

const LoginForm = ({ redirectTo = "/" }: LoginFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

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

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
         // 1️⃣ Синхронізуємо кошик
    await dispatch(syncCartFromGuest());
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
        router.push(redirectTo);
      }, 2000);
    } else {
      console.error("Помилка входу:", resultAction.payload);
      setShowErrorMsg(true);
      setTimeout(() => setShowErrorMsg(false), 3000);
    }
  };

  return (
    <>
      {showSuccessMsg && (
        <div className={styles.successMessage}>Вхід успішний!</div>
      )}
      {showErrorMsg && error && (
        <div className={styles.errorMessage}>Помилка входу</div>
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

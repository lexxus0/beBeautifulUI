"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import InputGroup from "../InputGroup/InputGroup";
import { schemaRegister } from "@/validation/authValidation";
import Link from "next/link";
import styles from "./RegisterForm.module.scss";
import { RegisterFormInputs } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/store/auth/operations";
import { selectError } from "@/store/auth/selectors";
import { setAuthHeader } from "@/store/init";

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schemaRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    console.log("Данні для реєстрації:", data);
    const resultAction = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(resultAction)) {
      const { accessToken } = resultAction.payload;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setAuthHeader(accessToken);
      }

      setShowSuccessMsg(true);
      setTimeout(() => setShowSuccessMsg(false), 3000);

      reset();
      onSuccess();
    } else {
      console.error("Помилка реєстрації:", resultAction.payload);
      setShowErrorMsg(true);
      setTimeout(() => setShowErrorMsg(false), 3000);
    }
  };

  return (
    <>
      {showSuccessMsg && (
        <div className={styles.successMessage}>Реєстрація успішна!</div>
      )}

      {showErrorMsg && error && (
        <div className={styles.errorMessage}>Полилка реєстрації</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <InputGroup
              id="name"
              label="Ім’я"
              type="text"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

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

        <div>
          <label className={styles.checkbox}>
            <input type="checkbox" {...register("agree")} />
            <span className={styles.text}>
              Я даю згоду на обробку моїх персональних даних та підтверджую
              ознайомлення з{" "}
              <Link
                href="/user-agreement"
                target="_blank"
                className={styles.link}
              >
                Угодою Користувача*
              </Link>
            </span>
          </label>
          {errors.agree && (
            <p className={styles.errorMsg}>{errors.agree.message}</p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Зареєструватись
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

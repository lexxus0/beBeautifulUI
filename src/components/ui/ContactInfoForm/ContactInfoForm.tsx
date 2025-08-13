"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import InputGroup from "../InputGroup/InputGroup";
import { schemaContactInfo } from "@/validation/contactInfoValidation";
import { ContactInfoInputs } from "@/types/types";
import styles from "./ContactInfoForm.module.scss";
import { useState } from "react";

const ContactInfoForm = () => {
  const router = useRouter();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoInputs>({
    resolver: yupResolver(schemaContactInfo),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ContactInfoInputs> = async (data) => {
    console.log("Контактна інформація:", data);

    setShowSuccessMsg(true);
    setTimeout(() => {
      setShowSuccessMsg(false);
      router.push("/shipping-info");
    }, 1500);
  };

  return (
    <>
      {showSuccessMsg && (
        <div className={styles.successMessage}>Дані збережено!</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <InputGroup
              id="firstName"
              label="Ім'я"
              type="text"
              error={errors.firstName?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <InputGroup
              id="lastName"
              label="Прізвище"
              type="text"
              error={errors.lastName?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <InputGroup
              id="phone"
              label="Телефон"
              type="text"
              error={errors.phone?.message}
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

        <button type="submit" className={styles.button}>
          Далі
        </button>
      </form>
    </>
  );
};

export default ContactInfoForm;

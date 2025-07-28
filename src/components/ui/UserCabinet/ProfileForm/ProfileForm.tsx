import Icon from "@/components/elements/Icon";
import InputGroup from "../../Auth/InputGroup/InputGroup";

import styles from "./ProfileForm.module.scss";
import { ProfileFormInputs } from "@/types/types";
import { Controller, useForm } from "react-hook-form";

export default function ProfileForm() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ProfileFormInputs>({
        defaultValues: {
          name: "",
          firstname: "",
          date: "",
          phone: "",
          email: "",
          password: "",
        },
      });

      const onSubmit = (data: ProfileFormInputs) => {
        console.log("Збережені дані профілю:", data);
      };


  const renderIcon = (
    <Icon
      name="icon-edit"
      className="w-[18px] h-[18px] absolute right-4 top-1/2 -translate-y-1/2"
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[856px] lg:h-[208px] lg:flex lg:flex-col lg:flex-wrap lg:gap-y-8 lg:gap-x-6">
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <InputGroup
          id="name"
          label="Імʼя"
          variant="custom"
          error={errors.name?.message}
          icon={renderIcon}
          inputClassName={styles.input}
          filledClassName={styles.filled}
          groupClassName={styles.groupInput}
          labelClassName={styles.label}
          {...field}
        />
      )}
    />
    <Controller
      name="firstname"
      control={control}
      render={({ field }) => (
        <InputGroup
          id="firstname"
          label="Прізвище"
          variant="custom"
          error={errors.firstname?.message}
          icon={renderIcon}
          inputClassName={styles.input}
          filledClassName={styles.filled}
          groupClassName={styles.groupInput}
          labelClassName={styles.label}
          {...field}
        />
      )}
    />
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <InputGroup
          id="date"
          label="День/Місяць/Рік"
          variant="custom"
          error={errors.date?.message}
          icon={renderIcon}
          inputClassName={styles.input}
          filledClassName={styles.filled}
          groupClassName={styles.groupInput}
          labelClassName={styles.label}
          {...field}
        />
      )}
    />
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <InputGroup
          id="phone"
          label="Телефон"
          variant="custom"
          error={errors.phone?.message}
          icon={renderIcon}
          inputClassName={styles.input}
          filledClassName={styles.filled}
          groupClassName={styles.groupInput}
          labelClassName={styles.label}
          {...field}
        />
      )}
    />
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <InputGroup
          id="email"
          label="E-mail"
          variant="custom"
          error={errors.email?.message}
          icon={renderIcon}
          inputClassName={styles.input}
          filledClassName={styles.filled}
          groupClassName={styles.groupInput}
          labelClassName={styles.label}
          {...field}
        />
      )}
    />
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <InputGroup
          id="password"
          label="Пароль"
          type="password"
          variant="custom"
          error={errors.password?.message}
          icon={renderIcon}
          inputClassName={styles.input}
          filledClassName={styles.filled}
          groupClassName={styles.groupInput}
          labelClassName={styles.label}
          {...field}
        />
      )}
    />
<div className="flex flex-col gap-6 mt-10 lg:absolute -bottom-[130px] left-[220px] lg:flex-row lg:mt-0 ">
    <button type="submit" className={styles.btnSubmit}>
      Зберегти зміни
    </button>
    <button type="button" onClick={() => reset()} className={styles.btn}>
      Скасувати зміни
    </button>
    </div>
  </form>
  );
}

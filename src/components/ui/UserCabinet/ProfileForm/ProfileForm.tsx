import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ProfileFormInputs,
  schemaProfile,
} from "@/validation/profileValidation";
import Icon from "@/components/elements/icon";
import InputGroup from "../../Auth/InputGroup/InputGroup";
import styles from "./ProfileForm.module.scss";

const fields: {
  name: keyof ProfileFormInputs;
  label: string;
  type?: "text" | "password";
}[] = [
  { name: "name", label: "Імʼя" },
  { name: "firstname", label: "Прізвище" },
  { name: "date", label: "День/Місяць/Рік" },
  { name: "phone", label: "Телефон" },
  { name: "email", label: "E-mail" },
  { name: "password", label: "Пароль", type: "password" },
];

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schemaProfile),
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
      className="w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2"
    />
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[856px] lg:grid lg:grid-cols-2 lg:gap-y-8 lg:gap-x-6"
    >
      {fields.map(({ name, label, type }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <InputGroup
              id={name}
              label={label}
              type={type}
              variant="custom"
              error={errors[name]?.message}
              icon={renderIcon}
              inputClassName={styles.input}
              labelClassName={styles.label}
              {...field}
            />
          )}
        />
      ))}
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

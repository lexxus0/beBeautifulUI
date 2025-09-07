import { Controller, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ProfileFormInputs,
  schemaProfile,
} from "@/validation/profileValidation";
import { useRouter } from "next/navigation";
import InputGroup from "../../InputGroup/InputGroup";
import Icon from "@/components/shared/Icon";
import DatePickerField from "../DatePickerField/DatePickerField";
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
  const resolver = yupResolver(schemaProfile) as Resolver<ProfileFormInputs>;
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver,
    defaultValues: {
      name: "",
      firstname: "",
      date: null,
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
      className="lg:w-[856px] flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-y-8 lg:gap-x-6"
    >
      {fields.map(({ name, label, type }) => {
        if (name === "date") {
          return (
            <Controller
              key="date"
              name="date"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  id="date"
                  label={label}
                  value={field.value}
                  onChange={field.onChange}
                  inputClassName={styles.input}
                />
              )}
            />
          );
        }
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field: { name: fieldName, value, onChange } }) => {
              const stringValue = (value ?? "") as string;
              const hasValue = stringValue.length > 0;
              return (
                <InputGroup
                  id={name}
                  name={fieldName}
                  label={label}
                  type={type}
                  variant="custom"
                  error={errors[name]?.message}
                  value={stringValue}
                  onChange={onChange}
                  icon={renderIcon}
                  inputClassName={`${styles.input} ${
                    hasValue ? styles.hasValue : ""
                  }`}
                  labelClassName={styles.label}
                />
              );
            }}
          />
        );
      })}
      <div className="flex flex-col gap-6 mt-10 lg:absolute -bottom-[130px] left-[220px] lg:flex-row lg:mt-0 ">
        <button type="submit" className={styles.btnSubmit}>
          Зберегти зміни
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            router.push("/");
          }}
          className={styles.btn}
        >
          Скасувати зміни
        </button>
      </div>
    </form>
  );
}

import * as yup from "yup";

export const schemaProfile = yup.object({
  name: yup
    .string()
    .min(3, "Повинно бути мінімум 3 символи")
    .max(20, "Повинно бути максімум 20 символів")
    .required("Імʼя обовʼязкове"),
  firstname: yup
    .string()
    .min(3, "Повинно бути мінімум 3 символи")
    .max(20, "Повинно бути максімум 20 символів")
    .required("Прізвище обовʼязкове"),
  date: yup.date().nullable().notRequired(),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Невірний формат телефону")
    .required("Телефон обовʼязковий"),
  email: yup.string().email("Некоректний email").required("Email обовʼязковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обовʼязковий"),
});

export type ProfileFormInputs = yup.InferType<typeof schemaProfile>;

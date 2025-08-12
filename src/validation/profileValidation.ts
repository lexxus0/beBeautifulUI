import * as yup from "yup";

export const schemaProfile = yup.object({
  name: yup
    .string()
    // .min(3, "Повинно бути мінімум 3 символи")
    // .max(20, "Повинно бути максімум 20 символів")
    .notRequired(),
  firstname: yup
    .string()
    // .min(3, "Повинно бути мінімум 3 символи")
    // .max(20, "Повинно бути максімум 20 символів")
    .notRequired(),
  date: yup.date().nullable().notRequired(),
  phone: yup
    .string()
    // .matches(/^\+380\d{9}$/, "Невірний формат телефону")
    .notRequired(),
  email: yup
    .string()
    // .email("Некоректний email")
    .notRequired(),
  password: yup
    .string()
    // .min(6, "Мінімум 6 символів")
    .notRequired(),
});

export type ProfileFormInputs = yup.InferType<typeof schemaProfile>;

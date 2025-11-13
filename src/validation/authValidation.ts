import * as yup from "yup";

export const schemaRegister = yup.object({
  first_name: yup
    .string()
    .min(3, "Ім'я повинно містити щонайменше 3 символи")
    .max(20, "Ім'я не може перевищувати 20 символів")
    .required("Введіть ім’я"),
  email: yup.string().email("Некоректний email").required("Email обовʼязковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Введіть пароль"),
  agree: yup
    .boolean()
    .oneOf([true], "Потрібна згода")
    .required(),
});

export const schemaLogin = yup.object({
  email: yup.string().email("Некоректний email").required("Email обовʼязковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Введіть пароль"),
});

export type RegisterFormInputs = yup.InferType<typeof schemaRegister>;
export type LoginFormInputs = yup.InferType<typeof schemaLogin>;


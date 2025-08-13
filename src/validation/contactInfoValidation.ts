import * as yup from "yup";

export const schemaContactInfo = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Ім'я повинно містити щонайменше 3 символи")
    .max(20, "Ім'я не може перевищувати 20 символів")
    .required("Введіть ім’я"),
  lastName: yup
    .string()
    .min(3, "Прізвище повинно містити щонайменше 3 символи")
    .max(20, "Прізвище не може перевищувати 20 символів")
    .required("Введіть прізвище"),
  phone: yup
    .string()
    .required("Введіть номер телефону")
    .matches(/^\+?[0-9\s-]{10,}$/, "Невірний формат телефону"),
   email: yup.string().email("Некоректний email").required("Email обовʼязковий"),
});

import * as yup from "yup";

export const schemaProfile = yup.object({
  first_name: yup
    .string()
    // .min(3, "Повинно бути мінімум 3 символи")
    // .max(20, "Повинно бути максімум 20 символів")
    .notRequired(),
  last_name: yup
    .string()
    // .min(3, "Повинно бути мінімум 3 символи")
    // .max(20, "Повинно бути максімум 20 символів")
    .notRequired(),
  birthday: yup.date().nullable().notRequired(),
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
  avatarUrl: yup
    .mixed<File>()
    .nullable()
    .notRequired()
    .test("fileSize", "Файл занадто великий (макс. 3МБ)", (file) =>
      file ? file.size <= 3 * 1024 * 1024 : true
    )
    .test("fileType", "Дозволено лише зображення", (file) =>
      file
        ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        : true
    ),
});

export type ProfileFormInputs = yup.InferType<typeof schemaProfile>;

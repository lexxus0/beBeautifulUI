import * as yup from "yup";

export type DeliveryType = "warehouse" | "address";
export type PaymentChoice = "card" | "invoice" | "cod";

export const schemaDelivery = yup.object({
  city: yup
    .string()
    .trim()
    .min(2, "Введіть щонайменше 2 символи")
    .required("Вкажіть місто"),

  deliveryType: yup
    .mixed<DeliveryType>()
    .oneOf(["warehouse", "address"])
    .required(),

  warehouse: yup
    .string()
    .trim()
    .when("deliveryType", {
      is: "warehouse",
      then: (s) => s.required("Вкажіть відділення"),
      otherwise: (s) => s.strip(),
    }),

  street: yup
    .string()
    .trim()
    .when("deliveryType", {
      is: "address",
      then: (s) => s.required("Вкажіть вулицю"),
      otherwise: (s) => s.strip(),
    }),

  house: yup
    .string()
    .trim()
    .when("deliveryType", {
      is: "address",
      then: (s) => s.required("Вкажіть будинок"),
      otherwise: (s) => s.strip(),
    }),

  apartment: yup
    .string()
    .trim()
    .when("deliveryType", {
      is: "address",
      then: (s) => s.required("Вкажіть квартиру"),
      otherwise: (s) => s.strip(),
    }),

  payment: yup
    .mixed<PaymentChoice>()
    .oneOf(["card", "invoice", "cod"], "Оберіть спосіб оплати")
    .required("Оберіть спосіб оплати"),

  orderComment: yup.string().trim().max(500, "До 500 символів").optional(),
  giftCertificate: yup.string().trim().optional(),
  noCall: yup.boolean().default(false),
  saveCard: yup.boolean().default(false),
});

export type DeliveryFormValues = yup.InferType<typeof schemaDelivery>;

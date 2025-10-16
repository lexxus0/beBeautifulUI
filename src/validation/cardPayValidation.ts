import * as yup from "yup";

/** Luhn check */
function luhnCheck(numStr: string) {
  const digits = numStr.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/** parse MM/YY and return Date for last ms of that month */
function parseExpiryMMYY(mmYY: string): Date | null {
  const m = mmYY.match(/^(\d{2})[\/\-]?(\d{2})$/);
  if (!m) return null;
  const month = parseInt(m[1], 10);
  const year = 2000 + parseInt(m[2], 10); // '24' -> 2024
  if (month < 1 || month > 12) return null;
  // last ms of that month
  const d = new Date(year, month, 0, 23, 59, 59, 999); // day 0 -> last day of prev month? careful:
  // Better: new Date(year, month, 0) gives last day of month
  return d;
}

/** Check expiry is in future (at least current month is allowed? usually must be >= current month) */
function isExpiryInFuture(mmYY: string) {
  const expiry = parseExpiryMMYY(mmYY);
  if (!expiry) return false;
  const now = new Date();
  // we consider expiry valid if last ms of expiry month >= now
  return expiry.getTime() >= now.getTime();
}

/** Yup schema */
export const schemaCardPay = yup.object({
  number: yup
    .string()
    .transform((val) =>
      typeof val === "string" ? val.replace(/\s|-/g, "") : val
    )
    .required("Введіть номер картки")
    .test(
      "digits-only",
      "Номер має містити лише цифри",
      (val) => !!val && /^\d+$/.test(val)
    )
    .test(
      "len",
      "Номер має містити 16 цифр",
      (val) => !!val && val.length === 16
    )
    .test("luhn", "Невірний номер картки", (val) => !!val && luhnCheck(val)),

  cvv: yup
    .string()
    .transform((v) => (typeof v === "string" ? v.replace(/\D/g, "") : v))
    .required("Введіть CVV")
    .matches(/^\d{3}$/, "CVV повинен містити 3 цифри"),

  date: yup
    .string()
    .required("Введіть термін дії (MM/YY)")
    .test(
      "format",
      "Формат має бути MM/YY",
      (val) => !!val && /^(\d{2})[\/\-]?(\d{2})$/.test(val)
    )
    .test("valid-month", "Невірний місяць", (val) => {
      if (!val) return false;
      const m = val.match(/^(\d{2})[\/\-]?(\d{2})$/);
      if (!m) return false;
      const month = Number(m[1]);
      return month >= 1 && month <= 12;
    })
    .test(
      "future",
      "Картка прострочена",
      (val) => !!val && isExpiryInFuture(val)
    ),

  sendReceipt: yup.boolean().optional(),
});

export type CardForm = yup.InferType<typeof schemaCardPay>;

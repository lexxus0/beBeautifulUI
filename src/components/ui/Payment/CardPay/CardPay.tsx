// import React from "react";

// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, Resolver, useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { CardForm, schemaCardPay } from "@/validation/cardPayValidation";
// import InputGroup from "../../InputGroup/InputGroup";
// import styles from "./CardPay.module.scss";
// import { useAppDispatch } from "@/store/hooks";
// import { createOrder } from "@/store/orders/operations";

// export default function CardPay() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const resolver = yupResolver(schemaCardPay) as Resolver<CardForm>;

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<CardForm>({
//     resolver,
//     defaultValues: {
//       number: "",
//       cvv: "",
//       date: "",
//       sendReceipt: false,
//     },
//   });
  
//   const onSubmit = async () => {
//     console.log("💳 CARD SUBMIT CLICKED");
//     const result = await dispatch(createOrder());
//     console.log("📨 CREATE ORDER RESULT:", result);

//     if (createOrder.fulfilled.match(result)) {
//       console.log("🟢 ORDER CREATED SUCCESSFULLY:", result.payload);
//       const paymentLink = result.payload.paymentLink;
//       console.log("🔗 PAYMENT LINK:", paymentLink);
//       // 👉 Перехід на оплату
//       // window.location.href = paymentLink;
//     } else {
//       console.error("Не вдалося створити замовлення");
//     }
//   };

//   return (
//     <div className="py-6 mt-6  border-[0.4px] border-gray-10 rounded-lg md:px-[114px] lg:px-[134px] lg:w-[684px] mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//         <Controller
//           control={control}
//           name="number"
//           render={({ field }) => (
//             <InputGroup
//               id="number"
//               label="Номер картки"
//               type="text"
//               error={errors.number?.message}
//               {...field}
//             />
//           )}
//         />

//         <Controller
//           control={control}
//           name="cvv"
//           render={({ field }) => (
//             <InputGroup
//               id="cvv"
//               label="CVV"
//               type="password"
//               error={errors.cvv?.message}
//               {...field}
//             />
//           )}
//         />

//         <Controller
//           control={control}
//           name="date"
//           render={({ field }) => (
//             <InputGroup
//               {...field}
//               id="date"
//               label="MM/YY"
//               type="text"
//               error={errors.date?.message}
//               onChange={(e) => {
//                 let value = e.target.value.replace(/\D/g, ""); // прибрати все, крім цифр
//                 if (value.length >= 3) {
//                   value = value.slice(0, 2) + "/" + value.slice(2, 4);
//                 }
//                 field.onChange(value);
//               }}
//             />
//           )}
//         />

//         {/* 🔹 Тумблер “Відправити квитанцію” */}
//         <Controller
//           control={control}
//           name="sendReceipt"
//           render={({ field }) => (
//             <label
//               className={`group flex items-center gap-4 cursor-pointer my-[14px] md:my-[19px] ml-2 select-none ${
//                 field.value ? "text-green-700" : ""
//               }`}
//               onClick={() => field.onChange(!field.value)}
//             >
//               {/* трек */}
//               <div
//                 className={`relative w-8 h-[19px] border-3  rounded-full transition-border duration-300 ${
//                   field.value ? "border-green-700" : "border-gray-10"
//                 }`}
//               >
//                 {/* кружечок */}
//                 <div
//                   className={`absolute top-0.5 left-0.5 w-[9px] h-[9px] bg-gray-10 rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
//                     field.value
//                       ? "translate-x-3 bg-green-700"
//                       : "translate-x-0 bg-gray-10"
//                   }`}
//                 />
//               </div>

//               <span className="font-lato font-bold text-gray-10 text-base">
//                 Відправити квитанцію на E-mail
//               </span>
//             </label>
//           )}
//         />

//         <p className="px-[10px] md:px-0 font-roboto font-light text-xs md:text-sm mb-2 md:mb-4">
//           Натискаючи на кнопку «Оплатити», ви підтверджуєте що ознайомлені з
//           переліком інформації про послугу та приймаєте умови публічного
//           договору
//         </p>

//         <div className="px-4 md:px-0 flex flex-col gap-6 md:gap-8 lg:gap-4">
//           <button type="submit" className={styles.btnSubmit}>
//             Оплатити <span>778 грн</span>
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               reset();
//               router.push("/");
//             }}
//             className={styles.btnCancel}
//           >
//             Скасувати
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

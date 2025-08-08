import React from "react";
import Image from "next/image";
import ProtectedPage from "@/components/elements/ProtectedPage";
import Icon from "@/components/shared/Icon";

export default function PayAndDeliveryPage() {
  return (
    <ProtectedPage>
      <div className="container pt-5 pb-10 md:pt-10 md:pb-17 lg:pb-20">
        <p className="px-5 font-lato text-xl text-black text-center mb-6 md:text-2xl md:px-15 lg:text-[28px]">
          Ми прагнемо зробити процес покупки максимально зручним для Вас.
          <br />
          Оберіть той варіант, який підходить саме Вам:
        </p>
        <h2 className="font-lato font-semibold text-2xl text-black text-center mb-[10px] md:text-[32px] lg:text-[42px]">
          Доставка
        </h2>
        <p className="font-light text-center text-black mb-6 lg:text-lg">
          Обирайте зручний для вас спосіб
          <br className="md:hidden" /> отримання замовлення
        </p>
        <ul className="flex flex-col gap-6 mb-9 md:w-[424px] md:mb-4 md:mx-auto lg:w-[856px] lg:mb-10">
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              У відділення Нової Пошти
            </p>
            <p className="font-light text-black text-sm md:text-base lg:text-lg">
              Доставка по всій Україні — швидко та надійно. Ви отримуєте
              сповіщення, як тільки посилка прибуває (Забрай у зручний час, не
              чекаючи кур’єра).
            </p>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              У поштомат Нової Пошти
            </p>
            <p className="font-light text-black text-sm md:text-base lg:text-lg">
              Ідеальний варіант, якщо не хочете стояти в черзі. Поштомати
              працюють 24/7
              <br className="hidden lg:block" /> (Самостійне отримання у
              будь-який зручний момент — навіть вночі).
            </p>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Адресна доставка курʼєром
            </p>
            <p className="font-light text-black text-sm md:text-base lg:text-lg">
              Замовлення доставляється просто до ваших дверей. Максимум комфорту
              — вам не потрібно виходити з дому.
            </p>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Укрпошта
            </p>
            <p className="font-light text-black text-sm md:text-base lg:text-lg">
              Доступна доставка у найвіддаленіші куточки України, включаючи села
              та невеликі міста.
            </p>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Самовивіз
            </p>
            <p className="font-light text-black text-sm md:text-base lg:text-lg">
              Можна забрати замовлення особисто за адресою:
              <br className="lg:hidden" /> <span className="underline">м. Чернівці, вул. Прутська, 29.</span>
              <br /> Безкоштовно, без очікування, з можливістю консультації на
              місці.
            </p>
          </li>
        </ul>
        <div className="relative py-5 mb-6 lg:mb-[50px]">
          <div className="w-screen h-[2px] bg-[#e4e4e4] shadow-[0_2px_8px_rgba(0,0,0,0.05)] absolute left-1/2 -translate-x-1/2 top-0"></div>
          <p className="font-light text-sm italic uppercase w-[295px] text-center md:text-base md:w-full lg:text-lg mx-auto">
            При замовленні від 3000 грн – доставка до відділення безкоштовна.
            <br className="hidden md:block" /> Ми покриваємо витрати, бо хочемо,
            щоб ваш догляд починався з легкості
          </p>
          <div className="w-screen h-[2px] bg-[#e4e4e4] shadow-[0_-2px_8px_rgba(0,0,0,0.05)] absolute left-1/2 -translate-x-1/2 bottom-0"></div>
        </div>
        <h2 className="font-lato font-semibold text-2xl text-black text-center mb-[10px] md:text-[32px] lg:text-[42px]">
          Оплата
        </h2>
        <p className="font-light text-center text-black mb-6 lg:text-lg">
          Для вашої зручності ми пропонуємо кілька варіантів оплати
        </p>
        <ul className="flex flex-col gap-6 mb-9 md:w-[424px] md:mb-4 md:mx-auto lg:w-[856px] lg:mb-10">
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Оплата банківською карткою
            </p>
            <p className="font-light text-black text-sm mb-2 md:text-base md:mb-3 lg:text-lg lg:mb-4">
              Швидко та зручно — розраховуйтеся онлайн картками Visa або
              MasterCard безпосередньо під час оформлення замовлення. Це
              дозволяє зекономити час при отриманні посилки.
            </p>
            <div className="flex gap-6 mx-auto">
              <div className="w-[100px] h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-30 md:h-16 lg:w-[180px] lg:h-[92px]">
                <Icon
                  name="icon-visa"
                  className="w-15 h-6 md:w-20 md:h-8 lg:w-[140px] lg:h-13"
                />
              </div>
              <div className="w-[100px] h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-30 md:h-16 lg:w-[180px] lg:h-[92px]">
                <Icon
                  name="icon-mastercard"
                  className="w-15 h-[47px] md:w-[72px] md:h-[56px] lg:w-[100px] lg:h-[78px]"
                />
              </div>
            </div>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Google Pay / Apple Pay
            </p>
            <p className="font-light text-black text-sm mb-2 md:text-base md:mb-3 lg:text-lg lg:mb-4">
              Оплачуйте замовлення в один дотик за допомогою Google Pay або
              Apple Pay — без введення реквізитів картки. Сервіси забезпечують
              максимальну безпеку завдяки сучасним технологіям шифрування. Це
              швидко, зручно і надійно.
            </p>
            <div className="flex gap-6 mx-auto">
              <div className="w-[100px] h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-30 md:h-16 lg:w-[180px] lg:h-[92px]">
                <Icon
                  name="icon-google"
                  className="w-[18px] h-[18px] mr-1 md:w-[22px] md:h-[22px] md:mr-2 lg:w-7 lg:h-7 lg:mr-4"
                />
                <p className="font-lato text-black text-xs md:text-sm lg:text-lg">
                  Google Play
                </p>
              </div>
              <div className="w-[100px] h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-30 md:h-16 lg:w-[180px] lg:h-[92px]">
                <Icon
                  name="icon-apple"
                  className="w-[19px] h-[22px] mr-2 md:w-[20px] md:h-[24px] md:mr-3 lg:w-[24px] lg:h-[26px] lg:mr-4"
                />
                <p className="font-lato text-black text-xs md:text-sm lg:text-lg">
                  App Store
                </p>
              </div>
            </div>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Післяплата (накладений платіж)
            </p>
            <p className="font-light text-black text-sm mb-2 md:text-base md:mb-3 lg:text-lg lg:mb-4">
              оплачуйте замовлення при отриманні. НП додає +2% комісіі за
              переказ коштів. Це не наш збір. Це стандартна послуга перевізника.
              Ми за честність і прозорі умови.
            </p>
            <div className="w-[100px] h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-20 md:h-16 lg:w-[100px] lg:h-[92px] mx-auto">
              <Image
                src="/images/nova.png"
                alt="nova poshta"
                width={56}
                height={46}
                className="rounded-lg md:w-15 md:h-15 lg:w-[90px] lg:h-[90px]"
              />
            </div>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Оплата через LiqPay
            </p>
            <p className="font-light text-black text-sm mb-2 md:text-base md:mb-3 lg:text-lg lg:mb-4">
              Надійна система онлайн-платежів від ПриватБанку. Надає можливість
              оплатити карткою, через Приват24, Google Pay або Apple Pay — все в
              одному сервісі.
            </p>
            <div className="w-[100px] h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-30 md:h-16 lg:w-[180px] lg:h-[92px] mx-auto">
              <Image
                src="/images/liqpay.png"
                alt="liqpay"
                width={100}
                height={56}
                className="rounded-lg md:w-30 md:h-15 lg:w-[176px] lg:h-[90px]"
              />
            </div>
          </li>
          <li className="relative flex flex-col gap-2 md:gap-3">
            <Icon
              name="icon-dot"
              className="w-[6px] h-[6px] absolute top-3 left-3"
            />
            <p className="pl-7 font-lato text-black-10 md:text-lg lg:text-xl">
              Оплата при самовивозі
            </p>
            <p className="font-light text-black text-sm mb-2 md:text-base md:mb-3 lg:text-lg lg:mb-4">
              Можна розрахуватись готівкою або банківською карткою безпосередньо
              на місці при отриманні замовлення (зручно перевірити товар на
              місці та оплатити у зручний спосіб).
            </p>
            <div className="w-20 h-[56px] rounded-lg border border-[#e4e4e4] bg-white-30 flex justify-center items-center md:w-20 md:h-16 lg:w-[100px] lg:h-[92px] mx-auto">
              <Icon
                name="icon-card-pickup"
                className="w-14 h-14 md:w-16 md:h-16 lg:w-23 lg:h-23"
              />
            </div>
          </li>
        </ul>
      </div>
    </ProtectedPage>
  );
}

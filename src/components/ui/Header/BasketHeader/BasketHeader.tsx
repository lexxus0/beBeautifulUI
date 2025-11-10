'use client';

import Link from 'next/link'
import {useAppSelector } from '@/store/hooks';
import { ICartItem } from '@/types/types';
import BasketIcon from '@/components/elements/BasketIcon'


const BasketHeader = () => {
const { items } = useAppSelector((state) => state.cart);

const totalQuantity =
    items?.reduce(
      (sum: number, item: ICartItem) => sum + item.quantity,
      0
    ) ?? 0;

  return (
    <Link
    href="/basket"
    className="w-9 h-9 flex items-center justify-center relative"
  >
    <BasketIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]" />
    <div className="absolute top-[3px] -right-[2px] flex items-center justify-center bg-white-20 w-[14px] h-[14px] rounded-3xl border-1 border-black-10">
      <p className="font-lato text-[10px]">{totalQuantity}</p>
    </div>
  </Link>
  )
}

export default BasketHeader
import React from 'react'
import OrderItem from '../OrderItem/OrderItem'
import { IOrder } from '@/types/types';
import styles from './OrdersList.module.scss'

interface IOrdersListProps {
  orders: IOrder[];
  onOrderDetails: (id: string) => void;
}

const OrdersList = ({ orders, onOrderDetails }: IOrdersListProps) => {

  return (
    <div>
        <p className={styles.text}>
    Слідкуйте за статусом ваших замовлень у зручному форматі
  </p>
  <div className="flex flex-col gap-20">
      {orders.map((order) => (
        <OrderItem key={order._id} order={order} onDetailsClick={onOrderDetails}/>
      ))}
    </div>
  </div>
  )
}

export default OrdersList
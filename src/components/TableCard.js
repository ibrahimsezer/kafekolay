import React from 'react';

const TableCard = ({ tableNumber, orders = [] }) => {
  // Toplam fiyatı hesapla
  const totalPrice = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-bold text-gray-700 mb-3">Masa {tableNumber}</h3>
      
      {orders.length > 0 ? (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Siparişler</h4>
          <ul className="space-y-2">
            {orders.map((order, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{order.name} x {order.quantity}</span>
                <span>{order.price * order.quantity} TL</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-4">Henüz sipariş yok</p>
      )}
      
      <div className="border-t pt-2 flex justify-between">
        <span className="font-medium">Toplam:</span>
        <span className="font-bold text-orange-500">{totalPrice} TL</span>
      </div>
    </div>
  );
};

export default TableCard;
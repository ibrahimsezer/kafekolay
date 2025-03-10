import React, { useState } from 'react';
import Button from './Button';

const TableCard = ({ tableNumber, orders = [], onAddOrder, menuItems = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ menuItemId: '', quantity: 1 });
  const totalPrice = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.menuItemId) {
      const selectedMenuItem = menuItems.find(item => item.id === parseInt(newProduct.menuItemId));
      if (selectedMenuItem) {
        onAddOrder(tableNumber, {
          name: selectedMenuItem.name,
          price: selectedMenuItem.price,
          quantity: parseInt(newProduct.quantity)
        });
        setNewProduct({ menuItemId: '', quantity: 1 });
        setShowModal(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 relative transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Masa {tableNumber}</h3>
        <Button onClick={() => setShowModal(true)} className="text-sm px-3 py-1">
          + Ürün Ekle
        </Button>
      </div>
      
      {orders.length > 0 ? (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Siparişler</h4>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {orders.map((order, index) => (
              <li key={index} className="flex justify-between text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{order.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Adet: {order.quantity}</span>
                </div>
                <span className="font-medium text-orange-500">{order.price * order.quantity} TL</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 text-center py-4">Henüz sipariş yok</p>
      )}
      
      <div className="border-t dark:border-gray-700 pt-3 flex justify-between items-center">
        <span className="font-medium text-gray-600 dark:text-gray-400">Toplam:</span>
        <span className="font-bold text-orange-500">{totalPrice} TL</span>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
            <h4 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">Yeni Ürün Ekle - Masa {tableNumber}</h4>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Ürün Seçin</label>
                <select
                  value={newProduct.menuItemId}
                  onChange={(e) => setNewProduct({...newProduct, menuItemId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-200"
                  required
                >
                  <option value="">Ürün seçin</option>
                  {menuItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.price} TL
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Adet</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: Math.max(1, parseInt(e.target.value))})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-200"
                  required
                  min="1"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                >
                  İptal
                </Button>
                <Button type="submit">
                  Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCard;
import React, { useState } from 'react';
import Button from './Button';

const TableCard = ({ tableNumber, orders = [], onAddOrder, menuItems = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ menuItemId: '', quantity: 1 });
  const [editingOrder, setEditingOrder] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const totalPrice = (orders || [])
    .filter(order => order && order.name && order.price)
    .reduce((sum, order) => sum + (order.quantity ? order.price * order.quantity : 0), 0);

  const handleEditOrder = (orderIndex, order) => {
    setEditingOrder({ ...order, index: orderIndex });
    setShowEditModal(true);
  };

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    if (editingOrder && editingOrder.name && editingOrder.price) {
      const updatedOrders = orders.map((order, index) => {
        if (index === editingOrder.index) {
          return editingOrder.quantity > 0 ? {
            name: editingOrder.name,
            price: editingOrder.price,
            quantity: parseInt(editingOrder.quantity)
          } : null;
        }
        return order;
      }).filter(order => order !== null);

      onAddOrder(tableNumber, null, updatedOrders);
      setEditingOrder(null);
      setShowEditModal(false);
    }
  };

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
  const handlePayment = (e) => {
    e.preventDefault();
    onAddOrder(tableNumber, null, []);
    setShowPaymentModal(false);
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 sm:p-4 relative transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h3 className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-200">Masa {tableNumber}</h3>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button onClick={() => setShowModal(true)} className="text-xs sm:text-sm px-2 sm:px-3 py-1 flex-grow sm:flex-grow-0">
            + Ürün Ekle
          </Button>
          {orders.length > 0 && (
            <Button
              onClick={() => setShowPaymentModal(true)}
              className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-green-500 hover:bg-green-600 flex-grow sm:flex-grow-0"
            >
              Ödeme
            </Button>
          )}
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Siparişler</h4>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {orders.filter(order => order && order.name).map((order, index) => (
              <li key={index} className="flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{order.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Adet: {order.quantity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-orange-500">{order.price * order.quantity} TL</span>
                  <button
                    onClick={() => handleEditOrder(index, order)}
                    className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    ✏️
                  </button>
                </div>
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
                  onChange={(e) => setNewProduct({ ...newProduct, menuItemId: e.target.value })}
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
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: Math.max(1, parseInt(e.target.value)) })}
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

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
            <h4 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">Siparişi Düzenle</h4>
            <form onSubmit={handleUpdateOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Ürün</label>
                <input
                  type="text"
                  value={editingOrder?.name || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Adet</label>
                <input
                  type="number"
                  value={editingOrder?.quantity || 0}
                  onChange={(e) => setEditingOrder({ ...editingOrder, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-200"
                  min="0"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Silmek için 0 yapın</p>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  onClick={() => {
                    setEditingOrder(null);
                    setShowEditModal(false);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                >
                  İptal
                </Button>
                <Button type="submit">
                  Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
            <h4 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">Ödeme - Masa {tableNumber}</h4>
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">Toplam Tutar:</p>
                <p className="text-2xl font-bold text-orange-500">{totalPrice} TL</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Ödeme Yöntemi</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    <span className="text-2xl mb-2">💵</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nakit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    <span className="text-2xl mb-2">💳</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kart</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                >
                  İptal
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  Ödemeyi Tamamla
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
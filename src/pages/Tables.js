import React, { useState, useEffect } from 'react';
import TableCard from '../components/TableCard';
import Button from '../components/Button';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Cheeseburger', price: 150, category: 'Burgerler' },
    { id: 2, name: 'Pizza', price: 180, category: 'Pizza' },
    { id: 3, name: 'Salata', price: 80, category: 'Salatalar' },
    { id: 4, name: 'Cola', price: 20, category: 'İçecekler' },
    { id: 5, name: 'Su', price: 10, category: 'İçecekler' },
    { id: 6, name: 'Çay', price: 15, category: 'İçecekler' }
  ]);

  const [tables, setTables] = useState([
    {
      id: 1,
      number: 1,
      orders: [
        { name: 'Cheeseburger', price: 150, quantity: 2 },
        { name: 'Cola', price: 20, quantity: 2 }
      ]
    },
    {
      id: 2,
      number: 2,
      orders: [
        { name: 'Pizza', price: 180, quantity: 1 },
        { name: 'Salata', price: 80, quantity: 1 },
        { name: 'Su', price: 10, quantity: 2 }
      ]
    },
    {
      id: 3,
      number: 3,
      orders: []
    },
    {
      id: 4,
      number: 4,
      orders: [
        { name: 'Çay', price: 15, quantity: 4 }
      ]
    }
  ]);

  const [tableCount, setTableCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  // Update search handler to automatically expand categories with matching items
  useEffect(() => {
    if (searchTerm) {
      const matchingCategories = menuItems
        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(item => item.category);
      
      if (matchingCategories.length > 0) {
        setExpandedCategory(matchingCategories[0]);
      }
    } else {
      setExpandedCategory(null);
    }
  }, [searchTerm, menuItems]);

  const handleAddTable = () => {
    const newTable = {
      id: tables.length > 0 ? Math.max(...tables.map(table => table.id)) + 1 : 1,
      number: tableCount + 1,
      orders: []
    };

    setTables([...tables, newTable]);
    setTableCount(tableCount + 1);
  };

  const handleAddOrder = (tableNumber, newOrder, updatedOrders) => {
    if (updatedOrders) {
      setTables(tables.map(table => {
        if (table.number === tableNumber) {
          return {
            ...table,
            orders: updatedOrders
          };
        }
        return table;
      }));
    } else if (newOrder && newOrder.name && newOrder.price) {
      setTables(tables.map(table => {
        if (table.number === tableNumber) {
          return {
            ...table,
            orders: [...table.orders, newOrder]
          };
        }
        return table;
      }));
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Categories and Products */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Kategoriler ve Ürünler</h1>
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(cat => cat !== 'all').map(category => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
              <h2 
                className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 cursor-pointer flex justify-between items-center"
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              >
                {category}
                <span>{expandedCategory === category ? '▼' : '▶'}</span>
              </h2>
              {expandedCategory === category && (
                <div className="space-y-3">
                  {menuItems
                    .filter(item => item.category === category)
                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(item => (
                      <div
                        key={item.id}
                        className={`flex justify-between items-center p-3 ${searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 'bg-orange-50 dark:bg-orange-900' : 'bg-gray-50 dark:bg-gray-700'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer`}
                        onClick={() => selectedTable && handleAddOrder(selectedTable.number, { name: item.name, price: item.price, quantity: 1 })}
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                          <p className="text-orange-500 font-bold">{item.price} TL</p>
                        </div>
                        {selectedTable && (
                          <button className="p-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors">
                            +
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Tables */}
      <div className="w-1/3 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Masalar</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toplam {tables.length} masa | {tables.reduce((acc, table) => acc + table.orders.length, 0)} aktif sipariş
            </p>
          </div>
          <Button onClick={handleAddTable} className="flex items-center space-x-2 text-sm">
            <span>+</span>
            <span>Yeni Masa</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {tables.map(table => (
            <div
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedTable?.id === table.id
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : table.orders.length > 0
                  ? 'bg-red-100 dark:bg-red-900 hover:shadow-md'
                  : 'bg-green-100 dark:bg-green-900 hover:shadow-md'
              }`}
            >
              <h3 className={`font-bold ${
                selectedTable?.id === table.id
                  ? 'text-white'
                  : table.orders.length > 0
                  ? 'text-red-700 dark:text-red-200'
                  : 'text-green-700 dark:text-green-200'
              }`}>
                Masa {table.number}
              </h3>
              <p className={`text-sm ${
                selectedTable?.id === table.id
                  ? 'text-white/80'
                  : table.orders.length > 0
                  ? 'text-red-600 dark:text-red-300'
                  : 'text-green-600 dark:text-green-300'
              }`}>
                {table.orders.length} Sipariş
              </p>
            </div>
          ))}
        </div>

        {selectedTable && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg relative">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Masa {selectedTable.number} Detayı</h3>
            {selectedTable.orders.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pb-16">
                {selectedTable.orders.map((order, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{order.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Adet: {order.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-orange-500 font-bold">{order.price * order.quantity} TL</p>
                      <button
                        onClick={() => {
                          const updatedOrders = selectedTable.orders.map((o, i) =>
                            i === index ? { ...o, quantity: o.quantity + 1 } : o
                          );
                          handleAddOrder(selectedTable.number, null, updatedOrders);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-600"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          const updatedOrders = selectedTable.orders.map((o, i) =>
                            i === index ? { ...o, quantity: Math.max(0, o.quantity - 1) } : o
                          ).filter(o => o.quantity > 0);
                          handleAddOrder(selectedTable.number, null, updatedOrders);
                        }}
                        className="p-1 text-red-500 hover:text-red-600"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 text-center py-4">Henüz sipariş yok</p>
            )}
            <div className="absolute bottom-0 left-0 right-0 border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-b-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 dark:text-gray-400">Toplam:</span>
                <span className="font-bold text-orange-500">{selectedTable.orders.reduce((sum, order) => sum + order.price * order.quantity, 0)} TL</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;
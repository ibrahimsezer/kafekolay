import React, { useState } from 'react';
import TableCard from '../components/TableCard';
import Button from '../components/Button';

const Tables = () => {
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

  const handleAddTable = () => {
    const newTable = {
      id: tables.length > 0 ? Math.max(...tables.map(table => table.id)) + 1 : 1,
      number: tableCount + 1,
      orders: []
    };

    setTables([...tables, newTable]);
    setTableCount(tableCount + 1);
  };

  const handleAddOrder = (tableNumber, newOrder) => {
    if (!newOrder || !newOrder.name || !newOrder.price) return;
    setTables(tables.map(table => {
      if (table.number === tableNumber) {
        return {
          ...table,
          orders: [...table.orders, newOrder]
        };
      }
      return table;
    }));
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Masa Takibi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Toplam {tables.length} masa | {tables.reduce((acc, table) => acc + table.orders.length, 0)} aktif sipariş
          </p>
        </div>
        <Button onClick={handleAddTable} className="flex items-center space-x-2">
          <span>+</span>
          <span>Yeni Masa Ekle</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map(table => (
          <TableCard
            key={table.id}
            tableNumber={table.number}
            orders={table.orders}
            onAddOrder={handleAddOrder}
            menuItems={menuItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Tables;
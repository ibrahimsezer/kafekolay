import React, { useState } from 'react';
import TableCard from '../components/TableCard';
import Button from '../components/Button';

const Tables = () => {
  // Örnek masa verileri
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Masa Takibi</h1>
        <Button onClick={handleAddTable}>Yeni Masa Ekle</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tables.map(table => (
          <TableCard
            key={table.id}
            tableNumber={table.number}
            orders={table.orders}
          />
        ))}
      </div>
    </div>
  );
};

export default Tables;
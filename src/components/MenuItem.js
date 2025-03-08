import React from 'react';
import Button from './Button';

const MenuItem = ({ name, price, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <p className="text-orange-500 font-medium">{price} TL</p>
        </div>
        <div className="space-x-2">
          <Button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600">
            Düzenle
          </Button>
          <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">
            Sil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
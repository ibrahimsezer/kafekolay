import React, { useState } from 'react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { isDark } = useTheme();
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Cheeseburger', price: 150, category: 'Burgerler', image: 'https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/102cf51c-9220-4278-8b63-2b9611ad275e/Derivates/3831dbe2-352e-4409-a2e2-fc87d11cab0a.jpg', description: 'Özel peynirli burger', stock: 50},
    { id: 2, name: 'Pizza', price: 180, category: 'Pizza', image: 'https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg', description: 'Klasik Margherita pizza', stock: 30},
    { id: 3, name: 'Salata', price: 80, category: 'Salatalar', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad-1-580x803.jpg', description: 'Taze bahçe salatası', stock: 25 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '', category: '', image: '', description: '', stock: ''});
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Burgerler', 'Pizza', 'Salatalar', 'İçecekler', 'Tatlılar'];

  const handleAddItem = (e) => {
    e.preventDefault();

    if (newItem.name && newItem.price) {
      if (editingItem) {
        setMenuItems(menuItems.map(item =>
          item.id === editingItem.id ? { ...item, ...newItem, price: Number(newItem.price), stock: Number(newItem.stock) } : item
        ));
        setEditingItem(null);
      } else {
        const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
        setMenuItems([...menuItems, { id: newId, ...newItem, price: Number(newItem.price), stock: Number(newItem.stock) }]);
      }

      setNewItem({ name: '', price: '', category: '', image: '', description: '', stock: '' });
    }
  };

  const handleEditItem = (item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
      stock: item.stock
    });
    setEditingItem(item);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
      setNewItem({ name: '', price: '', category: '', image: '', description: '', stock: '' });
    }
  };

  const filteredItems = menuItems
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory);

  const getStockStatus = (stock) => {
    if (stock <= 10) return 'text-red-500';
    if (stock <= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      <h1 className={`text-2xl font-bold mb-6 animate-fade-in ${isDark ? 'text-white' : 'text-gray-800'}`}>Menü Yönetimi</h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`shadow-md rounded-md p-6 mb-8 hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          {editingItem ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h2>

        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group col-span-full md:col-span-1">
              <label 
                htmlFor="itemName" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-hover:text-orange-500 transition-colors duration-300"
              >
                Ürün Adı
              </label>
              <div className="relative">
                <input
                  id="itemName"
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  required
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    transition-all duration-300 hover:border-orange-300
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                  placeholder="Ürün adı giriniz..."
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                  🍽️
                </span>
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                Fiyat (TL)
              </label>
              <div className="relative">
                <input
                  id="itemPrice"
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    transition-all duration-300 hover:border-orange-300
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="0.00"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                  💰
                </span>
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="itemStock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                Stok
              </label>
              <div className="relative">
                <input
                  id="itemStock"
                  type="number"
                  value={newItem.stock}
                  onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                  required
                  min="0"
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    transition-all duration-300 hover:border-orange-300
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Stok miktarı"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                  📦
                </span>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Kategori
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 dark:text-gray-300">
                {categories.map(category => (
                  <motion.div
                    key={category}
                    onClick={() => setNewItem({ ...newItem, category })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      cursor-pointer rounded-xl p-4 transition-all duration-300
                      ${newItem.category === category 
                        ? 'bg-orange-500 dark:bg-orange-600 text-white shadow-lg transform -translate-y-1' 
                        : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className={`text-2xl ${newItem.category === category ? 'text-white' : 'text-orange-500'}`}>
                        {category === 'Burgerler' && '🍔'}
                        {category === 'Pizza' && '🍕'}
                        {category === 'Salatalar' && '🥗'}
                        {category === 'İçecekler' && '🥤'}
                        {category === 'Tatlılar' && '🍰'}
                      </span>
                      <span className="text-center font-medium text-sm">{category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="itemImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                Görsel URL
              </label>
              <div className="relative">
                <input
                  id="itemImage"
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    transition-all duration-300 hover:border-orange-300
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Görsel URL girin"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                  🖼️
                </span>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                Açıklama
              </label>
              <textarea
                id="itemDescription"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full px-3 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                  transition-all duration-300 hover:border-orange-300
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows="3"
                placeholder="Ürün açıklaması girin"
              />
            </div>
          </div>

          <div className="flex justify-end">
            {editingItem && (
              <Button
                type="button"
                className="mr-2 bg-gray-500 hover:bg-gray-600"
                onClick={() => {
                  setEditingItem(null);
                  setNewItem({ name: '', price: '', category: '', image: '', description: '', stock: '' });
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`shadow-md rounded-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className={`text-xl font-medium mb-4 md:mb-0 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Menü Listesi</h2>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence>
          {filteredItems.length > 0 ? (
            <motion.div className="space-y-3">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                        onError={(e) => e.target.src = 'placeholder.jpg'}
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>{item.name}</h3>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.category}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>{item.price} TL</p>
                      <p className={`text-sm ${getStockStatus(item.stock)}`}>
                        Stok: {item.stock}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-300"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-300"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-500">Ürün bulunamadı.</p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
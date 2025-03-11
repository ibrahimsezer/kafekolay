import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { isDark } = useTheme();
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);

  const dateRanges = [
    { value: 'week', label: 'Bu Hafta' },
    { value: 'month', label: 'Bu Ay' },
    { value: 'quarter', label: 'Bu Mevsim' },
    { value: 'year', label: 'Bu Yıl' }
  ];

  // Sample data for the line chart
  const monthlyData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu'],
    datasets: [
      {
        label: 'Günlük Kazanç',
        data: [3000, 3500, 4000, 3800, 4200, 4800, 5000, 5200],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Hedef',
        data: [3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#E5E7EB' : '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#E5E7EB' : '#374151',
        bodyColor: isDark ? '#E5E7EB' : '#374151',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} TL`;
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#E5E7EB' : '#374151',
          callback: function(value) {
            return value + ' TL';
          }
        }
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#E5E7EB' : '#374151'
        }
      }
    }
  };

  const handleDateRangeChange = (range) => {
    setIsLoading(true);
    setDateRange(range);
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      {/* Date Range Filter */}
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Analiz Tabloları
        </h1>
        <div className="flex space-x-2">
          {dateRanges.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleDateRangeChange(value)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${dateRange === value
                ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Siparişler Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Siparişler</p>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={isLoading ? 'loading' : '200'}
                >
                  {isLoading ? '...' : '200'}
                </motion.span>
              </h3>
              <div className="flex items-center space-x-1">
                <span className="text-green-500 text-sm">+2.5%</span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>geçen döneme kıyasla</span>
              </div>
            </div>
            <div className="text-green-500 text-2xl transform transition-transform hover:scale-110 cursor-help">📈</div>
          </div>
        </motion.div>

        {/* Paket Siparişler Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Paket Siparişler</p>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={isLoading ? 'loading' : '655'}
                >
                  {isLoading ? '...' : '655'}
                </motion.span>
              </h3>
              <div className="flex items-center space-x-1">
                <span className="text-red-500 text-sm">-4.5%</span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>geçen döneme kıyasla</span>
              </div>
            </div>
            <div className="text-red-500 text-2xl transform transition-transform hover:scale-110 cursor-help">📉</div>
          </div>
        </motion.div>

        {/* Yeni Sipariş Sayısı Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Yeni Sipariş Sayısı</p>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={isLoading ? 'loading' : '375'}
                >
                  {isLoading ? '...' : '375'}
                </motion.span>
              </h3>
              <div className="flex items-center space-x-1">
                <span className="text-green-500 text-sm">+6.5%</span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>geçen döneme kıyasla</span>
              </div>
            </div>
            <div className="text-green-500 text-2xl transform transition-transform hover:scale-110 cursor-help">📊</div>
          </div>
        </motion.div>
      </div>

      {/* Aylık Kazanç Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg mb-8 transform transition-all duration-200 hover:shadow-xl`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Aylık Kazanç</h3>
        <div className="h-[300px] relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <Line data={monthlyData} options={chartOptions} />
          )}
        </div>
      </motion.div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Müşteriler */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Müşteriler</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-opacity-10 bg-green-500">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Aktif Müşteriler</p>
              <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={isLoading ? 'loading' : '75,320'}
                >
                  {isLoading ? '...' : '75,320'}
                </motion.span>
              </h4>
              <div className="flex items-center mt-1">
                <span className="text-green-500 text-sm">+12%</span>
                <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-opacity-10 bg-blue-500">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Müşteri Tutma Oranı</p>
              <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={isLoading ? 'loading' : '85%'}
                >
                  {isLoading ? '...' : '85%'}
                </motion.span>
              </h4>
              <div className="flex items-center mt-1">
                <span className="text-blue-500 text-sm">+5%</span>
                <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Premium Müşteriler</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>35%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Düzenli Müşteriler</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>45%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Yeni Müşteriler</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>20%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Aylık Kazanç Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Aylık Kazanç</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total:</span>
              <span className={`text-xl font-bold text-green-500`}>42,800 TL</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-opacity-10 bg-orange-500">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>En Yoğun Saat</p>
              <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12:00-14:00</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Daily Peak</p>
            </div>
            <div className="p-4 rounded-lg bg-opacity-10 bg-purple-500">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ortalama Sipariş</p>
              <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>185 TL</h4>
              <div className="flex items-center mt-1">
                <span className="text-green-500 text-sm">+8%</span>
                <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <Line data={monthlyData} options={chartOptions} />
            )}
          </div>

          <div className="mt-6">
            <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>En Çok Satan Ürünler</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pizza</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>2,450 TL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Burger</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1,850 TL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cola</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1,250 TL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </motion.div>
    );
}
export default Analytics;
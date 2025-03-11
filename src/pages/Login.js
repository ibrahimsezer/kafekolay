import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Button from '../components/Button';
import logo from '../logo16_9.png';
import bgImage from '../main_bg_logo.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email veya şifre hatalı');
          break;
        case 'auth/invalid-email':
          setError('Geçersiz email adresi');
          break;
        default:
          setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})`, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-md p-8 relative z-10">
        <img src={logo} alt="KafeKolay Logo" className="w-160 h-90" />
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Giriş Yap
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="ornek@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
          </div>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Hesabın yok mu?{' '}
          <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
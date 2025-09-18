import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaUser, FaLock, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { iconClass } from '../../assets/dummydata';
import { Link } from 'react-router-dom';

const Login = ({ onLoginSuccess, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
 

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.rememberMe
      ? localStorage.setItem('loginData', JSON.stringify(formData))
      : localStorage.removeItem('loginData');

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    onLoginSuccess();
  };

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Base input class for styling
  const inputBase =
    'w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400';

  return (
    <div className="space-y-6 relative">
      {/* Toast notification */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
          showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        <div className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm">
          <FaCheckCircle className="flex-shrink-0" />
          <span>Login Successful</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div className="relative">
          <FaUser className={iconClass} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className={iconClass} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe" className="text-sm">
            Remember me
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-400"
        >
          Sign In
        </button>
      </form>
       <div className=' text-center'>
        <Link to='/signup' onclick={onClose} className=' inline-flex items-center gap-2
       text-amber-400 hover:text-amber-600 transition-colors'>
        <FaUserPlus/> Create New Account
        
        
        </Link>


       </div>
    </div>
  );
};

export default Login;

'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', darkMode);
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [mounted, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className='rounded-md bg-gray-800 px-4 py-2 text-white'
    >
      {darkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

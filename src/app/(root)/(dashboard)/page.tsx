"use client";
import React, { useState, useEffect } from 'react';
import Client from './_components/Client';
import Freelancer from './_components/Freelancer';

const LandingPage: React.FC = () => {
  const [isFreelancer, setIsFreelancer] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('isFreelancer');
    return storedValue === 'true';
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isFreelancer') {
        setIsFreelancer(event.newValue === 'true'); 
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('isFreelancer', String(isFreelancer));
  }, [isFreelancer]);

  return (
    <>
      {isFreelancer ? <Freelancer /> : <Client />}
    </>
  );
};

export default LandingPage;

'use client';

import { setUserLogin } from '@/app/redux/slices/user.slice';
import { TUserLogin } from '@/app/types/typeUser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const LoadUserFromStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('userLogin');
      if (user) {
        dispatch(setUserLogin(JSON.parse(user) as TUserLogin));
      }
    }
  }, [dispatch]);

  return null;
};

export default LoadUserFromStorage;

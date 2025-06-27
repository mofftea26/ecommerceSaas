import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

export function useAuthProtected() {
  const { isSignedIn } = useAuthContext();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn]);
}

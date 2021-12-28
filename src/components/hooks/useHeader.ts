import { useEffect } from 'react';

export default function useHeader() {
  useEffect(() => {
    console.log('useHeader');
  }, []);

  return {};
}

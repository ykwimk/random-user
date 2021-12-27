import { getRandomUsers } from './../../api/index';
import { useEffect } from 'react';

export default function useHeader() {
  useEffect(() => {
    getRandomUsers()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return {};
}

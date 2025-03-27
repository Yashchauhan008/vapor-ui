import { useState } from 'react';

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return {
    value,
    update: () => setValue(value => value + 1)
  };
};

export default useForceUpdate;

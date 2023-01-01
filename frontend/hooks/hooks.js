import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const applicationContext = createContext();
export default function useApplication() {
  return useContext(applicationContext);
}

export function ApplicationHook(props) {
  const [progress, setProgress] = useState(0);
  const value = { progress, setProgress };

  return <applicationContext.Provider value={value} {...props} />;
}

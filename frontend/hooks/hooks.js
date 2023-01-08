import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const applicationContext = createContext();
export default function useApplication() {
  return useContext(applicationContext);
}

export function ApplicationHook(props) {
  const [progress, setProgress] = useState(0);
  const [userAuth, setUserAuth] = useState({});
  const [recruiterAuth, setRecruiterAuth] = useState({});
  const value = {
    progress,
    setProgress,
    recruiterAuth,
    setRecruiterAuth,
    userAuth,
    setUserAuth,
  };

  return <applicationContext.Provider value={value} {...props} />;
}

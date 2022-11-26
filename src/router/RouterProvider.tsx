import { FC, ReactNode, useEffect } from 'react';
import { rEvents } from './events';

interface RouterProps {
  children: ReactNode;
}

export const RouterProvider: FC<RouterProps> = ({ children }) => {
  useEffect(() => {
    const back = () => rEvents.goBack();
    window.addEventListener('popstate', back);
    return () => window.removeEventListener('popstate', back);
  }, []);

  return <>{children}</>;
};

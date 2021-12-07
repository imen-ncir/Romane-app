import React, {createContext, useContext, useState} from 'react';
import {ModalLoader} from '../components/ui/loaders';

interface ContextProps {
  isLoading: boolean;
  setLoading: any;
}

const contextInitState = {
  isLoading: false,
  setLoading: null,
};

export const AppContext = createContext<ContextProps>(contextInitState);
export const useAppContext = () => {
  return useContext(AppContext);
};
export const AppContextProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setloadingMessage] = useState<string | undefined>(
    undefined,
  );

  const setLoading = (value: boolean, message?: string) => {
    setIsLoading(value);
    if (value === true && !!message) {
      setloadingMessage(message);
    } else {
      setloadingMessage(undefined);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading: isLoading,
        setLoading: setLoading,
      }}>
      {children}
      {isLoading && <ModalLoader message={loadingMessage} />}
    </AppContext.Provider>
  );
};

import { MatrixClient } from 'matrix-js-sdk';
import React, { PropsWithChildren, useState, createContext } from 'react';

export interface MatrixContextModel {
  instance: null | MatrixClient;
  setInstance: (instance: MatrixClient | null) => void;
}

export const MatrixContext = createContext<MatrixContextModel>({
  instance: null,
  setInstance: () => {},
});

export const MatrixContextProvider = (props: PropsWithChildren) => {
  const setInstance = (instance: MatrixClient | null) => {
    setState({ ...state, instance: instance });
  };

  const initState = {
    instance: null,
    setInstance: setInstance,
  };

  const [state, setState] = useState<MatrixContextModel>(initState);

  return (
    <MatrixContext.Provider value={state}>
      {props.children}
    </MatrixContext.Provider>
  );
};

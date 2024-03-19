import React , { createContext , useContext , useState } from "react";

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [studName , setStudName] = useState('')
  
    return (
      <DemoContext.Provider value={{ name, setName , studName , setStudName }}>
        {children}
      </DemoContext.Provider>
    );
  };
  
  export const useDemoContext = () => useContext(DemoContext);
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";

interface LoggerContextProps {
  logs: string[];
  setLogs: (logs: string[]) => void;
  addLog: (log: string) => void;
}

const LoggerContext = createContext<LoggerContextProps>({
  logs: [],
  addLog: () => null,
  setLogs: () => null,
});

const useLogger = () => useContext(LoggerContext);

const LoggerProvider: React.FC = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (text: string) => {
    setLogs((prevLogs) => [...prevLogs, text]);
  };

  const value = {
    logs,
    setLogs,
    addLog,
  };

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
};

export { useLogger, LoggerContext, LoggerProvider };

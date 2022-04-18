import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLogger } from "./LoggerContext";

export interface SocketContextProps {
  socket?: Socket;
}

const SocketContext = createContext<SocketContextProps>({});

const SocketProvider: React.FC = ({ children }) => {
  const { addLog } = useLogger();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const initSocket = () => {
      const client = io(window.location.origin, {
        path: "/api/socketio",
      });

      client.once("connect", () => {
        // runs twice because of the react strict mode - only dev
        addLog("WS connection has established!");
      });

      setSocket(client);
    };

    if (!socket) {
      initSocket();
    }
  }, []);

  useEffect(() => {
    console.log("dsadas");
  }, []);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketContext, useSocket, SocketProvider };

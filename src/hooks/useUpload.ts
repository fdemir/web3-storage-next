import { useEffect, useState } from "react";
import { useLogger } from "~/context/LoggerContext";
import { useSocket } from "~/context/SocketContext";
import request from "~/providers/request";

interface useUploadParams {
  onSuccess?: (data?: any) => void;
}

type Statusses = "loading" | "error" | "idle";

function useUpload({ onSuccess }: useUploadParams = {}) {
  const { addLog } = useLogger();
  const { socket } = useSocket();
  const [status, setStatus] = useState<Statusses>("idle");

  useEffect(() => {
    if (!socket) return;
    addLog("Upload a file and spread your file to the swarm!");
    socket.on("storage-event", addLog);
  }, [socket]);

  const generatePayload = (files: FileList) => {
    const data = new FormData();

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      data.append("payload", file);
    }

    return data;
  };

  const uploadFiles = async (files?: FileList) => {
    if (!files) {
      alert("Files could not found.");
      return false;
    }

    if (!socket?.id) {
      alert("WS connection has not established.");
      return false;
    }

    setStatus("loading");
    try {
      const payload = generatePayload(files);

      const response = await request.post("/api/upload", payload, {
        headers: {
          "Conent-Type": "multipart/form-data",
          // This unique socket id used to emit the events from api route to the current user
          "socket-id": socket?.id,
        },
      });

      if (onSuccess) onSuccess(response);
    } catch (error) {
      alert("An error occured. Look up logs.");
      console.log(error);
      setStatus("error");
      return;
    }
    setStatus("idle");
  };

  return {
    uploadFiles,
    isLoading: status === "loading",
  };
}

export { useUpload };

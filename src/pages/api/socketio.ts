import { NextApiRequest, PageConfig } from "next";
import { NextApiResponseServerIO } from "~/types";
import { Server as HttpServer } from "http";
import { Server as ServerIO } from "socket.io";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

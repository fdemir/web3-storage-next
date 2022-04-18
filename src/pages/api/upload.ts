import type { NextApiRequest, PageConfig } from "next";
import fs from "fs";
import formidable, { File as FormidableFile } from "formidable";
import { File } from "web3.storage";
import { makeStorageClient } from "~/providers/storage";
import { NextApiResponseServerIO } from "~/types";

const generateStorageFile = (file: FormidableFile) => {
  const fileContent = fs.readFileSync(file.filepath);
  const buffer = Buffer.from(fileContent);

  return new File([buffer], file.newFilename);
};

const makeFileList = (payload: FormidableFile[]) => {
  if (Array.isArray(payload)) {
    return payload.map(generateStorageFile);
  }

  return [generateStorageFile(payload)];
};

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const socketId = req.headers["socket-id"] as string;

  const showMessage = (text: string) =>
    res.socket.server.io.to(socketId).emit("storage-event", text);

  const form = formidable({ multiples: true, maxFiles: 5 });

  form.parse(req, async (err, _, files) => {
    const fileList = files.payload;

    if (err || !fileList) {
      return res.status(400).json({
        message: "Error parsing form.",
        error: String(err),
      });
    }

    showMessage("> making file list to ship the Web3Storage");
    const storeFiles = makeFileList(fileList as FormidableFile[]);

    showMessage("> creating web3.storage client");
    const client = makeStorageClient();

    showMessage("> chunking and hashing the files to calculate the Content ID");
    const cid = await client.put(storeFiles, {
      onRootCidReady: (localCid) => {
        showMessage(`> locally calculated Content ID: ${localCid} `);
        showMessage("> sending files to web3.storage... ");
      },
      onStoredChunk: (bytes) =>
        showMessage(`> ${bytes.toLocaleString()} bytes to web3.storage`),
    });

    showMessage(`> web3.storage now hosting ${cid}`);
    showMessage(`> https://dweb.link/ipfs/${cid}`);

    res.json({
      message: "Uploaded successfully!",
    });
  });
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

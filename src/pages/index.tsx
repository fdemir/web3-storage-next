import { NextPage } from "next";
import { useLogger } from "~/context/LoggerContext";
import { FormEvent, useState } from "react";
import Button from "~/components/lib/Button";
import LogBox from "~/components/shared/LogBox";
import Uploader from "~/components/shared/Uploader";
import { useUpload } from "~/hooks/useUpload";
import LeafCorner from "~/components/shared/LeafCorner";

const Home: NextPage = () => {
  const [files, setFiles] = useState<FileList>();
  const { logs } = useLogger();
  const { uploadFiles } = useUpload();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    uploadFiles(files);
  };

  return (
    <div className="mx-10 md:mx-auto md:w-[800px] text-neutral-900 py-24 flex flex-col gap-10">
      <div className="relative">
        <form
          className="shadow-md p-6 z-10 w-full bg-white rounded-xl mb-5"
          onSubmit={handleSubmit}
        >
          <LeafCorner />
          <span className="text-xl block font-semibold wmb-3">
            Upload something!
          </span>
          <p className="text-neutral-600">
            This is an example application to demonstrate the usage of the
            web3.storage with Next.js. All data stored is accessible on the
            public IPFS network via a content ID.
          </p>
          <div className="my-6">
            <Uploader onUpload={setFiles} />
          </div>
          <Button type="submit">Upload</Button>
        </form>

        <LogBox list={logs} />
      </div>
    </div>
  );
};

export default Home;

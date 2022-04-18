import { PlusIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

interface UploaderProps {
  onUpload: (files: FileList) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onUpload }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const recentFiles = event.target.files as FileList;

    setFiles(recentFiles);
    onUpload(recentFiles);
  };

  return (
    <div
      className="max-w-sm rounded-xl flex items-center space-x-4 cursor-pointer"
      onClick={() => fileInput.current?.click()}
    >
      <div className="shrink-0">
        <PlusIcon className="h-8 w-8 text-emerald-700" />
      </div>
      <div>
        <div className="text-xl font-medium text-black">Upload File</div>
        <p className="text-slate-500">
          {files && files?.length > 0
            ? `${files?.length} files selected`
            : `No file chosen.`}
        </p>
      </div>

      <input type="file" hidden ref={fileInput} onChange={onChange} multiple />
    </div>
  );
};

Uploader.defaultProps = {
  onUpload: () => {},
};

export default Uploader;

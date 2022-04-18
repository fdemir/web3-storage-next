import { useEffect, useRef } from "react";

interface LogBoxProps {
  list?: string[];
}

const LogBox: React.FC<LogBoxProps> = ({ list }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list?.length) {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }
  }, [list]);

  return (
    <div className="shadow-md p-5 rounded-xl bg-white">
      <div
        className="bg-black w-full h-[400px] rounded-xl overflow-y-scroll p-4"
        ref={terminalRef}
      >
        {list &&
          list.length &&
          list.map((item, index) => (
            <div key={index} className="flex items-center py-1">
              <div className="flex-1">
                <span className="text-emerald-300">{item}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LogBox;

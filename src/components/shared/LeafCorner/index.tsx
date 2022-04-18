import Leaf from "~/images/leaf.png";
import Image from "next/image";

const LeafCorner: React.FC = () => {
  return (
    <div className="absolute -top-20 -right-12 z-1">
      <Image src={Leaf} width={128} height={128} alt="Leaf" quality={100} />
    </div>
  );
};

export default LeafCorner;

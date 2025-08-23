import { PropagateLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <PropagateLoader color="#F7931E" />
    </div>
  );
}

export default Loader;

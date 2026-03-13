import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const BasicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BasicLayout;

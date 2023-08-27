import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex flex-row h-100vh w-screen">
        <div className="flex-1">
          <Navbar />
          <div className="p-4">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;

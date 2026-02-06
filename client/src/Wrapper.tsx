import { Outlet } from "react-router-dom";
import { Navbar1 } from "@/components/common/Navbar";

const Wrapper = () => {
  return (
    <div className="w-full">
      <Navbar1 />
      <Outlet />
    </div>
  )
}

export default Wrapper

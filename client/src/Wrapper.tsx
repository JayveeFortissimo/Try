import { Outlet } from "react-router-dom";
import Footer from "@/components/common/Footer";
import { Navbar1 } from "@/components/common/Navbar";

const Wrapper = () => {
  return (
    <div className="w-full">
      <Navbar1 />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Wrapper

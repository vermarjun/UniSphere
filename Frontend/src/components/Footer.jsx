import { BiBell } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="w-full fixed bottom-0 bg-neutral-900 text-white py-2 px-4 flex justify-between items-center z-50 shadow-lg">
      <IconContext.Provider value={{ size: "28px" }}>
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer p-2 hover:text-green-400 transition"
        >
          <IoHomeOutline />
        </div>

        <div
          onClick={() => navigate("/events")}
          className="cursor-pointer p-2 hover:text-green-400 transition"
        >
          <MdEvent />
        </div>

        <div
          onClick={() => navigate("/events")}
          className="cursor-pointer p-2 hover:text-green-400 transition"
        >
          <CiCirclePlus />
        </div>

        <div
          onClick={() => navigate("/shop")}
          className="cursor-pointer p-2 hover:text-green-400 transition"
        >
          <FaShoppingCart />
        </div>

        <div className="cursor-pointer p-2 hover:text-green-400 transition">
          <BiBell />
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer p-2 hover:text-green-400 transition"
        >
          <CgProfile />
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default Footer;

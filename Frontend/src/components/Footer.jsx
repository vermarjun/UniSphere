import { BiBell } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
function Footer(){
    return (
        <div className="flex justify-around items-center p-2">
            <div>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <IoHomeOutline />
                </IconContext.Provider>
            </div>
            <div>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <MdEvent />
                </IconContext.Provider>
            </div>
            <div>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <FaShoppingCart/>
                </IconContext.Provider>
            </div>
            <div>
                <IconContext.Provider value={{color:'white', size:'30px'}}>
                    <BiBell/>
                </IconContext.Provider>
            </div>
        </div>
    )
}
export default Footer
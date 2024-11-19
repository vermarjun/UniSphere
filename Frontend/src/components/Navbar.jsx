import leaderBoard from "/leaderboard.png"
import fire from "/fire.png"
import { useNavigate } from "react-router-dom"
function Navbar(){
    const navigate = useNavigate();
    return (
        <div className="w-full h-full flex justify-around items-center">
            <div>
                <input type="text" placeholder="Search" className="px-3 p-2 w-5/6 rounded-full bg-neutral-900" />
            </div>
            <div onClick={()=>navigate("/trending")}>
                <img src={fire} alt="" className="h-9"/>
            </div>
            <div onClick={()=>navigate("/leaderboard")}>
                <img src={leaderBoard} alt="" className="h-9"/>
            </div>
        </div>
    )
}
export default Navbar
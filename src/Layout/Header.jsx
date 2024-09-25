import { FaUserLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate=useNavigate();
  const handleSelectClick=(e)=>{
   const { value } =e.target;
if (value==='DetectAI') {
  navigate("/DetectAi")
}
else if (value==='VideoModeration') {
  navigate("/VideoModeration")
}
   else{
    navigate("/")
   }
  }
  return (
    <div className="container">
      <nav className="flex">
        <div className="options">
          <select className="cursor-pointer" onClick={handleSelectClick}>
            <option  selected disabled hidden>
              Menu
            </option>
            <option value="DetectAI">Detect AI</option>
            <option value="VideoModeration"> Deepfake Image/ Video</option>
          </select>
        </div>

        <div className="nav-2--section flex">
          <span className="icon cursor-pointer">
          <FaUserLock />
          </span>
          <button onClick={()=>navigate("/signin")}>Signin/Signup</button>
        </div>
      </nav>
    </div>
  );
};

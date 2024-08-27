import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../states/userStore";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  //console.log(currentUser);

  const handleLogout = async (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    currentUser && (await logout(currentUser.user));
    navigate("/login");
    console.log("logout......");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="text-3xl ">B13_Hotels</span>
        </Link>

        {currentUser ? (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-[150px] h-10 border border-jaune-moutarde rounded-3xl flex  items-center justify-evenly">
              {currentUser.user.username}
              <IoLogOutOutline
                className="size-8 text-red-500 cursor-pointer font-bold"
                onClick={handleLogout}
              />              
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mr-2">
            <Link to={"/login"}>
              <Button className=" ">Login</Button>
            </Link>
            <Link to={"/register"}>
              <Button className="">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

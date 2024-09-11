import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../states/userStore";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar() {
  const { currentUser, logout, error ,status} = useAuth();
  const navigate = useNavigate();
  //console.log(currentUser);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout(currentUser!.user).then(()=>(
      navigate('/login'),
      status == true && console.log('logout avec succes'),
      error && console.log(error)
    ))
    
      error && console.log(error);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="text-3xl text-[#d8e5f7] font-semibold">B13_Hotels</span>
        </Link>

        {currentUser ? (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-[150px] h-10 border-2 border-gray-400 rounded-2xl flex  items-center justify-between">
              <span className="ml-3">{currentUser.user.username}</span>
              <Button
                onClick={handleLogout}
                variant={"destructive"}
                className="rounded-lg  boder p-1 h-8 mr-2 flex justify-center items-center border-red-400"
              >
                <IoLogOutOutline className="size-7  cursor-pointer font-bold  " />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mr-2">
            <Link to={"/login"}>
              <Button className=" ">Se connecter</Button>
            </Link>
            <Link to={"/register"}>
              <Button className="">s'inscrire</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

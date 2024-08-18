import { Link } from "react-router-dom";
import { useAuth } from "../states/userStore";
import { Button } from "@/components/ui/button";

function Navbar() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span>B13_Hotels</span>
        </Link>

        {currentUser ? (
          <span className="text-xl text-white bg-jaune-moutarde px-3 py-2 rounded-xl">
            {currentUser.user.username}
          </span>
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

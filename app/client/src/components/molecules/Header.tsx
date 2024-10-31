import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="text-white text-l font-bold text-shadow p-4 flex justify-between uppercase">
      <div className="flex flex-row gap-8">
        <Link
          to="/"
          className="flex flex-row gap-2 items-center hover:scale-110 transition ease-in-out delay-75"
        >
          Dashboard
        </Link>
        <Link
          to="/myfiles"
          className="flex flex-row gap-2 items-center hover:scale-110 transition ease-in-out delay-75"
        >
          My files
        </Link>
      </div>
      <p className="hover:scale-125 transition ease-in-out delay-100 cursor-pointer text-xl">
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="pt-1" />
      </p>
    </div>
  );
};

export default Header;

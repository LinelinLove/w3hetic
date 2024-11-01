import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="text-white text-l font-bold text-shadow p-4 flex justify-between uppercase">
      <nav className="w-full">
        <ol className="flex justify-between w-full">
          <li className="flex flex-row gap-8">
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
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              <FontAwesomeIcon
                className="hover:scale-125 transition ease-in-out delay-100 cursor-pointer text-xl"
                icon={faArrowRightFromBracket}
              />
            </Link>
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default Header;

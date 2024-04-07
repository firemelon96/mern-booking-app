import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">Hotel Booking</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="item-center flex items-center px-3 font-bold text-white hover:bg-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="item-center flex items-center px-3 font-bold text-white hover:bg-blue-600"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;

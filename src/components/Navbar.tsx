import { RootState } from "../redux/app/Store";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

import { removeFromCart } from "../redux/features/CartSlice";
import { logout } from "../redux/features/AuthSlice";

const Navbar = () => {
  const cartProducts = useAppSelector((state: RootState) => state.cart);
  const allCartItems = useAppSelector((state: RootState) => state.cart.items);
  const user = useAppSelector((state: RootState) => state.auth.userDetails);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeItem = (itemdID: number) => {
    dispatch(removeFromCart(itemdID));
  };

  const cartItems = allCartItems.map((item) => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <img
          className="w-16 h-16 object-fit mr-4"
          src={item.image}
          alt={`${item.title} image`}
        />
        <div className="flex-grow">
          <h3 className="text-gray-800 font-semibold ">{item.title}</h3>
          <p className="text-gray-500">${item.price}</p>
        </div>
        <MdOutlineDeleteForever
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 focus:outline-none text-3xl cursor-pointer"
        />
      </div>
    </>
  ));

  return (
    <>
      <div className="navbar bg-[#312e81] text-white fixed top-0 ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm bg-[#3730a3] dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Categories</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 ">
          <a className="btn btn-ghost normal-case text-xl">Product Store</a>
        </div>

        <div className="navbar-start hidden  lg:flex ">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Categories</summary>
                <ul className="p-2 shadow-md">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-red-500 text-white font-bold">
                  {cartProducts.items.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card dropdown-content bg-white text-[#3730a3] rounded-md shadow-lg "
            >
              <div className="w-[500px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-scroll max-h-[600px]">
                <h2 className="px-4 py-2  text-blue-700 font-semibold text-center">
                  Your Shopping Cart
                </h2>
                <div className="divide-y divide-gray-300">{cartItems}</div>
              </div>
              <div className="justify-center text-center align-middle p-5">
                <Link to="/cart">
                  <button className="p-4 bg-indigo-600 text-white">
                    View Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://www.boredpanda.com/blog/wp-content/uploads/2016/09/animals-dressed-like-humans-zoo-porraits-yago-partal-83-57d65d8ba9237__880.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge bg-[#3730a3]">{user?.firstname}</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    dispatch(logout());
                    navigate("/welcome");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

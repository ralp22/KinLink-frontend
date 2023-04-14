import React, { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import UseDarkMode from "../hooks/UseDarkMode";
import {BsFillLightningFill, BsFillHouseHeartFill, BsFillHouseFill} from 'react-icons/bs'
import {
  FaFire,
  FaSpinner,
  FaAdjust,
  FaLink,
  FaHeart,
  FaUserCircle,
  FaAccessibleIcon,
  FaTimes
} from "react-icons/fa";

const Nav = () => {

  let { logout, ToRegister, ToLogin, ToHome } = useContext(AuthContext);

  const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = UseDarkMode()
    const handleMode = () => setDarkTheme(!darkTheme)
    return (
        <span onClick={handleMode}>
            <FaAdjust size="40"/>
        </span>
    )
  }

  const LogOutIcon = () => {
    return (
        <span onClick={logout}>
            <FaTimes size="40"/>
        </span>
    )
  }
  const UserIcon = () => {
    return (
        <span onClick={ToLogin}>
            <FaUserCircle size="40"/>
        </span>
    )
    
  }
  const RegisterIcon = () => {
    return (
        <span onClick={ToRegister}>
            <FaLink size="40"/>
        </span>
    )
  }
  
  const HomeIcon = () => {
    return (
        <span onClick={ToHome}>
            <BsFillHouseHeartFill size="40"/>
        </span>
    )
  }  

 
  return (
    <div>
      <div className="nav-bar flex flex-col fixed top-0 h-screen w-24 bg-gray-300 shadow-2xl shadow-green-950 text-lime-600 dark:bg-black dark:bg-opacity-80">
        <NavBarIcon 
            icon={<ThemeIcon/>}
            text={"Toggle Dark Mode"}/>

            <NavBarIcon 
                icon={<LogOutIcon/>}
                text={"Log out"}
                />
            <NavBarIcon
                icon={<HomeIcon/>}
                text={'Go to home page'}
                />
             
                <NavBarIcon
            icon={<UserIcon />}
            text={"Log in to your profile"}
          />
        
        
            <NavBarIcon
              icon={<RegisterIcon/>}
              text={"Click here to register"}
            />

      </div>
    </div>
  );
};

const NavBarIcon = ({ icon, text }) => (
  <div className="navbar-icon group" style={{boxShadow: '1px 2px 2px gray'}}>
    {icon}
    <span className="navbar-tip group-hover:scale-100">{text}</span>
  </div>
);

export default Nav;

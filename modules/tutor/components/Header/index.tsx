import React, { useState, useEffect } from "react";
import Button from "../../../../components/button";

import { TUTORS_PAGE, CONTACT_PAGE } from "../../../../consts/routes";
import ProfileMenu from "../../../../components/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../../features/auth/authSlice";
import { signOutTutor } from "../../../../features/auth/authSlice";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import Chat from "../../../../components/chat";
import Sidebar, { menuItems } from "../Sidebar";
import ActiveLink from "components/@next/atoms/activeLink";

export const NavItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <li className="nav-item">
      <Button type="link">{children}</Button>
    </li>
  );
};

interface MenuItemProps {
  href: string;
  icon: string;
  children: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, href, children }) => {
  return (
    <div className="sidebar__menu__item">
      <div className="sidebar__menu__item__image">
        <img src={icon} />
      </div>
      <ActiveLink activeClassName="active" href={href}>
        <a className="sidebar__menu__item__link">{children}</a>
      </ActiveLink>
    </div>
  );
};

const Header: React.FC = () => {
  const { user, token } = useSelector(selectAuth);

  const dispatch = useDispatch();

  console.log("Header", user);

  const [isMenuVisibile, setIsMenuVisible] = useState(false);
  const [userRole, setUserRole] = useState("tutor");

  const showMenu = () => {
    setIsMenuVisible(!isMenuVisibile);
  };

  return (
    <>
      <Chat showOnlineUser={true} privateMessage={true} />
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom navbar-light">
          <div className="container-fluid  p-0 px-4">
            <a className="navbar-brand" href="/tutor">
              <img src="/image/logo.svg" alt="Logo" height={40} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#head-navbar"
              aria-controls="head-navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={showMenu}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="head-navbar">
              {userRole === "tutor" && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              )}

              {!user && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={TUTORS_PAGE}>
                      Our Tutors
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={CONTACT_PAGE}>
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={CONTACT_PAGE}>
                      Become a tutor
                    </a>
                  </li>
                </ul>
              )}
              {user ? (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <div className="nav-button">
                      <Button
                        type="link"
                        onClick={dispatch(signOutTutor)}
                        style={{ height: "53px", width: "180px" }}
                      >
                        <LogoutIcon style={{ color: "#bbbbbb" }} />
                        <span style={{ marginLeft: "10px", color: "#bbbbbb" }}>
                          Logout
                        </span>
                      </Button>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-button">
                      <Link href="/tutor">
                        <Button type="primary">
                          <img
                            src={user.imageUrl}
                            height="30px"
                            width="30px"
                            style={{ borderRadius: "50%", marginRight: "20px" }}
                          />
                          {user?.fullName}
                        </Button>
                      </Link>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Button href="/signin" type="link">
                      Sign in
                    </Button>
                  </li>
                  <li className="nav-item">
                    <Button href="/signup" type="primary">
                      Register
                    </Button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div
        className="container"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "right",
          padding: "0px",
        }}
      >
        {isMenuVisibile && user && (
          <ul className="navbar-nav mob-navbar-nav ms-auto">
            <li className="nav-item">
              <div className="nav-button">
                <Button
                  type="link"
                  onClick={dispatch(signOutTutor)}
                  style={{ height: "53px", width: "180px" }}
                >
                  <LogoutIcon style={{ color: "#bbbbbb" }} />
                  <span style={{ marginLeft: "10px", color: "#bbbbbb" }}>
                    Logout
                  </span>
                </Button>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-button">
                <Link href="/tutor">
                  <Button type="primary">
                    <img
                      src={user.image}
                      height="30px"
                      width="30px"
                      style={{ borderRadius: "50%", marginRight: "20px" }}
                    />
                    {user?.fullname}
                  </Button>
                </Link>
              </div>
            </li>
            <li>
              <div className="sidebar__menu">
                {menuItems.map((menuItem, index) => (
                  <MenuItem
                    href={menuItem.link}
                    icon={menuItem.icon}
                    key={index}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </div>
            </li>
          </ul>
        )}
      </div>
      <div className="Header__spacer"> </div>
    </>
  );
};

export default Header;

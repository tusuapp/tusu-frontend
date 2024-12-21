import React, { useState, useEffect, useRef } from "react";
import Button from "components/button";
import SearchBar from "@/student/components/SearchBar";
import ProfileMenu from "components/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "features/auth/authSlice";
import { signOutTutor } from "features/auth/authSlice";
import { fetchUser } from "features/auth/authSlice";
import ActiveLink from "components/@next/atoms/activeLink";
import { getUserRole } from "utils";
import FilterDropdown from "../FilterDropdown";
import Chat from "../../../../components/chat";

export const NavItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <li className="nav-item">
      <Button type="link">{children}</Button>
    </li>
  );
};

interface Props {
  title?: String;
  backgroundColor?: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const { user, token } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const [isMenuVisibile, setIsMenuVisible] = useState(false);
  const [userRole, setUserRole] = useState("tutor");

  const node = useRef<any>();

  useEffect(() => {
    if (!token) return;

    dispatch(fetchUser());
  }, [token]);

  useEffect(() => {
    if (!user) return;

    const userRole = getUserRole(user);

    setUserRole(userRole);
  }, [user]);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom navbar-light">
          <div className="container-fluid p-0 px-5">
            <a className="navbar-brand" href={userRole ? `/${userRole}` : `/`}>
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
              onClick={() => setIsMenuVisible(!isMenuVisibile)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              style={{ marginLeft: "4rem" }}
              className="collapse navbar-collapse"
              id="head-navbar"
            >
              {userRole === "tutor" && (
                <ul className="navbar-nav mb-2 mb-lg-0"></ul>
              )}
              <SearchBar />
              <Chat privateMessage={false} showOnlineUser={true} />

              {user ? (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item d-flex align-items-center">
                    {/* <div
                      className="nav-button mouse"
                      onClick={dispatch(signOutTutor)}
                    >
                      Logout
                    </div> */}
                    <div className="me-3">
                      <a href="/student/notifications">
                        <img src="/icons/tutor/notification.svg" />
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-button pe-0">
                      <ProfileMenu
                        userRole={userRole}
                        profilePicture={user.image}
                        fullName={user.fullname}
                      />
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ms-auto fs-7">
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
          {isMenuVisibile && user && (
            <ul className="navbar-nav mob-navbar-nav-student ms-auto-student">
              <li className="nav-item d-flex align-items-center">
                {/* <div
                      className="nav-button mouse"
                      onClick={dispatch(signOutTutor)}
                    >
                      Logout
                    </div> */}
                <div className="me-3 mb-2">
                  <a href="/student/notifications">
                    <img src="/icons/tutor/notification.svg" />
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-button pe-0">
                  <ProfileMenu
                    userRole={userRole}
                    profilePicture={user.image}
                    fullName={user.fullname}
                  />
                </div>
              </li>
            </ul>
          )}
        </nav>
      </header>

      <div className="Header__spacer"></div>
    </>
  );
};

export default Header;

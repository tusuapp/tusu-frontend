import React, { useState, useEffect, useRef } from "react";
import Button from "../button";
import SearchBar from "../../modules/student/components/SearchBar";
import { TUTORS_PAGE, CONTACT_PAGE } from "../../consts/routes";
import ProfileMenu from "../ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { signOutTutor } from "../../features/auth/authSlice";
import { fetchUser } from "../../features/auth/authSlice";
import ActiveLink from "../@next/atoms/activeLink";
import { getUserRole, isEmailVerfied } from "../../utils";
import Head from "next/head";
import { useRouter } from "next/router";
import FilterDropdown from "@/student/components/FilterDropdown";
import {
  initialState,
  selectSearch,
  setSearchResults,
} from "../../features/search/reducer";

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
  const router = useRouter();
  const paramsName = router?.pathname?.split("/");

  const dispatch = useDispatch();

  const [isMenuVisibile, setIsMenuVisible] = useState(false);
  const [userRole, setUserRole] = useState("tutor");

  const [show, setShow] = useState(false);
  const q: string = typeof router.query.q === "string" ? router.query.q : "";

  const [searchVal, setSearchVal] = useState(q);
  const [inSearchPage, setInSearchPage] = useState(false);
  const [filter, setFilter] = useState("");

  const node = useRef<any>();

  const showMenu = () => {
    setIsMenuVisible(!isMenuVisibile);
  };

  function handleClear() {
    setSearchVal("");
    dispatch(setSearchResults(initialState.searchResults));
  }

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
      {/* <Head>
        <title>TUSU - {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom navbar-light">
          <div className="container p-0">
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
              onClick={() => setShow(!show)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              style={{ marginLeft: "4rem" }}
              // className="collapse navbar-collapse"
              className={`collapse navbar-collapse ${show ? "show" : ""}`}
              id="head-navbar"
            >
              {userRole === "tutor" && (
                <ul className="navbar-nav mb-2 mb-lg-0"></ul>
              )}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4 fs-7">
                <li className="nav-item" style={{ color: "rosybrown" }}>
                  <ActiveLink activeClassName="active" href="/">
                    <a className="nav-link" aria-current="page">
                      Home
                    </a>
                  </ActiveLink>
                </li>
                <li className="nav-item">
                  <ActiveLink activeClassName="active" href={TUTORS_PAGE}>
                    <a className="nav-link">Our Tutors</a>
                  </ActiveLink>
                </li>
                <li className="nav-item">
                  <ActiveLink activeClassName="active" href={CONTACT_PAGE}>
                    <a className="nav-link">Contact Us</a>
                  </ActiveLink>
                </li>
                <li className="nav-item">
                  <ActiveLink activeClassName="active" href="/signup/tutor">
                    <a className="nav-link">Become a tutor</a>
                  </ActiveLink>
                </li>
                <li className="nav-item">
                  {paramsName[paramsName.length - 1] === "all" && (
                    <FilterDropdown
                      parentHandleClear={handleClear}
                      onApplyFilter={(filters) => {
                        if (!inSearchPage) {
                          router.push({
                            pathname: "/student/search",
                            query: { q: searchVal },
                          });
                        }
                        setFilter(filters);
                      }}
                    />
                  )}
                </li>
              </ul>
              {user ? (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <div className="nav-button">
                      <Button type="link" onClick={dispatch(signOutTutor)}>
                        Logout
                      </Button>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className="nav-button"
                      onClick={() => setIsMenuVisible((state) => !state)}
                    >
                      <Button
                        href={
                          user?.role?.type == "student" ? `/student` : `/tutor`
                        }
                        type="primary"
                      >
                        Home
                      </Button>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ms-auto fs-7">
                  <li className="nav-item">
                    <Button href={"/signin"} type="link" className="ps-0">
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

      <div className="Header__spacer"></div>
    </>
  );
};

export default Header;

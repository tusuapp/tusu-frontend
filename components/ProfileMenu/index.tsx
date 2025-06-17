import React from "react";
import { Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "features/auth/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import { signOutTutor } from "../../features/auth/authSlice";
import Button from "../button";

const ProfileMenu = ({ userRole }: any) => {
  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const StudentMenu = () => {
    return (
      <>
        <Menu>
          <Menu.Button className="btn btn-brand ">
            <img
              src={user.imageUrl}
              height="30px"
              width="30px"
              style={{ borderRadius: "50%", marginRight: "20px" }}
            />
            {user.fullName}
          </Menu.Button>
          {/* <AnimatePresence> */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Menu.Items
              className="student__dropdown__menu__items"
              style={{ width: "283px", overflowY: "auto", height: "90vh" }}
            >
              <Menu.Item>
                {({ active }) => (
                  <div className="text-end">
                    <img
                      className="me-6"
                      style={{ color: "#924781" }}
                      src="/icons/logout.svg"
                    />
                    <Button
                      style={{
                        color: "#924781",
                        width: "70px",
                        paddingLeft: "10px",
                      }}
                      type="link"
                      onClick={dispatch(signOutTutor)}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a className={`${active && "bg-blue-500"}`} href="/student">
                      <img src="/icons/tutor/dashboard.svg" />
                      <span className="ms-3">Home</span>
                    </a>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/profile"
                    >
                      <img src="/icons/tutor/user.svg" />
                      <span className="ms-3">My Profile </span>
                    </a>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/tutors"
                    >
                      <img src="/icons/director.svg" />
                      <span className="ms-3"> My Tutors</span>
                    </a>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/credit-points"
                    >
                      <img src="/icons/dollar.svg" />
                      <span className="ms-3 text-start">
                        Credit points / Transactions
                      </span>
                    </a>
                  </div>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/notifications"
                    >
                      <img src="/icons/tutor/notification.svg" />
                      <span className="ms-3">Notifications</span>
                    </a>
                  </div>
                )}
              </Menu.Item> */}
              <div className="student__dropdown__menu__item">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/tutors/favourite"
                    >
                      <img src="/icons/favourite.svg" />
                      <span className="ms-3"> Favorite Tutors</span>
                    </a>
                  )}
                </Menu.Item>
              </div>
              <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/classes"
                    >
                      <img src="/icons/teacher.svg" />
                      <span className="ms-3">My Classes</span>
                    </a>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="student__dropdown__menu__item">
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/reschedule-requests"
                    >
                      <img src="/icons/teacher.svg" />
                      <span className="ms-3">Reschedule requests</span>
                    </a>
                  </div>
                )}
              </Menu.Item>
              <div className="student__dropdown__menu__item">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && "bg-blue-500"}`}
                      href="/student/certificates"
                    >
                      <img src="/icons/document.svg" />
                      <span className="ms-3">My Certificates</span>
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </motion.div>
          {/* </AnimatePresence> */}
        </Menu>
      </>
    );
  };

  const TutorMenu = () => {
    return (
      <div>
        <Menu>
          <Menu.Button className="btn btn-brand">
            <img
              src={user.imageUrl}
              height="30px"
              width="30px"
              style={{ borderRadius: "50%", marginRight: "20px" }}
            />
            user.fullname
          </Menu.Button>

          <Menu.Items className="student__dropdown__menu__items">
            <div className="student__dropdown__menu__item">
              <Menu.Item>
                {({ active }) => (
                  <a className={`${active && "bg-blue-500"}`} href="/tutor">
                    Dashboard
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="student__dropdown__menu__item">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && "bg-blue-500"}`}
                    href="/account-settings"
                  >
                    Documentation
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    );
  };

  return (
    <>
      {userRole === "student" && <StudentMenu />}
      {userRole === "tutor" && <TutorMenu />}
    </>
  );
};

export default ProfileMenu;

import React from "react";

import { useSelector } from "react-redux";
import { selectAuth } from "../../../../features/auth/authSlice";
import ActiveLink from "components/@next/atoms/activeLink";

import useBookings from "@/tutor/hooks/useBookings";
import useEarnings from "@/tutor/hooks/useEarnings";

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

const menuItems = [
  { name: "Home", link: "/tutor", icon: "/icons/tutor/dashboard.svg" },
  { name: "My Profile", link: "/tutor/profile", icon: "/icons/tutor/user.svg" },
  {
    name: "My Bookings",
    link: "/tutor/bookings",
    icon: "/icons/tutor/booking.svg",
  },
  {
    name: "My Earnings",
    link: "/tutor/earnings",
    icon: "/icons/tutor/dollar.svg",
  },

  {
    name: "Messages",
    link: "/tutor/messages/sdds",
    icon: "/icons/tutor/dollar.svg",
  },

  {
    name: "Class Schedule",
    link: "/tutor/class-schedules",
    icon: "/icons/tutor/online-class.svg",
  },
  {
    name: "Booking Requests",
    link: "/tutor/booking-requests",
    icon: "/icons/tutor/teacher.svg",
  },
  {
    name: "Notifications",
    link: "/tutor/notifications",
    icon: "/icons/tutor/notification.svg",
  },
  {
    name: "FAQ",
    link: "/tutor/faq",
    icon: "/icons/tutor/teacher.svg",
  },
  {
    name: "Contact Us",
    link: "/tutor/contact",
    icon: "/icons/tutor/teacher.svg",
  },
  {
    name: "Legal",
    link: "/tutor/privacy-policy",
    icon: "/icons/tutor/teacher.svg",
  },
  {
    name: "Terms and Conditions",
    link: "/tutor/student-terms-and-conditions",
    icon: "/icons/tutor/teacher.svg",
  },
];

const Sidebar = () => {
  const { user } = useSelector(selectAuth);
  const { data } = useBookings();
  const earnings = useEarnings("all");
  const classCount = data?.bookings.filter(
    (key: any) => key.status == "completed"
  );
  console.log(data);
  return (
    <div className="sidebar">
      <div
        className="sidebar__top"
        style={{ backgroundColor: "#5A294F", height: "200px" }}
      >
        <div className="text-center">
          <img
            src={user?.image}
            style={{
              borderRadius: "15px",
              paddingTop: "10px",
              marginRight: "80px",
            }}
            height="25%"
            width="25%"
            alt="profile"
          />
        </div>
        <div
          className=" "
          style={{
            color: "white",
            display: "flex",
            justifyContent: "start",
            marginLeft: "83px",
            marginTop: "10px",
            fontSize: "20px",
          }}
        >
          {user?.fullname}
        </div>
        <div
          className=" "
          style={{
            color: "white",
            display: "flex",
            justifyContent: "start",
            marginLeft: "83px",

            fontWeight: "lighter",
          }}
        >
          {user?.email}
        </div>
        <div className="tutor_sidebar_top_count">
          <div className="tutor_class__count">
            <div className="svg_container">
              <img src="/icons/tutor/teacher.svg" />
            </div>
            <div>
              <h6>{classCount?.length}</h6>
              <p>Classes</p>
            </div>
          </div>
          <div className="tutor_earnings__count">
            <div className="svg_container">
              <img src="/icons/tutor/dollar.svg" />
            </div>
            <div>
              <h6>
                {earnings?.data?.currency}{" "}
                {earnings?.data?.getEarnings?.total_earnings}
              </h6>
              <p>Earnings</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__menu">
        {menuItems.map((menuItem, index) => (
          <MenuItem href={menuItem.link} icon={menuItem.icon} key={index}>
            {menuItem.name}
          </MenuItem>
        ))}
      </div>
    </div>
  );
};

export { MenuItem, menuItems };
export default Sidebar;

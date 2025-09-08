import moment from "moment";
import React from "react";

interface NotificationItemProps {
  id: number;
  body: string;
  timestamp: any;
  type: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  body,
  timestamp,
  type,
}) => {
  return (
    <>
      {type == "student" ? (
        <div className="d-flex  bg-white not-items mt-3 px-2 py-3">
          <div className="flex-shrink-0 m-2">
            <img src="/image/radio-inactive.svg" />
          </div>
          <div className="flex-grow-1 ms-5 not-content">
            <p className="m-0">{body}</p>
            <p className="text-dark mb-0">{moment(timestamp).fromNow()}</p>
          </div>
        </div>
      ) : (
        <div className="notification__item">
          <div className="flex-grow-1">
            {body}
            <br />
            {moment(timestamp).fromNow()}
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationItem;

import useChatUserList from "@/student/hooks/useChatUserList";
import {
  faAngleDown,
  faAngleUp,
  faHammer,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChat } from "../../../../components/chat/redux/reducer";
import { IUser } from "../../../../components/chat/types";
import { useRouter } from "next/router";

const Chat = ({ name, message, timestamp, image }: any) => {
  return (
    <div className="chat__sidebar__chat">
      <div className="d-flex ">
        <div className="me-3">
          <img src={"/image/tutorprofileimage.png"} className="image" />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="name">{name}</div>
            <div className="timestamp">{timestamp}</div>
          </div>
          <div className="message">{message}</div>
        </div>
      </div>
    </div>
  );
};

interface ChatSidebarProps {
  user: IUser;
  usertype: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ user, usertype }) => {
  const Router = useRouter();

  const [tab, setTab] = useState("requested");
  const [accordion, setAccordion] = useState(false);
  // const [accordion2, setAccordion2] = useState(false);
  const { chatHistoryUsers } = useSelector(selectChat);

  const [selectedIndex, setSelectedIndex] = useState(0);

  // console.log("chatHistoryUsers=====>",chatHistoryUsers);

  useEffect(() => {
    Object.keys(chatHistoryUsers.histories)?.map((key, index) => {
      if (index === 0) {
        let uuid = chatHistoryUsers.histories[key].from_user_id;
        if (usertype === "tutor") {
          let url = "/" + usertype + "/messages/" + uuid;
          Router.push(url);
        }
        // if (usertype === "student") {
        //   url = "/" + usertype + "/message/" + uuid;
        // }
      }
    });
  }, []);

  const { data: requestedChatUsers = [], isFetched } = useChatUserList();

  return (
    <>
      <div className="chat__sidebar">
        <div>
          <div
            className="chat_box bg-light px-5 py-3 mb-1 cursor-pointer d-flex justify-content-between"
            onClick={() => {
              setTab("requested");
              setAccordion(!accordion);
            }}
          >
            Requested Messages
            {accordion ? (
              <FontAwesomeIcon
                icon={faAngleUp}
                style={{ color: "#000" }}
                onClick={() => setAccordion(!accordion)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ color: "#000" }}
                onClick={() => setAccordion(!accordion)}
              />
            )}
          </div>
          {accordion && (
            <div className="chat_user_list">
              {Object.keys(chatHistoryUsers.histories)?.map((key, index) => {
                let uuid = chatHistoryUsers.histories[key].from_user_id;
                if (
                  chatHistoryUsers.histories[key].from_user_id === user.uuid
                ) {
                  uuid = chatHistoryUsers.histories[key].to_user_id;
                }
                let cuser = chatHistoryUsers.usersList[uuid];

                return (
                  <div
                    className={`user_block px-5 py-3 mb-1 ${
                      selectedIndex == index ? "user_block_selected" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedIndex(index);
                    }}
                  >
                    <div>
                      <img
                        src={
                          cuser?.image && cuser?.image?.url
                            ? process.env.NEXT_PUBLIC_API_ENDPOINT +
                              cuser?.image?.url.slice(
                                1,
                                cuser?.image?.url.length
                              )
                            : "/image/img_avatar.png"
                        }
                        alt={"mess.profileImg"}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/image/img_avatar.png";
                        }}
                      />
                    </div>
                    <div
                      className="user_inner"
                      onClick={() => {
                        let url = "/" + usertype + "/messages/" + uuid;
                        if (usertype === "student") {
                          url = "/" + usertype + "/message/" + uuid;
                        }
                        Router.push(url);
                      }}
                    >
                      <div className="user_name">
                        <span>{cuser?.fullname}</span>
                        <span>
                          {moment(
                            chatHistoryUsers.histories[key].updated_at
                          ).fromNow()}
                        </span>
                      </div>
                      <p>{chatHistoryUsers.histories[key].last_message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* <div
            className="bg-light px-5 py-3 cursor-pointer d-flex justify-content-between"
            onClick={() => {
              setTab("general");
                setAccordion2(!accordion2);
            }}
          >
            General Messages
            {accordion2 ? (
              <FontAwesomeIcon
                icon={faAngleUp}
                style={{ color: "#000" }}
                onClick={() => setAccordion2(!accordion2)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ color: "#000" }}
                onClick={() => setAccordion2(!accordion2)}
              />
            )}
          </div> */}
          {/* {accordion2 && (
            <div className="chat_user_list">
              {Object.keys(chatHistoryUsers.histories)?.map((key, index) => {
                let uuid = chatHistoryUsers.histories[key].from_user_id;
                if (
                  chatHistoryUsers.histories[key].from_user_id === user.uuid
                ) {
                  uuid = chatHistoryUsers.histories[key].to_user_id;
                }
                let cuser = chatHistoryUsers.usersList[uuid];

                return (
                  <div className="user_block px-5 py-3 mb-1" key={index}>
                    <div>
                      <img
                        src={
                          cuser?.image && cuser?.image?.url
                            ? process.env.NEXT_PUBLIC_API_ENDPOINT +
                              cuser?.image.url.slice(
                                1,
                                cuser?.image?.url.length
                              )
                            : "/image/img_avatar.png"
                        }
                        alt={"mess.profileImg"}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/image/img_avatar.png";
                        }}
                      />
                    </div>
                    <div
                      className="user_inner"
                      onClick={() => {
                        let url = "/" + usertype + "/messages/" + uuid;
                        if (usertype === "student") {
                          url = "/" + usertype + "/message/" + uuid;
                        }
                        Router.push(url);
                      }}
                    >
                      <div className="user_name">
                        <span>{cuser?.fullname}</span>
                        <span>
                          {moment(
                            chatHistoryUsers.histories[key].updated_at
                          ).fromNow()}
                        </span>
                      </div>
                      <p>{chatHistoryUsers.histories[key].last_message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )} */}
        </div>
        {tab === "requested" &&
          isFetched &&
          requestedChatUsers.map((user: any, index: number) => (
            <Link href={`/tutor/messages/${user.room_id}`} key={index}>
              <a style={{ textDecoration: "none" }}>
                {console.log(user)}
                <Chat
                  key={index}
                  image={user.user.image}
                  name={user.user.name}
                  message={user.last_message.message}
                  timestamp={moment(user.last_message.created_at).fromNow()}
                />
              </a>
            </Link>
          ))}
        {tab === "general" &&
          isFetched &&
          requestedChatUsers.map((user: any, index: number) => (
            <Link href={`/tutor/messages/${user.room_id}`} key={index}>
              <a style={{ textDecoration: "none" }}>
                {console.log(user)}
                <Chat
                  key={index}
                  image={user.user.image}
                  name={user.user.name}
                  message={user.last_message.message}
                  timestamp={moment(user.last_message.created_at).fromNow()}
                />
              </a>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ChatSidebar;

import React, { useState } from "react";
import Head from "next/head";
import useChatHistory from "@/student/hooks/useChatHistory";
import { useRouter } from "next/router";
import useSendMessage from "@/student/hooks/useSendMessage";
import ChatSidebar from "@/student/components/ChatSidebar";
import TutorDashboardLayout from "layouts/TutorDashboard";
import useGeneralChatHistory from "@/tutor/hooks/useGeneralChatHistory";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const IncomingChat = ({ message, timestamp }: any) => {
  return (
    <div className="msg left-msg">
      <div className="msg-bubble">
        <div className="msg-text">{message}</div>
      </div>
      <div className="msg-info">
        <div className="msg-info-time">
          {moment.parseZone(timestamp).format("D MMM YYYY")}
        </div>
      </div>
    </div>
  );
};

const OutgoingChat = ({ message, timestamp }: any) => {
  return (
    <div className="msg right-msg">
      <div className="msg-bubble">
        <div className="msg-text">{message}</div>
      </div>
      <div className="msg-info">
        <div className="msg-info-time">
          {moment.parseZone(timestamp).format("D MMM YYYY")}
        </div>
      </div>
    </div>
  );
};

function Message() {
  const [message, setMessage] = useState("");

  const {
    query: { tutor_id },
  } = useRouter();

  const { data } = useGeneralChatHistory(tutor_id);

  const {
    data: { user, chats: requestedChatHistory } = {},
    refetch: refetchRequestedChatHistory,
  } = useChatHistory(tutor_id);

  const { mutate: sendMessage } = useSendMessage();

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    sendMessage(
      { id: tutor_id, message },
      {
        onSuccess: () => {
          refetchRequestedChatHistory();
          setMessage("");
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <TutorDashboardLayout>
        <div className="row mb-3">
          <div className="col-12 col-md-6 d-flex justify-content-between">
            <h2 className="tutor__dashboard__title">Messages</h2>

            <div></div>
          </div>
        </div>
        <div className="d-flex mb-5">
          <ChatSidebar user={user} usertype={"tutor"} />
          <div className="flex-grow-1">
            <div className="chat__header">
              <img
                src={
                  user?.image
                    ? process.env.NEXT_PUBLIC_API_ENDPOINT +
                      user?.image.slice(1, user?.image.length)
                    : "/image/img_avatar.png"
                }
              />
              <div className="user__data">
                <div className="name">{user?.fullname}</div>
                <div>{user?.is_online ? "Online" : "Offline"}</div>
              </div>
            </div>

            <section className="msger">
              <main className="msger-chat">
                <div>Data: {JSON.stringify(data)}</div>
                {requestedChatHistory &&
                  requestedChatHistory.map((chat: any) => {
                    if (chat.role === "student")
                      return (
                        <IncomingChat
                          message={chat.message}
                          timestamp={chat.created_at}
                        />
                      );

                    if (chat.role === "tutor") {
                      return (
                        <OutgoingChat
                          message={chat.message}
                          timestamp={chat.created_at}
                        />
                      );
                    }
                  })}
              </main>
              <form className="msger-inputarea 1">
                <input
                  type="text"
                  className="msger-input"
                  placeholder="Write now..."
                  defaultValue={""}
                  value={message}
                  onChange={handleMessageChange}
                />
                <button
                  type="submit"
                  className="msger-send-btn"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </form>
            </section>
          </div>
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default Message;

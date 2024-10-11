import React, {useEffect, useState} from "react";

import Head from "next/head";
import useChatHistory from "@/student/hooks/useChatHistory";
import {useRouter} from "next/router";
import useSendMessage from "@/student/hooks/useSendMessage";
import ChatSidebar from "@/student/components/ChatSidebar";
import TutorDashboardLayout from "layouts/TutorDashboard";
import moment from "moment";
import socket, {getRoomKey} from "../../../components/chat/socket";
import {useSelector} from "react-redux";
import {selectAuth} from "../../../features/auth/authSlice";
import {selectChat} from "../../../components/chat/redux/reducer";
import _ from "lodash"
import {IMessage, initState,  IToUser} from "../../../components/chat/types";

const IncomingChat = ({message, timestamp}: any) => {
    return (
        <div className="msg left-msg">
            <div className="msg-bubble">
                <div className="msg-text">{message}</div>
            </div>
            <div className="msg-info">
                <div className="msg-info-time">
                    {timestamp}
                </div>
            </div>
        </div>
    );
};

const OutgoingChat = ({message, timestamp}: any) => {
    return (
        <div className="msg right-msg">
            <div className="msg-bubble">
                <div className="msg-text">{message}</div>
            </div>
            <div className="msg-info">
                <div className="msg-info-time">
                    {timestamp}
                </div>
            </div>
        </div>
    );
};




function Message() {
    const [message, setMessage] = useState("");
    const [otherUserData, setOtherUserData] = useState<IToUser>({fullname: "Demo user", connected: true});
    const {user} = useSelector(selectAuth);
    const {isSocket} = useSelector(selectChat);
    const [oldMsgData, setOldMsgData] = useState<IMessage>(initState);

    const {query} = useRouter();


    useEffect(() => {

        if (user && user.uuid && isSocket) {
            socket.emit("user_chat_with_uuid", {userId: user.uuid, uuid: query.tutor_id, perPage:50,currentPage:1})

            socket.on("user_chat_with_uuid_" + user.uuid, (data) => {
                console.log("result>>>>>>>>>>>>>>",data)
                let msg = data.result;
                msg.data = _.orderBy(data.result.data, 'created_at', 'asc')


                if (query.tutor_id==data.tab){
                    setOldMsgData(msg)
                }
            })

            socket.emit("mark_room_msg_as_read", {from: user.uuid, to: query.tutor_id})

            socket.emit("user_online", {uuid: query.tutor_id})

            socket.on("user_online", (data: any) => {
                setOtherUserData(data)
            })
        }
        return () => {
            if (user && user.uuid && isSocket) {
                socket.off("user_chat_with_uuid_" + user.uuid)
            }
        }
    }, [isSocket,query])


    const {
        data,
        // data: { chats: requestedChats = [] } = {},
        refetch: refetchChatHistory,
    } = useChatHistory(query.tutor_id);

    const {mutate: sendMessage} = useSendMessage();

    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let msg = {...oldMsgData}
          msg.data = [...oldMsgData.data]
        msg.data.push({
            is_read: false, to: "",
            role: user.role.name,
            created_at: moment().format(),
            from: user.uuid,
            message: message,
            timestamp: moment().fromNow()
        })
        msg.data = _.orderBy(msg.data, 'created_at', 'asc')

        setOldMsgData(msg)
        setMessage("");
        if (isSocket) {

            const payload = {
                content: message,
                from: user.uuid,
                to: query.tutor_id,
            };

            socket.emit("private message", payload)
        }

    };


    const handleSubmit2 = (e: any) => {
        e.preventDefault();
        console.log(message);

        sendMessage(
            {id: query.tutor_id, message},
            {
                onSuccess: () => {
                    refetchChatHistory();
                    setMessage("");
                },
            }
        );
    };

    return (
        <>
            <Head>
                <title>Tusu - Student | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
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
                            <img src={otherUserData?.image ? process.env.NEXT_PUBLIC_API_ENDPOINT + otherUserData.image.slice(1, otherUserData.image.length) : "/image/img_avatar.png"}/>
                            <div className="user__data">
                                <div className="name">{otherUserData?.fullname}</div>
                                <div>{otherUserData?.connected ? "Online" : "Offline"}</div>
                            </div>
                        </div>
                        {/* {JSON.stringify(chats)} */}
                        <section className="msger">
                            <main className="msger-chat">


                                {oldMsgData.data?.map((fake,index) => {

                                    if (fake.from === user.uuid) {
                                        return (
                                            <IncomingChat
                                                key={index}
                                                message={fake.message}
                                                timestamp={fake.timestamp}
                                            />
                                        );
                                    } else {
                                        return (
                                            <OutgoingChat
                                                key={index}
                                                message={fake.message}
                                                timestamp={fake.timestamp}
                                            />
                                        );
                                    }
                                })}
                            </main>
                            <form className="msger-inputarea 2">
                                <input
                                    type="text"
                                    className="msger-input"
                                    placeholder="Write now..."
                                    value={message}
                                    onChange={handleMessageChange}
                                />
                                <button
                                    type="submit"
                                    // className="msger-send-btn"
                                    onClick={handleSubmit}
                                >
                                    <img src="../../icons/send.svg" alt="" width="50px"/>
                                </button>
                                {/* <FontAwesomeIcon
                  className="msger-send-btn"
                  icon={faPaperPlane}
                  style={{ color: "#FFF" }}
                  onClick={handleSubmit}
                /> */}
                            </form>
                        </section>
                    </div>
                </div>
            </TutorDashboardLayout>
        </>
    );
}

export default Message;

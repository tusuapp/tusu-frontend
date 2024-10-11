import React, {useEffect, useState} from "react";

import Head from "next/head";
import {useRouter} from "next/router";
import ChatSidebar from "@/student/components/ChatSidebar";

import {api} from "api";
import Header from "@/student/components/Header";

import {useSelector} from "react-redux";
import {selectChat} from "../../../components/chat/redux/reducer";
import {selectAuth} from "../../../features/auth/authSlice";
import socket, {getRoomKey} from "../../../components/chat/socket";
import moment from "moment";
import _ from "lodash";
import {IMessage, initState, IToUser} from "../../../components/chat/types";
import withAuthNew from "../../../HOC/withAuthNew";

const IncomingChat = ({message, timestamp}: any) => {
    return (
        <div className="msg left-msg">
            <div className="msg-bubble">
                <div className="msg-text">{message}</div>
            </div>
            <div className="msg-info">
                <div className="msg-info-time">{timestamp}</div>
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
                <div className="msg-info-time">{timestamp}</div>
            </div>
        </div>
    );
};


function Message() {

    const router = useRouter()
    const {room_id} = router.query
    const {isSocket} = useSelector(selectChat);
    const {user} = useSelector(selectAuth);
    const {chatHistoryUsers} = useSelector(selectChat);
    //console.log("chatHistoryUsers", chatHistoryUsers, typeof room_id);


    const [message, setMessage] = useState("");
    const [otherUserData, setOtherUserData] = useState<IToUser>({
        fullname: "Demo user",
        connected: true,
        image: "/image/img_avatar.png"
    });
    //const [otherUserData, setOtherUserData] = useState<IToUser>({fullname: "Demo user", connected: true});

    const [oldMsgData, setOldMsgData] = useState<IMessage>(initState);


    // console.log("chatbox user =>", user);
   // console.log("otherUserData=>", otherUserData);


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
                to: room_id,
            };

            socket.emit("private message", payload)
        }


        /* sendMessage.mutate(
             {id: query.room_id, message},
             {
                 onSuccess: () => {
                     queryClient.invalidateQueries("chatHistory");

                     setMessage("");
                 },
             }
         );*/
    };


    useEffect(() => {

        if (user && user.uuid && isSocket) {
            socket.emit("user_chat_with_uuid", {userId: user.uuid, uuid: room_id, perPage: 50, currentPage: 1})


            socket.on("user_chat_with_uuid_" + user.uuid, ({tab, result}) => {
                let msg = result;
                msg.data = _.orderBy(result.data, 'created_at', 'asc')

                if (room_id == tab) {
                    setOldMsgData(msg)
                }
            })


            socket.emit("mark_room_msg_as_read", {from: user.uuid, to: room_id})

            socket.emit("user_online", {uuid: room_id})


            socket.on("user_online", (data: any) => {
             //   console.log("data=====>", data)
                setOtherUserData(data)
            })
        }
        return () => {
            if (user && user.uuid && isSocket) {
                socket.off("user_chat_with_uuid_" + user.uuid)
            }
        }
    }, [isSocket, room_id])

    useEffect(() => {
        if (room_id) {
            // chatHistoryUsers.usersList.find() 
            let data = {}
            Object.keys(chatHistoryUsers.usersList).forEach((key) => {
                if (key == room_id) {
                    data = chatHistoryUsers.usersList[key]
                }
            })

            // @ts-ignore
            setOtherUserData({...otherUserData, image: data?.image?.url})
          //  console.log("cuser----------otherUserData", otherUserData);
        }
    }, [chatHistoryUsers])
   // console.log("otherUserData", otherUserData);

    return (
        <>
            <Head>
                <title>Tusu - Student | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Header/>
            <div className="px-5 py-3 mb-3">
                <div className="col-12 col-md-6">
                    <h2 className="tutor__dashboard__title">Messages</h2>
                    <div></div>
                </div>
            </div>
            <div className="d-flex mb-5">
                <ChatSidebar user={user} usertype={"student"}/>
                <div className="flex-grow-1">
                    <div className="chat__header">
                        <img
                            src={otherUserData?.image ? (process.env.NEXT_PUBLIC_API_ENDPOINT + otherUserData?.image.slice(1, otherUserData?.image.length)) : "/image/img_avatar.png"}
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/image/img_avatar.png";
                            }}/>
                        <div className="user__data 2">

                            <div className="name">{otherUserData?.fullname}</div>
                            <div>{otherUserData?.connected ? "Online" : "Offline"}</div>
                        </div>
                    </div>


                    <section className="msger">
                        <main className="msger-chat">

                            {oldMsgData.data?.map((fake, i) => {
                                if (fake.from === user.uuid ) {
                                    return (
                                        <IncomingChat
                                            key={i}
                                            message={fake.message}
                                            timestamp={fake.timestamp}
                                        />
                                    );
                                } else {
                                    return (
                                        <OutgoingChat
                                            key={i}
                                            message={fake.message}
                                            timestamp={fake.timestamp}
                                        />
                                    );
                                }
                            })}
                        </main>
                        <form className="msger-inputarea 3">
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
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default withAuthNew(Message, "student");

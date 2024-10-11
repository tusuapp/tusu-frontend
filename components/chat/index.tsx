import React, {useEffect, useState} from 'react';
import socket, {getOnlineUsers} from "./socket";
import {useSelector, useDispatch} from "react-redux";
import {selectChat, setOnlineUsersStatus, setSocket, setNotification, setChatHistoryUsers} from "./redux/reducer";
import {fetch} from "../../api";
// @ts-ignore
import ReactNotifications from 'react-browser-notifications';
import {useRouter} from "next/router";
import {selectAuth} from "../../features/auth/authSlice";

interface Props {
    showOnlineUser?: boolean;
    privateMessage?: boolean;
}


const Chat: React.FC<Props> = (props) => {
    const [user, setUser] = useState({uuid: "", username: ""});
    const [notification, setNotification] = useState({title: "", body: "", from:""});
    const [ref, setRef] = useState();
    const router = useRouter()

    const {onlineUsers, isSocket, onlineUsersStatus} = useSelector(selectChat);
    const dispatch = useDispatch();
    const {user: cuser} = useSelector(selectAuth);

    const socketConnect = async () => {
        const token = localStorage.getItem("accessToken");
        const sessionID = user.uuid;
        const username = user.username

        if (sessionID) {
            socket.auth = {sessionID, username, token};

            //     console.log("socket.auth", socket.auth)
            await socket.connect();
        }
    }


    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("accessToken") || "";
            const response = await fetch(token).get("/auth/user");
            //  console.log("response",response)
            setUser(response.data.result.user)
        })()
    }, [])

    useEffect(() => {


        if (user && user.uuid) {

            if (!isSocket) {
                socketConnect();
            }


            socket.on("session", ({sessionID, userID, token}) => {
                // attach the session ID to the next reconnection attempts
                socket.auth = {sessionID, token};
                // store it in the localStorage
                localStorage.setItem("sessionID", sessionID);
                // save the ID of the user
                // @ts-ignore
                socket.userID = userID;
            });


            socket.on("user connected", (user) => {

                let userStatus: any = {...onlineUsersStatus}
                userStatus[user.session_id] = user
                dispatch(setOnlineUsersStatus(userStatus))

            });

            socket.on("user disconnected", (sessionId) => {
                let userStatus: any = {...onlineUsersStatus}
                delete userStatus[sessionId]
                dispatch(setOnlineUsersStatus(userStatus))

            });

            // this will move to appropriate screen
            if (props.showOnlineUser) {
                // selected chat user online status
                socket.on("user_online_status", (data) => {
                    //  console.log("user_online_status >>>>>>>>>>>>>>>>>>>>>>", data)
                    if (typeof data === "object" && Object.keys(data).length) {
                        dispatch(setOnlineUsersStatus(data))
                    }
                })
            }

            socket.on('connect', () => {
                // @ts-ignore
                window.Socket = socket
                dispatch(setSocket(true))
            });

            socket.on('notification', async (data) => {

                if (typeof data === "object") {
                   // console.log("notification", data)
                    if (data && data.type && data.type === "single") {
                        setNotification({title: "New Chat Message", body: data.data.message, from : data.data.from})

                     //   console.log("data.data", notification)
                    }

                    dispatch(setNotification(data))
                }
                //fetch chatHistoryUsers

                const token = localStorage.getItem("accessToken") || "";
                const response = await fetch(token).get("/chat/chat-history-users");
                if (response?.data?.result?.history?.length) {
                    const rows = response.data.result.history;
                    const usersList = response.data.result.usersList;
                    var histories: any = {};
                    rows.forEach((r: any, i: number) => {
                        let sort = []
                        sort = [r.to_user_id, r.from_user_id]
                        const id = sort.sort().join("-");
                        histories[id] = r;
                    })

                    dispatch(setChatHistoryUsers({histories, usersList}))
                }

            });

            socket.emit("notification", {type: "all"})

            socket.on("connect_error", (err) => {
                if (err.message === "invalid username") {
                    alert("chat login failed")
                }
            });
        }


        return () => {
            if (user && user.uuid) {
                const sessionID = user.uuid;
                socket.off("user_online_status_" + sessionID);
            }
            socket.off("connect_error");
            socket.off("session");
        }
    }, [user]);


    useEffect(() => {
        if (user && user.uuid) {
            const sessionID = user.uuid;
            if (isSocket && onlineUsers && onlineUsers.length) {
                // @ts-ignore
                getOnlineUsers(window.Socket, "tutor", sessionID, onlineUsers)
            }
        }


    }, [user, isSocket, onlineUsers])

    useEffect(() => {
        if (notification.title) {
            // @ts-ignore
            ref.show()
        }
    }, [notification])

    return (
        <>

            <ReactNotifications
                onRef={(ref: any) => {
                    setRef(ref)
                }} // Required
                title={notification.title} // Required
                body={notification.body}
                icon="/image/img_avatar.png"
                tag="abcdef"
                timeout="10000"
                onClick={(event: any) => {

                    if (cuser && cuser.role && cuser.role.type) {
                        if (cuser.role.type === "tutor") {
                            router.push("/tutor/messages/" + notification.from)
                        } else {
                            router.push("/student/message/" + notification.from)

                        }

                    }
                    //router.push("tutor/messages/" + notification.title)

                }}
            />
        </>
    );
}

export default (Chat);
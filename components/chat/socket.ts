import {io, Socket} from "socket.io-client";

let URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";
const socket = io(URL, {autoConnect: false});

socket.onAny((event, ...args) => {
    // @ts-ignore
   // console.log("onAny>> ", event, args, socket.userID);
});

export default socket;

interface IOnlineUsers {
    showOnlineUser?: boolean;
}


export function getOnlineUsers(socket: Socket, userType: string, from: string, tutorList: any) {
  //  console.log("getOnlineUsers>>>", socket)
    let uuids: any = []

    tutorList.forEach((r: any, i: number) => {
        uuids.push(r.uuid)
    })

    socket.emit("user_online_status", {userType, from, "uuids":uuids})

}


export function getRoomKey(from:string, to:any) {
    let sort = [from, to]
    return sort.sort().join("-");
}
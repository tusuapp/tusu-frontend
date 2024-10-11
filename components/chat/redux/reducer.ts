import {createSlice} from "@reduxjs/toolkit";
import type {AppState} from "store";
import {IChatHistory} from "../types";

export interface ChatState {
    onlineUsers: any;
    chatHistoryUsers: IChatHistory;
    isSocket: boolean;
    fetchGetUser: boolean;
    onlineUsersStatus: object;
    notification: Array<object>;
}

const initialState: ChatState = {
    onlineUsers: [],
    // @ts-ignore
    chatHistoryUsers: {usersList:{},histories:[]},
    isSocket: false,
    fetchGetUser: false,
    onlineUsersStatus: {},
    notification: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setSocket: (state, action) => {
            state.isSocket = action.payload;
        },
        setFetchGetUser: (state, action) => {
            state.fetchGetUser = action.payload;
        },

        setOnlineUsersStatus: (state, action) => {
            state.onlineUsersStatus = action.payload;
        },

        setNotification: (state, action) => {
           // console.log("state.notification", state)

            if (action.payload.type === "single") {

                state.notification = [...state.notification, action.payload.data]
             //   console.log("state.notification , single>>>>>>>>>>>>>>>", state.notification)
            } else {
              //  console.log("state.notification , alll>>>>>>>>>>>>>>>", action.payload.data)
                state.notification = action.payload.data ? action.payload.data : []
            }

        },

        setChatHistoryUsers: (state, action) => {
            state.chatHistoryUsers = action.payload;
        },
    },
});

export const {
    setOnlineUsers,
    setFetchGetUser,
    setChatHistoryUsers,
    setSocket,
    setOnlineUsersStatus,
    setNotification
} = chatSlice.actions;

export const selectChat = (state: AppState) => state.chat;

export default chatSlice.reducer;

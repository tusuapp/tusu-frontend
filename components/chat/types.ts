import moment from "moment";

export interface Datum {
    is_read: boolean;
    message: string;
    to: string;
    from: string;
    role: string;
    timestamp: string;
    created_at: string;
}

export interface Pagination {
    total: number;
    lastPage: number;
    perPage: number;
    currentPage: number;
    from: number;
    to: number;
}

export interface IMessage {
    data: Datum[];
    pagination: Pagination;
}


export const initState: IMessage = {
    data: [], pagination: {
        "total": 0,
        "lastPage": 0,
        "perPage": 100,
        "currentPage": 1,
        "from": 0,
        "to": 0
    }
}


export interface IToUser {
    fullname: string;
    connected: boolean;
    image:string;
}

export interface IChatHistory {
    histories: IHistoryList;
    usersList: IUserList;
}


export interface IUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    image: object;
    confirmed: boolean;
    blocked: boolean;
    role: number;
    phone: string;
    is_mobile_verified: boolean;
    fullname: string;
    country: number;
    tutor_details?: any;
    timezone: string;
    address?: any;
    social_login?: any;
    is_email_verified: boolean;
    uuid: string;
    users_chat_register?: any;
    created_at: Date;
    updated_at: Date;
    rc_chat?: any;
    timezone_offset: string;
    is_active: boolean;
    permanent_delete: boolean;
}


export interface IUserList {
    [key: string]: IUser
}



export interface IHistory {
    id: number;
    created_by?: any;
    updated_by?: any;
    created_at: Date;
    updated_at: Date;
    unread_count:string;
    last_message: string;
    from_user_id: string;
    to_user_id: string;
}

export interface IHistoryList {
    [key: string]: IHistory
}
export interface ICount {
    [key: string]: string
}


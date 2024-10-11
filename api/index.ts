import axios from "axios";

export function setToken(token: any) {
    if (!token) return;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function setApplicationName(role: any) {
    api.defaults.headers.common["Application-name"] = `${role}`;
}


export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
    headers: {
        Accept: "application/json",
        "Application-access": "web",
        "Content-Type": "application/json",
    },
});


export const fetch = (token: string) => {
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
        headers: getHeaders(token),
    });
}

function getHeaders(token: string) {

    let headers: object = {
        Accept: "application/json",
        "Application-access": "web",
        "Content-Type": "application/json",
    };

    if (token) {
        // @ts-ignore
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers
}
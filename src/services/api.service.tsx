import axios from "axios"
import { Env } from "../utils/env"
import { DeleteToken } from "./cookie.token";

interface APIProps {
    body?: any,
    url: string,
    headers?: any
}


export const handleInvalidToken = (errorResponse?: any,) => {
    if ((errorResponse && (errorResponse.data.message === 'Invalid token' || errorResponse.status === 401))
    ) {
        DeleteToken();
    }
};


export const PostReq = async ({ body, url, headers }: APIProps) => {
    const response = await axios.post(`${Env.API_HOST}${url}`, {
        ...body,
        headers
    })
    return response
}

export const GetReq = async ({ url, headers, body }: APIProps) => {
    try {
        const response = await axios.get(`${Env.API_HOST}${url}`, {
            ...body,
            headers,
        });
        return response;
    } catch (error: any) {
        handleInvalidToken(error.response,);
        console.error("Error fetching data:", error);
    }
};

export const PatchReq = async ({ url, headers, body }: APIProps) => {
    console.log(headers)
    try {
        const response = await axios.patch(`${Env.API_HOST}${url}`, {
            ...body,
        }, {
            headers,
        });
        console.log("Patch Response",response)
        return response
    } catch (error: any) {
        handleInvalidToken(error.response,);
        console.error("Error fetching data:", error);
    }

}
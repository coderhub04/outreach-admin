import { handleInvalidToken, PatchReq } from "./api.service";
import { GetToken } from "./cookie.token";

interface OnDisableType {
    id: string,
    type: string,
    fetchData:()=>void
}

export const onDisable = async ({id,type,fetchData}:OnDisableType) => {
    console.log("Enter Delete")
    const token = GetToken()
    try {
        const response = await PatchReq({
            url: `/admin/${type}/disable/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        fetchData()
        handleInvalidToken(response);
    }
    catch (error: any) {
        console.error('Error fetching data:', error);
        handleInvalidToken(error.response);

    }
}
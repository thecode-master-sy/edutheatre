import axios from "axios";

async function getUserGoogleData(access_token: any) {

    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        
        return {
            error: false,
            data: data
        }

    } catch (err) {
        console.error('error fetching data: ', err);
        return {
            error: true,
            message: "something went wrong",
            data: null
        };
    }
}

export default getUserGoogleData;

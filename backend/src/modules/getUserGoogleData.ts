import axios from "axios";

async function getUserGoogleData(access_token: any) {

    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;
    try {
        const response = await axios.get(url);
        // const response = await axios.get(
        //     'https://www.googleapis.com/oauth2/v3/userinfo',
        //     {
        //         params: { access_token: access_token },
        //         timeout: 5000  // Adjust timeout value as needed (in milliseconds)
        //     }
        // );
        const data = response.data;

        // console.log(response);
        console.log(data);
        
        
        return {
            error: false,
            // data: data
        }

    } catch (err) {
        console.error('error fetching data: ', err);
        return {
            error: true,
            data: null
        };
    }
}

export default getUserGoogleData;

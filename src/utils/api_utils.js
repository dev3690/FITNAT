import axios from "axios"

const localApiUrl = "http://localhost:3690"
// const localApiUrl = "    "


// All api routes
const getData = localApiUrl + "/getData"
const insertData = localApiUrl + "/insertData"
const insertPatient = localApiUrl + "/insertPatient"
const loginApi = localApiUrl + "/login"
const birdViewApi = localApiUrl + "/birdView"
const updateData = localApiUrl + "/updateData"




const headers = {
    'Content-Type': 'application/json'
}


// common function to make api calls
const callAxiosApi = async (url = "", body = {}) => {
    let data = JSON.stringify(body);

    let config = {
        method: 'post',
        url: url,
        headers: headers,
        data: data
    };

    try {
        let response = await axios.request(config)
        return response
    } catch (error) {
        return error
    }

}

// table names

const USER = "user"
const STATUS = "statusUpdate"
const PATIENT = "patient"


export { getData ,insertData,insertPatient,loginApi,updateData,birdViewApi,callAxiosApi,USER,PATIENT,STATUS}
import axios from "axios"

const localApiUrl = "https://fitnat.onrender.com"
// const localApiUrl = "    "


// All api routes
const getData = `${localApiUrl}/getData`
const insertData = `${localApiUrl}/insertData`
const insertPatient = `${localApiUrl}/insertPatient`
const loginApi = `${localApiUrl}/login`
const birdViewApi = `${localApiUrl}/birdView`
const updateData = `${localApiUrl}/updateData`
const deleteData = `${localApiUrl}/deleteData`
const getDashboardData = `${localApiUrl}/getDashboardData`


const headers = {
    'Content-Type': 'application/json'
}


// common function to make api calls
const callAxiosApi = async (url = "", body = {}) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        url,
        headers,
        data
    };

    try {
        const response = await axios.request(config)
        return response
    } catch (error) {
        return error
    }

}

// table names

const USER = "user"
const STATUS = "statusUpdate"
const PATIENT = "patient"


export { USER, STATUS, getData, PATIENT, deleteData, loginApi, insertData, updateData, birdViewApi,getDashboardData, callAxiosApi, insertPatient }
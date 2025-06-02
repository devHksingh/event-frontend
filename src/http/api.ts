import axios from "axios"

const api = axios.create({
    baseURL:import.meta.env.VITE_PUBLIC_BACKEND_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

const getEventData= async(data:{searchPara:string})=>{
    return await api.post(`/api/v1/events/getEventDetails`,data)
}

export {
    getEventData
}
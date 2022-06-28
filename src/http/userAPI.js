import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (name, surname, patronymic, /*phone,*/ birthday, email, password)=>{
    const {data} = await $host.post('api/user/registration', {name, surname, patronymic, /*phone,*/ birthday, email, password, role: "ADMIN"})
    console.log(data)
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password)=>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const check = async ()=>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const sendNewReview = async (rate, deviceId, advantages, disadvantages, comment)=>{
    const {data} = await $authHost.post('api/rating', {rate, deviceId, advantages, disadvantages, comment})
    return data;
}

export const addToBasket = async (deviceId)=>{
    const {data} = await $authHost.post('api/basket', {deviceId})
    return data;
}

export const getBasketDevices = async ()=>{
    const basket = await $authHost.get('api/basket')
    return basket.data.array;
}

export const getTypes = async ()=>{
    const types = await $host.get('api/type')
    return types.data;
}

export const getBrands = async ()=>{
    const brands = await $host.get('api/brand')
    return brands.data;
}

export const getDevices = async ()=>{
    const devices = await $host.get('api/device/getAll')
    return devices.data;
}
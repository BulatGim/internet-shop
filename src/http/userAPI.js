import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (name, surname, patronymic, /*phone,*/ birthday, email, password)=>{
    const {data} = await $host.post('api/user/registration', {name, surname, patronymic, /*phone,*/ birthday, email, password, role: "ADMIN"})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password)=>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const updateUserData = async (name, surname, patronymic, /*phone,*/ birthday, email, password)=>{
    const {data} = await $authHost.put('api/user/change', {name, surname, patronymic, /*phone,*/ birthday, email, password, role: "ADMIN"})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token);
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
export const newOrder = async (devices)=>{
    console.log(devices)
    const order = await $authHost.post('api/orders', devices)
    return order.data;
}

export async function addToBasketAndInform(id, context) {
    try {
        const data = await addToBasket(id)
        if (data){
            let basketDevices = await getBasketDevices()
            context.basket.setUserBasket(basketDevices)
            context.service.setModal(true,"success", "Товар успешно добавлен в корзину")
        }
    }catch (e) {
        context.service.setModal(true,"error", e.message)
    }
}

export const createNewDialog = async (title, description)=>{
    const {data} = await $authHost.post('api/dialogs', {title, description})
    return data;
}

export const fetchSomeData = async (address, setter)=>{
    const {data} = await $host.get('api/'+address)
    return setter(data);
}

export const fetchSomeDataConfig = async (address, setter)=>{
    const {data} = await $authHost.get('api/'+address)
    setter(data);
}

export const sendMessage = async(description, dialogId) => {
  const {data} = await $authHost.post('api/messages/'+dialogId, {description})
    return data
}
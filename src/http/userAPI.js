import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (name, surname, patronymic, /*phone,*/ birthday, email, password)=>{
    const {data} = await $host.post('api/user/registration', {name, surname, patronymic, /*phone,*/ birthday, email, password, role: "ADMIN"})
    return jwtDecode(data.token)
}

export const login = async (email, password)=>{
    const {data} = await $host.post('api/user/login', {email, password})
    return jwtDecode(data.token)
}

export const check = async (password, email)=>{
    const responce = await $host.post('api/auth/registration', {email, password, role: "ADMIN"})
    return responce
}
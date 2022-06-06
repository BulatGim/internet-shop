import React from "react";
import {Routes, Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from "./routes";
import { useContext } from "react";
import {Context} from "../index"

const AppRouter = ()=>{
    const {user} = useContext(Context);
    return(
        <Routes>
            {user.isAuth && authRoutes.map(({path, Element})=>
                <Route key={path} path={path} element={Element} exact/>
            )}
            {publicRoutes.map(({path, Element})=>
                <Route key={path} path={path} element={Element} exact/>
            )}
        </Routes>
    )
}

export default AppRouter;
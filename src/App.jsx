import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routing/AppRouter';
import Header from "./organisms/Header/Header";
import Footer from "./organisms/Footer/Footer";
import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, getTypes, getBrands, getDevices} from "./http/userAPI";

const App = observer(()=> {
    const {user, basket, service, devices} = useContext(Context);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true)
        }).then(()=>{
            basket.setBasketDevices()
        }).then(getTypes).then(data=>{
            devices.setTypes(data)
        }).then(getBrands).then(data=>{
            devices.setBrands(data)
        }).then(getDevices).then(data=>{
            devices.setDevices(data)
        }).finally(()=>setLoading(false))
    }, [])
    useEffect(() => {
        service.overFlowHidden ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [service.overFlowHidden])
  return (
      <div className="App">
          <BrowserRouter>
              <Header />
              <AppRouter />
              <Footer/>
          </BrowserRouter>
      </div>
  );
})

export default App;

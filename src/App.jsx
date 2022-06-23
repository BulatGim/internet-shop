import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routing/AppRouter';
import Header from "./organisms/Header/Header";
import Footer from "./organisms/Footer/Footer";
import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, getBasketDevices} from "./http/userAPI";

const App = observer(()=> {
    const {user, basket} = useContext(Context);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true)
        }).then(getBasketDevices).then(data=>{
            basket.setUserBasket(data)
        }).finally(()=>setLoading(false))
    }, [])
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

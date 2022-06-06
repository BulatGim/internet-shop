import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routing/AppRouter';
import Header from "./organisms/Header/Header";
import Footer from "./organisms/Footer/Footer";
import {useState} from "react";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Header />
              <AppRouter />
              <Footer/>
          </BrowserRouter>
      </div>
  );
}

export default App;

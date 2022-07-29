import React from 'react';
import style from "./MainPage.module.css";
import image from "../../images/10668.jpg";
import RegistrationModal from '../Registration';
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../UserProfile';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const MainPage = () => {
  const [user, loading, error] = useAuthState(auth);
   
  return (
    <div className={style.mainpage}>
      <div>
        <img className={style.image} src={image} alt="Logo not found" />
      </div>
      <div className={style.info}>
        <p className={style.mainname}>"Pets to you"</p>
        <p className={style.maintext}>
          Первая платформа в Узбекистане для поиска и пристройства питомцев с простым и понятным интерфейсом.
          Здесь Вы можете опубликовать свое объявление или же найти свою родную душу.
          <p>
            Часто люди заводят собаку или кошку, не до конца осознавая, что животное в доме – это определенные
            сложности и большая ответственность. Поэтому прежде чем заводить питомца,
            <NavLink to={"/how-to-care"}> оцените </NavLink> свои силы.          </p>
          Ваши будущие питомцы ждут вас!
        </p>

        {user == undefined && <RegistrationModal />}
        {user != undefined && (
          <Button type="primary">
            <NavLink to="/create-item">Добавить объявление</NavLink>
          </Button>
        )}
      </div>
    </div>
  );
}

export default MainPage;
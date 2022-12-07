import React, {useState, useRef, useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'


export default function Header() {


   const [isAuth, setIsAuth] = useState(false)
   const inputRef = useRef()

   useEffect(() => {
      if (localStorage.getItem('token')) {
         setIsAuth(true)
         console.log(localStorage.getItem('token'))
      }
   }, [])


   const onButtonClick = () => {
      if (!isAuth) {
         setIsAuth(true)
         localStorage.setItem('token', inputRef.current.value)
      } else {
         setIsAuth(false)
         localStorage.removeItem('token')
      }
   }

   return (
      <header className="header">

         {isAuth
            ? <p className='header__auth-status'>Авторизовано</p>
            : <input
               className="token__input"
               name="password"
               type="password"
               id="password-input"
               placeholder="Токен"
               required
               ref={inputRef}
            />}

         <Button variant="primary"
                 className='header__button'
                 onClick={onButtonClick}
         >{isAuth ? 'Relogin' : 'Auth'}</Button>
      </header>

   )
}
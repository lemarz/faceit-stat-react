import React from "react";
import OptionButton from "./OptionButton";
import {useNavigate} from 'react-router-dom'

export default function Pick() {

   const navigate = useNavigate()

   return (
      <>
         <h3 className="popup__title">Выбор функции</h3>
         <div className="pick__container">

            <OptionButton
               title={'Получить ID игрока'}
               name={'GetId'}
               onClick={() => navigate('get-id')}
            />


            <OptionButton
               title={'Найти совместные матчи'}
               name={'FindCommonMatches'}
               onClick={() => navigate('find-common')}
            >
            </OptionButton>

         </div>
      </>


   )
}
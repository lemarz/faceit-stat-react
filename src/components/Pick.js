import React from "react";
import OptionButton from "./OptionButton";

export default function Pick({onChoice}) {

   const clickHandler = (e) => {
      onChoice(e.target.name)
   }

   return (
      <>
         <h3 className="popup__title">Выбор функции</h3>
         <div className="pick__container">

            <OptionButton
               title={'Получить ID игрока'}
               name={'GetId'}
               onClick={clickHandler}
            />


            <OptionButton
               title={'Найти совместные матчи'}
               name={'FindCommonMatches'}
               onClick={clickHandler}
            />


         </div>
      </>


   )
}
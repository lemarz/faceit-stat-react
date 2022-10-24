import Form from "../Form";
import React from "react";
import api from "../../utils/Api";

export default function GetId() {

   const nickNameRef = React.useRef()

   const [id, setId] = React.useState('')
   const [error, setError] = React.useState('')
   const [isButtonValid, setIsButtonValid] = React.useState(true)

   const setButtonValidity = () => {
      nickNameRef.current.value.length > 2
         ? setIsButtonValid(true)
         : setIsButtonValid(false)
   }

   const onSubmit = () => {

      api.playerId(nickNameRef.current.value)
         .then(res => {
            setError('')
            setId(res)
         })
         .catch(err => {
            err === "Ошибка: 404"
               ? setError('Пользователь не найден')
               : setError(err)

            setId('')
            nickNameRef.current.value = ''
         })
   }

   return (
      <Form
         formTitle={'Получить ID игрока'}
         buttonText={'Получить'}
         isButtonValid={isButtonValid}
         onSubmit={onSubmit}
         error={error}

         result={
            <p className="popup_result">{id}</p>
         }

         children={
            <input className="popup__input"
                   id="input"
                   name="res"
                   placeholder="Ник игрока"
                   type="text"
                   onInput={setButtonValidity}
                   ref={nickNameRef}
            />
         }
      ></Form>


   )
}
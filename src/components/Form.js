import React from "react";

export default function Form({formTitle, children, buttonText, error, result, isButtonValid, onSubmit}) {


   const submitHandler = (e) => {
      e.preventDefault()
      onSubmit()
   }


   return (
      <>
         <h3 className="popup__title">{formTitle}</h3>

         <form className="popup__form">

            {children}

            <button
               className={`button popup__submit-button ${isButtonValid ? '' : 'popup__submit-button_disabled'}`}
               type="submit"
               onClick={submitHandler}
               disabled={!isButtonValid}
            >
               {buttonText}
            </button>
            <span className="popup__input-error">{error}</span>
            {result}
         </form>
      </>
   )
}
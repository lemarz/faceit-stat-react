import React from "react";

export default function OptionButton({title, name, onClick}) {


   return (
      <button
         className="button button__option"
         type="button"
         name={name}
         onClick={onClick}
      >{title}
      </button>
   )
}
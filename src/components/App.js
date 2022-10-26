import React from "react";
import Pick from "./Pick";
import GetId from "./mode/GetId";
import FindCommonMatches from "./mode/FindCommonMatches"


export default function App() {

   const [mode, setMode] = React.useState('pick')

   const goToPick = () => {
      setMode('pick')
   }

   const
      choiceHandler = (chose) => {
         setMode(chose)
      }

   return (
      <div className="popup__container">

         {
            {
               'pick': <Pick onChoice={choiceHandler}/>,

               'GetId': <GetId/>,
               'FindCommonMatches': <FindCommonMatches/>
            }[mode]
         }


         {mode !== 'pick' &&
            <button className="button button__return" type="button" onClick={goToPick}>←</button>
         }
      </div>
   )
}


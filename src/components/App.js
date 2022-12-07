import React from "react";
import Pick from "./Pick";
import GetId from "./mode/GetId";
import FindCommonMatches from "./mode/FindCommonMatches"
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Header from "./Header";


export default function App() {

   const location = useLocation()
   const navigate = useNavigate()

   return (
      <>
         <Header/>

         <div className="popup__container">

            {location.pathname !== '/' &&
               <button className="button button__return"
                       type="button"
                       onClick={() => navigate('/')}
               >←</button>}

            <Routes>
               <Route path='/' element={<Pick/>}/>
               <Route path='/get-id' element={<GetId/>}/>
               <Route path='/find-common' element={<FindCommonMatches/>}/>

               <Route path='' element={<Pick/>}/>

            </Routes>

         </div>
      </>
   )

}


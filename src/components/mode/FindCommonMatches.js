import Form from "../Form";
import React, {useRef, useState} from "react";
import api from "../../utils/Api";


export default function FindCommonMatches() {

   const firstPlayerRef = useRef()
   const secondPlayerRef = useRef()

   const [buttonText, setButtonText] = useState('Найти')
   const [commonMatches, setCommonMatches] = useState([])
   const [isButtonValid, setIsButtonValid] = useState(false)

   const setValidity = (e) => {
      if (firstPlayerRef.current.value.length > 2 && secondPlayerRef.current.value.length > 2) {
         setIsButtonValid(true)
      } else {
         setIsButtonValid(false)
      }
   }

   const onButtonSubmit = () => {
      mainFun(
         firstPlayerRef.current.value,
         secondPlayerRef.current.value
      )
   }

   const findCommon = (arr1, arr2) => {
      arr1.forEach(item1 => {
         arr2.forEach(item2 => {
            item1.match_id === item2.match_id && setCommonMatches(prevState => [...prevState, item1.match_id])
         })
      })

      setButtonText('Готово')
   }

   const mainFun = (name1, name2) => {
      setCommonMatches([])
      setButtonText('В процессе...')
      // * Объект информации игроков
      const playersObj = {
         firstPlayer: {'id': '', 'matches': '', 'matchesArr': []},
         secondPlayer: {'id': '', 'matches': '', 'matchesArr': []}
      }
      const {firstPlayer, secondPlayer} = playersObj

// * Получить id игроков >>> playersObj
      Promise.all([
         api.playerId(name1),
         api.playerId(name2)
      ])
         .then(([id1, id2]) => {
            firstPlayer.id = id1
            secondPlayer.id = id2
         })
         .catch(() => {
            setButtonText('Что-то пошло не так 😢')
            // debugger
         })
         .then(() =>
            // * Получить колличество матчей >>> playersObj
            Promise.all([
               api.playerStatistic(firstPlayer.id),
               api.playerStatistic(secondPlayer.id)
            ])
               .then(([matchesNum1, matchesNum2]) => {
                  firstPlayer.matches = matchesNum1.lifetime.Matches
                  secondPlayer.matches = matchesNum2.lifetime.Matches
               })

               .then(() => {
                  // * Получить всю информацию о матчах Первого игрока >>> playersObj
                  Promise.all([
                     api.playerMatches(firstPlayer.id, 0),
                     api.playerMatches(firstPlayer.id, 100),
                     api.playerMatches(firstPlayer.id, 200),
                     api.playerMatches(firstPlayer.id, 300),
                     api.playerMatches(firstPlayer.id, 400),
                     api.playerMatches(firstPlayer.id, 500),
                     api.playerMatches(firstPlayer.id, 600),
                     api.playerMatches(firstPlayer.id, 700),
                     api.playerMatches(firstPlayer.id, 800),
                     api.playerMatches(firstPlayer.id, 900),
                     api.playerMatches(firstPlayer.id, 1000),

                  ])
                     .then(([res1, res2, res3, res4, res5,
                               res6, res7, res8, res9, res10]) => {
                        firstPlayer.matchesArr = [
                           ...res1,
                           ...res2,
                           ...res3,
                           ...res4,
                           ...res5,
                           ...res6,
                           ...res7,
                           ...res8,
                           ...res9,
                           ...res10
                        ]
                     })

               }).catch(err => {
               console.error(err)
               setButtonText('Что-то пошло не так 😢')
            })

               .then(() => {
                  // * Получить всю информацию о матчах Второго игрока >>> playersObj
                  Promise.all([
                     api.playerMatches(secondPlayer.id, 0),
                     api.playerMatches(secondPlayer.id, 100),
                     api.playerMatches(secondPlayer.id, 200),
                     api.playerMatches(secondPlayer.id, 300),
                     api.playerMatches(secondPlayer.id, 400),
                     api.playerMatches(secondPlayer.id, 500),
                     api.playerMatches(secondPlayer.id, 600),
                     api.playerMatches(secondPlayer.id, 700),
                     api.playerMatches(secondPlayer.id, 800),
                     api.playerMatches(secondPlayer.id, 900),
                     api.playerMatches(secondPlayer.id, 1000),

                  ])
                     .then(([res1, res2, res3, res4, res5,
                               res6, res7, res8, res9, res10]) => {
                        secondPlayer.matchesArr = [
                           ...res1,
                           ...res2,
                           ...res3,
                           ...res4,
                           ...res5,
                           ...res6,
                           ...res7,
                           ...res8,
                           ...res9,
                           ...res10
                        ]
                     })
                     .then(() => {
                        // * Поиск
                        if (firstPlayer.matchesArr[0] === undefined || secondPlayer.matchesArr[0] === undefined) {
                           setButtonText('Еще немного...')
                           setTimeout(() => {
                              findCommon(firstPlayer.matchesArr, secondPlayer.matchesArr)
                           }, 2000)
                        } else {
                           findCommon(firstPlayer.matchesArr, secondPlayer.matchesArr)
                        }

                     })
               })
         )
   }

   return (
      <Form
         formTitle={'Совместные матчи'}
         buttonText={buttonText}
         isButtonValid={isButtonValid}
         onSubmit={onButtonSubmit}
         error={''}
         result={
            commonMatches.map((item, i) => {
               return <a
                  target={"_blank"}
                  className="popup__result-link"
                  key={item}
                  name={`Матч ${i + 1}`}
                  href={`https://www.faceit.com/ru/csgo/room/${item}`}
               >{`Матч ${i + 1}`}</a>
            })
         }
      >
         <input className="popup__input"
                id="input"
                name="res"
                placeholder="Ник первого игрока"
                type="text"
                ref={firstPlayerRef}
                onInput={setValidity}
         />

         <input className="popup__input"
                id="input"
                name="res"
                placeholder="Ник второго игрока"
                type="text"
                ref={secondPlayerRef}
                onInput={setValidity}
         />

      </Form>
   )
}
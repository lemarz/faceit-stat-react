import token from "./token";

class Api {

   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   _handleResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
   }


   playerId(nickName) {
      return fetch(`${this._baseUrl}/players?nickname=${nickName}&game=csgo`,
         {headers: this._headers})
         .then(this._handleResponse)
         .then(({player_id}) => player_id)
   }

}

// * Экземпляр Api
const api = new Api({
   baseUrl: 'https://open.faceit.com/data/v4',
   headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
   }
})

export default api
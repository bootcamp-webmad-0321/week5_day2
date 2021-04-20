
class CharactersApp {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com/'
        })
    }

    getAllCharacters = () => this.api.get('/characters')
    getOneCharacter = id => this.api.get(`/characters/${id}`)
    createNewCharacter = characterInfo => this.api.post('/characters', characterInfo)
    editCharacter = (id, characterInfo) => this.api.put(`/characters/${id}`, characterInfo)
}
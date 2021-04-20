const characters = new CharactersApp()



// Character list refresh
updateCharactersList = () => {
    characters
        .getAllCharacters()
        .then(response => {
            const { data } = response
            let charactersList = ''
            data.reverse().forEach(elm => charactersList += `<li><b>${elm.name} (${elm.id})</b><br> Trabajo: ${elm.occupation}<br> Arma: ${elm.weapon}</li>`)
            document.querySelector('#currentCharacters').innerHTML = charactersList
        })
        .catch(err => console.log('error', err))
}


updateCharactersList()




// New character post
document.querySelector('#newCharacterForm').onsubmit = e => {

    e.preventDefault()              // Avoids form submit

    const inputs = document.querySelectorAll('#newCharacterForm input')

    const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value
    }

    characters
        .createNewCharacter(character)
        .then(() => {
            // inputs.forEach(elm => elm.value = '')
            document.querySelector('#newCharacterForm').reset()
            updateCharactersList()
        })
        .catch(err => console.log('error', err))
}




// Character details get by ID
document.querySelector('#getCharacterDetails').onsubmit = e => {

    e.preventDefault()

    const characterId = document.querySelector('#getCharacterDetails input').value

    characters
        .getOneCharacter(characterId)
        .then(response => {
            fillEditForm(response.data)
            document.querySelector('#getCharacterDetails').reset()
        })
        .catch(err => console.timeLog(err))
}




const fillEditForm = characterInfo => {
    const input = document.querySelectorAll('#editCharacterDetails input')
    input[0].value = characterInfo.name
    input[1].value = characterInfo.occupation
    input[2].value = characterInfo.weapon
    input[3].value = characterInfo.id           // oculto
}



document.querySelector('#editCharacterDetails').onsubmit = e => {

    e.preventDefault()

    const inputs = document.querySelectorAll('#editCharacterDetails input')

    const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value
    }

    const characterId = inputs[3].value

    characters
        .editCharacter(characterId, character)
        .then(() => {
            document.querySelector('#editCharacterDetails').reset()
            updateCharactersList()
        })
        .catch(err => console.timeLog(err))
}
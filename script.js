var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(e){
    
    e.preventDefault()
    //api que sera ultilizada
    let urlForm = 'https://pokeapi.co/api/v2/pokemon/'

    //essa informacao vem do submit do html
    let nome = document.getElementById("nomeDopokemon")

    //concatena a url com o input para que ocorra a busca
    urlForm = (urlForm + this.nomeDopokemon.value).toLocaleLowerCase()

    let resposta = document.getElementById('content')
    let imagem = document.getElementById('imgPokemon')
    let html =''

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function (data){
            console.log(data)
            html = 'Nome: '+ maiuscula(data.name) + '<br>'
            html =  html + 'Type: ' + maiuscula(data.types[0].type.name)
            resposta.innerHTML = html //insere na div selecionado la em cima

            imagem.innerHTML = `<img src=${data.sprites.front_default}><img src=${data.sprites.back_default}>`

        })
        .catch(function(err){
            if (err=='SyntaxError: Unexpected token N in JSON at position 0') {
                html = 'Pokémon não encontrado!'
            } else {
                html = err
            }
            resposta.innerHTML = html
        })
})


function maiuscula(val){
    return (val[0]).toUpperCase() + val.substr(1)
}

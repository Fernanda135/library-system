//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// BARRA DE PESQUISA


function barraDePesquisaLivro(){
    let encontrarLivro = document.getElementById("").value.tolowercase()
    livroIndex = livrosDisponiveis.findIndex(livro => livro.titulo.tolowercase() === encontrarLivro.tolowercase())
    if(livroIndex !== -1){
        alert("Livro Está Disponível Para Locação!")
    }else{
        alert("Livro Está Indisponível Para Locação")
    }
}

function barraDePesquisaUsuario(){//assim que pesquisar usando o email do usuario vai encontrar o cadastro dele
    let encontrarUsuario = document.getElementById("").value.tolowercase()
    usuarioIndex = listaDeUsuarios.findIndex(user => user.email.tolowercase() === encontrarUsuario.tolowercase())//pesquisa usuario pelo email
    if(usuarioIndex !== -1){
        alert("Livro Está Disponível Para Locação!")
    }else{
        alert("Livro Está Indisponível Para Locação")
    }
}

function pesquisar(){
    let termoPesquisa = document.getElementById("barraDePesquisa").value.toLowerCase()
    let filtro = document.getElementById("filtro").value

    if (filtro === "livro") {
        barraDePesquisaLivro(termoPesquisa)
    } else if (filtro === "usuario") {
        barraDePesquisaUsuario(termoPesquisa)
    }
}
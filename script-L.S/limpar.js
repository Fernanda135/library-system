//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// LIMPAR


function limparListaDeUsuarios() {
    localStorage.removeItem("listaDeUsuarios")
    localStorage.removeItem("emprestimosEmAndamento")
    localStorage.removeItem("emprestimosEmDebito")
    alert("Lista de Usuários Vazia!")
}

function limparListaLivros() {
    localStorage.removeItem("listaLivros")
    localStorage.removeItem("livrosDisponiveis")
    localStorage.removeItem("livrosIndisponiveis")
    alert("Lista de Livros Vazia!")
}

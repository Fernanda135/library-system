
let livrosDisponiveis = []
let livrosIndisponiveis = []
let listaDeUsuarios = [1,2 ,3 ,4, 5]

function menu(){
    menu:
    while(true){
        const mensagem =`
        SELECIONE UMA OPÇÃO:
        1 - CADASTRAR LIVROS
        2 - CADASTRAR USUARIOS
        3 - REALIZAR EMPRESTIMOS
        4 - LIVROS CADASTRADOS
        5 - LIVROS EMPRESTADOS
        6 - USUÁRIOS CADASTRADOS
        7 - USUÁRIOS COM EMPRESTIMOS
        8 - EMPRESTIMOS ATIVOS
        9 - EMPRESTIMOS CONCLUIDOS
        10 - EMPRESTIMOS EM DÉBITO
        0 - SAIR
        :`
        
        let opcao = parseInt(prompt(mensagem))
        
        switch(opcao){
            case 1:
                cadastrarLivros()
                break;
            case 2:
                cadastrarUsuarios()
                break;
            case 3:
                cadastrarEmprestimos()
                break;
            case 4:
                livrosCadastrados()
                break;
            case 5:
                livrosEmprestados()
                break;
            case 6:
                usuariosCadastrados()
                break;
            case 7:
                usuariosComEmprestimo()
                break;
            case 8:
                emprestimosAtivos()
                break;
            case 9:
                emprestimosConcluidos()
                break;
            case 10:
                emprestimosEmDebito()
                break;
            case 0:
                break menu
            case undefined:
                console.log("OPÇÃO INVÁLIDA")
                    break;
        }
    }
}

function cadastrarLivros(){
    let livro = prompt("DIGITE O TITULO DO LIVRO: ")
    let autor = prompt("DIGITE O AUTOR DO LIVRO: ")
    let livroObj = {titulo: livro, autor: autor}
    listaLivros.push(livroObj)
    console.log("LIVRO CADASTRADO!")
}

function cadastrarUsuarios(){
    let nome = prompt("DIGITE O NOME DO USUÁRIO: ")
    let mail = prompt("DIGITE O ENDEREÇO DE EMAIL DO USÚARIO: ")
    let numero = prompt("DIGITE O NUMERO DO USUÁRIO: ")
    let usuario = {nome: nome, email: mail, numero: numero}
    listaDeUsuarios.push(usuario)
    console.log("USUÁRIO CADASTRADO!")
}

function cadastrarEmprestimos(){

}

function cadastrarDevolucoes(){

}

menu()

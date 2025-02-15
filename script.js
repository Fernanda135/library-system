//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// LISTAS


let listaLivros = []
let listaDeUsuarios = []
let livrosDisponiveis = []
let livrosIndisponiveis = []
let emprestimosEmAndamento = []
let emprestimosEmDebito = []


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// JSON.parse


window.onload = function() { // função que ocorre na hora que recarrega o site, ela vai estar armazenando cada array
    
    listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || []
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
    livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
    emprestimosEmAndamento = JSON.parse(localStorage.getItem("emprestimosEmAndamento")) || []
    emprestimosEmDebito = JSON.parse(localStorage.getItem("emprestimosEmDebito")) || []//JSON.parse convete uma string JSON em objeto JavaScript
}


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


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// CADASTRAR


function cadastrarLivros(){
    let tituloLivro = document.getElementById("titulo").value //vai armazenar o dado digitado (vai manipular os dados do ID no HTML)
    let autor = document.getElementById("autor").value
    let anoPublicacao = document.getElementById("ano").value

    let livroObj = {titulo: tituloLivro, autor: autor, anoPublicacao: anoPublicacao}// cria um obj com as propiedades digitadas
    let livroIndex = listaLivros.findIndex(livro => livro.titulo.tolowercase() === tituloLivro.tolowercase())

    if(livroIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
        listaLivros.push(livroObj)
        listaLivros.sort((a, b) => a.titulo.localeCompare(b.titulo))
        localStorage.setItem("listaLivros", JSON.stringify(listaLivros))// salva os dados na maquina podendo fechar pagina
        alert("Livro Cadastrado!")
    }else{
        alert("Livro já está cadastrado!")
    }
}

function cadastrarUsuarios(){
    let usuario = document.getElementById("usuario").value //vai armazenar o dado digitado
    let email = document.getElementById("email").value
    let telefone = document.getElementById("telefone").value
    let dadosUsuarioObj = {nome: usuario, email: email, telefone: telefone} // cria um obj com as propiedades digitadas
    let dadosUsuarioIndex = listaDeUsuarios.findIndex(user => user.email.tolowercase() === email.tolowercase())

    if (dadosUsuarioIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
    listaDeUsuarios.push(dadosUsuarioObj)
    listaDeUsuarios.sort((a, b) => a.nome.localeCompare(b.nome))
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios)) // converte o objeto em string JSON e salva no storage (o que está dentro das aspas é a chave da lista)
    alert("Cadastro concluído")
    }else{
        alert("Usuário já está cadastrado")
    }
}

function retirarCadastro(){
    let retirarUsuario = document.getElementById("retirarUsuario").value
    let dadosUsuarioIndex = listaDeUsuarios.findIndex(user => user.email.tolowercase() === retirarUsuario.tolowercase())
    if(dadosUsuarioIndex !== -1){
        listaDeUsuarios.splice(dadosUsuarioIndex, 1)
        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios))
    }else{
        alert("Usuário não existe!")
    }
}

function cadastrarEmprestimos(){//troquei usuario por email - pode dar errado
    let emailUsuario = document.getElementById("emailUsuario").value
    let usuario = listaDeUsuarios.find(user => user.email === emailUsuario)//o .find vai retornar o item para variavel usuario

    if(usuario) { //esse if só vai entrar se o usuário for encontrado(o resultado do .find for === true).
        let tituloLivro = document.getElementById("tituloLivro").value
        let dataEmprestimo = document.getElementById("dataEmprestimo").value
        let emprestimo = {...usuario, livro: tituloLivro, dataEmprestimo: dataEmprestimo}
        emprestimosEmAndamento.push(emprestimo)
        emprestimosEmAndamento.sort((a, b) => a.nome.localeCompare(b.nome))
        localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))// converte o objeto em string JSON e salva no storage


        livrosDisponiveis.sort((a, b) => a.titulo.localeCompare(b.titulo))
        let livroIndex = livrosDisponiveis.findIndex(livro => livro.titulo.tolowercase() === tituloLivro.tolowercase())

        if(livroIndex !== -1) { // se o resultdo do findIndex for diferente de -1 ele entra(se o findIndex for true ele sempre retorno um numero diferente de -1)
            let livroObj = livrosDisponiveis[livroIndex]
            livrosDisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros disponíveis
            localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))// converte o objeto em string JSON e salva no storage

            livrosIndisponiveis.push({...livroObj, dataEmprestimo: dataEmprestimo})
            livrosIndisponiveis.sort((a, b) => a.titulo.localeCompare(b.titulo))
            localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))// converte o objeto em string JSON e salva no storage
            alert("Empréstimo registrado com sucesso!")
        } else {
            alert("Livro indisponível!")
        }
    } else {
        alert("Usuário não encontrado!")
    }
}

function cadastrarDevolucoes(){
    let tituloLivro = document.getElementById("tituloLivroDevolucao").value
    let livroIndex = livrosIndisponiveis.findIndex(livro => livro.titulo === tituloLivro) 

    if(livroIndex !== -1) {
        let livroObj = livrosIndisponiveis[livroIndex]
        livrosIndisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros indisponíveis
        localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))// converte o objeto em string JSON e salva no storage

        livrosDisponiveis.push(livroObj)
        localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))// converte o objeto em string JSON e salva no storage

        let emprestimoIndex = emprestimosEmAndamento.findIndex(emprestimo => emprestimo.titulo.tolowercase() === tituloLivro.tolowercase())

        if(emprestimoIndex !== -1) {    
            let emprestimoObj = emprestimosEmAndamento[emprestimoIndex]
            let dataEmprestimo = new Date(emprestimoObj.dataEmprestimo)
            let dataDevolucao = new Date()

            /*A subtração entre duas as  datas retorna a diferença em milissegundos.
            Multiplicamos 1000 milissegundos (1 segundo) por 60 (1 minuto) por 60 (1 hora) por 24 (1 dia) para obter o número de milissegundos em um dia.
            logo após arredonda para baixo (math.floor)*/
            let diferencaDias = Math.floor((dataDevolucao - dataEmprestimo) / (1000 * 60 * 60 * 24)) 
            

            /* o (?) significa if e o (:) siginifica else
            se diferencaDias for maior que 7 -> multa = (diferencaDias - 7) * 1 . senão -> multa = 0 */
            let multa = diferencaDias > 7 ? (diferencaDias - 7) * 1 : 0
            if (multa > 0) {
                emprestimosEmDebito.push(emprestimosEmAndamento[emprestimoIndex])//vai colocar o objeto que esta constando como em debito na array emprestimosEmDebito
                emprestimosEmAndamento.splice(emprestimoIndex, 1)
                alert(`Devolução registrada com sucesso! Usuário deve pagar uma multa de R$ ${multa}.`)
            } else {
                alert("Devolução registrada com sucesso! Nenhuma multa aplicada.")
            }
            localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))// converte o objeto em string JSON e salva no storage
            localStorage.setItem("emprestimosEmDebito", JSON.stringify(emprestimosEmDebito))// converte o objeto em string JSON e salva no storage
        }
        alert("Devolução registrada com sucesso e usuário desvinculado!")
    }else{
        alert("Livro não encontrado na lista de indisponíveis!")
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// CALCULA MULTA AUTOMATICA


window.onload = function() {
    const dataAtual = new Date();

    console.log("1111", emprestimosEmAndamento)
    emprestimosEmAndamento?.forEach((emprestimo, index) => {
        const dataLocacao = new Date(emprestimosEmAndamento.dataLocacao);
        const diferencaDias = Math.floor((dataAtual - dataLocacao) / (1000 * 60 * 60 * 24));

        let tituloLivro = emprestimosEmAndamento.livro
        let dataEmprestimo = emprestimosEmAndamento.dataEmprestimo
        let nome = emprestimosEmAndamento.nome
        let email = emprestimosEmAndamento.email
        let telefone = emprestimosEmAndamento.telefone
        
        // Verifica se o empréstimo está em débito
        if (diferencaDias > 7) {

            // Calcula a multa
            const multa = (diferencaDias - 7) * 1; // 1 real por dia após 7 dias

            emprestimosEmAndamento.splice(index, 1)// retira da lista emprestimosEmAndamento
            let usuarioDebitoObj = {nome: nome, email: email, telefone: telefone, livro: tituloLivro, dataEmprestimo: dataEmprestimo, multa: multa}
            emprestimosEmDebito.push(usuarioDebitoObj)
        }
    });

    // Atualiza a lista de empréstimos em débito no localStorage
    localStorage.setItem("emprestimosEmDebito", JSON.stringify(emprestimosEmDebito));
}


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


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// EXIBIR TUDO


function exibirUsuarios(){
    if (listaDeUsuarios && Array.isArray(listaDeUsuarios)) {//confere se realmente é um array
        let lista = document.getElementById("lista")
        lista.innerHTML = ""

        listaDeUsuarios.forEach(function(usuario) {
            let item = document.createElement("li")
            item.textContent = `Nome: ${usuario.nome} Email: ${usuario.email}, Telefone: ${usuario.telefone}`
            lista.appendChild(item)
        })
    } else {
    console.error('Nenhum Usuário encontrado.');
    }
}

function exibirLivrosDisponiveis(){
    if (livrosDisponiveis && Array.isArray(livrosDisponiveis)) {
        let lista = document.getElementById("lista")
        lista.innerHTML = ""

        livrosDisponiveis.forEach(function(livro) {
            let item = document.createElement("li")
            item.textContent = `Titulo: ${livro.titulo} Autor: ${livro.autor} Ano Publicação: ${livro.anoPublicacao} `
            lista.appendChild(item)
        })
    } else {
    console.error('Nenhum livro disponível encontrado.');
    }
}

function exibirLivrosIndisponiveis(){
    if (livrosIndisponiveis && Array.isArray(livrosIndisponiveis)) {
        let lista = document.getElementById("lista")
        lista.innerHTML = ""

        livrosIndisponiveis.forEach(function(livro) {
            let item = document.createElement("li")
            item.textContent = `Titulo: ${livro.titulo} Autor: ${livro.autor} Ano Publicação: ${livro.anoPublicacao} `
            lista.appendChild(item)
        })
    } else {
    console.error("Nenhum livro indisponível encontrado.");
    }
}

function exibirEmprestimosAtivos(){
    if (emprestimosEmAndamento && Array.isArray(emprestimosEmAndamento)) {
        let lista = document.getElementById("lista")
        lista.innerHTML = ""

        emprestimosEmAndamento.forEach(function(emprestimo) {
            let item = document.createElement("li")
            item.textContent = `Nome: ${emprestimo.nome} Livro: ${emprestimo.livro} Data Locação: ${emprestimo.dataEmprestimo}`
            lista.appendChild(item)
        })
    } else {
    console.error('Nenhum emprestimo ativo.');
    }
}

function exibirEmprestimosEmDebito(){
    if (emprestimosEmDebito && Array.isArray(emprestimosEmDebito)) {
        let lista = document.getElementById("lista")

        emprestimosEmDebito.forEach(function(emprestimo) {
            let item = document.createElement("li")

            let dataEmprestimo = new Date(emprestimo.dataEmprestimo);
            let dataDevolucao = new Date();
            let diferencaDias = Math.floor((dataDevolucao - dataEmprestimo) / (1000 * 60 * 60 * 24));
            let multa = diferencaDias > 7 ? (diferencaDias - 7) * 1 : 0

            item.textContent = `Nome: ${emprestimo.nome} Livro: ${emprestimo.livro} Data Locação: ${emprestimo.dataEmprestimo} Multa: R$ ${multa}`
            lista.appendChild(item)
        })
    } else {
    console.error('Nenhum emprestimo em débito.');
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
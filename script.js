//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// LISTAS


let listaLivros = []
let listaDeUsuarios = []
let livrosDisponiveis = []
let livrosIndisponiveis = []
let emprestimosEmAndamento = []
let emprestimosEmDebito = []
let historicoEmprestimos = []


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// FUNÇÕES AUTOMÁTICAS


window.onload = function() { // função que ocorre na hora que recarrega o site, ela vai estar armazenando cada array
    
    listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || []
    console.log(listaLivros)
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    console.log(listaDeUsuarios)
    livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
    console.log(livrosDisponiveis)
    livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
    console.log(livrosIndisponiveis)
    emprestimosEmAndamento = JSON.parse(localStorage.getItem("emprestimosEmAndamento")) || []
    console.log(emprestimosEmAndamento)
    emprestimosEmDebito = JSON.parse(localStorage.getItem("emprestimosEmDebito")) || []//JSON.parse convete uma string JSON em objeto JavaScript
    console.log(emprestimosEmDebito)







//-----------------------------------------------------------------------------------------------------------------------------------------------
// CALCULA MULTA A CADA CARREGAMENTO   

    if(emprestimosEmDebito.length<=0){
        const dataAtual = new Date();


        let emprestimosParaRemover = []

        emprestimosEmAndamento.forEach((emprestimo) => {
            const dataLocacao = new Date(emprestimo.dataEmprestimo);
            const diferencaDias = Math.floor((dataAtual - dataLocacao) / (1000 * 60 * 60 * 24));

            // Verifica se o empréstimo está em débito
            if (diferencaDias > 7) {
            

            
            let tituloLivro = emprestimo.titulo
            let dataEmprestimo = emprestimo.dataEmprestimo
            let nome = emprestimo.nome
            let email = emprestimo.email
            let telefone = emprestimo.telefone
        

            // Calcula a multa
            const multa = (diferencaDias - 7) * 1; // 1 real por dia após 7 dias

            
            let usuarioDebitoObj = {nome: nome, email: email, telefone: telefone, livro: tituloLivro, dataEmprestimo: dataEmprestimo, multa: multa}
            emprestimosEmDebito.push(usuarioDebitoObj)
            emprestimosParaRemover.push(emprestimo)
            }
        });

    // retira da lista emprestimosEmAndamento
    emprestimosEmAndamento = emprestimosEmAndamento.filter(emprestimo => !emprestimosParaRemover.includes(emprestimo))
    // Atualiza a lista de empréstimos em débito no localStorage
    localStorage.setItem("emprestimosEmDebito", JSON.stringify(emprestimosEmDebito))
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// FILTRAR ARRAY


function filtrarArray(array1, array2){
    for (let i = array1.length - 1; i >= 0; i--) {
        if (!array2.includes(array1[i])) {
            array1.splice(i, 1); // Remove o item se não estiver em array2
        }
    }
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
    localStorage.removeItem("emprestimosEmAndamento")
    localStorage.removeItem("emprestimosEmDebito")
    alert("Lista de Livros Vazia!")
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// CADASTRAR


function cadastrarLivros(event){

    event.preventDefault()

    let tituloLivro = document.getElementById("titulo").value //vai armazenar o dado digitado (vai manipular os dados do ID no HTML)
    let autor = document.getElementById("autor").value
    let ano = document.getElementById("ano").value
    console.log(`Título: ${tituloLivro}, Autor: ${autor}, Ano: ${ano}`)

    let livroObj = {titulo: tituloLivro, autor: autor, anoPublicacao: ano}// cria um obj com as propiedades digitadas
    let livroIndex = listaLivros.findIndex(livro => livro.titulo.toLowerCase() === tituloLivro.toLowerCase())

    if(livroIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
        listaLivros.push(livroObj)
        livrosDisponiveis.push(livroObj)
        listaLivros.sort((a, b) => a.titulo.localeCompare(b.titulo))
        localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))// salva os dados na maquina podendo fechar pagina
        localStorage.setItem("listaLivros", JSON.stringify(listaLivros))// salva os dados na maquina podendo fechar pagina


         emprestimosEmAndamento
        alert("Livro Cadastrado!")
    }else{
        alert("Livro já está cadastrado!")
    }
}

function cadastrarUsuarios(event){

    event.preventDefault()

    let usuario = document.getElementById("usuario").value //vai armazenar o dado digitado
    let email = document.getElementById("email").value
    let telefone = document.getElementById("telefone").value
    let dadosUsuarioObj = {nome: usuario, email: email, telefone: telefone} // cria um obj com as propiedades digitadas
    let dadosUsuarioIndex = listaDeUsuarios.findIndex(user => user.email.toLowerCase() === email.toLowerCase())

    if (dadosUsuarioIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
    listaDeUsuarios.push(dadosUsuarioObj)
    listaDeUsuarios.sort((a, b) => a.nome.localeCompare(b.nome))
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios)) // converte o objeto em string JSON e salva no storage (o que está dentro das aspas é a chave da lista)
    alert("Cadastro concluído")
    }else{
        alert("Usuário já está cadastrado")
    }
}

function retirarCadastro(event){

    event.preventDefault()

    let retirarUsuario = document.getElementById("retirarUsuario").value
    let dadosUsuarioIndex = listaDeUsuarios.findIndex(user => user.email.toLowerCase() === retirarUsuario.toLowerCase())

    
    if(dadosUsuarioIndex !== -1){
        listaDeUsuarios.splice(dadosUsuarioIndex, 1)
        alert("Usuário retirado com sucesso!")
        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios))
        let dadosEmprestimoIndex = emprestimosEmAndamento.findIndex(user => user.email.toLowerCase() === retirarUsuario.toLowerCase())
        localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))


        if (dadosEmprestimoIndex !== -1){
        emprestimosEmAndamento.splice(dadosEmprestimoIndex, 1)
        localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))
        alert("Usuário retirado de emprestimos em andamento com sucesso!")


        }else{
            let dadosEmprestimoDebitoIndex = emprestimosEmDebito.findIndex(user => user.email.toLowerCase() === retirarUsuario.toLowerCase())
            if (dadosEmprestimoDebitoIndex !== -1){
                emprestimosEmDebito.splice(dadosEmprestimoDebitoIndex, 1)
                localStorage.setItem("emprestimoEmDebito", JSON.stringify(emprestimosEmDebito))
                alert("Usuário retirado de emprestimos em débito com sucesso!")
            }
        }
    }else{
        alert("Usuário não existe!")
    }
}

function cadastrarEmprestimos(event){//troquei usuario por email - pode dar errado

    event.preventDefault()

    let emailUsuario = document.getElementById("emailUsuario").value
    let usuario = listaDeUsuarios.find(user => user.email === emailUsuario)//o .find vai retornar o item para variavel usuario


    if(usuario) { //esse if só vai entrar se o usuário for encontrado(o resultado do .find for === true).
        let tituloLivro = document.getElementById("tituloLivro").value
        let livroIndex = livrosDisponiveis.findIndex(livro => livro.titulo.toLowerCase() === tituloLivro.toLowerCase())

        if(livroIndex !== -1) { // se o resultdo do findIndex for diferente de -1 ele entra(se o findIndex for true ele sempre retorno um numero diferente de -1)
            
            let dataEmprestimo = document.getElementById("dataEmprestimo").value
            let emprestimo = {...usuario, titulo: tituloLivro, dataEmprestimo: dataEmprestimo}
            emprestimosEmAndamento.push(emprestimo)
            emprestimosEmAndamento.sort((a, b) => a.nome.localeCompare(b.nome))
            let colocarLivroInd = livrosDisponiveis[livroIndex]
            livrosDisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros disponíveis
            livrosDisponiveis.sort((a, b) => a.titulo.localeCompare(b.titulo))
            
            localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))// converte o objeto em string JSON e salva no storage
            
            emprestimosEmDebito.splice(livroIndex, 1)
            livrosIndisponiveis.push(colocarLivroInd)
            livrosIndisponiveis.sort((a, b) => a.titulo.localeCompare(b.titulo))

            localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))// converte o objeto em string JSON e salva no storage
            localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))// converte o objeto em string JSON e salva no storage

            alert("Empréstimo registrado com sucesso!")
        } else {
            alert("Livro indisponível!")
        }
    } else {
        alert("Usuário não encontrado!")
    }
}

function cadastrarDevolucoes(event){

    event.preventDefault()

    let tituloLivro = document.getElementById("tituloLivroDevolucao").value
    let livroIndex = livrosIndisponiveis.findIndex(livro => livro.titulo === tituloLivro) 

    if(livroIndex !== -1) {
        let colocarLivroDisp = livrosIndisponiveis[livroIndex]
        livrosIndisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros indisponíveis
        localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))// converte o objeto em string JSON e salva no storage

        livrosDisponiveis.push(colocarLivroDisp)
        localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))// converte o objeto em string JSON e salva no storage

        let emprestimoIndex = emprestimosEmAndamento.findIndex(emprestimo => emprestimo.titulo.toLowerCase() === tituloLivro.toLowerCase())

        historicoEmprestimos.push(emprestimosEmAndamento[emprestimoIndex])
        localStorage.setItem("historicoEmprestimos", JSON.stringify(historicoEmprestimos))

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
                localStorage.removeItem("emprestimosEmDebito")
                emprestimosEmAndamento.splice(emprestimoIndex, 1)
                alert(`Devolução registrada com sucesso! Usuário deve pagar uma multa de R$ ${multa}.`)       
            } else {
                emprestimosEmAndamento.splice(emprestimoIndex, 1)
                alert("Devolução registrada com sucesso! Nenhuma multa aplicada.")
            }
            localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))// converte o objeto em string JSON e salva no storage
            localStorage.setItem("emprestimosEmDebito", JSON.stringify(emprestimosEmDebito))// converte o objeto em string JSON e salva no storage
        }
    }else{
        alert("Livro não encontrado na lista de indisponíveis!")
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// BARRA DE PESQUISA


function barraDePesquisa() {
    let inputElement = document.getElementById("barraDePesquisa")
    let tipoPesquisa = document.getElementById("tipoPesquisa").value
    if (!inputElement) {
        alert("Error: Search field not found.")
        return
    }

    let pesquisaTermo = inputElement.value.toLowerCase()
    
    if(tipoPesquisa === "livros"){
    
        livroIndex = livrosDisponiveis.findIndex(livro => livro.titulo.toLowerCase() === pesquisaTermo)
        if (livroIndex !== -1) {
            alert("Livro Está Disponível Para Locação!")
        }else{
            alert("Livro Está Indisponível Para Locação")
        }
    }else if(tipoPesquisa === "usuarios") {
        let usuarioIndex = listaDeUsuarios.findIndex(usuario => usuario.email.toLowerCase() === pesquisaTermo)
        if(usuarioIndex !== -1){
            alert("Usuário Encontrado: "  + listaDeUsuarios[usuarioIndex].nome)
        }else{
            alert("Usuário Não Encontrado.")
        }
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// EXIBIR TUDO


//60horas pra descobrir a benção desse erro <3  
function addListeners() {
    const exibirUsuariosButton = document.getElementById("carregarUsuarios")
    const disponiveisButton = document.getElementById("carregarDisponiveis")
    const indisponiveisButton = document.getElementById("carregarIndisponiveis")
    const ativosButton = document.getElementById("carregarAtivos")
    const emDebitoButton = document.getElementById("carregarEmDebito")
    
    if(exibirUsuariosButton){
        exibirUsuariosButton.addEventListener("click", exibirUsuarios)
    }
    if(disponiveisButton){
        disponiveisButton.addEventListener("click", exibirLivrosDisponiveis)
    }
    if (indisponiveisButton) {
        indisponiveisButton.addEventListener("click", exibirLivrosIndisponiveis)
    }
    if (ativosButton) {
        ativosButton.addEventListener("click", exibirEmprestimosAtivos)
    }
    if (emDebitoButton) {
        emDebitoButton.addEventListener("click", exibirEmprestimosEmDebito)
    }
   }
   
   document.addEventListener("DOMContentLoaded", function() {
    addListeners()
   })

function exibirUsuarios(){

    if (listaDeUsuarios && Array.isArray(listaDeUsuarios)) {//confere se realmente é um array
        let lista = document.getElementById("exibirListaUsuariosBtn")
        lista.innerHTML = ""
        listaDeUsuarios.forEach(function(usuario) {
            let item = document.createElement("li")
            item.textContent = `Nome: ${usuario.nome} Email: ${usuario.email} Telefone: ${usuario.telefone} `
            lista.appendChild(item)
        })
    } else {
    alert('Nenhum Usuário encontrado.');
    }
}

function exibirLivrosDisponiveis(){
    if (livrosDisponiveis && Array.isArray(livrosDisponiveis)) {
        let lista = document.getElementById("exibirDisponiveisBtn")
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
        let lista = document.getElementById("exibirIndisponiveisBtn")
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
        let lista = document.getElementById("exibirAtivosBtn")
        lista.innerHTML = ""
        emprestimosEmAndamento.forEach(function(emprestimo) {
            let item = document.createElement("li")
            item.textContent = `Nome: ${emprestimo.nome} Livro: ${emprestimo.titulo} Data Locação: ${emprestimo.dataEmprestimo}`
            lista.appendChild(item)
        })
    } else {
    console.error('Nenhum emprestimo ativo.');
    }
}

function exibirEmprestimosEmDebito(){
    if (emprestimosEmDebito && Array.isArray(emprestimosEmDebito)) {
        let lista = document.getElementById("exibirEmDebitoBtn")
        lista.innerHTML = ""
        emprestimosEmDebito.forEach(function(emprestimo) {
            let item = document.createElement("li")
            item.textContent = `Nome: ${emprestimo.nome} Livro: ${emprestimo.titulo} Data Locação: ${emprestimo.dataEmprestimo} Multa: R$ ${emprestimo.multa}`
            lista.appendChild(item)
        })
    } else {
    console.error('Nenhum emprestimo em débito.');
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
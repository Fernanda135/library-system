//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// LISTAS


let listaLivros = []
let listaDeAdmins = []
let listaDeUsuarios = []
let livrosDisponiveis = []
let livrosIndisponiveis = []
let emprestimosEmDebito = []
let historicoEmprestimos = []
let emprestimosEmAndamento = []



//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// FUNÇÕES AUTOMÁTICAS


window.onload = function() { // função que ocorre na hora que recarrega o site, ela vai estar armazenando cada array
    
    listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || []
    console.log("listaLivros", listaLivros)
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    console.log("listaUsuarios",listaDeUsuarios)
    livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
    console.log("livrosDisponiveis",livrosDisponiveis)
    livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
    console.log("livrosIndisponiveis",livrosIndisponiveis)
    emprestimosEmAndamento = JSON.parse(localStorage.getItem("emprestimosEmAndamento")) || []
    console.log("emprestimosEmAndamento",emprestimosEmAndamento)
    emprestimosEmDebito = JSON.parse(localStorage.getItem("emprestimosEmDebito")) || []//JSON.parse convete uma string JSON em objeto JavaScript
    console.log("emprestimosEmDebito",emprestimosEmDebito)
    historicoEmprestimos = JSON.parse(localStorage.getItem("historicoEmprestimos")) || []
    console.log("historicoEmprestimos",historicoEmprestimos)
    listaDeAdmins = JSON.parse(localStorage.getItem("listaDeAdmins")) || []
    console.log("listaAdmins",listaDeAdmins)







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
            let cpf = emprestimo.cpf
        

            // Calcula a multa
            const multa = (diferencaDias - 7) * 1; // 1 real por dia após 7 dias

            
            let usuarioDebitoObj = {nome: nome, email: email, cpf: cpf, livro: tituloLivro, dataEmprestimo: dataEmprestimo, multa: multa}
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
// FUNÇÕES DE MANIPULAÇÃO 


function removerAcentos(texto) {
    return texto
        .normalize('NFD') // Normaliza para a forma de decomposição
        .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
}


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
    
    let senhaDigitada = document.getElementById("conferirSenha").value
    let senhaIndex = listaDeAdmins.findIndex(admins => admins.senha === senhaDigitada)

    if(senhaIndex !== -1){
        localStorage.removeItem("listaDeUsuarios")
        localStorage.removeItem("emprestimosEmAndamento")
        localStorage.removeItem("emprestimosEmDebito")
        alert("Lista de Usuários Vazia!")
    }else{
        alert("Senha Incorreta!")
    }
}

function limparListaLivros() {

    let senhaDigitada = document.getElementById("conferirSenha").value
    let senhaIndex = listaDeAdmins.findIndex(admins => admins.senha === senhaDigitada)

    if(senhaIndex !== -1){
        localStorage.removeItem("listaLivros")
        localStorage.removeItem("livrosDisponiveis")
        localStorage.removeItem("livrosIndisponiveis")
        localStorage.removeItem("emprestimosEmAndamento")
        localStorage.removeItem("emprestimosEmDebito")
        alert("Lista de Livros Vazia!")
    }else{
        alert("Senha Incorreta!")
    }
}

function limparListaEmprestimos() {

    let senhaDigitada = document.getElementById("conferirSenha").value
    let senhaIndex = listaDeAdmins.findIndex(admins => admins.senha === senhaDigitada)

    if(senhaIndex !== -1){
        livrosDisponiveis.push(...livrosIndisponiveis)
        localStorage.removeItem("emprestimosEmAndamento")
        localStorage.removeItem("emprestimosEmDebito")
        localStorage.removeItem("historicoEmprestimos")
        localStorage.removeItem("livrosIndisponiveis")
        alert("Lista Emprestimos Vazia!")
    }else{
        alert("Senha Incorreta!")
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// CADASTRAR


function cadastrarLivros(event){

    event.preventDefault()

    let tituloLivro = document.getElementById("titulo").value //vai armazenar o dado digitado (vai manipular os dados do ID no HTML)
    tituloLivro = removerAcentos(tituloLivro.toLowerCase())
    let autor = document.getElementById("autor").value
    let ano = document.getElementById("ano").value
    console.log(`Título: ${tituloLivro}, Autor: ${autor}, Ano: ${ano}`)

    let livroObj = {titulo: tituloLivro, autor: autor, anoPublicacao: ano}// cria um obj com as propiedades digitadas
    let livroIndex = listaLivros.findIndex(
        livro => removerAcentos(livro.titulo.toLowerCase()) === tituloLivro.toLowerCase()
    )

    if(listaDeAdmins.length>0){
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
    }else{
        alert("Erro: Nenhum Adm Cadastrado.")
    }
}

function cadastrarAdmin(event){

    event.preventDefault()

    let usuario = document.getElementById("usuario").value //vai armazenar o dado digitado
    let senha = document.getElementById("senha").value
    let cpf = document.getElementById("cpf").value
    let dadosAdminObj = {nome: usuario, senha: senha, cpf: cpf} // cria um obj com as propiedades digitadas
    let dadosAdminIndex = listaDeAdmins.findIndex(user => user.cpf === cpf)

    if (dadosAdminIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
    listaDeAdmins.push(dadosAdminObj)
    listaDeAdmins.sort((a, b) => a.nome.localeCompare(b.nome))
    localStorage.setItem("listaDeAdmins", JSON.stringify(listaDeAdmins)) // converte o objeto em string JSON e salva no storage (o que está dentro das aspas é a chave da lista)
    alert("Cadastro concluído")
    }else{
        alert("Administrador já está cadastrado")
    }
}


function cadastrarUsuarios(event){

    event.preventDefault()

    let usuario = document.getElementById("usuario").value //vai armazenar o dado digitado
    let email = document.getElementById("email").value
    let cpf = document.getElementById("cpf").value
    let dadosUsuarioObj = {nome: usuario, email: email, cpf: cpf} // cria um obj com as propiedades digitadas
    let dadosUsuarioIndex = listaDeUsuarios.findIndex(user => user.cpf === cpf)


    if(listaDeAdmins.length>0){
        if (dadosUsuarioIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
        listaDeUsuarios.push(dadosUsuarioObj)
        listaDeUsuarios.sort((a, b) => a.nome.localeCompare(b.nome))
        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios)) // converte o objeto em string JSON e salva no storage (o que está dentro das aspas é a chave da lista)
        alert("Cadastro concluído")
        }else{
            alert("Usuário já está cadastrado")
        }
    }else{
        alert("Erro: Nenhum Adm Cadastrado.")
    }
}

function cadastrarEmprestimos(event){//troquei usuario por email - pode dar errado

    event.preventDefault()

    let cpfUsuario = document.getElementById("cpfUsuario").value
    let usuario = listaDeUsuarios.find(user => user.cpf === cpfUsuario)//o .find vai retornar o item para variavel usuario

    if(listaDeAdmins.length>0){
        if(usuario) { //esse if só vai entrar se o usuário for encontrado(o resultado do .find for === true).
            let tituloLivro = document.getElementById("tituloLivro").value
            tituloLivro = removerAcentos(tituloLivro.toLowerCase())
            let livroIndex = livrosDisponiveis.findIndex(livro => livro.titulo.toLowerCase() === tituloLivro.toLowerCase())// nem precisa conferir dnv mas pra n dar erro ta ai

            if(livroIndex !== -1) { // se o resultado do findIndex for diferente de -1 ele entra(se o findIndex for true ele sempre retorno um numero diferente de -1)
            
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
    }else{
        alert("Erro: Nenhum Adm Cadastrado.")
    }
}

function cadastrarDevolucoes(event){

    event.preventDefault()

    let tituloLivro = document.getElementById("tituloLivroDevolucao").value
    tituloLivro = removerAcentos(tituloLivro.toLowerCase())
    let livroIndex = livrosIndisponiveis.findIndex(livro => livro.titulo === tituloLivro) 

    if(listaDeAdmins.length>0){
        if(livroIndex !== -1) {
            let colocarLivroDisp = livrosIndisponiveis[livroIndex]
            livrosIndisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros indisponíveis
            localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))// converte o objeto em string JSON e salva no storage

            livrosDisponiveis.push(colocarLivroDisp)
            localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))// converte o objeto em string JSON e salva no storage

            let emprestimoIndex = emprestimosEmAndamento.findIndex(emprestimo => emprestimo.titulo.toLowerCase() === tituloLivro)

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
                if (multa > 0) {//delete estava aqui
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
}


//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// RETIRAR CADASTRO

function retirarCadastro(event){

    event.preventDefault()

    let retirarUsuario = document.getElementById("cpf").value
    let senhaAdmin = document.getElementById("senhaAdm").value
    let dadosUsuarioIndex = listaDeUsuarios.findIndex(user => user.cpf === retirarUsuario)
    let dadosSenhaAdmIndex = listaDeAdmins.findIndex(admin => admin.senha === senhaAdmin)
    let dadosCpfAdmIndex = listaDeAdmins.findIndex(admin => admin.cpf === retirarUsuario)

    if(listaDeAdmins.length>0){

        let dadosEmprestimoIndex = emprestimosEmAndamento.findIndex(user => user.cpf === retirarUsuario)
        if (dadosEmprestimoIndex == -1){// se não estiver com emprestimo
            
            if(dadosUsuarioIndex !== -1 || dadosCpfAdmIndex !== -1){ //se achar o usuário ou admin
                if(dadosUsuarioIndex !== -1 && dadosSenhaAdmIndex !== -1){// se a senha estiver correta e o cpf for do usuario
                    listaDeUsuarios.splice(dadosUsuarioIndex, 1)
                    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios))
                    alert("Cadastro de Usuário Retirado Com Sucesso!")
                }
                    
                if(dadosCpfAdmIndex !== -1 && dadosSenhaAdmIndex !== -1){//se a senha estiver correta e se o cpf digitado for igual a um cpf de admin ele apaga
                    listaDeAdmins.splice(dadosSenhaAdmIndex, 1)
                    localStorage.setItem("listaDeAdmins", JSON.stringify(listaDeAdmins))
                    alert("Cadastro de Administrador Retirado Com Sucesso!")
                }                           
            }else{
                alert("Usuário não encontrado.")
            }
        }else{
            alert("Erro: Usuário ainda está em um emprestimo.")
        }
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

    let pesquisaTermo = removerAcentos(inputElement.value.toLowerCase())
    
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
            item.textContent = `Nome: ${usuario.nome} Email: ${usuario.email} Telefone: ${usuario.cpf} `
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

function exibirHistoricoEmprestimos(){
    if (historicoEmprestimos && Array.isArray(historicoEmprestimos)) {
        let lista = document.getElementById("exibirHistEmpBtn")
        lista.innerHTML = ""
        historicoEmprestimos.forEach(function(emprestimo) {
            let item = document.createElement("li")
            item.textContent = `Nome: ${emprestimo.nome} Livro: ${emprestimo.titulo} Data Locação: ${emprestimo.dataEmprestimo}`
            lista.appendChild(item)
        })
    } else {
    console.error('Historico Vazio.');
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
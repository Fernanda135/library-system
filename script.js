let listaLivros = []
let listaDeUsuarios = []
let livrosDisponiveis = []
let livrosIndisponiveis = []
let emprestimosEmAndamento = []
let emprestimosEmDebito = []

window.onload = function() { // função que ocorre na hora que recarrega o site, ela vai estar armazenando cada array
    listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || []
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
    livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
    emprestimosEmAndamento = JSON.parse(localStorage.getItem("emprestimosEmAndamento")) || []
    emprestimosEmDebito = JSON.parse(localStorage.getItem("emprestimosEmDebito")) || []
}


function cadastrarLivros(){
    let tituloLivro = document.getElementById("tituloLivro").value //vai armazenar o dado digitado
    let autor = document.getElementById("autor").value
    let anoPublicacao = document.getElementById("anoPublicação").value

    let livroObj = {titulo: tituloLivro, autor: autor, anoPublicacao: anoPublicacao}// cria um obj com as propiedades digitadas
    let livroIndex = livroObj.findIndex(livro => livro.titulo === tituloLivro)

    if(livroIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
        listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || []
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
    let dadosUsuarioIndex = dadosUsuarioObj.findIndex(user => user.nome === usuario)

    if (dadosUsuarioIndex == -1){ // vai ler o .finIndex e ser for true ele retorna um valor diferente de -1
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    listaDeUsuarios.push(dadosUsuarioObj)
    listaDeUsuarios.sort((a, b) => a.nome.localeCompare(b.nome))
    localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios)) // salva os dados na maquina podendo fechar pagina
    }else{
        alert("Usuário já está cadastrado")
    }
}


function cadastrarEmprestimos(){
    let nomeUsuario = document.getElementById("nomeUsuario").value
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    let usuario = listaDeUsuarios.find(user => user.nome === nomeUsuario)

    if(usuario) { //esse if só vai entrar se o usuário for encontrado(o resultado do .find for === true)
        let emprestimo = {...usuario, livro: tituloLivro, dataEmprestimo: dataEmprestimo}
        emprestimosEmAndamento = JSON.parse(localStorage.getItem("historicoEmprestimos")) || []
        emprestimosEmAndamento.push(emprestimo)
        emprestimosEmAndamento.sort((a, b) => a.nome.localeCompare(b.nome))
        localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))

        let tituloLivro = document.getElementById("tituloLivro").value
        let dataEmprestimo = document.getElementById("dataEmprestimo").value

        livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
        livrosDisponiveis.sort((a, b) => a.titulo.localeCompare(b.titulo))
        let livroIndex = livrosDisponiveis.findIndex(livro => livro.titulo === tituloLivro)

        if(livroIndex !== -1) { // se o resultdo do findIndex for diferente de -1 ele entra(se o findIndex for true ele sempre retorno um numero diferente de -1)
            let livroObj = livrosDisponiveis[livroIndex]
            livrosDisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros disponíveis
            localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))

            let livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
            livrosIndisponiveis.push({...livroObj, dataEmprestimo: dataEmprestimo})
            livrosIndisponiveis.sort((a, b) => a.titulo.localeCompare(b.titulo))
            localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))
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

    livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
    let livroIndex = livrosIndisponiveis.findIndex(livro => livro.titulo === tituloLivro)

    if(livroIndex !== -1) {
        let livroObj = livrosIndisponiveis[livroIndex]
        livrosIndisponiveis.splice(livroIndex, 1)  // Remove o livro da lista de livros indisponíveis
        localStorage.setItem("livrosIndisponiveis", JSON.stringify(livrosIndisponiveis))

        let livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
        livrosDisponiveis.push(livroObj)
        localStorage.setItem("livrosDisponiveis", JSON.stringify(livrosDisponiveis))

        emprestimosEmAndamento = JSON.parse(localStorage.getItem("emprestimosEmAndamento")) || []
        let emprestimoIndex = emprestimosEmAndamento.findIndex(emprestimo => emprestimo.livro === tituloLivro)

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
                emprestimosEmDebito.splice(emprestimoIndex, 1)//vai tirar o objeto da array emprestimosEmAndamento e vai colocar na array emprestimoEmDebito 
                alert(`Devolução registrada com sucesso! Usuário deve pagar uma multa de R$ ${multa}.`)
            } else {
                alert("Devolução registrada com sucesso! Nenhuma multa aplicada.")
            }
            emprestimosEmAndamento.splice(emprestimoIndex, 1)  // Remove o empréstimo do histórico
            localStorage.setItem("emprestimosEmAndamento", JSON.stringify(emprestimosEmAndamento))//salva
        }
        alert("Devolução registrada com sucesso e usuário desvinculado!")
    }else{
        alert("Livro não encontrado na lista de indisponíveis!")
    }
}


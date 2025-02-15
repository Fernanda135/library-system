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


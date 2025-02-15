//-----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------
// CALCULA MULTA AUTOMATICA


window.onload = function() {
    const dataAtual = new Date();

    emprestimosEmAndamento.forEach(emprestimo, index => {
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
// JSON.parse


window.onload = function() { // função que ocorre na hora que recarrega o site, ela vai estar armazenando cada array
    listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || []
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios")) || []
    livrosDisponiveis = JSON.parse(localStorage.getItem("livrosDisponiveis")) || []
    livrosIndisponiveis = JSON.parse(localStorage.getItem("livrosIndisponiveis")) || []
    emprestimosEmAndamento = JSON.parse(localStorage.getItem("emprestimosEmAndamento")) || []
    emprestimosEmDebito = JSON.parse(localStorage.getItem("emprestimosEmDebito")) || []//JSON.parse convete uma string JSON em objeto JavaScript
}

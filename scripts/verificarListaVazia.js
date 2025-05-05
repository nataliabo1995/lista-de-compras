const mensagemListaVazia = document.querySelector(".mensagem-lista-vazia");

function verificarListaVazia(listaDeCompras, listaDeComprados) {
    const itensDaLista = listaDeCompras.querySelectorAll("li");
    if (itensDaLista.length === 0) {
        mensagemListaVazia.style.display = "block";
    } else {
        mensagemListaVazia.style.display = "none";
    }


    const tituloComprados = document.getElementById("h2-comprados");
    const sublinhadoComprados = document.getElementById("hr-comprados");
    if (listaDeComprados.childElementCount === 0) {
        tituloComprados.style.display = "none";
        sublinhadoComprados.style.display = "none";

    } else {
        tituloComprados.style.display = "block";
        sublinhadoComprados.style.display = "block";
    }
}

export default verificarListaVazia;
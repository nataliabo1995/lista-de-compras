import { criarItemDaLista } from "./scripts/criarItemDaLista.js";
import verificarListaVazia from "./scripts/verificarListaVazia.js";
const listaDeCompras = document.getElementById("lista-de-compras");
const listaDeComprados = document.getElementById("lista-de-comprados");
const botaoAdicionar = document.getElementById("adicionar-item");

botaoAdicionar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const itemDaLista = criarItemDaLista(listaDeCompras, listaDeComprados);
    listaDeCompras.appendChild(itemDaLista);
    verificarListaVazia(listaDeCompras, listaDeComprados);
    
})

verificarListaVazia(listaDeCompras, listaDeComprados);
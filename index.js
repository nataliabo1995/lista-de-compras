import { criarItemDaLista } from "./scripts/criarItemDaLista.js";
import verificarListaVazia from "./scripts/verificarListaVazia.js";

const listaDeCompras = document.getElementById("lista-de-compras");
const listaDeComprados = document.getElementById("lista-de-comprados");
const botaoAdicionar = document.getElementById("adicionar-item");
const inputItem = document.getElementById("input-item"); // Importante selecionar o input aqui

botaoAdicionar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const itemDaLista = criarItemDaLista(listaDeCompras, listaDeComprados);
    listaDeCompras.appendChild(itemDaLista);
    verificarListaVazia(listaDeCompras, listaDeComprados);
});

// Adiciona o event listener para a tecla Enter no inputItem
inputItem.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        evento.preventDefault(); // Impede o comportamento padrão de submit do formulário
        const itemDaLista = criarItemDaLista(listaDeCompras, listaDeComprados);
        listaDeCompras.appendChild(itemDaLista);
        verificarListaVazia(listaDeCompras, listaDeComprados);
    }
});

verificarListaVazia(listaDeCompras, listaDeComprados);
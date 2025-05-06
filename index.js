import { criarItemDaLista, carregarListaDoLocalStorage } from "./scripts/criarItemDaLista.js";
 import verificarListaVazia from "./scripts/verificarListaVazia.js";
 

 const listaDeCompras = document.getElementById("lista-de-compras");
 const listaDeComprados = document.getElementById("lista-de-comprados");
 const botaoAdicionar = document.getElementById("adicionar-item");
 const inputItem = document.getElementById("input-item");
 

 botaoAdicionar.addEventListener("click", (evento) => {
  evento.preventDefault();
  const itemDaLista = criarItemDaLista(listaDeCompras, listaDeComprados);
  if (itemDaLista) { // Verifica se o item foi criado (não é nulo)
  listaDeCompras.appendChild(itemDaLista);
  verificarListaVazia(listaDeCompras, listaDeComprados);
  }
 });
 

 inputItem.addEventListener("keypress", function (evento) {
  if (evento.key === "Enter") {
  evento.preventDefault();
  const itemDaLista = criarItemDaLista(listaDeCompras, listaDeComprados);
  if (itemDaLista) { // Verifica se o item foi criado (não é nulo)
  listaDeCompras.appendChild(itemDaLista);
  verificarListaVazia(listaDeCompras, listaDeComprados);
  }
  }
 });
 

 // Carregar a lista do Local Storage ao carregar a página
 carregarListaDoLocalStorage(listaDeCompras, listaDeComprados);
 verificarListaVazia(listaDeCompras, listaDeComprados);
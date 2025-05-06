import gerarDiaDaSemana from "./gerarDiaDaSemana.js";
import verificarListaVazia from "./verificarListaVazia.js";
const inputItem = document.getElementById("input-item");

export function criarItemDaLista(listaDeCompras, listaDeComprados) {
    if (inputItem.value === "") {
        alert("Por favor, insira um item!");
        return;
    }

    const itemDaLista = document.createElement("li");
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    const nomeItem = document.createElement("p");
    nomeItem.innerText = inputItem.value;
    inputItem.value = "";

    // Criar um ID único para cada item, usando o timestamp
    const itemId = `item-${Date.now()}`;
    itemDaLista.id = itemId;
    inputCheckbox.id = `checkbox-${itemId}`;

    inputCheckbox.addEventListener("click", function () {
        if (inputCheckbox.checked) {
            nomeItem.style.textDecoration = "line-through";
            listaDeComprados.appendChild(itemDaLista);
            salvarListaNoLocalStorage(); // Salvar no Local Storage
        } else {
            nomeItem.style.textDecoration = "none";
            listaDeCompras.appendChild(itemDaLista);
            salvarListaNoLocalStorage(); // Salvar no Local Storage
        }
        verificarListaVazia(listaDeCompras, listaDeComprados);
    });

    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);

    const editarEDeletar = document.createElement("div");
    editarEDeletar.classList.add("editar-e-deletar");
    const editar = document.createElement("img");
    editar.src = "./img/edit.svg";
    editar.alt = "ícone de editar";
    const deletar = document.createElement("img");
    deletar.src = "./img/delete.svg";
    deletar.alt = "ícone de deletar";
    editarEDeletar.appendChild(editar);
    editarEDeletar.appendChild(deletar);
    containerItemDaLista.appendChild(editarEDeletar);

    editar.addEventListener("click", function () {
        const novoNome = prompt("Digite o novo nome do item:", nomeItem.innerText);
        if (novoNome !== null && novoNome.trim() !== "") {
            nomeItem.innerText = novoNome;
            salvarListaNoLocalStorage(); // Salvar no Local Storage
        }
    });

    deletar.addEventListener("click", function () {
        itemDaLista.remove();
        verificarListaVazia(listaDeCompras, listaDeComprados);
        salvarListaNoLocalStorage(); // Salvar no Local Storage
    });

    itemDaLista.appendChild(containerItemDaLista);
    const dataCompleta = gerarDiaDaSemana();

    const itemData = document.createElement("p");
    itemData.innerText = dataCompleta;
    itemData.classList.add("texto-data");
    itemDaLista.appendChild(itemData);

    return itemDaLista;
}

// Função para salvar a lista no Local Storage
function salvarListaNoLocalStorage() {
    const itens = [];
    document.querySelectorAll("#lista-de-compras li, #lista-de-comprados li").forEach(item => {
        const itemId = item.id;
        const nome = item.querySelector("p").innerText;
        const comprado = item.querySelector("input[type='checkbox']").checked;
        const data = item.querySelector(".texto-data").innerText;
        itens.push({ id: itemId, nome: nome, comprado: comprado, data: data });
    });
    localStorage.setItem("listaDeCompras", JSON.stringify(itens));
   }
   
  
   // Função para carregar a lista do Local Storage
   export function carregarListaDoLocalStorage(listaDeCompras, listaDeComprados) {
    const itensSalvos = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
    itensSalvos.forEach(item => {
    const itemDaLista = document.createElement("li");
    itemDaLista.id = item.id;
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = `checkbox-${item.id}`;
    inputCheckbox.checked = item.comprado;
    const nomeItem = document.createElement("p");
    nomeItem.innerText = item.nome;
    if (item.comprado) {
    nomeItem.style.textDecoration = "line-through";
    listaDeComprados.appendChild(itemDaLista);
    } else {
    listaDeCompras.appendChild(itemDaLista);
    }
   
  
    inputCheckbox.addEventListener("click", function () {
    if (inputCheckbox.checked) {
    nomeItem.style.textDecoration = "line-through";
    listaDeComprados.appendChild(itemDaLista);
    salvarListaNoLocalStorage();
    } else {
    nomeItem.style.textDecoration = "none";
    listaDeCompras.appendChild(itemDaLista);
    salvarListaNoLocalStorage();
    }
    verificarListaVazia(listaDeCompras, listaDeComprados);
    });
   
  
    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);
   
  
    const editarEDeletar = document.createElement("div");
    editarEDeletar.classList.add("editar-e-deletar");
    const editar = document.createElement("img");
    editar.src = "./img/edit.svg";
    editar.alt = "ícone de editar";
    const deletar = document.createElement("img");
    deletar.src = "./img/delete.svg";
    deletar.alt = "ícone de deletar";
    editarEDeletar.appendChild(editar);
    editarEDeletar.appendChild(deletar);
    containerItemDaLista.appendChild(editarEDeletar);
   
  
    editar.addEventListener("click", function () {
    const novoNome = prompt("Digite o novo nome do item:", nomeItem.innerText);
    if (novoNome !== null && novoNome.trim() !== "") {
    nomeItem.innerText = novoNome;
    salvarListaNoLocalStorage();
    }
    });
   
  
    deletar.addEventListener("click", function () {
    itemDaLista.remove();
    verificarListaVazia(listaDeCompras, listaDeComprados);
    salvarListaNoLocalStorage();
    });
   
  
    itemDaLista.appendChild(containerItemDaLista);
    const itemData = document.createElement("p");
    itemData.innerText = item.data;
    itemData.classList.add("texto-data");
    itemDaLista.appendChild(itemData);
    });
    verificarListaVazia(listaDeCompras, listaDeComprados);
   }
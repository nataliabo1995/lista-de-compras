import gerarDiaDaSemana from "./gerarDiaDaSemana.js";
import verificarListaVazia from "./verificarListaVazia.js";
const inputItem = document.getElementById("input-item");
let contador = 0;

export function criarItemDaLista(listaDeCompras, listaDeComprados) {
    
    if (inputItem.value === "") {
        alert("Por favor, insira um item!");
        return
    }

    const itemDaLista = document.createElement("li");
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox-" + contador++;
    const nomeItem = document.createElement("p");
    nomeItem.innerText = inputItem.value;
    inputItem.value = "";

    inputCheckbox.addEventListener("click", function() {
        if (inputCheckbox.checked) {
            nomeItem.style.textDecoration = "line-through";
            listaDeComprados.appendChild(itemDaLista); // Move o itemDaLista para a listaDeComprados
            verificarListaVazia(listaDeCompras, listaDeComprados);
        } else {
            nomeItem.style.textDecoration = "none";
            listaDeCompras.appendChild(itemDaLista); // Move de volta para a lista de compras
            verificarListaVazia(listaDeCompras, listaDeComprados);
        }
    })

    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);

    const editarEDeletar = document.createElement("div");
    editarEDeletar.classList.add("editar-e-deletar");
    const editar = document.createElement("img");
    editar.src = "../img/edit.svg";
    editar.alt = "ícone de editar";
    const deletar = document.createElement("img");
    deletar.src = "../img/delete.svg";
    deletar.alt = "ícone de deletar";
    editarEDeletar.appendChild(editar);
    editarEDeletar.appendChild(deletar);
    containerItemDaLista.appendChild(editarEDeletar);

    editar.addEventListener("click", function() {
        const novoNome = prompt("Digite o novo nome do item:", nomeItem.innerText);
        if (novoNome !== null && novoNome.trim() !== "") {
            nomeItem.innerText = novoNome; // Atualiza o texto do item
        }
    });

    deletar.addEventListener("click", function() {
        itemDaLista.remove(); // Remove o item da lista
        verificarListaVazia(listaDeCompras, listaDeComprados); // Verifica se a lista está vazia após a remoção
    });

    itemDaLista.appendChild(containerItemDaLista);
    const dataCompleta = gerarDiaDaSemana();

    const itemData = document.createElement("p");
    itemData.innerText = dataCompleta;
    itemData.classList.add("texto-data");
    itemDaLista.appendChild(itemData);

    



    return itemDaLista;
}
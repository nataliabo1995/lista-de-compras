import gerarDiaDaSemana from "./gerarDiaDaSemana.js";
import verificarListaVazia from "./verificarListaVazia.js";
const inputItem = document.getElementById("input-item");
const listaDeCompras = document.getElementById("lista-de-compras"); // Certifique-se de obter a referência aqui
const listaDeComprados = document.getElementById("lista-de-comprados"); // Certifique-se de obter a referência aqui

// Função para criar um item da lista (li)
function criarItemElemento(item) {
    // Cria um novo elemento 'li' para representar um item da lista
    const itemDaLista = document.createElement("li");
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = `checkbox-${item.id}`; // Define o ID do checkbox
    inputCheckbox.checked = item.comprado; // Define se o checkbox está marcado ou não
    const nomeItem = document.createElement("p");
    nomeItem.innerText = item.nome; // Define o texto do item

    // Aplica estilo de tachado se o item estiver marcado como comprado
    if (item.comprado) {
        nomeItem.style.textDecoration = "line-through";
    }

    // Adiciona um event listener para o checkbox para lidar com a mudança de estado (comprado/não comprado)
    inputCheckbox.addEventListener("click", function () {
        if (inputCheckbox.checked) {
            nomeItem.style.textDecoration = "line-through";
            listaDeComprados.appendChild(itemDaLista); // Move para a lista de comprados
        } else {
            nomeItem.style.textDecoration = "none";
            listaDeCompras.appendChild(itemDaLista); // Move para a lista de compras
        }
        salvarListaNoLocalStorage(listaDeCompras, listaDeComprados); // Atualiza o Local Storage
        verificarListaVazia(listaDeCompras, listaDeComprados); // Verifica se a lista está vazia
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

    // Adiciona um event listener para o botão de editar
    editar.addEventListener("click", function () {
        const novoNome = prompt("Digite o novo nome do item:", nomeItem.innerText); // Pede um novo nome para o item
        if (novoNome !== null && novoNome.trim() !== "") {
            nomeItem.innerText = novoNome; // Atualiza o nome do item
            salvarListaNoLocalStorage(listaDeCompras, listaDeComprados); // Atualiza o Local Storage
        }
    });

    // Adiciona um event listener para o botão de deletar
    deletar.addEventListener("click", function () {
        itemDaLista.remove(); // Remove o item da lista
        verificarListaVazia(listaDeCompras, listaDeComprados); // Verifica se a lista está vazia
        salvarListaNoLocalStorage(listaDeCompras, listaDeComprados); // Atualiza o Local Storage
    });

    itemDaLista.appendChild(containerItemDaLista);
    const itemData = document.createElement("p");
    itemData.innerText = item.data; //adiciona a data
    itemData.classList.add("texto-data");
    itemDaLista.appendChild(itemData);

    return itemDaLista; // Retorna o elemento 'li' criado
}

// Função para criar um novo item e adicioná-lo à lista
export function criarItemDaLista(listaDeCompras, listaDeComprados) {
    if (inputItem.value === "") {
        alert("Por favor, insira um item!");
        return;
    }

    // Cria um objeto 'item' com os dados do novo item
    const item = {
        id: `item-${Date.now()}`, // Gera um ID único para o item
        nome: inputItem.value, // Obtém o nome do item do input
        comprado: false, // Inicialmente, o item não está comprado
        data: gerarDiaDaSemana(),
    };
    inputItem.value = ""; // Limpa o input após adicionar o item

    const itemDaLista = criarItemElemento(item); // Usa a função criarItemElemento para criar o elemento 'li'
    listaDeCompras.appendChild(itemDaLista); // Adiciona o item à lista
    salvarListaNoLocalStorage(listaDeCompras, listaDeComprados); // Salva no Local Storage
    verificarListaVazia(listaDeCompras, listaDeComprados);
    return itemDaLista; // Retorna o elemento 'li' criado
}

// Função para salvar a lista no Local Storage
function salvarListaNoLocalStorage(listaDeCompras, listaDeComprados) {
    // 1. Cria um array para armazenar os dados de cada item da lista
    const itens = [];

    // 2. Seleciona todos os elementos 'li' (itens da lista) presentes nas listas de compras e de comprados
    document.querySelectorAll("#lista-de-compras li, #lista-de-comprados li").forEach(item => {
        // 3. Para cada item da lista, extrai as informações relevantes:
        const itemId = item.id; // Obtém o ID do item
        const nome = item.querySelector("p").innerText; // Obtém o nome do item
        const comprado = item.querySelector("input[type='checkbox']").checked; // Verifica se o item está marcado como comprado
         const data = item.querySelector(".texto-data").innerText; // Obtém a data do item

        // 4. Cria um objeto com as informações do item e o adiciona ao array 'itens'
        itens.push({ id: itemId, nome: nome, comprado: comprado, data: data });
    });

    // 5. Converte o array 'itens' para uma string JSON e a armazena no Local Storage
    // A chave utilizada para armazenar a string é "listaDeCompras"
    localStorage.setItem("listaDeCompras", JSON.stringify(itens));
}

// Função para carregar a lista do Local Storage
export function carregarListaDoLocalStorage(listaDeCompras, listaDeComprados) {
    // 1. Tenta recuperar a lista do Local Storage usando a chave "listaDeCompras"
    // Se não existir nada com essa chave, 'itensSalvos' recebe um array vazio ([])
    const itensSalvos = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

    // 2. Percorre o array 'itensSalvos', que contém os dados dos itens armazenados no Local Storage
    itensSalvos.forEach(item => {
        // 3. Para cada item em 'itensSalvos', recria os elementos da lista na página:
        const itemDaLista = criarItemElemento(item); // Usa a função criarItemElemento para criar o elemento 'li'
        if (item.comprado) {
            listaDeComprados.appendChild(itemDaLista); // Adiciona o item à lista de comprados se estiver marcado
        } else {
            listaDeCompras.appendChild(itemDaLista); // Adiciona o item à lista de compras caso contrário
        }
    });
    verificarListaVazia(listaDeCompras, listaDeComprados);
}


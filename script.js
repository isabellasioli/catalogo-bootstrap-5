const CATALOG_ITEMS =[
    {
        id: 1,
        titulo: "A última casa da rua Needless",
        categoria: "Livros",
        detalhes: "Um thriller de suspense aterrorizante que envolve um assassinato, uma criança sequestrada... e uma terrível vingança.",
        preco: 57.70,
        estoque: 15,
        autor: "Catriona Ward",
        lancamento: "2022"
    },
    {
        id: 2,
        titulo: "Manual de assassinato para boas meninas",
        categoria: "Livros",
        detalhes: "Um romance de suspense juvenil que segue a investigação de um crime arquivado por uma estudante do ensino médio.",
        preco: 50.90,
        estoque: 10,
        autor: "Holly Jackson",
        lancamento: "2022"
    },
    {
        id: 3,
        titulo: "Corte de Espinhos e Rosas",
        categoria: "Livros",
        detalhes: "Um livro de fantasia de tirar o fôlego. Memorável em todos os aspectos, com personagens complexos, enredo rico e um magnífico mundo...",
        preco: 60.99,
        estoque: 20,
        autor: "Sarah J. Maas",
        lancamento: "2015"
    },
    {
        id: 4,
        titulo: "Marca Página Personalizado",
        categoria: "Artesanato",
        detalhes: "Um marca página personalizado de acordo com sua preferência e plastificado.",
        preco: 5.90,
        estoque: 20,
        material: "Papel 180g com a imagem escolhida e polaseal (plástico usado para plastificação).",
        dimensoes: "50cm x 160cm"
    },
];

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


/* Adiciona listeeners aos botões "Ver Detalhes" para popular o modal dinamicamente.*/
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

// 1. Ouvinte para popular o modal ANTES de ser exibido.
modalElement.addEventListener('show.bs.modal', function (event) {
    // Lê o atributo "data-item-id" que contém o ID do item clickado.
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    // Procura pelo ID do item clickado no vetor "CATALOG_ITEMS".
    const item = CATALOG_ITEMS.find(i => i.id == itemId);
    
    // Se o item foi encontrado no vetor "CATALOG_ITEMS".
    if (item) {
        // Atualiza o Título do Modal.
        modalTitle.textContent = item.titulo;
        
        // Cria o HTML de detalhes
        let detailsHTML = `
        <p class="b-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
        <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
        <hr>
        <p>${item.detalhes}</p>
        `;
        
        // Adiciona campos específicos
        if (item.categoria === 'Livros') {
            detailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
            detailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
            detailsHTML += `<p class="text-info><strpng>Estoque Disponível:</strong> ${item.estoque} unidades</p>`;
        } else if (item.categoria === 'Artesanato') {
            detailsHTML += `<p><strong>Material:</strong> ${item.material}</p>`;
            detailsHTML += `<p><strong>Dimensões/Comprimento:</strong> ${item.dimensoes || item.comprimento}</p>`;
            detailsHTML += `<p class="text-info><strpng>Peças Exclusivas em Estoque:</strong> ${item.estoque} unidades</p>`;
        }
        
        // Insere o HTML no corpo do modal
        modalBody.innerHTML = detailsHTML;
        
        // Ao clicar no botão "Adicionar ao Carrinho"
        modalAction.onclick = () => {
            // Em uma aplicação real, você faria uma chamada de API aqui.
            // Para este exemplo, apenas fechamos o modal e mostramos o log.
            adicionaItemCarrinho(item.id);
            console.log(`Ação: Item '${item.titulo}' (ID: ${item.id}) adicionado ao carrinho`);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if (bsModal) bsModal.hide();
        }
    }
});

// 2. Ouvinte para o funcionário de busca (simples).
const searchInput = document.getElementById ('search-input');
const searchButton = document.getElementById ('search-button');
const items = document.querySelectorAll ('.item-catalogo');

function executarPesquisa(event) {
    // Previne o envio do formulário para o servidor (back-end)
    event.preventDefault();
    // Obtém o valor do campo de busca em letras minúsculas (.toLowerCase())
    const query = searchInput.value.toLowerCase().trim();
    
    // Para cada item do catálago (quatro itens)
    items.forEach(item => {
        // Obtém o título e o nome da categoria do item atual em letras minúsculas
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();
        
        // Verifica se o título ou a categoria do item atual incluem o valor digitado no campo de busca (query)
        // Se o valor do campo de busca (query == "") for em branco, exibe todos os itens
        if (title.includes(query) || category.includes(query) || query == "") {
            item.style.display = 'block'; // Mostra o item
        } else {
            item.style.display = 'none'; // Esconde o item
        }
    });
}

// Adiciona evento ao clicar no botão "Buscar"
searchButton.addEventListener('click', executarPesquisa);
// Adiciona evento ao pressionar qualquer tecla no campo  "Buscar item"
searchInput.addEventListener('keyup', (event) => {
    //  Permite buscar ao pressionar Enter
    if (event.key == 'Enter') {
        executarPesquisa(event);
    } else if(searchInput.value.trim() === "") {
        // Mostra todos os itens se a busca for apagada
        executarPesquisa(event);
    }
})

// 3. Atualiza os itens do catálogo
items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];
    
    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));
    
    if (item) {
        // Atualiza o texto da imagem do cartão com a categoria do item
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria.toUpperCase());
        // Atualiza o texto do título do item
        title.textContent = item.titulo;
        // Atualiza a categoria do item 
        category.textContent = "Categoria: " + item.categoria;
        // Atualiza a descrição do item
        description.textContent = item.detalhes;
    }
});

// 4. Adiciona funcionalidade de cookies (persistência) dos itens adicionador ao carrinho
const CART_STORAGE_KEY = 'shopping_cart';

function obterCarrinhoDoNavegador() {
    // Tenta ler o cookie do navegador
    try {
        const cookie = localStorage.getItem(CART_STORAGE_KEY);
        if (cookie) {
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("Falha ao ler o cookie do armazenamento local.");
    }
    // Retorna um vetor vazio em caso de falha
    return [];
}

function salvarCookieCarrinho(itensCarrinho) {
    try {
        // Salva os itens do carrinho em formato JSON no navegador
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itensCarrinho));
    } catch (e) {
        console.error("ERRO: Falha ao salvar carrinho no navegador. Erro: ", e);
    }
}

function adicionaItemCarrinho(itemId) {
    // Obtém os itens atuais do carrinho
    const carrinho = obterCarrinhoDoNavegador();
    carrinho.push(itemId); // Adicionar o ID do item recebido como parâmetro da função ao carrinho
    salvarCookieCarrinho(carrinho); // Atualiza o cookie do carrinho
    atualizaContadorCarrinho(); // Atualiza o número de itens no HTML do carrinho navbar
}

function atualizaContadorCarrinho() {
    // Obtém itens existentes no carrinho
    const carrinho = obterCarrinhoDoNavegador();
    // Obtém o elemento HTML que exibe o número de itens no carrinho (Badge)
    const carrinhoBadge = document.getElementById("cart-count");
    
    // Se o elemento que exibe o número de itens no carrinho existe 
    if (carrinhoBadge) {
        // Atualiuza o badge do carrinho com o número de itens no carrinho
        carrinhoBadge.textContent = carrinho.length;
        
        if (carrinho.length > 0) {
            // Remove a classe Boostrap 'd-none' para exibir o badge
            carrinhoBadge.classList.remove('d-none');
        } else {
            // Adiciona a classe Boostrap 'd-none' para ocultar o badge
            carrinhoBadge.classList.add('d-none');
        }
    }
}

// Carrega o número de intens no carrinho ao carregar a página HTML
atualizaContadorCarrinho();

// 5. Renderiza o conteúdo do carrinho 
const carrinho_btn = document.getElementById("cart-button");

carrinho_btn.addEventListener("click", function() {
    
    const carrinho_secao = document.getElementById("cart-section");
    carrinho_secao.classList.toggle("d-none");
    
    if (carrinho_secao.classList.contains("d-none")) {
        return;
    }
    const carrinho_recibo = document.getElementById("cart-list");
    carrinho_recibo.innerHTML = "";
    
    const itensCarrinho = obterCarrinhoDoNavegador(); // Lê os cookies do navegador
    const itensCount = {};

    // O cookie retorna apenos o ID do item no carrinho 
    // Soma o número de vezes que determinado item foi adicionado ao carrinho
    itensCarrinho.forEach(itemId => {
        itensCount[itemId] = (itensCount[itemId] || 0) + 1; // Junta os itens iguais
    });
    
    // Vertical que armazena a soma total do carrinho
    let cartTotal = 0;

    // Para cada ID de item no carrinho
    Object.keys(itensCount).forEach(itemId => {
        // O cookie retorna apenas o ID do item no carrinho 
        const item = CATALOG_ITEMS.find(i => i.id === parseInt(itemId));
        const itemQtd = itensCount[itemId];

        const itemSubtotal = item.preco * itemQtd;
        cartTotal += itemSubtotal;

        // Adicionar o item do carrinho ao recibo
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
            <div>
                <h6 class="mb-1">${item.titulo}</h6>
                <small class="text-muted">Qtd: ${itemQtd} x ${formatCurrency(item.preco)}</small>
            </div>
            <span class="fw-bold text-success">${formatCurrency(itemSubtotal)}</span>
            `;
        
        carrinho_recibo.appendChild(li);
    });

    const cartTotalEl = document.getElementById("cart-total");
    cartTotalEl.innerHTML = formatCurrency(cartTotal);
});
const CATALOG_ITEMS =[
    {
        id: 1,
        titulo: "A última casa da rua Needless",
        categoria: "Livros",
        detalhes: "Um thriller de suspense aterrorizante que envolve um assassinato, uma criança sequestrada... e uma terrível vingança.",
        preco: "R$ 57,70",
        estoque: 15,
        autor: "Catriona Ward",
        lancamento: "2022"
    },
    {
        id: 2,
        titulo: "Manual de assassinato para boas meninas",
        categoria: "Livros",
        detalhes: "Um romance de suspense juvenil que segue a investigação de um crime arquivado por uma estudante do ensino médio.",
        estoque: 10,
        autor: "Holly Jackson",
        lancamento: "2022"
    },
    {
        id: 3,
        titulo: "Corte de Espinhos e Rosas",
        categoria: "Livros",
        detalhes: "Um livro de fantasia de tirar o fôlego. Memorável em todos os aspectos, com personagens complexos, enredo rico e um magnífico mundo...",
        preco: "R$ 60,99",
        estoque: 20,
        autor: "Sarah J. Maas",
        lancamento: "2015"
    },
    {
        id: 4,
        titulo: "Marca Página Personalizado",
        categoria: "Artesanato",
        detalhes: "Um marca página personalizado de acordo com sua preferência e plastificado.",
        preco: "R$ 5,90",
        estoque: 20,
        material: "Papel 180g com a imagem escolhida e polaseal(plástico usado para plastificação).",
        dimensoes: "50cm x 160cm"
    },
];
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
            console.log(`Ação: Item '${item.titulo}' (ID: ${item.id}) adicionado ao carrinho`);
            // Em uma aplicação real, você faria uma chamada de API aqui.
            // Para este exemplo, apenas fechamos o modal e mostramos o log.
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

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
        <p class=",b-1><strong>Ctegoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
        <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
        <hr>
        <p>${item.detalhes}</p>
        `;
    }
});
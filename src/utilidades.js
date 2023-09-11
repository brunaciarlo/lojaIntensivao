const produto1 = {
    id: "1",
    nome: "Camisa Tricolor 2023",
    preco: 399,
    nomeArquivoImagem: "camisa-tricolor-2023.jpg",
    uniforme: true,
};
const produto2 = {
    id: "2",
    nome: "Camisa Goleiro 2023",
    preco: 349,
    nomeArquivoImagem: "camisa-goleiro-2023.jpg",
    uniforme: true,
};
const produto3 = {
    id: "3",
    nome: "Baby Look Retrô",
    preco: 219,
    nomeArquivoImagem: "baby-look-retro.jpg",
    uniforme: false,
};
const produto4 = {
    id: "4",
    nome: "Moletom Treino 2023",
    preco: 399,
    nomeArquivoImagem: "moletom-treino-2023.jpg",
    uniforme: true,
};
const produto5 = {
    id: "5",
    nome: "Parka Preto 2023",
    preco: 599,
    nomeArquivoImagem: "parka-preto-2023.jpg",
    uniforme: false,
};
const produto6 = {
    id: "6",
    nome: "Calção Preto 2023",
    preco: 199,
    nomeArquivoImagem: "calcao-preto-2023.jpg",
    uniforme: true,
};
const produto7 = {
    id: "7",
    nome: "Bola Campo",
    preco: 149,
    nomeArquivoImagem: "bola-campo.jpg",
    uniforme: false,
};
const produto8 = {
    id: "8",
    nome: "Chinelo Havaianas Grêmio",
    preco: 59,
    nomeArquivoImagem: "chinelo.jpg",
    uniforme: false,
};

export const catalogo = [produto1, produto2, produto3, produto4, produto5, produto6, produto7, produto8];

export function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave){
   return JSON.parse(localStorage.getItem(chave));
}

export function esvaziarLocalStorage(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById(idContainerHtml);

    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "bg-stone-200", "rounded-lg", "p-1", "relative", "mb-2", "w-96"];
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }
    
    const cartaoProdutoCarrinho = `<img src="./assets/${produto.nomeArquivoImagem}" alt="${produto.nome}" class="h-24 rounded-lg">
    <div class="p-3 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-500 text-xs">Tamanho: P</p>
      <p class="text-green-800 text-base">$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-1 right-2 text-lg">
        <p id="quantidade-${idProduto}" class="ml-2">${quantidadeProduto}</p>
    </div>`

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
}
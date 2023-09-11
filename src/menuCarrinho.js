import { catalogo, salvarLocalStorage,lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[-360px]");
    document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout(){
    if(Object.keys(idsProdutoCarrinhoQuantidade).length ===0){
        return;
    }
    window.location.href = "./checkout.html";
}
export function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoCheckout = document.getElementById("finalizar-compra");

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
    botaoCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoQuantidade[idProduto];
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuantidade); 
    renderizarProdutosCarrinho();
    atualizarPrecoCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoQuantidade[idProduto]++;
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuantidade); 
    atualizarQuantidade(idProduto);
    atualizarPrecoCarrinho();
}

function decrementarQuantidadeProduto(idProduto){
    if(idsProdutoCarrinhoQuantidade[idProduto] === 1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto]--;
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuantidade); 
    atualizarQuantidade(idProduto);
    atualizarPrecoCarrinho();
}

function atualizarQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "bg-slate-100", "rounded-lg", "p-1", "relative"];
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }
    
    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2"><i class="fa-solid fa-square-xmark text-slate-400 hover:text-slate-800"></i></button>
    <img src="./assets/${produto.nomeArquivoImagem}" alt="${produto.nome}" class="h-24 rounded-lg">
    <div class="p-3 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-500 text-xs">Tamanho: P</p>
      <p class="text-green-800 text-base">$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-1 right-2 text-lg">
        <button id="decrementar-produto-${produto.id}">-</button>
        <p id="quantidade-${idProduto}" class="ml-2">${idsProdutoCarrinhoQuantidade[produto.id]}</p>
        <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
    </div>`

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
    document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";

    for(const idProduto in idsProdutoCarrinhoQuantidade){
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto){
    if(idProduto in idsProdutoCarrinhoQuantidade){
        incrementarQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuantidade); 
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho(){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoQuantidade){
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}
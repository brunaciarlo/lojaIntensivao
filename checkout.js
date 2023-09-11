import { data } from "autoprefixer";
import { desenharProdutoCarrinhoSimples, lerLocalStorage, esvaziarLocalStorage,salvarLocalStorage } from "./src/utilidades";
import { atualizarPrecoCarrinho } from "./src/menuCarrinho";

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
    for(const idProduto in idsProdutoCarrinhoQuantidade){
        desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoQuantidade[idProduto]);
    }
}

function finalizarCompra(evt){
    evt.preventDefault();
    const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idsProdutoCarrinhoQuantidade).length === 0) {
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoQuantidade,
    }
    const historicoPedidos = lerLocalStorage("historico") ?? [];
    const historicoPedidosAtualizado = [pedidoFeito, ...historicoPedidos];

    salvarLocalStorage("historico", historicoPedidosAtualizado);
    esvaziarLocalStorage("carrinho");
    window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();
atualizarPrecoCarrinho();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
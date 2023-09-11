const catalogoProdutos = document.getElementById("container-produto");

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName("hidden"));
    for(const produto of produtosEscondidos){
        produto.classList.remove("hidden");
    }
}
function esconderUniformes(){
    exibirTodos();
    const uniformes = Array.from(catalogoProdutos.getElementsByClassName("uniforme"));

    for(const produto of uniformes){
        produto.classList.add("hidden");
    }
}

function esconderOutros(){
    exibirTodos();
    const outrosProdutos = Array.from(catalogoProdutos.getElementsByClassName("outros"));
 
    for(const produto of outrosProdutos){
     produto.classList.add('hidden');
    }
 }

export function inicializarFiltros(){
    document.getElementById("exibir-todos").addEventListener('click', exibirTodos);
    document.getElementById("exibir-uniformes").addEventListener('click', esconderOutros);
    document.getElementById("exibir-outros").addEventListener('click', esconderUniformes);
}
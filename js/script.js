
const alimentoCardapio = document.querySelector('#alimento-cardapio')
const alimentos = document.querySelector('#alimentos')
const quantidade = document.querySelector('#quantidade')
const btnAdicionar = document.querySelector('#btnAdicionar')
const btnRemover = document.querySelector('#btnRemover')
const totalGeral = document.querySelector('#total-geral')
const erro = document.querySelector('#erro')
const lista = document.querySelector('#lista-pedido')


const cardapio = {
    almocoCompleto:25,
    salgados:3,
    pastelComCaldo:8,
    cafeDaManha:20
};


function dinheiro(v) {
    return "R$ " + v.toFixed(2).replace(".", ",");
}


function limparErro() {
    erro.textContent = "";
}


function adicionarItem() {
    const alimento = alimentos.value;
    const qtd = Number(quantidade.value);

    if (!alimento) {
        erro.textContent = "Selecione um alimento!";
        return;
    }
    if (qtd < 1) {
        erro.textContent = "Quantidade inválida!";
        return;
    }

    const precoUnit = cardapio[alimento];
    const totalItem = precoUnit * qtd;

    const li = document.createElement("li");
    li.dataset.total = totalItem;

    li.innerHTML = `
        <span><strong>${alimento}</strong> — ${qtd} un</span>
        <span>${dinheiro(totalItem)}</span>
        <button class="remover">Remover</button>
    `;

    li.querySelector(".remover").addEventListener('click', function(){
        li.remove();
        atualizarTotal();
    });

    lista.appendChild(li);
    limparErro();
    atualizarTotal();
}


function atualizarTotal() {
    const itens = lista.querySelectorAll("li");
    let maior = 0;
    let caro = null;
    let soma = 0;

    itens.forEach(li => {
        const val = Number(li.dataset.total);
        soma += val;

        li.classList.remove("mais-caro");
        if (val > maior) {
            maior = val;
            caro = li;
        }
    });

    if (caro) caro.classList.add("mais-caro");
    totalGeral.textContent = "Total: " + dinheiro(soma);
}


btnAdicionar.addEventListener("click", adicionarItem);
alimentoCardapio.addEventListener("change", limparErro);
quantidade.addEventListener("input", limparErro);

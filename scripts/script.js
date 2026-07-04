// ==============================
// BASE DE DADOS DE DRINKS
// ==============================

const drinks = [
    {
        id: 1,
        nome: "Quentão",
        descricao: "Bebida quente com vinho tinto, gengibre e especiarias",
        preco: 15.00,
        imagem: "assets/imagens/quentao.jpg", // Adicione a imagem aqui
        categoria: "alcoolico"
    },
    {
        id: 2,
        nome: "Broto",
        descricao: "Cachaça com mel, limão e gengibre",
        preco: 12.00,
        imagem: "assets/imagens/broto.jpg", // Adicione a imagem aqui
        categoria: "alcoolico"
    },
    {
        id: 3,
        nome: "Água com Açúcar",
        descricao: "Bebida refrescante com açúcar cristal e limão",
        preco: 8.00,
        imagem: "assets/imagens/agua-acucar.jpg", // Adicione a imagem aqui
        categoria: "naoalcoolico"
    },
    {
        id: 4,
        nome: "Caldo de Cana",
        descricao: "Suco natural de cana de açúcar gelado",
        preco: 10.00,
        imagem: "assets/imagens/caldo-cana.jpg", // Adicione a imagem aqui
        categoria: "naoalcoolico"
    },
    {
        id: 5,
        nome: "Vinho Quente",
        descricao: "Vinho aquecido com canela e cravo",
        preco: 16.00,
        imagem: "assets/imagens/vinho-quente.jpg", // Adicione a imagem aqui
        categoria: "alcoolico"
    },
    {
        id: 6,
        nome: "Suco Junino",
        descricao: "Mix de frutas tropicais com hortelã",
        preco: 9.00,
        imagem: "assets/imagens/suco-junino.jpg", // Adicione a imagem aqui
        categoria: "naoalcoolico"
    },
    {
        id: 7,
        nome: "Vinhete",
        descricao: "Vinho com refrigerante e gelo",
        preco: 13.00,
        imagem: "assets/imagens/vinhete.jpg", // Adicione a imagem aqui
        categoria: "alcoolico"
    },
    {
        id: 8,
        nome: "Água de Coco",
        descricao: "Água de coco natural com gelado",
        preco: 11.00,
        imagem: "assets/imagens/agua-coco.jpg", // Adicione a imagem aqui
        categoria: "naoalcoolico"
    },
    {
        id: 9,
        nome: "Licor de Jabuticaba",
        descricao: "Licor caseiro de jabuticaba premium",
        preco: 18.00,
        imagem: "assets/imagens/licor-jabuticaba.jpg", // Adicione a imagem aqui
        categoria: "alcoolico"
    }
];

// ==============================
// GERENCIAMENTO DO CARRINHO
// ==============================

let carrinho = [];
let filtroAtual = 'todos';

// Carregar carrinho do localStorage
function carregarCarrinho() {
    const salvo = localStorage.getItem('carrinho');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        atualizarBadgeCarrinho();
    }
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
}

// Atualizar badge do carrinho
function atualizarBadgeCarrinho() {
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    document.getElementById('qtd-carrinho').textContent = total;
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(drinkId) {
    const inputQtd = document.getElementById(`qtd-${drinkId}`);
    const quantidade = parseInt(inputQtd.value) || 1;
    
    if (quantidade <= 0) return;
    
    const drink = drinks.find(d => d.id === drinkId);
    const itemExistente = carrinho.find(item => item.id === drinkId);
    
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            ...drink,
            quantidade: quantidade
        });
    }
    
    salvarCarrinho();
    inputQtd.value = '1';
    
    // Feedback visual
    mostrarNotificacao(`${drink.nome} adicionado ao carrinho!`);
}

// Remover item do carrinho
function removerDoCarrinho(drinkId) {
    carrinho = carrinho.filter(item => item.id !== drinkId);
    salvarCarrinho();
    atualizarCarrinhoModal();
}

// Atualizar quantidade no carrinho
function atualizarQuantidadeCarrinho(drinkId, novaQtd) {
    const item = carrinho.find(i => i.id === drinkId);
    if (item) {
        item.quantidade = Math.max(1, novaQtd);
        salvarCarrinho();
        atualizarCarrinhoModal();
    }
}

// ==============================
// RENDERIZAÇÃO DOS DRINKS
// ==============================

function renderizarDrinks(filtro = 'todos') {
    const container = document.getElementById('drinks-grid');
    container.innerHTML = '';
    
    const drinksFiltrados = filtro === 'todos' 
        ? drinks 
        : drinks.filter(d => d.categoria === filtro);
    
    drinksFiltrados.forEach(drink => {
        const card = document.createElement('div');
        card.className = 'drink-card';
        card.innerHTML = `
            <div class="drink-imagem">
                <img src="${drink.imagem}" alt="${drink.nome}" onerror="this.style.display='none'">
            </div>
            <div class="drink-info">
                <h3>${drink.nome}</h3>
                <p class="drink-descricao">${drink.descricao}</p>
                <div class="drink-preco">R$ ${drink.preco.toFixed(2)}</div>
                <div class="drink-controles">
                    <div class="qtd-controle">
                        <button class="qtd-btn" onclick="mudaQtd(${drink.id}, -1)">−</button>
                        <input type="number" class="qtd-input" id="qtd-${drink.id}" value="1" min="1" max="99">
                        <button class="qtd-btn" onclick="mudaQtd(${drink.id}, 1)">+</button>
                    </div>
                    <button class="btn-add" onclick="adicionarAoCarrinho(${drink.id})">Adicionar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function mudaQtd(drinkId, direcao) {
    const input = document.getElementById(`qtd-${drinkId}`);
    const novaQtd = Math.max(1, parseInt(input.value) + direcao);
    input.value = novaQtd;
}

function filtrarDrinks(categoria) {
    filtroAtual = categoria;
    
    // Atualizar botões de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');
    
    renderizarDrinks(categoria);
}

// ==============================
// MODAL CARRINHO
// ==============================

function abrirCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'block';
    atualizarCarrinhoModal();
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'none';
}

function atualizarCarrinhoModal() {
    const container = document.getElementById('carrinho-items');
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="vazio">Seu carrinho está vazio</p>';
        document.getElementById('subtotal').textContent = 'R$ 0,00';
        document.getElementById('taxa').textContent = 'R$ 0,00';
        document.getElementById('total').textContent = 'R$ 0,00';
        return;
    }
    
    container.innerHTML = '';
    let subtotal = 0;
    
    carrinho.forEach(item => {
        const total = item.preco * item.quantidade;
        subtotal += total;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'carrinho-item';
        itemEl.innerHTML = `
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p>${item.categoria === 'alcoolico' ? '🍺' : '🥤'}</p>
            </div>
            <div class="item-controles">
                <button class="qtd-btn" onclick="atualizarQuantidadeCarrinho(${item.id}, ${item.quantidade - 1})">−</button>
                <input type="number" class="qtd-input" value="${item.quantidade}" min="1" onchange="atualizarQuantidadeCarrinho(${item.id}, this.value)">
                <button class="qtd-btn" onclick="atualizarQuantidadeCarrinho(${item.id}, ${item.quantidade + 1})">+</button>
            </div>
            <div class="item-preco">R$ ${total.toFixed(2)}</div>
            <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">✕</button>
        `;
        container.appendChild(itemEl);
    });
    
    const taxa = subtotal * 0.1; // 10% de taxa de serviço (CORRIGIDO)
    const total = subtotal + taxa;
    
    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('taxa').textContent = `R$ ${taxa.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

function irParaPagamento() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const taxa = subtotal * 0.1; // CORRIGIDO
    const total = subtotal + taxa;
    
    document.getElementById('pag-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('pag-total').textContent = `R$ ${total.toFixed(2)}`;
    
    fecharCarrinho();
    document.getElementById('modal-pagamento').style.display = 'block';
}

function fecharPagamento() {
    document.getElementById('modal-pagamento').style.display = 'none';
}

// ==============================
// FORMULÁRIO PAGAMENTO
// ==============================

function inicializarFormularioPagamento() {
    const formPagamento = document.getElementById('form-pagamento');
    if (formPagamento) {
        formPagamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dados = {
                pagamento: document.querySelector('input[name="pagamento"]:checked').value,
                nome: document.getElementById('nome').value,
                telefone: document.getElementById('telefone').value,
                observacoes: document.getElementById('observacoes').value,
                itens: carrinho,
                subtotal: carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0),
                taxa: carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0) * 0.1
            };
            
            dados.total = dados.subtotal + dados.taxa;
            
            // Simular envio
            console.log('Pedido:', dados);
            
            mostrarNotificacao('✓ Pedido confirmado! Obrigado pela compra!');
            
            // Limpar carrinho e fechar modal
            carrinho = [];
            salvarCarrinho();
            fecharPagamento();
            formPagamento.reset();
            renderizarDrinks(filtroAtual);
        });
    }
}

// ==============================
// MODAL GERAL
// ==============================

window.addEventListener('click', function(event) {
    const modalCarrinho = document.getElementById('modal-carrinho');
    const modalPagamento = document.getElementById('modal-pagamento');
    
    if (event.target === modalCarrinho) {
        fecharCarrinho();
    }
    if (event.target === modalPagamento) {
        fecharPagamento();
    }
});

// ==============================
// NOTIFICAÇÕES
// ==============================

function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #DC143C;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = mensagem;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==============================
// INICIALIZAÇÃO
// ==============================

document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
    renderizarDrinks('todos');
    inicializarFormularioPagamento(); // Inicializa o formulário de pagamento
    console.log('Site carregado com sucesso!');
});

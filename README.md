# 🔥 Barraca São João - Drinks Festa Junina

Site de vendas de drinks temático de festas juninas, criado com **HTML**, **CSS** e **JavaScript** puros.

## 📋 Conteúdo

Este é um **MVP (Minimum Viable Product)** completo com:

- **Catálogo de drinks** - 9 bebidas temáticas de festas juninas
- **Carrinho de compras** - Com salvamento no localStorage
- **Filtros** - Alcoólicos, Sem Álcool e Todos
- **Sistema de pagamento** - Pix, Dinheiro e Cartão
- **Formulário de pedido** - Com observações
- **Design responsivo** - Mobile, Tablet e Desktop
- **Animações suaves** - Para melhor UX
- **Paleta de cores** - Branco gelo, Vermelho e Amarelo

## 🚀 Recursos

✅ Carrinho persistente (salva dados no navegador)  
✅ Sistema de filtros funcional  
✅ Cálculo automático de taxa (10%)  
✅ Múltiplas formas de pagamento  
✅ Design temático de festa junina  
✅ Paleta vermelha, branco gelo e amarelo  
✅ Sem dependências externas  
✅ Performance otimizada  
✅ Código limpo e comentado  

## 📁 Estrutura do Projeto

```
barraca-sao-joao/
├── index.html          # Página HTML principal
├── styles/
│   └── style.css       # Estilos CSS
├── scripts/
│   └── script.js       # Lógica JavaScript
└── README.md           # Este arquivo
```

## 🎨 Paleta de Cores

- **Primária:** `#DC143C` (Vermelho Intenso)
- **Secundária:** `#F0F8FF` (Branco Gelo/Alice Blue)
- **Accent:** `#FFD700` (Amarelo Ouro)
- **Ice White:** `#E0F2F7` (Azul Gelo Claro)

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **Desktop:** 1200px+
- **Tablet:** 768px
- **Mobile:** 480px

## 🛠️ Como Usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/Duducoli/barraca-sao-joao.git
   ```

2. Abra o arquivo `index.html` em seu navegador:
   ```bash
   open index.html
   # ou
   start index.html
   ```

3. Customize conforme necessário (veja a seção abaixo)

## 🍹 Drinks Inclusos

1. **Quentão** - Vinho tinto quente com especiarias (R$ 15,00)
2. **Broto** - Cachaça com mel, limão e gengibre (R$ 12,00)
3. **Água com Açúcar** - Bebida refrescante (R$ 8,00)
4. **Caldo de Cana** - Suco natural de cana (R$ 10,00)
5. **Vinho Quente** - Vinho com canela e cravo (R$ 16,00)
6. **Suco Junino** - Mix de frutas com hortelã (R$ 9,00)
7. **Vinhete** - Vinho com refrigerante (R$ 13,00)
8. **Água de Coco** - Água de coco natural (R$ 11,00)
9. **Licor de Jabuticaba** - Licor premium (R$ 18,00)

## ✏️ Personalizações Recomendadas

### Informações de Contato
Edite a seção `INFORMAÇÕES` no `index.html`:
- Horário de funcionamento
- Localização/Endereço
- Telefone e Email

### Adicionar Novos Drinks
Edite o array `drinks` em `scripts/script.js`:
```javascript
const drinks = [
    {
        id: 10,
        nome: "Seu Drink",
        descricao: "Descrição",
        preco: 15.00,
        icone: "🍹",
        categoria: "alcoolico" // ou "naoalcoolico"
    },
    // ...
];
```

### Alterar Cores
Edite as variáveis CSS em `styles/style.css`:
```css
:root {
    --primary-color: #DC143C;
    --secondary-color: #F0F8FF;
    --accent-color: #FFD700;
    --ice-white: #E0F2F7;
    /* ... */
}
```

### Taxa de Serviço
Procure por `0.1` em `scripts/script.js` para alterar a porcentagem:
```javascript
const taxa = subtotal * 0.1; // 10%
```

## 💳 Formas de Pagamento

O site oferece 3 opções:
- **Pix** - Pagamento instantâneo
- **Dinheiro** - Pagamento na entrega
- **Cartão** - Débito ou Crédito

## 📦 Funcionalidades do Carrinho

- ✅ Adicionar/remover items
- ✅ Aumentar/diminuir quantidade
- ✅ Salvar automaticamente no localStorage
- ✅ Atualizar em tempo real
- ✅ Calcular total com taxa

## 🔧 Integrações Futuras

- [ ] Backend para processar pedidos
- [ ] Integração com WhatsApp
- [ ] Cupons de desconto
- [ ] Histórico de pedidos
- [ ] Sistema de fidelização
- [ ] Integração com pagamento real (Stripe, etc)

## 📄 Licença

Este projeto é livre para usar e modificar.

## 👤 Desenvolvido para

Barraca São João - Festa Junina

---

**Dúvidas?** Entre em contato!

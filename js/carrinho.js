// Variáveis globais
let cart = [];

// Carregar o carrinho do localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCartItems();
        updateCartTotals();
    } else {
        document.querySelector('.cart-items').innerHTML = `
            <tr>
                <td colspan="5" class="py-8 text-center text-gray-500">
                    Seu carrinho está vazio. Adicione itens do <a href="cardapio.html" class="text-[#FFD700]">cardápio</a>.
                </td>
            </tr>
        `;
    }
}

// Renderizar itens do carrinho
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <tr>
                <td colspan="5" class="py-8 text-center text-gray-500">
                    Seu carrinho está vazio. Adicione itens do <a href="cardapio.html" class="text-[#FFD700]">cardápio</a>.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    console.log(cart);
    
    
    cart.forEach(item => {
        html += `
            <tr class="border-b border-gray-200 cart-item" data-id="${item.id}">
                <td class="py-4 px-6">
                    <div class="flex items-center gap-4">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                        <div>
                            <h3 class="font-bold">${item.name}</h3>
                            <p class="text-sm text-gray-600">${getItemCategory(item.id)}</p>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <div class="flex items-center justify-center">
                        <button class="quantity-btn minus bg-gray-200 rounded-l-full w-8 h-8 flex items-center justify-center">-</button>
                        <input type="number" class="quantity w-12 h-8 text-center border-t border-b border-gray-200" value="${item.quantity}" min="1" max="10">
                        <button class="quantity-btn plus bg-gray-200 rounded-r-full w-8 h-8 flex items-center justify-center">+</button>
                    </div>
                </td>
                <td class="py-4 px-6 text-center">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
                <td class="py-4 px-6 text-center item-total">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
                <td class="py-4 px-6 text-center">
                    <button class="remove-item text-red-500 hover:text-red-700">
                        <span>×</span>
                    </button>
                </td>
            </tr>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    
    // Adicionar eventos aos botões após renderizar
    addCartEvents();
}

// Adicionar eventos aos botões do carrinho
function addCartEvents() {
    // Botões de quantidade
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('.cart-item');
            const id = row.dataset.id;
            const input = this.parentElement.querySelector('.quantity');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                value = Math.min(10, value + 1);
            } else if (this.classList.contains('minus')) {
                value = Math.max(1, value - 1);
            }
            
            input.value = value;
            
            // Atualizar quantidade no array do carrinho
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = value;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            
            updateCartTotals();
        });
    });
    
    // Inputs de quantidade
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', function() {
            const row = this.closest('.cart-item');
            const id = row.dataset.id;
            let value = parseInt(this.value);
            
            // Limitar entre 1 e 10
            value = Math.max(1, Math.min(10, value));
            this.value = value;
            
            // Atualizar quantidade no array do carrinho
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = value;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            
            updateCartTotals();
        });
    });
    
    // Botões para remover item
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('.cart-item');
            const id = row.dataset.id;
            
            // Remover do array do carrinho
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            row.remove();
            updateCartTotals();
            
            // Se o carrinho estiver vazio após remover, mostrar mensagem
            if (cart.length === 0) {
                renderCartItems();
            }
        });
    });
}

// Função para obter categoria do item baseado no ID
function getItemCategory(id) {
    // Mapeia IDs para categorias
    const categories = {
        // Segunda-feira
        'feijoada': 'Segunda-feira',
        'feijoada-light': 'Segunda-feira',
        'picadinho': 'Segunda-feira',
        'caipirinha': 'Bebida',
        'suco-laranja': 'Bebida',
        'pudim': 'Sobremesa',
        
        // Terça-feira
        'moqueca': 'Terça-feira',
        'peixada': 'Terça-feira',
        'peixe-milanesa': 'Terça-feira',
        'bobo-camarao': 'Terça-feira',
        'vinho-branco': 'Bebida',
        'mousse-maracuja': 'Sobremesa',
        
        // Quarta-feira
        'picanha': 'Quarta-feira',
        'cupim': 'Quarta-feira',
        'parmegiana': 'Quarta-feira',
        'tropeiro': 'Quarta-feira',
        'chopp': 'Bebida',
        'petit-gateau': 'Sobremesa',
        
        // Quinta-feira
        'lasanha': 'Quinta-feira',
        'nhoque': 'Quinta-feira',
        'macarrao': 'Quinta-feira',
        'canelone': 'Quinta-feira',
        'vinho-tinto': 'Bebida',
        'tiramisu': 'Sobremesa',
        
        // Sexta-feira
        'rodizio': 'Sexta-feira',
        'costela': 'Sexta-feira',
        'linguica': 'Sexta-feira',
        'espetinhos': 'Sexta-feira',
        'cerveja': 'Bebida',
        'pudim-coco': 'Sobremesa'
    };
    
    return categories[id] || 'Diversos';
}

// Função para atualizar totais
function updateCartTotals() {
    let subtotal = 0;
    
    document.querySelectorAll('.cart-item').forEach(item => {
        const id = item.dataset.id;
        const cartItem = cart.find(i => i.id === id);
        
        if (cartItem) {
            const total = cartItem.price * cartItem.quantity;
            item.querySelector('.item-total').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
            subtotal += total;
        }
    });
    
    const deliveryFee = 10.00;
    const total = subtotal + deliveryFee;
    
    document.querySelector('.subtotal').textContent = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
    document.querySelector('.total').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    
    // Atualizar contagem de itens no ícone do carrinho
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Função para checkout via WhatsApp
function checkoutWhatsapp() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;
    
    if (!name || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    let message = `*Pedido - Bar do Nem*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Telefone:* ${phone}\n`;
    message += `*Endereço:* ${address}\n\n`;
    
    message += `*Itens do Pedido:*\n`;
    
    cart.forEach(item => {
        const total = (item.price * item.quantity).toFixed(2).replace('.', ',');
        message += `- ${item.name} (${item.quantity}x): R$ ${total}\n`;
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 10.00;
    const total = subtotal + deliveryFee;
    
    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    message += `\n*Taxa de entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    message += `\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
    
    if (notes) {
        message += `\n\n*Observações:* ${notes}`;
    }
    
    // Encode para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp do restaurante (substitua pelo número real)
    const phoneNumber = "5511912069160";
    
    // Cria o link para o WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abre o link em uma nova janela
    window.open(whatsappUrl, '_blank');
    
    // Limpar o carrinho após o pedido
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    // Associar evento ao botão de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkoutWhatsapp);
    }
});

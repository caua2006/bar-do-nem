// Função para mostrar o cardápio do dia selecionado





function showDay(day) {
    // Esconde todos os menus
    const html = document.documentElement;
    const menus = document.querySelectorAll('.menu-day');
    menus.forEach(menu => menu.classList.add('hidden'));
    
    // Mostra o menu do dia selecionado
    document.getElementById('menu-' + day).classList.remove('hidden');
    
    // Reseta o estilo de todos os botões
    const buttons = document.querySelectorAll('.tab-day');
    buttons.forEach(button => {

        if (html.classList.contains('dark')) {
            button.classList.remove('bg-white');
        button.classList.remove('text-[#FFD700]');
        button.classList.remove('scale-105');
        button.classList.add('text-white'); // Ícone da lua para modo claro
        } else {
            button.classList.remove('bg-black');
        button.classList.remove('text-[#FFD700]');
        button.classList.remove('scale-105');
        button.classList.add('text-[#191919]'); // Ícone do sol para modo escuro
        }




        // button.classList.remove('bg-black');
        // button.classList.remove('text-[#FFD700]');
        // button.classList.remove('scale-105');
        // button.classList.add('text-[#191919]');
    });
    
    // Aplica o estilo ao botão selecionado
    const activeButton = document.querySelector(`.tab-day[onclick="showDay('${day}')"]`);

    if (html.classList.contains('dark')) {
        activeButton.classList.remove('text-[#191919]');
        activeButton.classList.remove('text-white');
        activeButton.classList.add('bg-white');
        activeButton.classList.add('text-black');
        activeButton.classList.add('scale-105');
        activeButton.classList.add('hover:bg-white');
    } else {
        activeButton.classList.remove('text-[#191919]');
        activeButton.classList.add('bg-black');
        activeButton.classList.add('text-[#FFD700]');
        activeButton.classList.add('scale-105');
    }




    // activeButton.classList.remove('text-[#191919]');
    // activeButton.classList.add('bg-black');
    // activeButton.classList.add('text-[#FFD700]');
    // activeButton.classList.add('scale-105');
}

// Carrinho de compras
let cart = [];

// Carregar carrinho do localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Atualizar contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Adicionar item ao carrinho
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        });
    }
    
    saveCart();
    
    // Feedback visual
    showAddedToCartNotification(name);
}

// Mostrar notificação de item adicionado ao carrinho
function showAddedToCartNotification(itemName) {
    // Verifica se já existe uma notificação e remove
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria a notificação
    const notification = document.createElement('div');
    notification.className = 'cart-notification fixed bottom-4 right-4 bg-[#FFD700] text-black px-4 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
    notification.innerHTML = `<span class="font-bold">${itemName}</span> adicionado ao carrinho!`;
    
    // Adiciona ao DOM
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Mostra Segunda-feira por padrão
    showDay('segunda');
    
    // Carrega o carrinho
    loadCart();
    
    // Adiciona eventos aos botões de "Adicionar ao carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = this.dataset.price;
            const image = this.dataset.image;
            
            addToCart(id, name, price, image);
        });
    });
});

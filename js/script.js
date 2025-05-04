        // Função para alternar o tema
        function toggleTheme() {
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            const shoppingCartIcon = document.getElementById("shoppingCartIcon")
            
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                html.classList.add('light');
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = '🌙'; 
                shoppingCartIcon.innerHTML = `<img src="images/icon/shopping-cart-dark.svg" alt="Carrinho">`// Ícone da lua para modo claro
            } else {
                html.classList.remove('light');
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = '☀️';
                shoppingCartIcon.innerHTML = `<img src="images/icon/shopping-cart.svg" alt="Carrinho">` // Ícone do sol para modo escuro
            }

            location.reload()
            
        }
        
        // Verificar tema salvo ao carregar
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            const shoppingCartIcon = document.getElementById("shoppingCartIcon")
            
            if (savedTheme === 'dark') {
                html.classList.remove('light');
                html.classList.add('dark');
                themeIcon.textContent = '☀️';
                shoppingCartIcon.innerHTML = `<img src="images/icon/shopping-cart.svg" alt="Carrinho">`

            } else {
                html.classList.remove('dark');
                html.classList.add('light');
                themeIcon.textContent = '🌙';
                shoppingCartIcon.innerHTML = `<img src="images/icon/shopping-cart-dark.svg" alt="Carrinho">`
            }
        });
    
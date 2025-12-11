document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando funcionalidades');
    
    // =========== NAVBAR SCROLL EFFECT ===========
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =========== HAMBURGER MENU ===========
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    let isMenuOpen = false;
    
    if (burger && menu) {
        console.log('✅ Elementos del menú encontrados');
        
        // Función para abrir el menú
        function openMenu() {
            console.log('🔓 Abriendo menú');
            menu.classList.add('nav-active');
            menu.classList.remove('closing');
            burger.classList.add('toggle');
            burger.classList.remove('reverse');
            isMenuOpen = true;
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        }
        
        // Función para cerrar el menú
        function closeMenu() {
            if (!isMenuOpen) return;
            
            console.log('🔒 Cerrando menú');
            menu.classList.add('closing');
            burger.classList.add('reverse');
            burger.classList.remove('toggle');
            
            setTimeout(() => {
                menu.classList.remove('nav-active', 'closing');
                burger.classList.remove('reverse');
                isMenuOpen = false;
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }, 400);
        }
        
        // Evento para el botón hamburguesa
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('📌 Click en enlace del menú');
                e.stopPropagation();
                
                const href = this.getAttribute('href');
                
                // Cerrar el menú primero
                closeMenu();
                
                // Scroll suave después de cerrar el menú
                if (href && href.startsWith('#')) {
                    setTimeout(() => {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            e.preventDefault();
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }, 450);
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !menu.contains(e.target) && !burger.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (isMenuOpen && e.key === 'Escape') {
                closeMenu();
            }
        });
        
        // Cerrar menú al redimensionar a desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    } else {
        console.error('❌ No se encontraron elementos del menú hamburguesa');
        console.log('Burger encontrado:', burger);
        console.log('Menu encontrado:', menu);
    }

    // =========== INFINITE CAROUSELS ===========
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const originalTrack = container.querySelector('.slider-track');
        if (originalTrack) {
            const items = originalTrack.querySelectorAll('.product-card');
            
            // Limpiar contenedor
            container.innerHTML = '';
            
            // Crear dos filas para efecto infinito
            for (let i = 0; i < 2; i++) {
                const row = document.createElement('div');
                row.className = 'slider-row';
                const track = document.createElement('div');
                track.className = `slider-track ${i % 2 === 0 ? 'left-scroll' : 'right-scroll'}`;
                
                // Duplicar items 3 veces
                for (let j = 0; j < 3; j++) {
                    items.forEach(item => {
                        const clone = item.cloneNode(true);
                        track.appendChild(clone);
                    });
                }
                
                row.appendChild(track);
                container.appendChild(row);
            }
        }
    });

    // =========== MODAL FUNCTIONALITY ===========
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal .close-btn');
    
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const addToCartBtn = document.querySelector('.modal-details .add-to-cart-btn');
        
        // Seleccionar TODOS los tipos de productos
        const allProductCards = document.querySelectorAll('.product-card, .masonry-item, .grid-product-card');
        
        function openModal(imageSrc, title, price) {
            modalImg.src = imageSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            
            // Actualizar el botón de WhatsApp
            addToCartBtn.textContent = 'Comprar por WhatsApp';
            addToCartBtn.onclick = function() {
                const phoneNumber = '123456789'; // REEMPLAZA CON TU NÚMERO
                const message = `Hola! Estoy interesado/a en el producto "${title}" con precio ${price}.`;
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            };

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        
        allProductCards.forEach(card => {
            card.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.getAttribute('data-title');
                const price = this.getAttribute('data-price');
                
                if (img && title && price) {
                    openModal(img.src, title, price);
                }
            });
        });
        
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // =========== REVEAL ANIMATIONS ===========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // =========== SMOOTH SCROLL ===========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Si el menú está abierto, cerrarlo primero
                if (isMenuOpen) {
                    closeMenu();
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 450);
                } else {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =========== ADDITIONAL CSS ===========
    const style = document.createElement('style');
    style.textContent = `
        /* Asegurar que el menú sea visible cuando está activo */
        .menu.nav-active {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
        }
        
        .menu.nav-active li a {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Bloquear scroll cuando el menú está abierto */
        body.menu-open {
            overflow: hidden !important;
            position: fixed;
            width: 100%;
        }
        
        /* Animaciones adicionales */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        /* Efecto de carga para imágenes */
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img[loading="lazy"].loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Todas las funcionalidades inicializadas');
});

// =========== LOADING STATE ===========
window.addEventListener('load', function() {
    console.log('✅ Página completamente cargada');
    document.body.classList.add('loaded');
    
    // Animación de entrada para el hero
    const hero = document.querySelector('.main');
    if (hero) {
        hero.style.animation = 'fadeIn 1s ease';
    }
    
    // Añadir estilo para la animación
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .main {
            animation: fadeIn 1s ease;
        }
    `;
    document.head.appendChild(fadeInStyle);
});

// =========== ERROR HANDLING ===========
window.addEventListener('error', function(e) {
    console.error('❌ Error en la página:', e.message);
});

// =========== RESIZE HANDLER ===========
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('🔄 Ventana redimensionada:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
});
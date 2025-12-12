document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando funcionalidades');
    
    // =========== HAMBURGER MENU ===========
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    let isMenuOpen = false;
    
    if (burger && menu) {
        console.log('✅ Elementos del menú encontrados');
        
        function openMenu() {
            console.log('🔓 Abriendo menú');
            menu.classList.add('nav-active');
            burger.classList.add('toggle');
            isMenuOpen = true;
            document.body.classList.add('menu-open');
        }
        
        function closeMenu() {
            if (!isMenuOpen) return;
            
            console.log('🔒 Cerrando menú');
            menu.classList.remove('nav-active');
            burger.classList.remove('toggle');
            isMenuOpen = false;
            document.body.classList.remove('menu-open');
        }
        
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (isMenuOpen) {
                    closeMenu();
                    
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
                        }, 300);
                    }
                }
            });
        });
        
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !menu.contains(e.target) && !burger.contains(e.target)) {
                closeMenu();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (isMenuOpen && e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    // =========== INFINITE CAROUSELS ===========
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const originalTrack = container.querySelector('.slider-track');
        if (originalTrack) {
            const items = originalTrack.querySelectorAll('.product-card');
            
            container.innerHTML = '';
            
            for (let i = 0; i < 2; i++) {
                const row = document.createElement('div');
                row.className = 'slider-row';
                const track = document.createElement('div');
                track.className = `slider-track ${i % 2 === 0 ? 'left-scroll' : 'right-scroll'}`;
                
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
        
        const allProductCards = document.querySelectorAll('.product-card, .masonry-item, .grid-product-card');
        
        function openModal(imageSrc, title, price) {
            modalImg.src = imageSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            
            addToCartBtn.textContent = 'Comprar';
            addToCartBtn.onclick = function() {
                const phoneNumber = '123456789';
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
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✅ Todas las funcionalidades inicializadas');
});

window.addEventListener('load', function() {
    console.log('✅ Página completamente cargada');
    document.body.classList.add('loaded');
});
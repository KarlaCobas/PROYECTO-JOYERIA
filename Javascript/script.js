document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sliderContainers = document.querySelectorAll('.slider-container');
    
    if (sliderContainers.length > 0) {
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
    }

    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal .close-btn');
    
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDescription = document.querySelector('.modal-details .description'); 
        const addToCartBtn = document.querySelector('.modal-details .add-to-cart-btn'); 

        const allProductCards = document.querySelectorAll('.product-card, .masonry-item, .grid-product-card');
        
        function openModal(imageSrc, title, price) {
            modalImg.src = imageSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalDescription.textContent = 'Pieza única elaborada a mano. Contacta con nosotros por WhatsApp para la compra o personalización.';

            addToCartBtn.textContent = 'Comprar';
            addToCartBtn.onclick = () => {
                const phoneNumber = '123456789';
                const message = `Hola! Estoy interesado/a en el producto "${title}" con precio ${price}.`;
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            };

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        allProductCards.forEach(card => {
            card.addEventListener('click', () => {
                let imgElement = card.querySelector('.img-container img');
                const src = imgElement ? imgElement.src : '';
                const title = card.getAttribute('data-title');
                const price = card.getAttribute('data-price');
                
                if (src && title && price) {
                    openModal(src, title, price);
                }
            });
        });

        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.menu');
        const navLinks = document.querySelectorAll('.menu li');
        let isMenuOpen = false;

        if (!burger || !nav) return;

        const closeMenu = () => {
            if (!isMenuOpen) return;
            
            nav.classList.add('closing');
            burger.classList.add('reverse');
            burger.classList.remove('toggle');
            
            setTimeout(() => {
                nav.classList.remove('nav-active', 'closing');
                burger.classList.remove('reverse');
                isMenuOpen = false;
                document.body.style.overflow = 'auto';
                document.body.classList.remove('menu-open');
            }, 400);
        };

        const openMenu = () => {
            nav.classList.add('nav-active');
            nav.classList.remove('closing');
            burger.classList.add('toggle');
            burger.classList.remove('reverse');
            isMenuOpen = true;
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        };

        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
                
                const linkElement = link.querySelector('a');
                if (linkElement) {
                    const targetId = linkElement.getAttribute('href');
                    if (targetId && targetId.startsWith('#')) {
                        e.preventDefault();
                        setTimeout(() => {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                window.scrollTo({
                                    top: targetElement.offsetTop - 80,
                                    behavior: 'smooth'
                                });
                            }
                        }, 450);
                    }
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && !burger.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isMenuOpen && e.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('orientationchange', () => {
            if (isMenuOpen) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    };
    
    navSlide();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const nav = document.querySelector('.menu');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.add('closing');
                    burger.classList.add('reverse');
                    burger.classList.remove('toggle');
                    
                    setTimeout(() => {
                        nav.classList.remove('nav-active', 'closing');
                        burger.classList.remove('reverse');
                        document.body.style.overflow = 'auto';
                        document.body.classList.remove('menu-open');

                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }, 100);
                    }, 400);
                } else {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
        
        window.addEventListener('resize', () => {
            document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
        });
    }

    const heroImage = document.querySelector('.main-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroImage.style.transform = `translate3d(0px, ${rate}px, 0px) scale(${1 + scrolled * 0.0005})`;
        });
    }

    const products = document.querySelectorAll('.product-card, .masonry-item, .grid-product-card');
    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.style.zIndex = '10';
        });
        
        product.addEventListener('mouseleave', () => {
            product.style.zIndex = '';
        });
    });

    const whatsappBtn = document.querySelector('.contacto__btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.transform = 'translateY(0) scale(1)';
        });
        
        setInterval(() => {
            whatsappBtn.style.animation = 'pulse 1s';
            setTimeout(() => {
                whatsappBtn.style.animation = '';
            }, 1000);
        }, 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4); }
            50% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.8); }
            100% { box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .menu-open main,
        .menu-open header,
        .menu-open footer,
        .menu-open section {
            transition: filter 0.5s ease;
        }
        
        @media (max-width: 768px) {
            .menu-open main,
            .menu-open header,
            .menu-open footer,
            .menu-open section {
                filter: blur(3px);
            }
        }
    `;
    document.head.appendChild(style);
});


if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            if (entry.contentRect.width > 768) {
                const nav = document.querySelector('.menu');
                const burger = document.querySelector('.burger');
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle', 'reverse');
                    document.body.style.overflow = 'auto';
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
    
    resizeObserver.observe(document.body);
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn(`Failed to load image: ${this.src}`);
    });
});
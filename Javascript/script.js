document.addEventListener('DOMContentLoaded', () => {

    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const direction = container.querySelector('.slider-track').getAttribute('data-direction');
        
        const originalTrack = container.querySelector('.slider-track');
        const items = originalTrack.querySelectorAll('.product-card');
        
        const firstRow = container;
        firstRow.innerHTML = '';
        
        const row1 = document.createElement('div');
        row1.className = 'slider-row';
        const track1 = document.createElement('div');
        track1.className = `slider-track ${direction === 'right' ? 'right-scroll' : 'left-scroll'}`;
        
        const row2 = document.createElement('div');
        row2.className = 'slider-row';
        const track2 = document.createElement('div');
        track2.className = `slider-track ${direction === 'right' ? 'right-scroll' : 'left-scroll'}`;
        
        items.forEach((item, index) => {
            const clone1 = item.cloneNode(true);
            const clone2 = item.cloneNode(true);
            
            track1.appendChild(clone1);
            track2.appendChild(clone2);
            
            const dup1 = item.cloneNode(true);
            const dup2 = item.cloneNode(true);
            
            track1.appendChild(dup1);
            track2.appendChild(dup2);
        });
        
        row1.appendChild(track1);
        row2.appendChild(track2);
        
        container.appendChild(row1);
        container.appendChild(row2);
    });


    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal .close-btn');
    const allProductCards = document.querySelectorAll('.product-card'); 
    
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.querySelector('.modal-details .description'); 
    const addToCartBtn = document.querySelector('.modal-details .add-to-cart-btn'); 

    function openModal(imageSrc, title, price) {
        modalImg.src = imageSrc;
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDescription.textContent = 'Pieza única elaborada a mano. Contacta con nosotros por WhatsApp para la compra o personalización.';

        addToCartBtn.textContent = 'Comprar por WhatsApp';
        addToCartBtn.onclick = () => {
            window.open(`https://wa.me/XXXXXXXXXX?text=Hola!%20Estoy%20interesado/a%20en%20el%20producto%20"${title}"%20con%20precio%20${price}.`, '_blank');
        };

        modal.classList.add('show');
    }

    allProductCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgElement = card.querySelector('.img-container img');
            const src = imgElement ? imgElement.src : '';
            const title = card.getAttribute('data-title');
            const price = card.getAttribute('data-price');
            openModal(src, title, price);
        });
    });

    function closeModal() {
        modal.classList.remove('show');
    }

    closeBtn.addEventListener('click', closeModal);

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

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.menu');
        const navLinks = document.querySelectorAll('.menu li');

        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = nav.classList.contains('nav-active');
            
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            if (!isActive) {
                nav.classList.add('nav-active');
                burger.classList.add('toggle');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    }
    navSlide();

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
});
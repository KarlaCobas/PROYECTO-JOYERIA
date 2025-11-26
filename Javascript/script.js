
        let resizeTimer;
        window.addEventListener("resize", () => {
            document.body.classList.add("resize-animation-stopper");

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.body.classList.remove("resize-animation-stopper");
            }, 400);

            const nav = document.querySelector('.menu');
            const burger = document.querySelector('.burger');

            if (window.innerWidth > 768) {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


        const navSlide = () => {
            const burger = document.querySelector('.burger');
            const nav = document.querySelector('.menu');
            const navLinks = document.querySelectorAll('.menu li');

            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.toggle('nav-active');
                        burger.classList.toggle('toggle');
                    }
                });
            });
        }
        navSlide();


        const modal = document.getElementById("productModal");
        const closeBtn = document.querySelector(".close-btn");
        const productCards = document.querySelectorAll(".product-card");

        const modalImg = document.getElementById("modalImg");
        const modalTitle = document.getElementById("modalTitle");
        const modalPrice = document.getElementById("modalPrice");

        productCards.forEach(card => {
            card.addEventListener('click', function () {
                const imgSrc = this.querySelector('img').src;
                const title = this.getAttribute('data-title');
                const price = this.getAttribute('data-price');

                modalImg.src = imgSrc;
                modalTitle.textContent = title;
                modalPrice.textContent = price;

                modal.classList.add("show");
                document.body.style.overflow = 'hidden'; 
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove("show");
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.classList.remove("show");
                document.body.style.overflow = 'auto';
            }
        });
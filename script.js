document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 2. Sticky Header on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Keep background on mobile when menu is active
            if (window.innerWidth > 768) {
                header.classList.remove('scrolled');
            }
        }
    });

    // Initial check for scroll position on load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 3. Intersection Observer for Scroll Animations
    const animationElements = document.querySelectorAll('.fade-up, .fade-in, .slide-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Element is considered visible when 15% is in viewport
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Info Modal Logic
    const infoBtn = document.getElementById('info-btn');
    const infoModal = document.getElementById('info-modal');
    const closeModal = document.getElementById('close-modal');

    if (infoBtn && infoModal && closeModal) {
        infoBtn.addEventListener('click', () => {
            infoModal.style.display = 'flex';
            setTimeout(() => {
                infoModal.classList.add('show');
            }, 10);
        });

        closeModal.addEventListener('click', () => {
            infoModal.classList.remove('show');
            setTimeout(() => {
                infoModal.style.display = 'none';
            }, 300);
        });

        window.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.classList.remove('show');
                setTimeout(() => {
                    infoModal.style.display = 'none';
                }, 300);
            }
        });
    }
    // 5. Restaurant Modal Logic
    const restaurantBtn = document.getElementById('restaurant-btn');
    const restaurantModal = document.getElementById('restaurant-modal');
    const closeRestaurantModal = document.getElementById('close-restaurant-modal');

    if (restaurantBtn && restaurantModal && closeRestaurantModal) {
        restaurantBtn.addEventListener('click', (e) => {
            e.preventDefault();
            restaurantModal.style.display = 'flex';
            setTimeout(() => {
                restaurantModal.classList.add('show');
            }, 10);
        });

        closeRestaurantModal.addEventListener('click', () => {
            restaurantModal.classList.remove('show');
            setTimeout(() => {
                restaurantModal.style.display = 'none';
            }, 300);
        });

        window.addEventListener('click', (e) => {
            if (e.target === restaurantModal) {
                restaurantModal.classList.remove('show');
                setTimeout(() => {
                    restaurantModal.style.display = 'none';
                }, 300);
            }
        });
    }

    // 6. 9 Spots Modal Logic
    const spotItems = document.querySelectorAll('.map-hotspot');
    const spotModal = document.getElementById('spot-modal');
    const closeSpotModal = document.getElementById('close-spot-modal');
    const spotTitle = document.getElementById('spot-title');
    const spotAddress = document.getElementById('spot-address');
    const spotPhone = document.getElementById('spot-phone');
    const spotDesc = document.getElementById('spot-desc');

    if (spotItems.length > 0 && spotModal) {
        spotItems.forEach(item => {
            item.addEventListener('click', () => {
                spotTitle.textContent = item.getAttribute('data-name');
                spotAddress.textContent = item.getAttribute('data-address');
                spotPhone.textContent = item.getAttribute('data-phone');
                spotDesc.textContent = item.getAttribute('data-desc');
                
                spotModal.style.display = 'flex';
                setTimeout(() => {
                    spotModal.classList.add('show');
                }, 10);
            });
        });

        if (closeSpotModal) {
            closeSpotModal.addEventListener('click', () => {
                spotModal.classList.remove('show');
                setTimeout(() => {
                    spotModal.style.display = 'none';
                }, 300);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === spotModal) {
                spotModal.classList.remove('show');
                setTimeout(() => {
                    spotModal.style.display = 'none';
                }, 300);
            }
        });
    }

    // 7. Festival Popup Logic
    const festivalPopup = document.getElementById('festival-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const dontShowCheckbox = document.getElementById('popup-dont-show');

    if (festivalPopup) {
        // Check localStorage
        const hidePopupDate = localStorage.getItem('hideFestivalPopup');
        const today = new Date().toDateString();

        if (hidePopupDate !== today) {
            // Show popup if not hidden today
            setTimeout(() => {
                festivalPopup.style.display = 'flex';
                setTimeout(() => {
                    festivalPopup.classList.add('show');
                }, 10);
            }, 1000); // 1초 뒤에 자연스럽게 등장
        }

        closePopupBtn.addEventListener('click', () => {
            if (dontShowCheckbox.checked) {
                localStorage.setItem('hideFestivalPopup', today);
            }
            festivalPopup.classList.remove('show');
            setTimeout(() => {
                festivalPopup.style.display = 'none';
            }, 300);
        });

        // 클릭해서 모달 바깥 배경 누르면 닫기 (선택 사항)
        window.addEventListener('click', (e) => {
            if (e.target === festivalPopup) {
                festivalPopup.classList.remove('show');
                setTimeout(() => {
                    festivalPopup.style.display = 'none';
                }, 300);
            }
        });
    }

    // 8. EmailJS Form Submission Logic
    const contactForm = document.getElementById('contact-form');
    const contactSubmit = document.getElementById('contact-submit');
    const contactStatus = document.getElementById('contact-status');

    if (contactForm && contactSubmit && contactStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Set current KST time
            const timeInput = document.getElementById('contact-time');
            if (timeInput) {
                timeInput.value = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
            }

            // Disable button and show loader
            contactSubmit.disabled = true;
            const btnText = contactSubmit.querySelector('.btn-text');
            const btnLoader = contactSubmit.querySelector('.btn-loader');
            
            if (btnText && btnLoader) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-block';
            }

            contactStatus.textContent = '';
            contactStatus.className = 'contact-status-msg';

            // Send via EmailJS (service_str17iy, template_mzk9ko8)
            emailjs.sendForm('service_str17iy', 'template_mzk9ko8', contactForm)
                .then(() => {
                    contactStatus.textContent = '의견이 성공적으로 전송되었습니다! 소중한 의견 감사합니다. 💚';
                    contactStatus.className = 'contact-status-msg success';
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    contactStatus.textContent = '오류가 발생하여 전송에 실패했습니다. 다시 시도해주세요. 😢';
                    contactStatus.className = 'contact-status-msg error';
                })
                .finally(() => {
                    contactSubmit.disabled = false;
                    if (btnText && btnLoader) {
                        btnText.style.display = 'inline-block';
                        btnLoader.style.display = 'none';
                    }
                });
        });
    }
});

// Animacje przy scrollowaniu
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Płynne przewijanie dla linków nawigacyjnych
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Aktualizacja URL bez przewijania
        history.pushState(null, null, targetId);
    });
});

// Dodaj aktywną klasę do linków podczas przewijania
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Obsługa hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Zapobiega propagacji zdarzenia
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Zamykaj menu po kliknięciu w link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Zamykaj menu po kliknięciu poza nim
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Obsługa klawisza Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Obsługa FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        // Zamknij wszystkie inne odpowiedzi
        const allFaqs = document.querySelectorAll('.faq-item');
        allFaqs.forEach(faq => {
            if (faq !== question.parentElement && faq.classList.contains('active')) {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                answer.style.maxHeight = '0';
            }
        });

        // Przełącz aktualną odpowiedź
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        
        faqItem.classList.toggle('active');
        
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Animacja przy scrollowaniu
const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.faq-item').forEach(item => {
    faqObserver.observe(item);
});

// Animacja pasków postępu przy scrollowaniu
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            });
        }
    });
}, { threshold: 0.5 });

// Obserwuj sekcję umiejętności
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Inicjalizacja pasków postępu
document.querySelectorAll('.skill-progress').forEach(progress => {
    // Resetuj szerokość na początku
    progress.style.width = '0';
});

// Animacja liczników w statystykach
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000; // 2 sekundy
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        num.textContent = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        num.textContent = target;
                    }
                };

                updateNumber();
            });
        }
    });
}, { threshold: 0.5 });

// Animacja pasków postępu w celach
const goalsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            });
        }
    });
}, { threshold: 0.5 });

// Inicjalizacja obserwatorów
document.querySelectorAll('.stats').forEach(section => {
    statsObserver.observe(section);
});

document.querySelectorAll('.goals').forEach(section => {
    goalsObserver.observe(section);
});

// Animacja wejściowa dla kart
document.querySelectorAll('.stat-item, .goal-card').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Obsługa loadera
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        // Usuń loader ze strony po zakończeniu animacji
        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    }, 1000); // Loader będzie widoczny przez minimum 1 sekundę
});

// Obsługa przycisku powrotu do góry
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// Pokaż/ukryj przycisk w zależności od pozycji scrollowania
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Pokaż przycisk po przewinięciu 300px
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Przewijanie do góry po kliknięciu
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Obsługa klawiatury dla dostępności
scrollToTopBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});



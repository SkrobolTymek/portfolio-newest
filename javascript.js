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

// Animacja liczb w sekcji statystyk
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 400; // Zmniejszone do 400ms
        const increment = target / (duration / 16); // Większy increment dla szybszej animacji
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// Uruchom animację gdy sekcja jest widoczna
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

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

// Dodaj efekt parallax dla tła
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.cyber-grid').style.transform = 
        `perspective(500px) rotateX(60deg) translate(${moveX}px, ${moveY}px)`;
        
    document.querySelector('.cyber-particles').style.transform = 
        `translate(${moveX * 2}px, ${moveY * 2}px)`;
});

// Optymalizacja wydajności
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            document.querySelector('.cyber-grid').style.transform = 
                `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.1}px)`;
            ticking = false;
        });
        ticking = true;
    }
});


class TerminalPortfolio {
    constructor() {
        this.terminal = document.querySelector('.terminal-body');
        this.input = document.querySelector('.terminal-input');
        this.output = document.querySelector('.terminal-output');
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            projects: this.showProjects.bind(this),
            contact: this.showContact.bind(this),
            clear: this.clear.bind(this),
            social: this.showSocial.bind(this)
        };
        
        this.initializeTerminal();
    }

    initializeTerminal() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim().toLowerCase();
                this.executeCommand(command);
                this.input.value = '';
            }
        });

        // Automatyczne fokusowanie na input po kliknięciu w terminal
        this.terminal.addEventListener('click', () => {
            this.input.focus();
        });
    }

    executeCommand(command) {
        this.addToOutput(`<span class="terminal-prompt">visitor@portfolio:~$</span> ${command}`);
        
        if (this.commands[command]) {
            this.commands[command]();
        } else if (command !== '') {
            this.addToOutput(`<span class="error-message">Komenda '${command}' nie została znaleziona. Wpisz 'help' aby zobaczyć dostępne komendy.</span>`);
        }

        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    addToOutput(content) {
        this.output.innerHTML += `<p>${content}</p>`;
    }

    showHelp() {
        const helpText = `
<span class="info-message">Dostępne komendy:</span>

help     - wyświetla tę pomoc
about    - informacje o mnie
skills   - moje umiejętności
projects - moje projekty
contact  - dane kontaktowe
social   - media społecznościowe
clear    - czyści terminal`;
        this.addToOutput(helpText);
    }

    showAbout() {
        const aboutText = `
<span class="success-message">O mnie:</span>

Jestem uczniem Powiatowego Zespołu Szkół nr 1 w Pszczynie.
Pasjonuję się tworzeniem stron internetowych i programowaniem.
Obecnie rozwijam się w kierunku React.js i technologii frontendowych.`;
        this.addToOutput(aboutText);
    }

    showSkills() {
        const skillsText = `
<span class="success-message">Moje umiejętności:</span>

HTML5       [██████████] 80%
CSS3        [████████··] 65%
JavaScript [████······] 30%
React.js   [███·······] 25%`;
        this.addToOutput(skillsText);
    }

    showProjects() {
        const projectsText = `
<span class="success-message">Moje projekty:</span>

1. Portfolio - Interaktywna strona portfolio
2. Lista zadań - Aplikacja do zarządzania zadaniami
3. Więcej projektów na moim GitHubie!`;
        this.addToOutput(projectsText);
    }

    showContact() {
        const contactText = `
<span class="success-message">Kontakt:</span>

Email: twoj@email.com
Tel: +48 XXX XXX XXX`;
        this.addToOutput(contactText);
    }

    showSocial() {
        const socialText = `
<span class="success-message">Media społecznościowe:</span>

GitHub:   github.com/SkrobolTymek
LinkedIn: linkedin.com/in/twojprofil`;
        this.addToOutput(socialText);
    }

    clear() {
        this.output.innerHTML = '';
    }
}

// Inicjalizacja terminala
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalPortfolio();
});
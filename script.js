// Alternar tema
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar preferência salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
} else {
    body.setAttribute('data-theme', 'light'); // Tema padrão
}

// Alternar entre temas
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Scroll suave para links da navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fixar navbar no topo ao rolar a página
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Carrossel da Equipe
const teamMembers = document.querySelector('.team-members');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');
let currentIndex = 0;
let autoPlayInterval;

// Função para mostrar o membro da equipe
function showTeamMember(index) {
    // Remove a classe "active" do membro atual
    teamMembers.children[currentIndex].classList.remove('active');

    // Atualiza o índice atual
    currentIndex = index;

    // Move o carrossel para o novo índice
    const offset = -currentIndex * 100;
    teamMembers.style.transform = `translateX(${offset}%)`;

    // Adiciona a classe "active" ao novo membro
    teamMembers.children[currentIndex].classList.add('active');

    // Atualiza os indicadores
    updateIndicators();
}

// Função para atualizar os indicadores
function updateIndicators() {
    indicators.forEach((indicator, i) => {
        if (i === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Navegação pelos botões
prevButton.addEventListener('click', () => {
    const newIndex = (currentIndex > 0) ? currentIndex - 1 : teamMembers.children.length - 1;
    showTeamMember(newIndex);
    resetAutoPlay(); // Reinicia o autoplay ao interagir manualmente
});

nextButton.addEventListener('click', () => {
    const newIndex = (currentIndex < teamMembers.children.length - 1) ? currentIndex + 1 : 0;
    showTeamMember(newIndex);
    resetAutoPlay(); // Reinicia o autoplay ao interagir manualmente
});

// Navegação pelos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showTeamMember(index);
        resetAutoPlay(); // Reinicia o autoplay ao interagir manualmente
    });
});

// Função para avançar automaticamente
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        const newIndex = (currentIndex < teamMembers.children.length - 1) ? currentIndex + 1 : 0;
        showTeamMember(newIndex);
    }, 5000); // Altere o intervalo conforme necessário
}

// Função para reiniciar o autoplay
function resetAutoPlay() {
    clearInterval(autoPlayInterval); // Limpa o intervalo atual
    startAutoPlay(); // Reinicia o autoplay
}

// Inicialização
showTeamMember(currentIndex); // Mostra o primeiro membro
startAutoPlay(); // Inicia o autoplay

// Controle de vídeos
const videos = document.querySelectorAll('.video-background video');
let currentVideoIndex = 0;

function showVideo(index) {
    // Remove a classe "active" do vídeo atual
    videos[currentVideoIndex].classList.remove('active');

    // Atualiza o índice atual
    currentVideoIndex = index;

    // Adiciona a classe "active" ao novo vídeo
    videos[currentVideoIndex].classList.add('active');
}

// Alternar vídeos a cada 5 segundos
setInterval(() => {
    const newIndex = (currentVideoIndex < videos.length - 1) ? currentVideoIndex + 1 : 0;
    showVideo(newIndex);
}, 5000);

// Inicializar o primeiro vídeo
showVideo(currentVideoIndex);
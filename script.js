// script.js
// Smooth Scrolling für Anker-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Server Status Simulation (hier kannst du später eine echte API einbinden)
async function updateServerStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.server-status span:last-child');
    
    // Simuliere Server-Daten (später durch echte FiveM API ersetzen)
    const isOnline = true;
    const currentPlayers = Math.floor(Math.random() * 128);
    const maxPlayers = 128;
    
    if (isOnline) {
        statusIndicator.classList.add('online');
        statusText.textContent = `Server Online - ${currentPlayers}/${maxPlayers} Spieler`;
    } else {
        statusIndicator.classList.remove('online');
        statusIndicator.style.backgroundColor = '#e74c3c';
        statusText.textContent = 'Server Offline';
    }
}

// Aktualisiere Server-Status alle 30 Sekunden
updateServerStatus();
setInterval(updateServerStatus, 30000);

// Scroll Animation für Elemente
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Beobachte alle Karten und Sektionen
document.querySelectorAll('.info-card, .step, .regel-item, .forum-cat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

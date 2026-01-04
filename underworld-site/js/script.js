// Smooth Scrolling für Anker-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contactBtn') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Server Status Update
async function updateServerStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('serverStatusText');
    
    // Simulierte Daten - ersetze dies später mit echter FiveM API
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

updateServerStatus();
setInterval(updateServerStatus, 30000);

// Modal Funktionalität
const modal = document.getElementById('contactModal');
const contactBtn = document.getElementById('contactBtn');
const closeBtn = document.querySelector('.close');

if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Kontaktformular Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            betreff: document.getElementById('betreff').value,
            nachricht: document.getElementById('nachricht').value
        };
        
        // Discord Webhook (optional - ersetze mit deiner Webhook URL)
        const webhookURL = 'https://discord.com/api/webhooks/DEINE_WEBHOOK_URL';
        
        const discordEmbed = {
            embeds: [{
                title: `📬 Neue Kontaktanfrage: ${formData.betreff}`,
                color: 3447003,
                fields: [
                    { name: 'Name', value: formData.name, inline: true },
                    { name: 'E-Mail', value: formData.email, inline: true },
                    { name: 'Nachricht', value: formData.nachricht }
                ],
                timestamp: new Date().toISOString()
            }]
        };
        
        try {
            // Wenn du einen Discord Webhook nutzen möchtest, entferne die Kommentare
            /*
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordEmbed)
            });
            
            if (response.ok) {
                alert('Nachricht erfolgreich gesendet!');
            } else {
                throw new Error('Webhook failed');
            }
            */
            
            // Für GitHub Pages ohne Backend
            alert('Nachricht erfolgreich gesendet! Wir melden uns bei dir über Discord.');
            modal.style.display = 'none';
            contactForm.reset();
        } catch (error) {
            alert('Bitte kontaktiere uns direkt über Discord!');
            console.error('Error:', error);
        }
    });
}

// Scroll Animation
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

document.querySelectorAll('.info-card, .step, .regel-item, .forum-cat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

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

// Server Status Update (später mit echter FiveM API verbinden)
async function updateServerStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('serverStatusText');
    
    // Beispiel: Hier kannst du später deine FiveM Server IP einbinden
    // const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/YOUR_SERVER_ID');
    
    // Simulierte Daten (ersetze dies mit echten API-Daten)
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

contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Kontaktformular Handler
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        betreff: document.getElementById('betreff').value,
        nachricht: document.getElementById('nachricht').value
    };
    
    // Hier kannst du einen Discord Webhook einbinden
    const webhookURL = 'https://discord.com/api/webhooks/1457298241480687730/VdJWizNI69O8ioMMrpyaFaB7PkxKpc3I0-92Ya6gQMbXI83MsgtrVs5Rm_LZmPN47QtI';
    
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
        // Auskommentiert - Aktiviere dies, wenn du einen Discord Webhook einrichtest
        /*
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordEmbed)
        });
        */
        
        alert('Nachricht erfolgreich gesendet!');
        modal.style.display = 'none';
        document.getElementById('contactForm').reset();
    } catch (error) {
        alert('Fehler beim Senden der Nachricht. Bitte versuche es später erneut.');
        console.error('Error:', error);
    }
});

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

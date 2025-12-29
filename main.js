const canvas = document.getElementById('domeCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let connections = [];

// Dome settings
const DOME_CENTER_X_RATIO = 0.7; // Center of dome relative to canvas width
const DOME_RADIUS_BASE = 300; 

function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth * (window.innerWidth > 991 ? 0.6 : 1.0);
    height = canvas.height = canvas.parentElement.offsetHeight;
    initParticles();
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        // Create particles within a "dome" or arc shape roughly
        // We'll simulate a cloud on the right side
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (Math.min(width, height) * 0.8);
        
        this.x = width / 2 + Math.cos(angle) * (radius * 0.4); 
        this.y = height / 2 + Math.sin(angle) * (radius * 0.6);
        
        // Random velocity
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#bd00ff'; // Blue or Violet
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around margins slightly to keep them in view but flowing
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = p1.color; // Gradient feel by picking one
                ctx.globalAlpha = 0.15 * (1 - dist / 120);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

// Wait for DOM to be ready just in case, though defer script helps
setTimeout(() => {
    resize();
    animate();
}, 100);

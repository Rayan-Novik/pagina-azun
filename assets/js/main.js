// ==========================================================================
// AZUN TECNOLOGIA - SCRIPTS INTERATIVOS & FLUIDEZ ANTIGRAVITY
// REGRA ABSOLUTA: ZERO EMOJIS! SOMENTE ÍCONES VETORIAIS E DESIGN DE PRECISÃO.
// ==========================================================================

import { createIcons, icons } from 'lucide';
import './antigravity/MainParticlesComponent.js';

function renderAllLucideIcons() {
    try {
        createIcons({ icons });
    } catch (e) {
        // Fallback para lucide global
    }
    try {
        if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    } catch (e) {}
}

// Renderiza ícones imediatamente para não ter atraso visual
if (typeof document !== 'undefined') {
    renderAllLucideIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    // 0. Inicialização Robusta de Ícones Lucide
    renderAllLucideIcons();
    setTimeout(renderAllLucideIcons, 100);
    setTimeout(renderAllLucideIcons, 500);

    // 1. Efeitos de Cursor e Canvas Fluido Antigravity (Aura de luz, Shockwaves e Físicas)
    try { initAntigravityCanvas(); } catch (err) { console.warn('AntigravityCanvas error:', err); }

    // 2. Sistema Completo de Animações de Scroll (Progress Bar, Reveal, Counters, Nav Spy)
    try { initScrollAnimations(); } catch (err) { console.warn('ScrollAnimations error:', err); }

    // 3. Efeito Spotlight & 3D Tilt nos Cards
    try { initSpotlightAndTilt(); } catch (err) { console.warn('Spotlight error:', err); }

    // 4. Documentação Interativa da API
    try { initApiExplorer(); } catch (err) { console.warn('ApiExplorer error:', err); }

    // 5. Carregamento Dinâmico de Planos via API (/api/planos) com Status Real
    try { initDynamicPlans(); } catch (err) { console.warn('DynamicPlans error:', err); }

    // 6. Formulário Funcional "Fale com um Consultor Azun" (E-mail + WhatsApp)
    try { initContactAndConsultor(); } catch (err) { console.warn('Contact error:', err); }

    // 7. Accordion de Perguntas Frequentes (FAQ)
    try { initFaqAccordion(); } catch (err) { console.warn('Faq error:', err); }

    // 8. Menu Mobile
    try { initMobileMenu(); } catch (err) { console.warn('MobileMenu error:', err); }
});

// ==========================================================================
// 1. CANVAS FLUIDO ANTIGRAVITY (NÍTIDO, VÍVIDO, PULSANTE E REATIVO AO SCROLL)
// ==========================================================================
function initAntigravityCanvas() {
    const canvas = document.getElementById('antigravityCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
    }
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: -1000, y: -1000, active: false };
    const shockwaves = [];
    const cursorGlow = document.getElementById('antigravityCursorGlow');
    let targetCursorX = -1000, targetCursorY = -1000;
    let currentCursorX = -1000, currentCursorY = -1000;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        targetCursorX = e.clientX;
        targetCursorY = e.clientY;
        if (cursorGlow) cursorGlow.style.opacity = '1';
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
        if (cursorGlow) cursorGlow.style.opacity = '0';
    });

    // Suporte Completo a Toque Touchscreen no Mobile (Celulares & Tablets)
    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
            mouse.active = true;
            targetCursorX = touch.clientX;
            targetCursorY = touch.clientY;
            if (cursorGlow) cursorGlow.style.opacity = '1';

            if (!e.target.closest('input') && !e.target.closest('select') && !e.target.closest('textarea') && !e.target.closest('button') && !e.target.closest('a')) {
                shockwaves.push({
                    x: touch.clientX,
                    y: touch.clientY,
                    radius: 4,
                    maxRadius: 220,
                    alpha: 0.85
                });
            }
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
            mouse.active = true;
            targetCursorX = touch.clientX;
            targetCursorY = touch.clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
        if (cursorGlow) cursorGlow.style.opacity = '0';
    }, { passive: true });

    // Pulso Gravitacional (Shockwave) ao clicar na página
    window.addEventListener('click', (e) => {
        if (e.target.closest('input') || e.target.closest('select') || e.target.closest('textarea')) return;
        
        shockwaves.push({
            x: e.clientX,
            y: e.clientY,
            radius: 4,
            maxRadius: 360,
            alpha: 0.95
        });
    });

    // Quantidade adaptativa de partículas (otimizada para alta fluidez em 60fps no celular)
    const isMobile = width < 768;
    const particleCount = isMobile ? Math.min(Math.floor(width / 14), 30) : Math.min(Math.floor(width / 24), 68);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const isHub = i % 5 === 0; // Nós principais maiores
        const isSpark = i % 3 === 1;

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * (isHub ? 0.38 : 0.65),
            vy: (Math.random() - 0.5) * (isHub ? 0.38 : 0.65),
            baseRadius: isHub ? (Math.random() * 2 + 5.0) : (isSpark ? 2.2 : 3.5),
            radius: isHub ? 5.5 : 3.2,
            alpha: isHub ? 0.98 : (isSpark ? 0.75 : 0.88),
            isHub: isHub,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.025 + 0.015
        });
    }

    // Momentum de Rolagem: partículas reagem dinamicamente à rolagem para baixo E para cima!
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollVelocity = (currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        // Se rolar PARA BAIXO (scrollVelocity > 0): partículas sobem!
        // Se rolar PARA CIMA (scrollVelocity < 0): partículas descem!
        for (let i = 0; i < particles.length; i++) {
            particles[i].vy -= scrollVelocity * 0.075;
            particles[i].vx += (Math.random() - 0.5) * Math.abs(scrollVelocity) * 0.02;
        }
    }, { passive: true });

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });

    let time = 0;

    function animate() {
        if (!isVisible) {
            requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        time += 0.02;

        // Amortecimento suave da velocidade de scroll
        scrollVelocity *= 0.93;

        // Atualiza a posição suave do cursor glow
        if (cursorGlow && mouse.active) {
            currentCursorX += (targetCursorX - currentCursorX) * 0.18;
            currentCursorY += (targetCursorY - currentCursorY) * 0.18;
            cursorGlow.style.transform = `translate3d(${currentCursorX}px, ${currentCursorY}px, 0)`;
        }

        // 1. Processa e desenha shockwaves ativas
        for (let s = shockwaves.length - 1; s >= 0; s--) {
            const sw = shockwaves[s];
            sw.radius += 10;
            sw.alpha *= 0.93;

            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(37, 99, 235, ${sw.alpha * 0.8})`;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.9)';
            ctx.stroke();
            ctx.shadowBlur = 0;

            if (sw.alpha <= 0.02 || sw.radius >= sw.maxRadius) {
                shockwaves.splice(s, 1);
            }
        }

        // 2. Atualiza e desenha cada partícula
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Atualiza posição com amortecimento elástico
            p.x += p.vx;
            p.y += p.vy;

            p.vx *= 0.992;
            p.vy *= 0.992;

            // Mantém velocidade mínima de flutuação cósmica
            if (Math.abs(p.vx) < 0.18) p.vx += (Math.random() - 0.5) * 0.12;
            if (Math.abs(p.vy) < 0.18) p.vy += (Math.random() - 0.5) * 0.12;

            // Rebate com amortecimento suave nas bordas
            if (p.x < 10) { p.x = 10; p.vx = Math.abs(p.vx) * 0.8; }
            if (p.x > width - 10) { p.x = width - 10; p.vx = -Math.abs(p.vx) * 0.8; }
            if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy) * 0.8; }
            if (p.y > height - 10) { p.y = height - 10; p.vy = -Math.abs(p.vy) * 0.8; }

            // Reação a Shockwaves
            for (let s = 0; s < shockwaves.length; s++) {
                const sw = shockwaves[s];
                const dx = p.x - sw.x;
                const dy = p.y - sw.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (Math.abs(dist - sw.radius) < 45 && dist > 1) {
                    const push = (45 - Math.abs(dist - sw.radius)) * 0.3;
                    p.x += (dx / dist) * push;
                    p.y += (dy / dist) * push;
                }
            }

            // Interação Gravitacional com o cursor
            if (mouse.active) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 260 && dist > 5) {
                    const force = (260 - dist) / 260;
                    p.x += (dx / dist) * force * 1.6;
                    p.y += (dy / dist) * force * 1.6;
                }
            }

            // Pulsação suave do raio
            p.radius = p.baseRadius + Math.sin(time + p.phase) * (p.isHub ? 1.5 : 0.7);

            // Desenha Partícula com Glow Nítido
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

            if (p.isHub) {
                // Nó Principal: Anel de Aura + Núcleo Brilhante
                ctx.shadowBlur = 16;
                ctx.shadowColor = 'rgba(37, 99, 235, 0.9)';
                ctx.fillStyle = '#2563eb';
                ctx.fill();

                // Núcleo interno vívido
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

                // Anel externo sutil
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 1.9, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.5 + Math.sin(time + p.phase) * 0.3})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            } else {
                // Nó Médio / Faísca
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(2, 132, 199, 0.75)';
                ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
                ctx.fill();
            }

            ctx.shadowBlur = 0;

            // Desenha Filamentos Conectores Nítidos entre partículas
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 155) {
                    const lineAlpha = (1 - dist / 155);
                    const isHubConnection = p.isHub || p2.isHub;

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = isHubConnection 
                        ? `rgba(37, 99, 235, ${lineAlpha * 0.65})` 
                        : `rgba(2, 132, 199, ${lineAlpha * 0.42})`;
                    ctx.lineWidth = isHubConnection ? 1.4 : 1.0;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// 2. SISTEMA COMPLETO DE ANIMAÇÕES DE ROLAGEM / SCROLL (PARA BAIXO E PARA CIMA)
// ==========================================================================
function initScrollAnimations() {
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');

    let lastScrollTop = window.scrollY;

    // 2.1. Barra de Progresso, Elevação de Navbar e Botão Voltar ao Topo no Scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${progress}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 380) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Transição dinâmica da Navbar ao rolar para baixo e para cima
        if (header) {
            if (scrollTop > 40) {
                header.classList.add('shadow-md', 'bg-white/95');
                header.classList.remove('bg-white/85');
            } else {
                header.classList.remove('shadow-md', 'bg-white/95');
                header.classList.add('bg-white/85');
            }
        }

        // Parallax Suave e Profundidade no Scroll do Hero (reage ao subir e descer)
        const heroContent = document.querySelector('#hero .max-w-7xl');
        if (heroContent && scrollTop < 750) {
            heroContent.style.transform = `translate3d(0, ${scrollTop * 0.12}px, 0)`;
            heroContent.style.opacity = `${Math.max(0, 1 - (scrollTop / 850))}`;
        }

        // 2.2. Scroll Spy: Ativa link correspondente na navbar
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 130;
            const secHeight = sec.offsetHeight;
            if (scrollTop >= secTop && scrollTop < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-active');
            }
        });

        lastScrollTop = scrollTop;
    }, { passive: true });

    // Ação do Botão Voltar ao Topo
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2.3. IntersectionObserver Suave e Confiável:
    // Garante que o conteúdo comercial SEMPRE apareça e NUNCA fique invisível ou em branco
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right');

    // Revela imediatamente elementos que já estão no campo de visão inicial
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
            el.classList.add('is-revealed');
            const counters = el.querySelectorAll('[data-counter-target]');
            counters.forEach(c => animateCounter(c));
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');

                // Dispara animação de contadores numéricos
                const counters = entry.target.querySelectorAll('[data-counter-target]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });

                if (entry.target.hasAttribute('data-counter-target')) {
                    animateCounter(entry.target);
                }
            }
            // OBSERVAÇÃO CRÍTICA: Uma vez revelado, o elemento NUNCA mais é escondido!
            // Isso previne que seções comerciais fiquem "em branco" ao rolar a página.
        });
    }, {
        threshold: 0.05,
        rootMargin: '60px 0px 60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Fallback de Segurança Absoluta:
    // Garante que, mesmo em dispositivos com navegadores antigos ou conexões lentas, nenhum card fique invisível
    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('is-revealed')) {
                el.classList.add('is-revealed');
            }
        });
    }, 1200);
}

// Animação Numérica Suave (Roll-up Counter)
function animateCounter(el) {
    if (el.dataset.counterDone === 'true') return;
    el.dataset.counterDone = 'true';

    const targetVal = parseFloat(el.getAttribute('data-counter-target')) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const isFloat = targetVal.toString().includes('.');
    const duration = 1400; // ms
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing cúbico suave
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = (targetVal * easeOut);

        if (isFloat) {
            el.innerText = `${prefix}${currentVal.toFixed(1)}${suffix}`;
        } else {
            el.innerText = `${prefix}${Math.floor(currentVal)}${suffix}`;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.innerText = `${prefix}${isFloat ? targetVal.toFixed(1) : targetVal}${suffix}`;
        }
    }

    requestAnimationFrame(update);
}

// ==========================================================================
// 3. SPOTLIGHT GLOW & 3D TILT EFFECT
// ==========================================================================
function initSpotlightAndTilt() {
    const cards = document.querySelectorAll('.spotlight-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Efeito de inclinação sutil 3D
            if (card.classList.contains('tilt-card')) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('tilt-card')) {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }
        });
    });
}

// ==========================================================================
// 4. EXPLORER DA DOCUMENTAÇÃO DA API (REST & WEBSOCKET)
// ==========================================================================
const API_DATA = {
    'health': {
        method: 'GET',
        methodClass: 'api-method-get',
        endpoint: 'https://backcore.azun.com.br/api/pdv/health',
        title: 'Health Check & Status do Servidor Principal',
        desc: 'Verifica latência, status de conectividade e sincronização em tempo real do ecossistema Azun.',
        curl: `curl -X GET "https://backcore.azun.com.br/api/pdv/health"`,
        js: `const res = await fetch('https://backcore.azun.com.br/api/pdv/health');
const status = await res.json();
console.log('Servidor Azun Online:', status.online);`,
        py: `import requests
resp = requests.get('https://backcore.azun.com.br/api/pdv/health')
print(resp.json())`,
        response: `{
  "status": "OK",
  "online": true,
  "timestamp": "2026-10-26T18:47:46.397Z",
  "latencia_ms": 2.4
}`
    },
    'produtos_livres': {
        method: 'GET',
        methodClass: 'api-method-get',
        endpoint: 'https://backcore.azun.com.br/api/produtos',
        title: 'Catálogo Aberto de Produtos (Sem Chave)',
        desc: 'Consulta aberta de produtos, preços, estoque e fotos para e-commerce e cardápio online.',
        curl: `curl -X GET "https://backcore.azun.com.br/api/produtos" \\
  -H "x-tenant-id: 1"`,
        js: `const res = await fetch('https://backcore.azun.com.br/api/produtos', {
  headers: { 'x-tenant-id': '1' }
});
const produtos = await res.json();
console.log('Total Produtos:', produtos.length);`,
        py: `import requests
resp = requests.get('https://backcore.azun.com.br/api/produtos', headers={'x-tenant-id': '1'})
print(resp.json())`,
        response: `[
  {
    "id_produto": 265,
    "nome": "Macarrão Santa Amália 500G Sêmola Parafuso",
    "preco": 4.50,
    "estoque": 142,
    "ativo": true
  }
]`
    },
    'mesa_qr': {
        method: 'GET',
        methodClass: 'api-method-get',
        endpoint: 'https://backcore.azun.com.br/api/autoatendimento/m/:token',
        title: 'Consulta de Comanda e Mesa via QR Code',
        desc: 'Carrega os itens e consumo da mesa em tempo real quando o cliente escaneia o QR Code físico na mesa.',
        curl: `curl -X GET "https://backcore.azun.com.br/api/autoatendimento/m/MS-TOKEN-MESA-05"`,
        js: `const res = await fetch('https://backcore.azun.com.br/api/autoatendimento/m/MS-TOKEN-MESA-05');
const mesa = await res.json();
console.log('Mesa:', mesa);`,
        py: `import requests
resp = requests.get('https://backcore.azun.com.br/api/autoatendimento/m/MS-TOKEN-MESA-05')
print(resp.json())`,
        response: `{
  "sucesso": true,
  "mesa": { "id_mesa": 5, "numero": "05", "status": "OCUPADA" },
  "comanda": { "id_pedido": 93, "valor_total": 4.50 }
}`
    },
    'pedidos': {
        method: 'POST',
        methodClass: 'api-method-post',
        endpoint: 'https://backcore.azun.com.br/api/v1/pedidos',
        title: 'Criar Pedido Integrado (x-api-key)',
        desc: 'Cria pedidos originados de cardápios digitais, e-commerces, totens ou balcão, calculando taxas fiscais e acionando impressão na cozinha.',
        curl: `curl -X POST "https://backcore.azun.com.br/api/v1/pedidos" \\
  -H "x-api-key: sk_live_suachaveaqui" \\
  -H "Content-Type: application/json" \\
  -d '{
    "canal": "TOTEM_AUTOATENDIMENTO",
    "cliente": { "nome": "Carlos Mendes", "cpf": "123.456.789-00" },
    "itens": [
      { "id_produto": 265, "quantidade": 2, "preco_unitario": 4.50 }
    ],
    "pagamento": { "metodo": "PIX", "valor": 9.00 }
  }'`,
        js: `const response = await fetch('https://backcore.azun.com.br/api/v1/pedidos', {
  method: 'POST',
  headers: {
    'x-api-key': 'sk_live_suachaveaqui',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    canal: 'TOTEM_AUTOATENDIMENTO',
    itens: [{ id_produto: 265, quantidade: 2, preco_unitario: 4.50 }],
    pagamento: { metodo: 'PIX', valor: 9.00 }
  })
});
const data = await response.json();
console.log('Pedido Criado:', data.id_pedido);`,
        py: `import requests

url = "https://backcore.azun.com.br/api/v1/pedidos"
headers = {
    "x-api-key": "sk_live_suachaveaqui",
    "Content-Type": "application/json"
}
payload = {
    "canal": "TOTEM_AUTOATENDIMENTO",
    "itens": [{"id_produto": 265, "quantidade": 2, "preco_unitario": 4.50}],
    "pagamento": {"metodo": "PIX", "valor": 9.00}
}
resp = requests.post(url, json=payload, headers=headers)
print(resp.json())`,
        response: `{
  "success": true,
  "status": "CRIADO",
  "id_pedido": 48201,
  "total": 9.00,
  "latencia_ms": 6.8,
  "cozinha_impressao": "ENVIADA_SPOOL"
}`
    },
    'estoque': {
        method: 'PUT',
        methodClass: 'api-method-put',
        endpoint: 'https://backcore.azun.com.br/api/v1/produtos/:id/estoque',
        title: 'Sincronização Imediata de Saldo de Estoque',
        desc: 'Atualiza instantaneamente a quantidade física do produto no ERP e em todos os caixas PDV conectados simultaneamente.',
        curl: `curl -X PUT "https://backcore.azun.com.br/api/v1/produtos/265/estoque" \\
  -H "x-api-key: sk_live_suachaveaqui" \\
  -H "Content-Type: application/json" \\
  -d '{ "estoque": 150 }'`,
        js: `const res = await fetch('https://backcore.azun.com.br/api/v1/produtos/265/estoque', {
  method: 'PUT',
  headers: {
    'x-api-key': 'sk_live_suachaveaqui',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ estoque: 150 })
});
console.log(await res.json());`,
        py: `import requests
resp = requests.put("https://backcore.azun.com.br/api/v1/produtos/265/estoque", json={"estoque": 150}, headers={"x-api-key": "sk_live_suachaveaqui"})
print(resp.json())`,
        response: `{
  "sucesso": true,
  "mensagem": "Estoque sincronizado com sucesso!",
  "produto": { "id_produto": 265, "nome": "Macarrão Santa Amália", "estoque": 150 }
}`
    },
    'sync': {
        method: 'GET',
        methodClass: 'api-method-get',
        endpoint: 'https://backcore.azun.com.br/api/pdv/caixas/carga-sync',
        title: 'Carga Compactada & Sincronização Caixa Offline (AzunService.exe)',
        desc: 'Endpoint consumido nativamente pelo serviço em background AzunService.exe para sincronização delta de produtos e descarrego de lotes fiscais em segundo plano.',
        curl: `curl -X GET "https://backcore.azun.com.br/api/pdv/caixas/carga-sync?token=CX-0304-EC8F"`,
        js: `const res = await fetch('https://backcore.azun.com.br/api/pdv/caixas/carga-sync?token=CX-0304-EC8F');
const carga = await res.json();
console.log('Versão da carga:', carga.versao_carga);`,
        py: `import requests
resp = requests.get('https://backcore.azun.com.br/api/pdv/caixas/carga-sync?token=CX-0304-EC8F')
print(resp.json())`,
        response: `{
  "sucesso": true,
  "caixa": { "id_caixa": 1, "nome": "CAIXA_01", "serie_nfce": 1 },
  "total_produtos": 236,
  "versao_carga": "2026.10.26.01"
}`
    },
    'fiscal': {
        method: 'POST',
        methodClass: 'api-method-post',
        endpoint: 'https://backcore.azun.com.br/api/fiscal/nfce/emitir',
        title: 'Emissão Expressa NFC-e 65 e NF-e 55 SEFAZ',
        desc: 'Assinatura digital automática com Certificado A1, cálculo de tributos e envio síncrono para a SEFAZ Estadual com retorno do XML e QR Code.',
        curl: `curl -X POST "https://backcore.azun.com.br/api/fiscal/nfce/emitir" \\
  -H "Authorization: Bearer seu_token_jwt" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id_pedido": 48201,
    "consumidor_cpf": "12345678900",
    "forma_pagamento": "01"
  }'`,
        js: `const response = await fetch('https://backcore.azun.com.br/api/fiscal/nfce/emitir', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer seu_token_jwt',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id_pedido: 48201, consumidor_cpf: '12345678900' })
});
const fiscal = await response.json();
console.log('Chave de Acesso:', fiscal.chave_acesso);`,
        py: `import requests
url = "https://backcore.azun.com.br/api/fiscal/nfce/emitir"
headers = {"Authorization": "Bearer seu_token_jwt"}
resp = requests.post(url, json={"id_pedido": 48201}, headers=headers)
print("Protocolo SEFAZ:", resp.json()["protocolo"])`,
        response: `{
  "success": true,
  "modelo": 65,
  "status_sefaz": "100_AUTORIZADO",
  "chave_acesso": "13261004123456000199650010000482011987654321",
  "protocolo": "113260049281723",
  "tempo_processamento_ms": 118
}`
    },
    'webhooks': {
        method: 'POST',
        methodClass: 'api-method-post',
        endpoint: 'https://backcore.azun.com.br/api/webhooks/:gateway',
        title: 'Webhooks de Notificação de Pagamento em Tempo Real',
        desc: 'Receba notificações instantâneas no seu servidor sempre que um pagamento PIX, Cartão ou Boleto for confirmado.',
        curl: `POST /api/webhooks/mercadopago HTTP/1.1
Host: backcore.azun.com.br
Content-Type: application/json

{
  "event": "payment.created",
  "data": { "id": "9988776655", "status": "approved" }
}`,
        js: `// Webhook Receiver em Node.js
app.post('/api/webhooks/mercadopago', (req, res) => {
  console.log('Notificação recebida:', req.body);
  res.status(200).send('OK');
});`,
        py: `# Webhook Receiver em Python
@app.route('/api/webhooks/mercadopago', methods=['POST'])
def webhook():
    print(request.json)
    return "OK", 200`,
        response: `{
  "received": true,
  "status": "PROCESSED",
  "order_status": "PAGO"
}`
    }
};

function initApiExplorer() {
    const codeSnippetEl = document.getElementById('apiCodeSnippet');
    const tabButtons = document.querySelectorAll('.api-tab-btn');
    if (!codeSnippetEl && tabButtons.length === 0) return;

    let currentEndpoint = 'pedidos';
    let currentLang = 'curl';

    const langButtons = document.querySelectorAll('.api-lang-btn');
    const responseSnippetEl = document.getElementById('apiResponseSnippet');
    const endpointBadge = document.getElementById('apiEndpointBadge');
    const endpointUrl = document.getElementById('apiEndpointUrl');
    const endpointTitle = document.getElementById('apiEndpointTitle');
    const endpointDesc = document.getElementById('apiEndpointDesc');
    const copyBtn = document.getElementById('btnCopyApiCode');

    function renderApiView() {
        const data = API_DATA[currentEndpoint];
        if (!data) return;

        if (endpointBadge) {
            endpointBadge.className = `api-method-badge ${data.methodClass}`;
            endpointBadge.innerText = data.method;
        }
        if (endpointUrl) endpointUrl.innerText = data.endpoint;
        if (endpointTitle) endpointTitle.innerText = data.title;
        if (endpointDesc) endpointDesc.innerText = data.desc;

        if (codeSnippetEl) {
            codeSnippetEl.innerText = data[currentLang] || data.curl;
        }
        if (responseSnippetEl) {
            responseSnippetEl.innerText = data.response;
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentEndpoint = btn.getAttribute('data-endpoint');
            tabButtons.forEach(b => {
                b.classList.remove('tab-btn-active');
                b.classList.add('tab-btn-inactive');
            });
            btn.classList.add('tab-btn-active');
            btn.classList.remove('tab-btn-inactive');
            renderApiView();
        });
    });

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');
            langButtons.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('text-slate-400');
            });
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('text-slate-400');
            renderApiView();
        });
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const data = API_DATA[currentEndpoint];
            const textToCopy = data ? (data[currentLang] || data.curl) : '';
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span class="text-emerald-400 font-bold hidden sm:inline">Copiado!</span>`;
                renderAllLucideIcons();
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    renderAllLucideIcons();
                }, 2000);
            });
        });
    }

    // Render inicial
    renderApiView();
}

// ==========================================================================
// 5. CARREGAMENTO DINÂMICO DE PLANOS COM STATUS DE COMERCIALIZAÇÃO
// ==========================================================================
let plansDataCache = [];

async function initDynamicPlans() {
    const plansContainer = document.getElementById('dynamicPlansContainer');
    const billingToggle = document.getElementById('billingToggle');
    const plansStatusSource = document.getElementById('plansStatusSource');

    try {
        const response = await fetch('/api/planos');
        const data = await response.json();

        if (data.success && Array.isArray(data.planos)) {
            plansDataCache = data.planos;
            if (plansStatusSource) {
                plansStatusSource.innerText = data.source === 'database_live' 
                    ? 'Sincronizado com Banco MySQL em tempo real' 
                    : 'Catálogo de Planos Ativo';
            }
            renderPlans(billingToggle ? billingToggle.checked : false);
        }
    } catch (e) {
        console.warn('Usando catálogo padrão para exibição dos planos:', e);
    }

    if (billingToggle) {
        billingToggle.addEventListener('change', () => {
            renderPlans(billingToggle.checked);
        });
    }
}

function renderPlans(isAnnual) {
    const plansContainer = document.getElementById('dynamicPlansContainer');
    if (!plansContainer || plansDataCache.length === 0) return;

    plansContainer.innerHTML = '';

    plansDataCache.forEach(plano => {
        const basePrice = parseFloat(plano.preco_mensal) || 0;
        const discountPrice = isAnnual ? (basePrice * 0.85).toFixed(2) : basePrice.toFixed(2);
        const isFree = basePrice === 0;
        const isDestaque = plano.destaque;
        const isAtivo = plano.ativo;

        const card = document.createElement('div');
        card.className = `reveal-on-scroll spotlight-card tilt-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between ${
            isDestaque 
                ? 'bg-white border-2 border-blue-600 shadow-2xl relative shadow-blue-500/15' 
                : isAtivo
                    ? 'bg-white border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl'
                    : 'bg-slate-50/80 border border-slate-200 opacity-80'
        }`;

        card.innerHTML = `
            <div>
                ${isDestaque ? `
                    <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                        <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                        <span>Mais Escolhido por Empresas</span>
                    </div>
                ` : ''}

                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-slate-900 capitalize">${plano.nome}</h3>
                    
                    <!-- Status de Comercialização -->
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                        isAtivo ? 'badge-status-active' : 'badge-status-inactive'
                    }">
                        <span class="w-2 h-2 rounded-full ${isAtivo ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                        <span>${isAtivo ? 'Disponível para Comercialização' : 'Indisponível no Momento'}</span>
                    </span>
                </div>

                <p class="text-xs text-slate-500 mb-6 leading-relaxed">
                    ${plano.descricao || (isAtivo ? 'Solução completa para gestão fiscal, PDV e controle administrativo.' : 'Plano legado.')}
                </p>

                <!-- Preço Dinâmico -->
                <div class="mb-6 pb-6 border-b border-slate-100">
                    <div class="flex items-baseline gap-1">
                        <span class="text-xs font-semibold text-slate-400">R$</span>
                        <span class="text-4xl sm:text-5xl font-black text-slate-950 font-sans tracking-tight">
                            ${isFree ? '0,00' : discountPrice.replace('.', ',')}
                        </span>
                        <span class="text-xs text-slate-500">
                            ${isFree ? '/grátis' : isAnnual ? '/mês (cobrado anualmente)' : '/mês no plano mensal'}
                        </span>
                    </div>
                    ${isAnnual && !isFree ? `
                        <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <i data-lucide="check" class="w-3 h-3"></i>
                            <span>Economia de 15% aplicada no plano anual</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Lista de Limites & Recursos Técnicos -->
                <ul class="space-y-3 text-xs text-slate-600 mb-8">
                    <li class="flex items-center gap-2.5">
                        <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Até <strong>${plano.limite_produtos} produtos</strong> cadastrados</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Até <strong>${plano.limite_usuarios} operadores/usuários</strong> simultâneos</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Até <strong>${plano.limite_caixas} caixa(s) PDV offline</strong> pareados</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Emissão NFC-e mod 65 e NF-e mod 55 ilimitada</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Serviço Windows <strong>AzunPDVService</strong> incluso</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Suporte técnico prioritário e backups automáticos</span>
                    </li>
                </ul>
            </div>

            <!-- Botão de Ação -->
            <div>
                ${isAtivo ? `
                    <button type="button" class="open-demo-modal w-full py-4 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-2 ${
                        isDestaque 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30' 
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }" data-plano="${plano.nome}">
                        <span>Contratar Plano ${plano.nome}</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                ` : `
                    <button type="button" disabled class="w-full py-4 text-xs font-bold rounded-full bg-slate-200 text-slate-500 cursor-not-allowed">
                        <span>Indisponível para Comercialização</span>
                    </button>
                `}
            </div>
        `;

        plansContainer.appendChild(card);
    });

    renderAllLucideIcons();
    initSpotlightAndTilt();
    bindModalButtons();

    // Registra os novos cards no IntersectionObserver
    const newCards = plansContainer.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    newCards.forEach(c => observer.observe(c));
}

// ==========================================================================
// 6. FORMULÁRIO FUNCIONAL "FALE COM UM CONSULTOR AZUN" (E-MAIL + WHATSAPP)
// ==========================================================================
function initContactAndConsultor() {
    bindModalButtons();

    const modalDemo = document.getElementById('modalDemo');
    const closeDemoBtn = document.getElementById('closeDemoModal');
    const formDemo = document.getElementById('formDemo');
    const demoSuccessMsg = document.getElementById('demoSuccessMsg');
    const directWhatsappAction = document.getElementById('directWhatsappAction');

    if (closeDemoBtn && modalDemo) {
        closeDemoBtn.addEventListener('click', () => {
            modalDemo.classList.add('hidden');
            modalDemo.classList.remove('flex');
        });

        modalDemo.addEventListener('click', (e) => {
            if (e.target === modalDemo) {
                modalDemo.classList.add('hidden');
                modalDemo.classList.remove('flex');
            }
        });
    }

    if (formDemo) {
        formDemo.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = formDemo.querySelector('button[type="submit"]');
            const nome = document.getElementById('leadNome')?.value || '';
            const telefone = document.getElementById('leadTelefone')?.value || '';
            const empresa = document.getElementById('leadEmpresa')?.value || '';
            const segmento = document.getElementById('leadSegmento')?.value || '';
            const email = document.getElementById('leadEmail')?.value || '';
            const mensagem = document.getElementById('leadMensagem')?.value || '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Enviando para consultor...';
            }

            try {
                const response = await fetch('/api/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, telefone, empresa, segmento, email, mensagem })
                });

                const resData = await response.json();

                formDemo.classList.add('hidden');
                if (demoSuccessMsg) {
                    demoSuccessMsg.classList.remove('hidden');
                }

                // Prepara link de abertura direta no WhatsApp do consultor (92 98838-9730)
                if (directWhatsappAction) {
                    const waText = encodeURIComponent(`Olá! Acabei de enviar uma solicitação no site da Azun.\nNome: ${nome}\nEmpresa: ${empresa}\nSegmento: ${segmento}\nTelefone: ${telefone}`);
                    directWhatsappAction.href = `https://wa.me/5592988389730?text=${waText}`;
                }

            } catch (err) {
                console.error('Erro ao enviar contato:', err);
                alert('Sua solicitação foi registrada! Abrindo atendimento no WhatsApp.');
                window.open(`https://wa.me/5592988389730?text=${encodeURIComponent(`Olá! Vim pelo site da Azun e gostaria de falar com um consultor. Nome: ${nome} - Empresa: ${empresa}`)}`, '_blank');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Confirmar Agendamento';
                }
            }
        });
    }
}

function bindModalButtons() {
    const modalDemo = document.getElementById('modalDemo');
    const openDemoBtns = document.querySelectorAll('.open-demo-modal');

    openDemoBtns.forEach(btn => {
        btn.removeEventListener('click', handleOpenModal);
        btn.addEventListener('click', handleOpenModal);
    });

    function handleOpenModal(e) {
        e.preventDefault();
        const plano = e.currentTarget.getAttribute('data-plano');
        const leadMensagem = document.getElementById('leadMensagem');
        if (leadMensagem && plano) {
            leadMensagem.value = `Tenho interesse na contratação do Plano ${plano}.`;
        }
        if (modalDemo) {
            modalDemo.classList.remove('hidden');
            modalDemo.classList.add('flex');
        }
    }
}

// ==========================================================================
// 7. ACCORDION DE PERGUNTAS FREQUENTES (FAQ)
// ==========================================================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (questionBtn && answer) {
            questionBtn.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');

                // Fecha outros itens
                faqItems.forEach(other => {
                    const otherAnswer = other.querySelector('.faq-answer');
                    const otherIcon = other.querySelector('.faq-icon');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.classList.add('hidden');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                if (isOpen) {
                    answer.classList.add('hidden');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
}

// ==========================================================================
// 8. MENU MOBILE
// ==========================================================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            }
            renderAllLucideIcons();
        });

        // Fecha ao clicar em qualquer link ou botão dentro do menu
        mobileMenu.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                renderAllLucideIcons();
            });
        });

        // Fecha ao clicar fora do menu no mobile
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                renderAllLucideIcons();
            }
        });
    }
}

// ==========================================================================
// AZUN TECNOLOGIA - SCRIPTS INTERATIVOS & FLUIDEZ ANTIGRAVITY
// REGRA ABSOLUTA: ZERO EMOJIS! SOMENTE ÍCONES VETORIAIS E DESIGN DE PRECISÃO.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 0. Inicialização de Ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 1. Canvas Fluido de Física Antigravity (Partículas Vívidas, Nítidas e Reativas ao Scroll)
    initAntigravityCanvas();

    // 2. Sistema Completo de Animações de Scroll (Progress Bar, Reveal, Counters, Nav Spy)
    initScrollAnimations();

    // 3. Efeito Spotlight & 3D Tilt nos Cards
    initSpotlightAndTilt();

    // 4. Documentação Interativa da API (Substituindo o antigo simulador)
    initApiExplorer();

    // 5. Carregamento Dinâmico de Planos via API (/api/planos) com Status Real
    initDynamicPlans();

    // 6. Formulário Funcional "Fale com um Consultor Azun" (E-mail + WhatsApp)
    initContactAndConsultor();

    // 7. Accordion de Perguntas Frequentes (FAQ)
    initFaqAccordion();

    // 8. Menu Mobile
    initMobileMenu();
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

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
    });

    // Pulso Gravitacional (Shockwave) ao clicar na página
    window.addEventListener('click', (e) => {
        // Ignora cliques dentro de inputs ou botões do modal para manter usabilidade
        if (e.target.closest('input') || e.target.closest('select') || e.target.closest('textarea')) return;
        
        shockwaves.push({
            x: e.clientX,
            y: e.clientY,
            radius: 4,
            maxRadius: 320,
            alpha: 0.85
        });
    });

    // Momentum de Rolagem: partículas flutuam no sentido inverso do scroll
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollVelocity = (currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        // Aplica impulso vertical instantâneo a todas as partículas
        for (let i = 0; i < particles.length; i++) {
            particles[i].vy -= scrollVelocity * 0.045;
        }
    }, { passive: true });

    // Gera 60 partículas com papéis distintos (Nós Principais, Conectores e Micro-poeira)
    const particleCount = Math.min(Math.floor(width / 26), 64);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const isHub = i % 6 === 0; // 1 a cada 6 partículas é um nó principal maior
        const isSpark = i % 4 === 1;

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * (isHub ? 0.35 : 0.55),
            vy: (Math.random() - 0.5) * (isHub ? 0.35 : 0.55),
            baseRadius: isHub ? (Math.random() * 2 + 4.5) : (isSpark ? 2.0 : 3.2),
            radius: isHub ? 5.2 : 3.0,
            alpha: isHub ? 0.95 : (isSpark ? 0.65 : 0.85),
            isHub: isHub,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.025 + 0.015
        });
    }

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
        scrollVelocity *= 0.94;

        // 1. Processa e desenha shockwaves ativas
        for (let s = shockwaves.length - 1; s >= 0; s--) {
            const sw = shockwaves[s];
            sw.radius += 9;
            sw.alpha *= 0.94;

            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(37, 99, 235, ${sw.alpha * 0.75})`;
            ctx.lineWidth = 2.2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
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
            if (Math.abs(p.vx) < 0.15) p.vx += (Math.random() - 0.5) * 0.1;
            if (Math.abs(p.vy) < 0.15) p.vy += (Math.random() - 0.5) * 0.1;

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
                if (Math.abs(dist - sw.radius) < 40 && dist > 1) {
                    const push = (40 - Math.abs(dist - sw.radius)) * 0.25;
                    p.x += (dx / dist) * push;
                    p.y += (dy / dist) * push;
                }
            }

            // Interação Gravitacional com o cursor
            if (mouse.active) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 240 && dist > 5) {
                    const force = (240 - dist) / 240;
                    // Gravidade atraente com órbita suave
                    p.x += (dx / dist) * force * 1.35;
                    p.y += (dy / dist) * force * 1.35;
                }
            }

            // Pulsação suave do raio
            p.radius = p.baseRadius + Math.sin(time + p.phase) * (p.isHub ? 1.4 : 0.6);

            // Desenha Partícula com Glow Nítido
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

            if (p.isHub) {
                // Nó Principal: Anel de Aura + Núcleo Brilhante
                ctx.shadowBlur = 14;
                ctx.shadowColor = 'rgba(37, 99, 235, 0.85)';
                ctx.fillStyle = '#2563eb';
                ctx.fill();

                // Núcleo interno vívido
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

                // Anel externo sutil
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 1.8, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + Math.sin(time + p.phase) * 0.25})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            } else {
                // Nó Médio / Faísca
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(2, 132, 199, 0.65)';
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

                if (dist < 145) {
                    const lineAlpha = (1 - dist / 145);
                    const isHubConnection = p.isHub || p2.isHub;

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = isHubConnection 
                        ? `rgba(37, 99, 235, ${lineAlpha * 0.55})` 
                        : `rgba(2, 132, 199, ${lineAlpha * 0.35})`;
                    ctx.lineWidth = isHubConnection ? 1.3 : 0.9;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// 2. SISTEMA COMPLETO DE ANIMAÇÕES DE ROLAGEM / SCROLL
// ==========================================================================
function initScrollAnimations() {
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // 2.1. Barra de Progresso e Botão Voltar ao Topo no Scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${progress}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 420) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // 2.2. Scroll Spy: Ativa link correspondente na navbar
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
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
    }, { passive: true });

    // Ação do Botão Voltar ao Topo
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2.3. IntersectionObserver para Revelação Suave de Elementos
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');

                // Se possui contadores de métricas, dispara a animação numérica
                const counters = entry.target.querySelectorAll('[data-counter-target]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });

                // Se o próprio elemento for um contador
                if (entry.target.hasAttribute('data-counter-target')) {
                    animateCounter(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
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
    'pedidos': {
        method: 'POST',
        methodClass: 'api-method-post',
        endpoint: '/api/v1/pedidos',
        title: 'Criar Pedido Integrado',
        desc: 'Cria pedidos originados de cardápios digitais, e-commerces, totens ou balcão, calculando taxas fiscais e acionando impressão na cozinha.',
        curl: `curl -X POST https://api.azun.com.br/api/v1/pedidos \\
  -H "Authorization: Bearer azun_live_89a42f..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "canal": "TOTEM_AUTOATENDIMENTO",
    "cliente": { "nome": "Carlos Mendes", "cpf": "123.456.789-00" },
    "itens": [
      { "id_produto": 104, "quantidade": 2, "preco_unitario": 28.50 }
    ],
    "pagamento": { "metodo": "PIX", "valor": 57.00 }
  }'`,
        js: `const response = await fetch('https://api.azun.com.br/api/v1/pedidos', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer azun_live_89a42f...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    canal: 'TOTEM_AUTOATENDIMENTO',
    cliente: { nome: 'Carlos Mendes', cpf: '123.456.789-00' },
    itens: [{ id_produto: 104, quantidade: 2, preco_unitario: 28.50 }],
    pagamento: { metodo: 'PIX', valor: 57.00 }
  })
});

const data = await response.json();
console.log('Pedido Criado:', data.id_pedido);`,
        py: `import requests

url = "https://api.azun.com.br/api/v1/pedidos"
headers = {
    "Authorization": "Bearer azun_live_89a42f...",
    "Content-Type": "application/json"
}
payload = {
    "canal": "TOTEM_AUTOATENDIMENTO",
    "cliente": {"nome": "Carlos Mendes", "cpf": "123.456.789-00"},
    "itens": [{"id_produto": 104, "quantidade": 2, "preco_unitario": 28.50}],
    "pagamento": {"metodo": "PIX", "valor": 57.00}
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
        response: `{
  "success": true,
  "status": "CRIADO",
  "id_pedido": 48201,
  "sync_id": "ped_sync_8a29b4",
  "total": 57.00,
  "latencia_ms": 7.4,
  "cozinha_impressao": "ENVIADA_SPOOL"
}`
    },
    'fiscal': {
        method: 'POST',
        methodClass: 'api-method-post',
        endpoint: '/api/v1/fiscal/emitir',
        title: 'Emissão Expressa NFC-e (Mod 65) e NF-e (Mod 55)',
        desc: 'Assinatura digital automática com Certificado A1, cálculo de tributos e envio síncrono para a SEFAZ Estadual com retorno do XML e QR Code.',
        curl: `curl -X POST https://api.azun.com.br/api/v1/fiscal/emitir \\
  -H "Authorization: Bearer azun_live_89a42f..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "modelo": 65,
    "ambiente": 1,
    "serie": 1,
    "id_pedido": 48201,
    "itens": [
      { "ncm": "22021000", "cfop": "5102", "cst_icms": "102", "valor": 57.00 }
    ]
  }'`,
        js: `const response = await fetch('https://api.azun.com.br/api/v1/fiscal/emitir', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer azun_live_89a42f...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    modelo: 65,
    ambiente: 1,
    serie: 1,
    id_pedido: 48201,
    itens: [{ ncm: '22021000', cfop: '5102', cst_icms: '102', valor: 57.00 }]
  })
});
const fiscal = await response.json();
console.log('Chave de Acesso:', fiscal.chave_acesso);`,
        py: `import requests

url = "https://api.azun.com.br/api/v1/fiscal/emitir"
headers = {"Authorization": "Bearer azun_live_89a42f..."}
payload = {
    "modelo": 65,
    "ambiente": 1,
    "serie": 1,
    "id_pedido": 48201
}
resp = requests.post(url, json=payload, headers=headers)
print("Protocolo SEFAZ:", resp.json()["protocolo"])`,
        response: `{
  "success": true,
  "modelo": 65,
  "status_sefaz": "100_AUTORIZADO",
  "chave_acesso": "13261004123456000199650010000482011987654321",
  "protocolo": "113260049281723",
  "qr_code_url": "https://sefaz.am.gov.br/nfce/qrcode?p=...",
  "tempo_processamento_ms": 118
}`
    },
    'mesas': {
        method: 'GET',
        methodClass: 'api-method-get',
        endpoint: '/api/v1/mesas/status',
        title: 'Consulta em Tempo Real de Mesas e Comandas',
        desc: 'Retorna a ocupação de todas as mesas cadastradas, consumo acumulado por comanda, taxa de serviço e garçom responsável.',
        curl: `curl -X GET "https://api.azun.com.br/api/v1/mesas/status?id_tenant=1" \\
  -H "Authorization: Bearer azun_live_89a42f..."`,
        js: `const response = await fetch('https://api.azun.com.br/api/v1/mesas/status?id_tenant=1', {
  headers: { 'Authorization': 'Bearer azun_live_89a42f...' }
});
const mesas = await response.json();
console.log('Total Mesas Ocupadas:', mesas.ocupadas);`,
        py: `import requests

url = "https://api.azun.com.br/api/v1/mesas/status?id_tenant=1"
headers = {"Authorization": "Bearer azun_live_89a42f..."}
data = requests.get(url, headers=headers).json()
print("Ocupadas:", data["ocupadas"])`,
        response: `{
  "success": true,
  "total_mesas": 24,
  "ocupadas": 9,
  "livres": 15,
  "mesas": [
    {
      "numero": 4,
      "status": "OCUPADA",
      "garcom": "Marcos",
      "abertura": "2026-10-24T20:15:00Z",
      "subtotal": 142.50,
      "taxa_servico": 14.25,
      "total": 156.75
    }
  ]
}`
    },
    'sync': {
        method: 'POST',
        methodClass: 'api-method-post',
        endpoint: '/api/pdv/caixas/carga-sync',
        title: 'Carga Compactada & Sincronização Caixa Offline (AzunService.exe)',
        desc: 'Endpoint consumido nativamente pelo serviço em background AzunService.exe para sincronização delta de produtos e descarrego de lotes fiscais em segundo plano.',
        curl: `curl -X POST "https://api.azun.com.br/api/pdv/caixas/carga-sync?token=CX-0304-EC8F" \\
  -H "X-Hardware-Id: HWID_AZUN_9921_B8" \\
  -H "Content-Type: application/json" \\
  -d '{
    "versao_carga_local": 142,
    "movimentos_pendentes": []
  }'`,
        js: `const res = await fetch('https://api.azun.com.br/api/pdv/caixas/carga-sync?token=CX-0304-EC8F', {
  method: 'POST',
  headers: {
    'X-Hardware-Id': 'HWID_AZUN_9921_B8',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ versao_carga_local: 142, movimentos_pendentes: [] })
});
const syncData = await res.json();`,
        py: `import requests

url = "https://api.azun.com.br/api/pdv/caixas/carga-sync?token=CX-0304-EC8F"
headers = {"X-Hardware-Id": "HWID_AZUN_9921_B8"}
resp = requests.post(url, json={"versao_carga_local": 142}, headers=headers)
print(resp.json())`,
        response: `{
  "success": true,
  "terminal": "CAIXA_01",
  "status_pareamento": "PAREADO",
  "versao_carga_atual": 145,
  "novos_produtos_delta": 4,
  "carga_binaria_sqlite_gz": "https://cdn.azun.com.br/cargas/delta_145.bin"
}`
    },
    'webhooks': {
        method: 'EVENT',
        methodClass: 'api-method-ws',
        endpoint: 'Webhooks Event-Driven',
        title: 'Webhooks em Tempo Real com Assinatura HMAC SHA-256',
        desc: 'Receba notificações instantâneas no seu servidor sempre que um pedido for confirmado, um cupom fiscal for emitido ou uma mesa for fechada.',
        curl: `// Payload enviado pelo servidor da Azun para a sua URL configurada:
POST /seu-webhook-endpoint HTTP/1.1
Host: api.seusistema.com.br
X-Azun-Signature: t=1792873400,v1=9e82c1b72a4f...
Content-Type: application/json

{
  "event": "pedido.pagamento_confirmado",
  "created_at": 1792873400,
  "data": {
    "id_pedido": 48201,
    "status": "PAGO",
    "metodo": "PIX",
    "valor": 57.00
  }
}`,
        js: `// Exemplo de verificação de assinatura em Node.js (Express)
const crypto = require('crypto');

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-azun-signature'];
  const hmac = crypto.createHmac('sha256', process.env.AZUN_WEBHOOK_SECRET);
  const digest = hmac.update(JSON.stringify(req.body)).digest('hex');

  if (signature.includes(digest)) {
    console.log('Evento Válido:', req.body.event);
    return res.status(200).send('OK');
  }
  res.status(401).send('Assinatura Inválida');
});`,
        py: `# Exemplo de verificação em Python (Flask)
import hmac, hashlib
from flask import request

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    sig = request.headers.get('X-Azun-Signature')
    computed = hmac.new(SECRET.encode(), request.data, hashlib.sha256).hexdigest()
    if sig and computed in sig:
        event = request.json['event']
        return "OK", 200
    return "Invalid signature", 401`,
        response: `{
  "received": true,
  "event_id": "evt_99182ab3",
  "acknowledged_at": "2026-10-24T20:44:00Z"
}`
    }
};

function initApiExplorer() {
    let currentEndpoint = 'pedidos';
    let currentLang = 'curl';

    const tabButtons = document.querySelectorAll('.api-tab-btn');
    const langButtons = document.querySelectorAll('.api-lang-btn');
    const codeSnippetEl = document.getElementById('apiCodeSnippet');
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
            const textToCopy = data[currentLang] || data.curl;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span class="text-emerald-400 font-bold">Copiado!</span>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
        });
    }

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
        card.className = `reveal-on-scroll spotlight-card tilt-card rounded-3xl p-8 transition-all flex flex-col justify-between ${
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

    if (window.lucide) window.lucide.createIcons();
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
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

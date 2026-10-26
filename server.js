const http = require('http');
const fs = require('fs');
const path = require('path');

// Carrega variáveis do backend/.env para conexão com banco e credenciais
const backendEnvPath = path.resolve(__dirname, '../backend/.env');
let DATABASE_URL = 'mysql://root:root@localhost:3306/erp_novo';
if (fs.existsSync(backendEnvPath)) {
  try {
    const dotenv = require('C:/Users/rayan/Desktop/www/www/backend/node_modules/dotenv');
    const envParsed = dotenv.parse(fs.readFileSync(backendEnvPath));
    if (envParsed.DATABASE_URL) {
      DATABASE_URL = envParsed.DATABASE_URL;
    }
  } catch (e) {
    console.warn('[SERVER] Aviso ao ler backend/.env:', e.message);
  }
}

// Configuração do MySQL
let mysql = null;
let pool = null;
try {
  mysql = require('C:/Users/rayan/Desktop/www/www/backend/node_modules/mysql2');
  pool = mysql.createPool(DATABASE_URL);
  console.log('[SERVER] Pool MySQL inicializado para consulta de planos.');
} catch (e) {
  console.warn('[SERVER] Aviso: mysql2 não pôde ser carregado:', e.message);
}

// Configuração de Envio de E-mail
let nodemailer = null;
try {
  nodemailer = require('C:/Users/rayan/Desktop/www/www/backend/node_modules/nodemailer');
} catch (e) {
  console.warn('[SERVER] Aviso: nodemailer não pôde ser carregado:', e.message);
}

const PORT = process.env.PORT || 3002;
const NOTIFY_EMAIL = 'rayanchaveshotmail@gmail.com';
const WHATSAPP_CONSULTOR = '5592988389730';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.exe': 'application/vnd.microsoft.portable-executable',
  '.zip': 'application/zip',
  '.pdf': 'application/pdf'
};

// Fallback de planos caso o banco esteja inacessível
const FALLBACK_PLANOS = [
  {
    id: 1,
    nome: "Business",
    preco_mensal: "69.99",
    limite_produtos: 800,
    limite_usuarios: 6,
    limite_caixas: 2,
    destaque: 1,
    ativo: 1,
    descricao: "Ideal para varejos, lojas e restaurantes em expansão com frente de caixa e retaguarda."
  },
  {
    id: 2,
    nome: "Free",
    preco_mensal: "0.00",
    limite_produtos: 15,
    limite_usuarios: 1,
    limite_caixas: 1,
    destaque: 0,
    ativo: 0,
    descricao: "Plano experimental legado (indisponível para nova comercialização)."
  },
  {
    id: 3,
    nome: "Premium",
    preco_mensal: "149.00",
    limite_produtos: 2000,
    limite_usuarios: 15,
    limite_caixas: 5,
    destaque: 0,
    ativo: 1,
    descricao: "Para médias e grandes operações, franquias, alta volumetria fiscal e múltiplos caixas."
  }
];

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  const cleanUrl = urlParts[0];

  // =========================================================================
  // API: Consulta dinâmica de planos com status de comercialização
  // =========================================================================
  if (req.method === 'GET' && cleanUrl === '/api/planos') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!pool) {
      return res.end(JSON.stringify({
        success: true,
        source: 'fallback',
        planos: FALLBACK_PLANOS.map(p => ({
          ...p,
          ativo: p.ativo === 1 || p.ativo === true,
          status_comercial: (p.ativo === 1 || p.ativo === true) ? 'Disponível para Comercialização' : 'Indisponível no Momento'
        }))
      }));
    }

    pool.query('SELECT id, nome, preco_mensal, limite_produtos, limite_usuarios, limite_caixas, destaque, ativo, descricao FROM Planos ORDER BY id ASC', (err, rows) => {
      if (err) {
        console.error('[API /api/planos] Erro MySQL:', err.message);
        return res.end(JSON.stringify({
          success: true,
          source: 'fallback_on_error',
          planos: FALLBACK_PLANOS.map(p => ({
            ...p,
            ativo: p.ativo === 1 || p.ativo === true,
            status_comercial: (p.ativo === 1 || p.ativo === true) ? 'Disponível para Comercialização' : 'Indisponível no Momento'
          }))
        }));
      }

      const formatados = rows.map(r => ({
        id: r.id,
        nome: r.nome,
        preco_mensal: parseFloat(r.preco_mensal) || 0,
        limite_produtos: r.limite_produtos,
        limite_usuarios: r.limite_usuarios,
        limite_caixas: r.limite_caixas,
        destaque: Boolean(r.destaque),
        ativo: Boolean(r.ativo),
        descricao: r.descricao || '',
        status_comercial: Boolean(r.ativo) ? 'Disponível para Comercialização' : 'Indisponível no Momento'
      }));

      return res.end(JSON.stringify({
        success: true,
        source: 'database_live',
        planos: formatados
      }));
    });
    return;
  }

  // =========================================================================
  // API: Envio funcional do formulário "Fale com um Consultor Azun"
  // =========================================================================
  if (req.method === 'POST' && (cleanUrl === '/api/contato' || cleanUrl === '/api/leads')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');

      try {
        const data = JSON.parse(body || '{}');
        const nome = String(data.nome || 'Visitante').trim();
        const telefone = String(data.telefone || '').trim();
        const empresa = String(data.empresa || 'Não informada').trim();
        const segmento = String(data.segmento || 'Geral').trim();
        const email = String(data.email || 'Não informado').trim();
        const mensagem = String(data.mensagem || '').trim();
        const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Manaus' });
        const ipVisitante = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const leadObj = {
          id: Date.now(),
          nome,
          telefone,
          empresa,
          segmento,
          email,
          mensagem,
          dataHora,
          ip: ipVisitante
        };

        // 1. Salva no arquivo leads.json (garante persistência de 100% dos contatos)
        const leadsFile = path.join(__dirname, 'leads.json');
        let currentLeads = [];
        try {
          if (fs.existsSync(leadsFile)) {
            currentLeads = JSON.parse(fs.readFileSync(leadsFile, 'utf8') || '[]');
          }
        } catch (e) {
          currentLeads = [];
        }
        currentLeads.push(leadObj);
        fs.writeFileSync(leadsFile, JSON.stringify(currentLeads, null, 2), 'utf8');

        // 2. Log destacado no terminal do servidor
        console.log('\n=============================================================');
        console.log('  [NOVO LEAD RECEBIDO - FALE COM UM CONSULTOR AZUN]');
        console.log(`  Data/Hora: ${dataHora}`);
        console.log(`  Nome:      ${nome}`);
        console.log(`  Telefone:  ${telefone}`);
        console.log(`  Empresa:   ${empresa}`);
        console.log(`  Segmento:  ${segmento}`);
        console.log(`  E-mail:    ${email}`);
        console.log(`  Destino:   ${NOTIFY_EMAIL}`);
        console.log(`  WhatsApp:  https://wa.me/${WHATSAPP_CONSULTOR}`);
        console.log('=============================================================\n');

        // 3. Tenta disparar o e-mail para rayanchaveshotmail@gmail.com
        let emailEnviado = false;
        let emailDetalhe = '';

        if (nodemailer) {
          try {
            // Cria transporte configurado ou transporte direto
            const smtpHost = process.env.SMTP_HOST;
            const smtpUser = process.env.SMTP_USER;
            const smtpPass = process.env.SMTP_PASS;

            let transporter;
            if (smtpHost && smtpUser && smtpPass) {
              transporter = nodemailer.createTransport({
                host: smtpHost,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: { user: smtpUser, pass: smtpPass }
              });
            } else {
              // Fallback para envio direto SMTP ou test transport
              transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: process.env.GMAIL_USER || 'contato.azun@gmail.com',
                  pass: process.env.GMAIL_PASS || 'azun2026'
                }
              });
            }

            const mailOptions = {
              from: '"Azun Tecnologia - Leads" <noreply@azun.com.br>',
              to: NOTIFY_EMAIL,
              subject: `[Novo Lead Azun] ${nome} - ${empresa}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                  <div style="background: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
                    <h2 style="margin: 0; font-size: 20px;">Novo Contato Comercial - Azun Tecnologia</h2>
                    <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9;">Recebido através do site oficial</p>
                  </div>
                  <div style="padding: 24px; background: #ffffff;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 140px;">Nome:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${nome}</td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">WhatsApp:</td><td style="padding: 8px 0; color: #2563eb; font-weight: bold;"><a href="https://wa.me/${telefone.replace(/\D/g, '')}">${telefone}</a></td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Empresa:</td><td style="padding: 8px 0; color: #0f172a;">${empresa}</td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Segmento:</td><td style="padding: 8px 0; color: #0f172a;">${segmento}</td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">E-mail:</td><td style="padding: 8px 0; color: #0f172a;">${email}</td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Mensagem:</td><td style="padding: 8px 0; color: #0f172a;">${mensagem || 'Nenhuma mensagem adicional'}</td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Data/Hora:</td><td style="padding: 8px 0; color: #64748b;">${dataHora}</td></tr>
                      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">IP do Lead:</td><td style="padding: 8px 0; color: #64748b;">${ipVisitante}</td></tr>
                    </table>
                    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
                      <a href="https://wa.me/55${telefone.replace(/\D/g, '')}?text=Ol%C3%A1%20${encodeURIComponent(nome)}!%20Sou%20consultor%20da%20Azun%20Tecnologia,%20recebi%20seu%20contato%20pelo%20site." style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 13px;">Chamar no WhatsApp do Lead</a>
                    </div>
                  </div>
                </div>
              `
            };

            await transporter.sendMail(mailOptions);
            emailEnviado = true;
            console.log(`[E-MAIL] Notificação enviada com sucesso para ${NOTIFY_EMAIL}`);
          } catch (mailErr) {
            emailDetalhe = mailErr.message;
            console.warn('[E-MAIL] Erro ao enviar por SMTP (Lead salvo no leads.json):', mailErr.message);
          }
        }

        res.end(JSON.stringify({
          success: true,
          message: 'Solicitação registrada com sucesso! Nossa equipe entrará em contato.',
          lead: {
            id: leadObj.id,
            nome,
            whatsappLink: `https://wa.me/${WHATSAPP_CONSULTOR}?text=${encodeURIComponent(`Olá! Solicitei uma demonstração no site da Azun para a empresa ${empresa}. Meu nome é ${nome}.`)}`
          },
          emailStatus: {
            enviado: emailEnviado,
            destinatario: NOTIFY_EMAIL,
            detalhe: emailDetalhe || 'Registrado com sucesso'
          }
        }));

      } catch (err) {
        console.error('[API /api/contato] Erro:', err.message);
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // =========================================================================
  // SERVIR ARQUIVOS ESTÁTICOS & DOWNLOADS
  // =========================================================================
  let requestFile = cleanUrl === '/' || cleanUrl === '' ? '/index.html' : cleanUrl;
  const filePath = path.join(__dirname, requestFile);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback para index.html (SPA)
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Página não encontrada');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const headers = {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': ext === '.exe' ? 'public, max-age=3600' : 'no-cache'
    };

    if (ext === '.exe') {
      headers['Content-Disposition'] = `attachment; filename="${path.basename(filePath)}"`;
    }

    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AZUN TECNOLOGIA - WEBSITE COMERCIAL ATIVO`);
  console.log(`  Acesse em: http://localhost:${PORT}`);
  console.log(`  Downloads: http://localhost:${PORT}/#downloads`);
  console.log(`  Consultor E-mail: ${NOTIFY_EMAIL}`);
  console.log(`  Consultor WhatsApp: (92) 98838-9730`);
  console.log(`=======================================================`);
});

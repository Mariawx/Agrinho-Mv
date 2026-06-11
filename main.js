document.addEventListener('DOMContentLoaded', () => {
    // --- Controle do Menu de Acessibilidade (Tecnologia acessível no campo) ---
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    
    // --- Botões de Ação ---
    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContrasteBotao = document.getElementById('alterna-contraste-solar');
    const modoEconomiaBotao = document.getElementById('modo-economia-energia'); // Nova função sustentável

    // Limites para o tamanho da fonte (facilita a leitura no celular em movimento no trator/pasto)
    const TAMANHO_MIN = 0.8;
    const TAMANHO_MAX = 2.0;
    
    // Recupera preferências salvas pelo produtor no dispositivo (Storage)
    let tamanhoAtualFonte = parseFloat(localStorage.getItem('eco-leite-fonte')) || 1.0;
    const altoContrasteAtivo = localStorage.getItem('eco-leite-contraste') === 'true';
    const modoEconomiaAtivo = localStorage.getItem('eco-leite-energia') === 'true';

    // Aplica as preferências logo que a página carrega
    aplicarFonte(tamanhoAtualFonte);
    if (altoContrasteAtivo) document.body.classList.add('alto-contraste-solar');
    if (modoEconomiaAtivo) document.body.classList.add('modo-economia-bateria');

    // --- Eventos de Interação ---

    // Menu Dropdown de Acessibilidade
    if (botaoAcessibilidade && opcoesAcessibilidade) {
        botaoAcessibilidade.addEventListener('click', () => {
            botaoAcessibilidade.classList.toggle('rotacao-ativa');
            opcoesAcessibilidade.classList.toggle('apresenta-lista');
            
            const isExpanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
            botaoAcessibilidade.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Ação: Aumentar Fonte
    if (aumentaFonteBotao) {
        aumentaFonteBotao.addEventListener('click', () => {
            if (tamanhoAtualFonte < TAMANHO_MAX) {
                tamanhoAtualFonte += 0.1;
                aplicarFonte(tamanhoAtualFonte);
            }
        });
    }

    // Ação: Diminuir Fonte
    if (diminuiFonteBotao) {
        diminuiFonteBotao.addEventListener('click', () => {
            if (tamanhoAtualFonte > TAMANHO_MIN) {
                tamanhoAtualFonte -= 0.1;
                aplicarFonte(tamanhoAtualFonte);
            }
        });
    }

    // Ação: Alternar Contraste (Foco na legibilidade sob forte luz do sol nas placas)
    if (alternaContrasteBotao) {
        alternaContrasteBotao.addEventListener('click', () => {
            const ativo = document.body.classList.toggle('alto-contraste-solar');
            localStorage.setItem('eco-leite-contraste', ativo);
        });
    }

    // Ação: Modo Economia de Bateria (Inspirado na eficiência energética das placas solares)
    if (modoEconomiaBotao) {
        modoEconomiaBotao.addEventListener('click', () => {
            const ativo = document.body.classList.toggle('modo-economia-bateria');
            localStorage.setItem('eco-leite-energia', ativo);
        });
    }

    // --- Funções Auxiliares ---

    // Função para aplicar e salvar o tamanho da fonte
    function aplicarFonte(tamanho) {
        // Evita bugs de precisão decimal do JavaScript
        const tamanhoFormatado = tamanho.toFixed(1);
        
        // Abordagem moderna: usa variável CSS para refletir a tecnologia do site
        document.documentElement.style.setProperty('--t
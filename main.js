document.addEventListener('DOMContentLoaded', () => {
    // Elementos de controle do menu
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    
    // Botões de ação
    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContrasteBotao = document.getElementById('alterna-contraste');

    // Limites para o tamanho da fonte (ajuda na leitura em dispositivos móveis no campo)
    const TAMANHO_MIN = 0.8;
    const TAMANHO_MAX = 2.0;
    
    // Recupera preferências salvas ou define o padrão
    let tamanhoAtualFonte = parseFloat(localStorage.getItem('leite-solar-fonte')) || 1.0;
    const altoContrasteAtivo = localStorage.getItem('leite-solar-contraste') === 'true';

    // Aplica as preferências iniciais salvas pelo produtor
    aplicarFonte(tamanhoAtualFonte);
    if (altoContrasteAtivo) {
        document.body.classList.add('alto-contraste');
    }

    // Menu Dropdown de Acessibilidade
    botaoAcessibilidade.addEventListener('click', () => {
        botaoAcessibilidade.classList.toggle('rotacao-botao');
        opcoesAcessibilidade.classList.toggle('apresenta-lista');

        const isExpanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoAcessibilidade.setAttribute('aria-expanded', !isExpanded);
    });

    // Ação: Aumentar Fonte
    aumentaFonteBotao.addEventListener('click', () => {
        if (tamanhoAtualFonte < TAMANHO_MAX) {
            tamanhoAtualFonte += 0.1;
            aplicarFonte(tamanhoAtualFonte);
        }
    });

    // Ação: Diminuir Fonte
    diminuiFonteBotao.addEventListener('click', () => {
        if (tamanhoAtualFonte > TAMANHO_MIN) {
            tamanhoAtualFonte -= 0.1;
            aplicarFonte(tamanhoAtualFonte);
        }
    });

    // Ação: Alternar Contraste (Essencial para leitura sob a luz do sol)
    alternaContrasteBotao.addEventListener('click', () => {
        const ativo = document.body.classList.toggle('alto-contraste');
        localStorage.setItem('leite-solar-contraste', ativo);
    });

    // Função auxiliar para aplicar e salvar o tamanho da fonte
    function aplicarFonte(tamanho) {
        // .toFixed(1) evita bugs de precisão decimal do JavaScript
        const tamanhoFormatado = tamanho.toFixed(1);
        document.body.style.fontSize = `${tamanhoFormatado}rem`;
        localStorage.setItem('leite-solar-fonte', tamanhoFormatado);
    }
});
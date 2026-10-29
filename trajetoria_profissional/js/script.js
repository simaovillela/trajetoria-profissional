document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Ícones
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Navegação de Abas
  const navItems = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabTarget = item.dataset.tab;

      navItems.forEach(n => n.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const activePanel = document.getElementById(tabTarget);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // 2. Filtro Interativo na Linha do Tempo
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tlBlocks = document.querySelectorAll('.tl-block');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tlBlocks.forEach(block => {
        if (category === 'all' || block.dataset.category === category) {
          block.classList.remove('hidden-category');
        } else {
          block.classList.add('hidden-category');
        }
      });
    });
  });

  // 3. IA Interativa Especialista para a Professora Roberta
  const chatArea = document.getElementById('chatArea');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const chips = document.querySelectorAll('.chip');

  const knowledgeBase = [
    {
      keywords: ['por que', 'carreira em y', 'especialista', 'gestao', 'gestão', 'liderança'],
      response: "Professora Roberta, a escolha pela trilha de Especialista Técnico (Individual Contributor) na Carreira em Y reflete minha afinidade profunda com arquitetura de dados, modelagem dimensional e engenharia de software aplicada a dados. O objetivo é alcançar senioridade técnica máxima (nível Staff Engineer) construindo soluções analíticas de alto impacto, garantindo linhagem e governança sem assumir a rota de gestão puramente humana e orçamentária."
    },
    {
      keywords: ['dbt', 'snowflake', 'ferramentas', 'tecnologia', 'stack', 'airflow'],
      response: "O dbt e o Snowflake são os pilares centrais do Modern Data Stack. O Snowflake traz poder de processamento em nuvem massivo e escalável, enquanto o dbt introduz testes automatizados, controle de versão e CI/CD na modelagem dos dados. No horizonte de 5 anos, essa stack é fundamental para viabilizar a Semantic Layer da empresa e alimentar modelos de IA com dados confiáveis."
    },
    {
      keywords: ['pdca', 'swot', 'metodologia', 'funciona'],
      response: "O ciclo PDCA funciona como um motor contínuo de autoavaliação semestral: no Plan, identifico certificações e gaps arquiteturais; no Do, aplico testes de dados no trabalho diário e publico projetos no GitHub; no Check, analiso pull requests e métricas de qualidade; e no Act, refatoro métodos rumo ao próximo nível da Carreira em Y."
    },
    {
      keywords: ['tcc', 'artigo', 'faculdade', 'pesquisa', 'sistemas de informação'],
      response: "Meu artigo de conclusão de curso investigou exatamente o impacto do preparo e da higienização dos dados na confiabilidade de sistemas de inteligência artificial em self-service analytics. Essa pesquisa conecta diretamente a teoria acadêmica à minha prática diária como Analytics Engineer Jr."
    },
    {
      keywords: ['5 anos', 'futuro', 'meta', 'staff', 'chegada'],
      response: "A meta aos 5 anos pós-formado é atingir o cargo de Senior / Staff Analytics Engineer, liderando a governança e arquitetura corporativa de métricas, atuando como o elo entre a engenharia de dados pesada e as soluções de Machine Learning e IA da organização."
    }
  ];

  function appendChat(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function simulateAiTyping(query) {
    appendChat(query, 'user');

    // Cria indicador de carregamento translúcido
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'chat-bubble bot';
    loadingBubble.innerHTML = '<span style="opacity: 0.6;">Digitando análise para a Profª Roberta...</span>';
    chatArea.appendChild(loadingBubble);
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
      chatArea.removeChild(loadingBubble);

      const q = query.toLowerCase();
      const match = knowledgeBase.find(item => item.keywords.some(k => q.includes(k)));

      if (match) {
        appendChat(match.response, 'bot');
      } else {
        appendChat(`Professora Roberta, o plano de carreira do Simão foi projetado com foco na trilha técnica em Y, alinhando a experiência como Analytics Engineer Jr. aos fundamentos de Sistemas de Informação, garantindo metas sólidas apoiadas por SWOT, PDCA e perfil T-Shaped.`, 'bot');
      }
    }, 450);
  }

  if (chatForm && userInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = userInput.value.trim();
      if (!val) return;
      simulateAiTyping(val);
      userInput.value = '';
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.q;
      if (q) simulateAiTyping(q);
    });
  });
});
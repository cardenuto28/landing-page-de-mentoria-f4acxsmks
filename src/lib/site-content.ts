/**
 * DEALER EVOLUTION — CONTEÚDO OFICIAL DA PRANCHA
 * Fonte de verdade: PDF prancha_dealer_evolution_corrida (anexo do briefing).
 * Textos verbatim: NÃO reescrever, resumir ou "modernizar".
 * Itálico+laranja SÓ nos trechos marcados com `em` — nenhum outro itálico na página.
 */

export const BRAND = {
  name: 'DEALER EVOLUTION',
}

/**
 * PENDÊNCIAS DO PROPRIETÁRIO — nada abaixo está simulado; são itens que só o
 * dono do projeto pode fornecer:
 * - FOTO ORIGINAL DO PDF: a fotografia de Ricardo Cardenuto da seção Hero não
 *   pôde ser extraída do PDF (arquivo 100% imagem). Enquanto o arquivo
 *   não existir em src/assets/, o Hero usa um placeholder SVG local sinalizado
 *   ("Foto original do PDF pendente"). A foto de Quem Conduz já foi recebida.
 *   Ao receber a foto do Hero, salvá-la em src/assets/ e apontar o <img> para ela.
 * - ETAPAS 3–4 DO FORMULÁRIO: a infraestrutura multi-step está pronta; as
 *   perguntas dessas etapas aguardam definição do proprietário. A etapa 2 pede
 *   nome, e-mail e telefone do visitante.
 * - INTEGRAÇÃO DE LEADS: o formulário não tem backend; destino real dos
 *   leads (e-mail/CRM/WhatsApp) a definir.
 * - TEXTOS LEGAIS: páginas de Termos de Uso e Política de Privacidade com
 *   conteúdo placeholder, aguardando texto oficial.
 */
export const PENDENCIAS_DO_PROPRIETARIO = [
  'Foto original do PDF (Ricardo Cardenuto — Hero)',
  'Perguntas das etapas 3–4 do formulário multi-step',
  'Integração de leads (destino real dos envios do formulário)',
  'Textos oficiais de Termos de Uso e Política de Privacidade',
]

export const HERO = {
  eyebrow: 'ALTA PERFORMANCE COMERCIAL NO MERCADO PREMIUM',
  title: {
    before: 'Sua equipe vendendo no seu nível de excelência, ',
    em: 'sem depender de você.',
  },
  subtitle: 'Para donos, CEOs e diretores comerciais de empresas premium.',
  cta: 'Solicitar diagnóstico',
  photoAlt: 'Ricardo Cardenuto',
  photoCaption1: 'Ricardo Cardenuto',
  photoCaption2: 'Executivo de campo · marcas automotivas premium',
}

export const INDICADORES = [
  { numero: '27 anos', descricao: 'em gestão comercial' },
  { numero: '18', descricao: 'no automotivo premium' },
  { numero: '+14 anos', descricao: 'em cargos executivos' },
  { numero: '+30 prêmios', descricao: 'de performance' },
]

export const PESO_DA_VENDA = {
  eyebrow: 'O PESO DA VENDA',
  title: {
    before: 'Quando a melhor venda depende de você, ',
    em: 'crescer só aumenta a sua carga.',
  },
  texto:
    'Você entra na negociação porque sabe que a equipe sozinha não fecha. Isso não é fraqueza. É um processo que ainda não existe.',
  linhas: [
    { numero: '01', texto: 'A melhor venda ainda passa pelas suas mãos.' },
    { numero: '02', texto: 'A equipe executa, mas não conduz até a decisão.' },
    { numero: '03', texto: 'Sem processo, cada vendedor vende de um jeito.' },
  ],
}

export const ALERTA_COMERCIAL = {
  title: 'Toda semana, uma venda sua pode estar indo embora sem aviso.',
  texto: {
    before: 'Cada oportunidade parada é receita que pode fechar com a ',
    em: 'concorrência.',
  },
  complemento:
    'O cliente pede uma proposta. Ela sai, mas ninguém define o próximo passo. Dez dias depois, ele já está numa conversa com outra empresa. Você só percebe quando o pedido não chega.',
}

export const DECISOES = {
  eyebrow: 'DECISÕES QUE CUSTAM O CLIENTE EXIGENTE',
  cards: [
    {
      numero: '01',
      titulo: 'Contratar mais vendedores',
      descricao: 'Mais gente não resolve a ausência de um processo de condução da venda.',
    },
    {
      numero: '02',
      titulo: 'Investir no ambiente',
      descricao: 'Estrutura agradece, mas não conduz o cliente exigente até a decisão.',
    },
    {
      numero: '03',
      titulo: 'Copiar o concorrente',
      descricao: 'Imitar o que funciona fora do seu contexto não sustenta resultado.',
    },
    {
      numero: '04',
      titulo: 'Cobrar mais da equipe',
      descricao: 'Pressão sem método aumenta a rotatividade e não muda o índice de fechamento.',
    },
  ],
  cta: 'Solicitar diagnóstico',
}

export const SINAIS = {
  eyebrow: 'SINAIS DE ALERTA',
  cards: [
    {
      numero: '01',
      titulo: 'A decisão espera por você',
      descricao: 'Nenhum fechamento avança sem a sua presença na negociação.',
    },
    {
      numero: '02',
      titulo: 'A meta fecha no quase',
      descricao: 'O mês termina sempre perto, nunca no número.',
    },
    {
      numero: '03',
      titulo: 'Cada vendedor vende de um jeito',
      descricao: 'Sem método, o resultado depende do estilo de cada um.',
    },
    {
      numero: '04',
      titulo: 'A proposta sai e o cliente some',
      descricao: 'A proposta é entregue, mas ninguém define o próximo passo.',
    },
    {
      numero: '05',
      titulo: 'Contratar não resolve',
      descricao: 'Novos vendedores repetem a mesma falta de processo.',
    },
    {
      numero: '06',
      titulo: 'Sair de férias é arriscar vendas',
      descricao: 'Quando você sai, o ritmo comercial para junto.',
    },
  ],
  cta: 'Solicitar diagnóstico',
}

export const COMO_FUNCIONA = {
  eyebrow: 'COMO FUNCIONA',
  title: {
    before: 'Do formulário ao diagnóstico, ',
    em: 'em quatro passos.',
  },
  cards: [
    {
      numero: '01',
      titulo: 'Solicitação',
      descricao: 'Você preenche o formulário com os dados da sua operação.',
    },
    {
      numero: '02',
      titulo: 'Avaliação',
      descricao: 'Analisamos as informações à luz do mercado premium.',
    },
    { numero: '03', titulo: 'Conversa', descricao: 'Encontro de 60 minutos com você.' },
    {
      numero: '04',
      titulo: 'Diagnóstico em mãos',
      descricao: 'Você sai com o primeiro ajuste a fazer.',
    },
  ],
  cta: 'Solicitar diagnóstico',
}

export const RESULTADOS = {
  eyebrow: 'RESULTADOS DO DIAGNÓSTICO',
  title: {
    before: 'Você sai da conversa sabendo ',
    em: 'três coisas que hoje não sabe.',
  },
  complemento:
    'Um caminho claro: onde a venda se perde, quem conduz cada oportunidade e o que ajustar primeiro.',
  cards: [
    { titulo: 'Onde a venda se perde', descricao: 'O ponto exato em que a oportunidade esfria.' },
    {
      titulo: 'Quem conduz cada oportunidade',
      descricao: 'Quem puxa o cliente até a decisão — e quando.',
    },
    {
      titulo: 'O que ajustar primeiro',
      descricao: 'A prioridade que muda o índice de fechamento.',
    },
    {
      titulo: 'Uma leitura de fora',
      descricao: 'O olhar de quem conduz vendas premium há 27 anos.',
    },
  ],
  cta: 'Solicitar diagnóstico',
}

export const CONDUCAO = {
  eyebrow: 'CONDUÇÃO INEVITÁVEL',
  title: {
    before: 'Cada oportunidade sai do "vou pensar" para o ',
    em: '"fechado".',
  },
  texto:
    'Primeiro, mapeamos o que você faz por instinto e que conquista o cliente. Depois, sua equipe aprende a conduzir o cliente até a decisão.',
  cards: [
    {
      numero: '01',
      titulo: 'Extração',
      descricao: 'Mapeamos o que você faz por instinto e que conquista o cliente.',
    },
    {
      numero: '02',
      titulo: 'Condução',
      descricao: 'Sua equipe aprende a conduzir o cliente até a decisão.',
    },
    {
      numero: '03',
      titulo: 'Prova semanal',
      descricao: 'A condução é cobrada e medida toda semana.',
    },
  ],
  cta: 'Solicitar diagnóstico',
}

export const FUTURO = {
  eyebrow: '2027 ESTÁ CHEGANDO',
  texto: {
    before: 'O mercado premium está mais sofisticado. ',
    em: 'Quem estruturar a venda agora sai na frente.',
  },
  complemento:
    'O cliente exigente compara mais e decide com mais critério. Para a empresa que sustenta o processo sem depender de uma pessoa, isso é a melhor notícia do ano.',
  cta: 'Solicitar diagnóstico',
}

export const QUEM_CONDUZ = {
  eyebrow: 'QUEM CONDUZ',
  title: {
    before: 'Ricardo Cardenuto não ensina o que leu. ',
    em: 'Ensina o que pratica.',
  },
  intro:
    'Começou aos 14 anos como office boy. Aos 18 já era gerente residente de hotel, responsável por pessoas e por decisões que o hóspede percebia.',
  linhas: [
    'Experiência internacional no Japão e na Austrália, com atuação em hotelaria de alto padrão, desenvolvimento comercial e vivência em ambientes multiculturais.',
    'Implantação de 42 concessionárias em território nacional.',
    'Quase 12 anos no Grupo Euro Motors até a direção geral.',
    'Seleção nacional da BMW para assumir a Euro Motors Jundiaí.',
    'Diretor de marcas do Grupo PG Prime e fundador da Dealer Evolution.',
  ],
  photoCaption1: 'Ricardo Cardenuto',
  photoCaption2: 'Fundador da Dealer Evolution',
  cta: 'Solicitar diagnóstico',
}

export const FAQ = {
  eyebrow: 'FAQ',
  title: {
    before: 'Antes de solicitar, o que você ',
    em: 'precisa saber.',
  },
  perguntas: [
    'Como funciona o diagnóstico?',
    'Quanto tempo preciso reservar?',
    'Minha equipe já sabe vender. Isso muda o diagnóstico?',
    'Já temos processos. Faz sentido?',
    'Preencher o formulário garante a conversa?',
    'Posso participar com meu sócio ou líder comercial?',
    'Meus dados ficam seguros?',
  ],
  respostas: [
    'Uma análise estratégica baseada no Método 5D, que identifica gargalos, oportunidades e caminhos para acelerar a performance e a rentabilidade do seu negócio.',
    'Aproximadamente 60 minutos para uma conversa estratégica e personalizada sobre sua operação.',
    'Saber vender é diferente de operar em alta performance. Avaliamos como transformar potencial comercial em resultados consistentes, previsíveis e rentáveis.',
    'Sim. Mais importante do que possuir processos é garantir que sejam executados com excelência e gerem os resultados esperados.',
    'Não. Cada solicitação será analisada para identificar o alinhamento entre os desafios da empresa e a metodologia Dealer Evolution®.',
    'Sim. Inclusive, recomendamos a participação dos principais tomadores de decisão da empresa.',
    'A confidencialidade é um princípio da Dealer Evolution®. Suas informações serão tratadas conforme nossa Política de Privacidade e a LGPD.',
  ],
}

export const FORM = {
  eyebrow: 'SOLICITAR DIAGNÓSTICO',
  title: {
    before: 'Quantas vendas a sua empresa perde por ficar no ',
    em: 'quase',
    after: ' todos os meses?',
  },
  subtitle:
    'Em 60 minutos, olhamos o seu negócio de perto e você sai com o primeiro ajuste a fazer.',
  placeholderSelect: 'Selecione',
  etapa: 'ETAPA {n} DE {total}',
  continuar: 'Continuar',
  enviar: 'Solicitar diagnóstico',
  camposEtapa1: [
    {
      id: 'posicao',
      pergunta: 'Qual é a sua posição na empresa?',
      opcoes: ['Dono / Sócio', 'CEO', 'Diretor comercial', 'Gerente comercial', 'Outro'],
    },
    {
      id: 'segmento',
      pergunta: 'Segmento da empresa?',
      opcoes: ['Automotivo premium', 'Automotivo multibrand', 'Luxo', 'Imobiliário', 'Outro'],
    },
    {
      id: 'faturamento',
      pergunta: 'Faturamento médio mensal',
      opcoes: [
        'Até R$ 300 mil',
        'De R$ 300 mil a R$ 1 milhão',
        'De R$ 1 a 5 milhões',
        'Acima de R$ 5 milhões',
      ],
    },
    {
      id: 'vendedores',
      pergunta: 'Quantas pessoas vendem na sua empresa?',
      opcoes: ['1 a 5', '6 a 15', '16 a 30', 'Mais de 30'],
    },
  ],
  // ETAPAS 3–4: infraestrutura pronta, perguntas PENDENTES de definição do proprietário.
  // ETAPA 2: dados de contato do visitante (nome, e-mail, telefone).
  contatoEtapa2: {
    perguntaNome: 'Qual é o seu nome?',
    perguntaEmail: 'Qual é o seu e-mail?',
    perguntaTelefone: 'Qual é o seu telefone com DDD?',
    placeholderNome: 'Seu nome completo',
    placeholderEmail: 'voce@empresa.com.br',
    placeholderTelefone: '(11) 98765-4321',
    erroNome: 'Informe seu nome.',
    erroEmail: 'Informe um e-mail válido.',
    erroTelefone: 'Informe um telefone com DDD, ex. (11) 98765-4321.',
  },
  etapasPendentes: 2,
}

export const FOOTER = {
  esquerda: 'Dealer Evolution · Alta Performance Comercial no Mercado Premium · © 2026',
  direitaTermos: 'Termos de Uso',
  direitaPrivacidade: 'Política de Privacidade',
}

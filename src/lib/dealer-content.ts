/**
 * Conteúdo estático da página Dealer Evolution — reflete fielmente a prancha
 * de referência e o conteúdo oficial de dealerevolution.com.br.
 */

export const BRAND = {
  name: 'Dealer Evolution',
  tagline: 'Mentoria Empresarial',
  email: 'contato@dealerevolution.com.br',
  phone: '+55 (11) 91799-3646',
  whatsapp: 'https://wa.me/5511917993646',
  site: 'https://www.dealerevolution.com.br',
}

export const HERO = {
  badge: 'Ampliando Resultados',
  title: 'Evolua seu negócio para o próximo nível.',
  subtitle:
    'Mentoria empresarial estratégica guiada por especialistas para ampliar seus resultados, otimizar processos e consolidar sua presença no mercado.',
  image: 'https://img.usecurling.com/p/1600/900?q=racing%20car%20speed%20night&color=black',
}

export const STATS = [
  { value: 27, suffix: '', label: 'anos de experiência em gestão' },
  { value: 20, suffix: '', label: 'anos no mercado automotivo premium' },
  { value: 25, suffix: '+', label: 'anos de vivência executiva' },
  { value: 40, suffix: '+', label: 'prêmios de performance em diversas marcas' },
]

export const PILARES_INTRO =
  'A Dealer Evolution oferece programas de mentoria desenvolvidos para transformar líderes, fortalecer empresas e acelerar resultados. Cada programa combina experiência executiva, metodologia prática e acompanhamento estratégico, proporcionando soluções aplicáveis à realidade de cada negócio.'

export type Pilar = {
  number: string
  kicker: string
  title: string
  quote?: string
  description: string
  tags: string[]
  image: string
}

export const PILARES: Pilar[] = [
  {
    number: '01',
    kicker: 'SPRINT PERFORMANCE',
    title: 'Programa Intensivo de Performance Comercial',
    quote: '"60 dias para acelerar a performance comercial e os resultados da sua empresa."',
    description:
      'O Sprint Performance™ é um programa intensivo de aceleração comercial desenvolvido para empresários, gestores e líderes que desejam aumentar a performance de vendas, fortalecer a gestão comercial e desenvolver uma cultura de execução orientada por resultados. Durante 60 dias, o participante percorre uma jornada estruturada baseada na metodologia Dealer Evolution®, combinando diagnóstico estratégico, implementação prática e acompanhamento da evolução.',
    tags: [],
    image: 'https://img.usecurling.com/p/1200/700?q=sprint%20athlete%20training%20track',
  },
  {
    number: '02',
    kicker: 'DEALER EVOLUTION BUSINESS',
    title: 'Mentoria Executiva Multissetorial',
    description:
      'Mentoria executiva voltada para empresas de diversos segmentos, com foco na evolução da gestão, fortalecimento da liderança e crescimento sustentável. O programa atua em áreas estratégicas como gestão comercial, planejamento, processos, indicadores, desenvolvimento de equipes e performance organizacional, sempre alinhado aos desafios e objetivos de cada empresa.',
    tags: ['Gestão Comercial', 'Planejamento & Processos', 'Indicadores & Equipes'],
    image: 'https://img.usecurling.com/p/1200/700?q=executive%20business%20meeting%20office',
  },
  {
    number: '03',
    kicker: 'DEALER EVOLUTION AUTOMOTIVE',
    title: 'Excelência Automotiva Premium',
    description:
      'Programa especializado para concessionárias, grupos automotivos e profissionais do setor. Desenvolvido com base em uma sólida experiência executiva no mercado automotivo premium, o programa aborda liderança, gestão comercial, vendas, pós-vendas, CRM, experiência do cliente, indicadores de desempenho, rentabilidade e excelência operacional, proporcionando uma visão estratégica para elevar a performance das operações e gerar resultados consistentes.',
    tags: ['Liderança Automotiva', 'Vendas & Pós-vendas', 'CRM & Rentabilidade'],
    image: 'https://img.usecurling.com/p/1200/700?q=luxury%20car%20dealership%20showroom',
  },
]

export const METODOLOGIA = {
  title: 'Nossa Metodologia',
  subtitle:
    'Um processo estruturado e validado por centenas de empresas para garantir que a estratégia se transforme em execução e resultados reais.',
  image: 'https://img.usecurling.com/p/1200/800?q=business%20strategy%20teamwork%20meeting',
  steps: [
    {
      number: '01',
      title: 'Diagnóstico',
      description:
        'Entendemos sua realidade, seus desafios e oportunidades com análise estratégica e criteriosa.',
    },
    {
      number: '02',
      title: 'Definir',
      description:
        'Transformamos o diagnóstico em objetivos claros, indicadores e um plano estratégico alinhado ao negócio.',
    },
    {
      number: '03',
      title: 'Desenvolver',
      description:
        'Construímos processos, ferramentas e competências para acelerar a execução e fortalecer a sua equipe.',
    },
    {
      number: '04',
      title: 'Executar',
      description:
        'Implementamos com responsabilidades claras, disciplina e foco total na execução dos Sprints.',
    },
    {
      number: '05',
      title: 'Direcionar',
      description:
        'Acompanhamos indicadores, analisamos resultados e ajustamos rotas para manter a empresa em evolução constante.',
    },
  ],
}

export const FUNDADOR = {
  name: 'Ricardo Cardenuto',
  role: 'Empresário, Mentor Executivo e Sócio-Diretor da BMW Euro Motors Jundiaí',
  photo: 'https://img.usecurling.com/ppl/large?gender=male&seed=7',
  bio: [
    'Com mais de 27 anos de experiência em gestão, liderança e desenvolvimento de negócios, Ricardo Cardenuto construiu uma carreira marcada pela transformação de empresas, desenvolvimento de equipes de alta performance e criação de modelos de gestão orientados a resultados.',
    'Sua trajetória reúne experiências em hotelaria, empreendedorismo, expansão de operações e varejo automotivo premium, além de três anos de atuação profissional no Japão e na Austrália, vivência que ampliou sua visão sobre excelência em serviços, cultura organizacional e gestão internacional.',
    'Ao longo da carreira, liderou a implantação de dezenas de concessionárias, conquistou importantes reconhecimentos nacionais e internacionais e desenvolveu projetos inovadores em experiência do cliente. Atualmente é sócio-diretor da BMW Euro Motors Jundiaí e fundador da Dealer Evolution, onde aplica uma metodologia própria construída ao longo de décadas de experiência prática.',
    'Mais do que ensinar gestão, Ricardo compartilha conhecimento adquirido liderando pessoas, estruturando empresas e transformando desafios em resultados concretos.',
  ],
  expertise: [
    'Vendas',
    'Pós-vendas',
    'Marketing',
    'CRM',
    'Customer Experience',
    'Planejamento Estratégico',
    'Cultura Organizacional',
    'Desenvolvimento Organizacional',
  ],
  commitment:
    'Na Dealer Evolution acreditamos que conhecimento só gera valor quando é colocado em prática. Nosso compromisso é caminhar ao seu lado, simplificar a complexidade da gestão e construir, junto com você e sua equipe, o caminho para o próximo nível de excelência.',
}

export const CTA_FINAL = {
  title: 'Pronto para a Evolução?',
  subtitle:
    'Dê o primeiro passo para transformar os resultados da sua empresa. Agende uma consultoria estratégica gratuita de 30 minutos com nossos especialistas.',
  contactTitle: 'Fale Conosco Diretamente',
}

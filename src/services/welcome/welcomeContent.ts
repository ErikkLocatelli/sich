import { CalendarCheck, ChartColumn, Clock, Gift, House, MapPin, Package, ShieldCheck, Sparkles, Star, Users, Wallet, type LucideIcon } from "lucide-react"

import { WELCOME_IMAGES } from "./welcomeImages"

export const WELCOME_ROUTES = {
  login: "/login",
  register: "/register",
} as const

export const WELCOME_TOP_ID = "topo"

export const WELCOME_SECTIONS = {
  howItWorks: "como-funciona",
  professionals: "profissionais",
  services: "servicos",
  whyUs: "por-que-sich",
  partners: "para-profissionais",
} as const

export const WELCOME_NAV = [
  { label: "Como funciona", href: `#${WELCOME_SECTIONS.howItWorks}` },
  { label: "Profissionais", href: `#${WELCOME_SECTIONS.professionals}` },
  { label: "Serviços", href: `#${WELCOME_SECTIONS.services}` },
  { label: "Para profissionais", href: `#${WELCOME_SECTIONS.partners}` },
] as const

export const WELCOME_COPY = {
  login: "Entrar",
  register: "Criar conta",
  heroTitleStart: "A profissional de beleza ideal",
  heroTitleEnd: "na palma da sua mão",
  heroDescription: "Encontre, agende e receba manicures e pedicures verificadas no conforto da sua casa.",
  heroPrimary: "Criar conta grátis",
  heroSecondary: "Já tenho conta",
  howTitleStart: "Encontre sua profissional",
  howTitleAccent: "com a SICH",
  howDescription: "Compare serviços, preços e avaliações e agende em poucos toques. Sem trocas de mensagens, sem incerteza: tudo na palma da sua mão.",
  professionalsTitle: "Profissionais incríveis esperando por você",
  professionalsAction: "Agendar um horário",
  professionalsEmpty: "Nenhuma profissional nesta categoria por enquanto.",
  servicesEyebrow: "Serviços",
  servicesTitle: "Cuidado completo para mãos e pés",
  servicesDescription: "Do essencial ao nail art autoral, escolha o serviço e a SICH encontra quem atende perto de você.",
  whyTitleStart: "Por que escolher",
  whyTitleAccent: "a SICH",
  whyDescription: "Reunimos as melhores profissionais da sua região, com agenda em tempo real, pagamento simples e benefícios que voltam para você a cada visita.",
  partnersEyebrow: "Para profissionais",
  partnersTitle: "Sua agenda, seu catálogo e seu financeiro em um só lugar",
  partnersDescription: "Atenda mais clientes sem planilhas. A SICH organiza horários, serviços e faturamento para você focar no que faz de melhor.",
  partnersAction: "Quero ser parceira",
  partnersToastTitle: "Novo agendamento",
  partnersToastDetail: "Manicure + gel · Hoje, 14:00",
  ctaTitle: "Entre no mundo da beleza",
  ctaDescription: "Crie sua conta em menos de um minuto e descubra profissionais que vão até você. Seu próximo horário está a poucos toques.",
  supportTitle: "Dúvidas ou sugestões?",
  supportDescription: "Nossa equipe está pronta para ajudar você a aproveitar a SICH ao máximo.",
  footerTagline: "Beleza a domicílio sob medida",
} as const

export type WelcomeFeature = { title: string; description: string; icon: LucideIcon }

export const WELCOME_HIGHLIGHT = {
  title: "Encontre profissionais perto de você",
  description: "Filtros por serviço, avaliação e distância mostram em segundos quem atende no seu bairro.",
  image: WELCOME_IMAGES.highlightNails,
  icon: MapPin,
}

export const WELCOME_HOW_FEATURES: WelcomeFeature[] = [
  { title: "Avaliações reais", description: "Veja a nota e a experiência de outras clientes antes de escolher.", icon: Star },
  { title: "Agenda em tempo real", description: "Horários livres atualizados na hora, sem precisar perguntar.", icon: CalendarCheck },
  { title: "Atendimento em casa", description: "A profissional vai até você, no horário combinado.", icon: House },
  { title: "Cashback e fidelidade", description: "Parte de cada atendimento volta como saldo, e visitas acumulam benefícios.", icon: Wallet },
]

export const WELCOME_CATEGORIES = ["Manicure", "Pedicure", "Gel", "Nail art", "Alongamento"] as const
export type WelcomeCategory = (typeof WELCOME_CATEGORIES)[number]

export type WelcomeProfessional = {
  name: string
  specialty: WelcomeCategory
  rating: string
  image: string
}

// Illustrative profiles (stock photography), not real partners
export const WELCOME_PROFESSIONALS: WelcomeProfessional[] = [
  { name: "Camila", specialty: "Manicure", rating: "5.0", image: WELCOME_IMAGES.proCamila },
  { name: "Juliana", specialty: "Nail art", rating: "4.9", image: WELCOME_IMAGES.proJuliana },
  { name: "Bianca", specialty: "Gel", rating: "5.0", image: WELCOME_IMAGES.proBianca },
  { name: "Larissa", specialty: "Alongamento", rating: "4.9", image: WELCOME_IMAGES.proLarissa },
  { name: "Marina", specialty: "Pedicure", rating: "5.0", image: WELCOME_IMAGES.proMarina },
  { name: "Helena", specialty: "Manicure", rating: "4.8", image: WELCOME_IMAGES.proHelena },
]

export const ALL_CATEGORIES = "Todas"
export type WelcomeCategoryFilter = WelcomeCategory | typeof ALL_CATEGORIES

export const filterProfessionals = (professionals: WelcomeProfessional[], category: WelcomeCategoryFilter) =>
  category === ALL_CATEGORIES ? professionals : professionals.filter((professional) => professional.specialty === category)

export type WelcomeService = { title: string; description: string; image: string }

export const WELCOME_SERVICES: WelcomeService[] = [
  { title: "Manicure", description: "Cutilagem, lixamento e esmaltação clássica.", image: WELCOME_IMAGES.serviceManicure },
  { title: "Pedicure", description: "Cuidado completo para os pés, com hidratação.", image: WELCOME_IMAGES.servicePedicure },
  { title: "Esmaltação em gel", description: "Brilho e duração de até três semanas.", image: WELCOME_IMAGES.serviceGel },
  { title: "Nail art", description: "Desenhos autorais, francesinhas e efeitos.", image: WELCOME_IMAGES.serviceNailArt },
  { title: "Alongamento", description: "Fibra, gel ou acrigel no formato que você quiser.", image: WELCOME_IMAGES.serviceExtension },
  { title: "Spa das mãos", description: "Esfoliação, máscara e massagem relaxante.", image: WELCOME_IMAGES.serviceSpa },
]

export const WELCOME_MARQUEE = ["Manicure", "Pedicure", "Esmaltação em gel", "Nail art", "Alongamento", "Spa das mãos", "Francesinha", "Blindagem"] as const

export const WELCOME_WHY_IMAGES = [WELCOME_IMAGES.workDetail, WELCOME_IMAGES.heroPortrait, WELCOME_IMAGES.darkNails] as const

export const WELCOME_WHY_FEATURES: WelcomeFeature[] = [
  { title: "Conveniência", description: "Busca, agenda e pagamento reunidos em um só lugar, com reserva em poucos toques.", icon: Sparkles },
  { title: "Confiança", description: "Trabalhamos apenas com profissionais verificadas para garantir serviços de qualidade.", icon: ShieldCheck },
  { title: "Comunidade", description: "Avaliações de clientes reais ajudam você a escolher e valorizam quem faz bem feito.", icon: Users },
]

export const WELCOME_PARTNER_FEATURES: WelcomeFeature[] = [
  { title: "Agenda inteligente", description: "Defina sua disponibilidade e receba agendamentos sem conflito.", icon: Clock },
  { title: "Catálogo de serviços", description: "Publique serviços com fotos, preços e duração.", icon: Package },
  { title: "Financeiro claro", description: "Acompanhe faturamento e repasses mês a mês.", icon: ChartColumn },
]

export const WELCOME_TRUST = [
  { label: "Profissionais verificadas", icon: ShieldCheck },
  { label: "Cashback em todo atendimento", icon: Gift },
] as const

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Mail, Code2, Monitor, Zap, Layout, Search, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
// --- Variáveis de Animação ---
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const projectsData = [
  {
    id: 'lp-mognet',
    title: {
      'pt-BR': 'Landing page Mognet',
      en: 'Mognet landing page',
    },
    description: {
      'pt-BR': 'Landing page para apresentar planos e serviços de uma empresa de internet.',
      en: 'Landing page to present the plans and services of an internet company.',
    },
    techs: ['Vite','React', 'JS', 'Tailwind CSS', 'Scroll Reveal'],
    image: '/lp-mog.png',
    demoUrl: 'https://single-pages-mognet.wekutu.easypanel.host/',
    repoUrl: '#',
  },
  {
    id: 'lp-JE',
    title: {
      'pt-BR': 'Landing page JE Internet',
      en: 'JE Internet landing page',
    },
    description: {
      'pt-BR': 'Landing page para apresentar planos e serviços de uma empresa de internet.',
      en: 'Landing page to present the plans and services of an internet company.',
    },
    techs: ['Vite','React', 'JS', 'Tailwind CSS', 'Scroll Reveal'],
    image: '/lp-je.png',
    demoUrl: 'https://site.jeinternet.com.br/',
    repoUrl: '#',
  },
  {
    id: 'cardapio-online',
    title: {
      'pt-BR': 'Cardápio Online',
      en: 'Online Menu',
    },
    description: {
      'pt-BR': 'Sistema web responsivo desenvolvido para restaurantes, lanchonetes e deliverys que desejam digitalizar seu cardápio e aumentar as vendas.',
      en: 'Responsive web system developed for restaurants, snack bars, and delivery services that want to digitize their menu and increase sales.',
    },
    techs: ['HTML', 'CSS', 'JS'],
    image: '/cadarpio.png',
    demoUrl: 'https://cardapio-online-coral.vercel.app/',
    repoUrl: '#',
  },
  {
    id: 'lp-pediatra',
    title: {
      'pt-BR': 'landing page pediatra',
      en: 'landing page pediatrician',
    },
    description: {
      'pt-BR': 'Projeto de desenvolvimento de Landing Page profissional para clínica de pediatria, com foco em transmitir confiança, acolhimento e cuidado humanizado.',
      en: 'Project to develop a professional landing page for a pediatric clinic, focusing on conveying trust, warmth, and humanized care.',
    },
    techs: ['Vite','React', 'JS', 'Tailwind CSS', 'Frame-Motion'],
    image: "/lp-pediatra.png",
    demoUrl: 'https://lp-pediatra.vercel.app/',
    repoUrl: '#',
  },
];

const translations = {
  'pt-BR': {
    nav: { projects: 'Projetos', contact: 'Contato', lang: 'Idioma' },
    hero: {
      badge: 'Disponível para novos projetos',
      role: 'Developer',
      description: 'Transformando designs complexos em experiências digitais interativas, performáticas e altamente sofisticadas.',
      ctaProjects: 'Ver Projetos',
      ctaContact: 'Entrar em Contato',
    },
    about: {
      titlePrefix: 'Engenharia de',
      titleHighlight: 'Interfaces',
      description: 'Prazer me chamo Mizael, um Especialista em criar arquiteturas Front-End escaláveis. Meu foco é entregar código limpo, performance excepcional e uma interface de usuário que converte. Trabalho com as tecnologias mais modernas do mercado para garantir que seu produto não apenas funcione, mas se destaque.',
      expLabel: 'Anos de Experiência',
      projectsLabel: 'Projetos Entregues',
      skills: [
        { title: 'React & TypeScript', desc: 'Aplicações robustas' },
        { title: 'Tailwind CSS', desc: 'UI moderna e ágil' },
        { title: 'Framer Motion', desc: 'Animações fluidas' },
        { title: 'SEO & Performance', desc: 'Otimização extrema' },
      ],
    },
    projects: {
      titlePrefix: 'Projetos em',
      titleHighlight: 'Destaque',
      subtitle: 'Uma seleção dos meus trabalhos mais recentes e impactantes.',
      viewProject: 'Ver Projeto',
    },
    differentials: {
      badge: 'Diferenciais',
      titlePrefix: 'Entrega com foco em',
      titleHighlight: 'qualidade real',
      subtitle: 'Mais do que interface bonita: eu construo experiências estáveis, rápidas e prontas para escalar.',
      items: [
        { title: 'Código Limpo', desc: 'Arquitetura organizada, componentes reutilizáveis e manutenção simplificada.' },
        { title: 'Pixel Perfect', desc: 'Fidelidade ao design com refinamento visual em desktop e mobile.' },
        { title: 'Performance', desc: 'Carregamento rápido, animações leves e foco em experiência fluida.' },
        { title: 'Acessibilidade', desc: 'Boas práticas de semântica, contraste e navegação para todos.' },
      ],
    },
    contact: {
      titlePrefix: 'Vamos',
      titleHighlight: 'Conversar?',
      subtitle: 'Preencha os dados abaixo e me envie uma mensagem direta no WhatsApp.',
      nameLabel: 'Seu Nome',
      namePlaceholder: 'Como devo te chamar?',
      subjectLabel: 'Assunto',
      subjectPlaceholder: 'Do que se trata?',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Conte-me um pouco mais sobre o seu projeto...',
      submit: 'Enviar',
      whatsappTemplateTitle: 'Novo Contato do Portfólio',
      whatsappName: 'Nome',
      whatsappSubject: 'Assunto',
      whatsappMessage: 'Mensagem',
    },
    footer: { rights: 'Todos os direitos reservados.' },
  },
  en: {
    nav: { projects: 'Projects', contact: 'Contact', lang: 'Language' },
    hero: {
      badge: 'Available for new projects',
      role: 'Developer',
      description: 'Transforming complex designs into interactive, high-performance and refined digital experiences.',
      ctaProjects: 'View Projects',
      ctaContact: 'Get in Touch',
    },
    about: {
      titlePrefix: 'Interface',
      titleHighlight: 'Engineering',
      description: 'Nice to meet you, my name is Mizael, a specialist in creating scalable front-end architectures. My focus is on delivering clean code, exceptional performance, and a user interface that converts. I work with the most modern technologies on the market to ensure that your product not only works, but stands out.',
      expLabel: 'Years of Experience',
      projectsLabel: 'Projects Delivered',
      skills: [
        { title: 'React & TypeScript', desc: 'Robust applications' },
        { title: 'Tailwind CSS', desc: 'Modern, agile UI' },
        { title: 'Framer Motion', desc: 'Fluid animations' },
        { title: 'SEO & Performance', desc: 'Extreme optimization' },
      ],
    },
    projects: {
      titlePrefix: 'Featured',
      titleHighlight: 'Projects',
      subtitle: 'A selection of my most recent and impactful work.',
      viewProject: 'View Project',
    },
    differentials: {
      badge: 'Differentials',
      titlePrefix: 'Delivery focused on',
      titleHighlight: 'real quality',
      subtitle: 'More than a beautiful interface: I build stable, fast experiences ready to scale.',
      items: [
        { title: 'Clean Code', desc: 'Organized architecture, reusable components, and simpler maintenance.' },
        { title: 'Pixel Perfect', desc: 'Design fidelity with visual refinement across desktop and mobile.' },
        { title: 'Performance', desc: 'Fast loading, lightweight animations, and smooth experience focus.' },
        { title: 'Accessibility', desc: 'Best practices for semantics, contrast, and navigation for everyone.' },
      ],
    },
    contact: {
      titlePrefix: "Let's",
      titleHighlight: 'Talk?',
      subtitle: 'Fill in the details below and send me a direct message on WhatsApp.',
      nameLabel: 'Your Name',
      namePlaceholder: 'How should I call you?',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'What is it about?',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me a little more about your project...',
      submit: 'Send',
      whatsappTemplateTitle: 'New Portfolio Contact',
      whatsappName: 'Name',
      whatsappSubject: 'Subject',
      whatsappMessage: 'Message',
    },
    footer: { rights: 'All rights reserved.' },
  },
};

export default function App() {
  // --- Estados ---
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('pt-BR');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // --- Scroll Progress ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const t = translations[language];
  const differentialIcons = [Code2, Layout, Zap, CheckCircle];

  const applyTheme = (darkMode) => {
    setIsDark(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  };

  // --- Efeitos ---
  useEffect(() => {
    // Define o tema inicial com base na preferência do sistema ou localStorage
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    const themeSource = localStorage.getItem('theme-source');
    
    // Segue o sistema por padrão. Só usa tema salvo quando a troca foi manual.
    if (themeSource === 'manual' && savedTheme === 'dark') {
      applyTheme(true);
    } else if (themeSource === 'manual' && savedTheme === 'light') {
      applyTheme(false);
    } else {
      applyTheme(mediaQuery.matches);
    }

    const handleSystemThemeChange = (event) => {
      // Só segue o sistema quando o usuário não escolheu manualmente um tema
      if (localStorage.getItem('theme-source') !== 'manual') {
        applyTheme(event.matches);
      }
    };

    // Listener para o cursor customizado
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'pt-BR' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Alterna entre Dark e Light Mode
  const toggleTheme = () => {
    if (!isDark) {
      applyTheme(true);
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('theme-source', 'manual');
    } else {
      applyTheme(false);
      localStorage.setItem('theme', 'light');
      localStorage.setItem('theme-source', 'manual');
    }
  };

  const toggleLanguage = () => {
    const nextLanguage = language === 'pt-BR' ? 'en' : 'pt-BR';
    setLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  };

  // Funções para o cursor customizado
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    // O contêiner principal define o fundo e a cor do texto para toda a aplicação
    <div className="relative min-h-screen bg-gray-50 text-gray-900 dark:bg-dark dark:text-gray-100 transition-colors duration-500">
      
      {/* --- Cursor Customizado (Visível apenas em Desktop) --- */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 hidden lg:block"
        animate={{
          x: mousePos.x - 12,
          y: mousePos.y - 12,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.95 : 0.8,
          boxShadow: isHovering ? '0 0 18px rgba(227,25,20,0.28)' : '0 0 0 rgba(0,0,0,0)'
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          backgroundImage: 'linear-gradient(90deg, #ff2216 0%, #E31914 45%, #FF7A1A 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 52%, black 58%, black 72%, transparent 78%)',
          maskImage: 'radial-gradient(circle, transparent 52%, black 58%, black 72%, transparent 78%)',
        }}
      />

      {/* --- Scroll Progress Bar --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-gold z-50 origin-left"
        style={{ scaleX }}
      />

      {/* --- Navbar Fixa com Glassmorphism --- */}
      <nav className="fixed w-full z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tighter flex items-end gap-0.5">
            <img src="/m-degrade.png" alt="" width={60} height={60} />
            <span className='text-[21px]'>izaelDev</span>
          </span>
          <div className="flex items-center gap-6">
            <a href="#projetos" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hidden md:block hover:text-gold transition-colors font-medium">{t.nav.projects}</a>
            <a href="#contato" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hidden md:block hover:text-gold transition-colors font-medium">{t.nav.contact}</a>
            <button
              type="button"
              onClick={toggleLanguage}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/15 text-xs font-semibold tracking-wide hover:border-gold hover:text-gold transition-colors"
              aria-label={t.nav.lang}
              title={t.nav.lang}
            >
              {language === 'pt-BR' ? 'PT' : 'EN'}
            </button>
            <button 
              onClick={toggleTheme} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- 1. Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-gold/[0.08] via-transparent to-transparent dark:from-gold/[0.12]" />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(227,25,20,0.20),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,122,26,0.14),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(255,74,18,0.10),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(227,25,20,0.24),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,122,26,0.12),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(255,74,18,0.14),transparent_45%)]" />
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.45] dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(227,25,20,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(227,25,20,0.12) 1px, transparent 1px),
              linear-gradient(to right, rgba(255,122,26,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,122,26,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px, 48px 48px, 96px 96px, 96px 96px',
            backgroundPosition: '0 0, 0 0, 24px 24px, 24px 24px',
            maskImage: 'radial-gradient(circle at center, black 35%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 95%)',
          }}
        />
        <div
          className="absolute inset-0 z-0 pointer-events-none hidden dark:block opacity-[0.60]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,122,26,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,122,26,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px, 52px 52px',
            backgroundPosition: '0 0, 0 0',
            maskImage: 'radial-gradient(circle at center, black 42%, transparent 96%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 42%, transparent 96%)',
          }}
        />
        {/* Background Particles Sutil (CSS Grid) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#FF4A12 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-2 rounded-full border badge-gradient-gold text-sm font-medium tracking-wide mb-6 inline-block">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
              Front-End <br />
              <span className="text-gradient-gold">{t.hero.role}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              {t.hero.description}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projetos" 
                 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                 className="px-8 py-4 bg-gradient-gold text-black dark:text-white font-semibold rounded-lg hover:brightness-110 hover:shadow-[0_0_22px_rgba(227,25,20,0.42)] transition-all duration-300 flex items-center justify-center gap-2">
                {t.hero.ctaProjects} <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contato"
                 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                 className="px-8 py-4 border border-gray-300 dark:border-gray-700 font-semibold rounded-lg hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center">
                {t.hero.ctaContact}
              </a>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              {[Github, Linkedin, Mail].map((Icon, idx) => (
                <a key={idx} href="#" 
                   onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                   className="p-3 bg-gray-100 dark:bg-white/5 rounded-full hover-gradient-gold transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2 & 3. Sobre Mim e Habilidades --- */}
      <section id="sobre" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.titlePrefix} <span className="text-gradient-gold">{t.about.titleHighlight}</span></h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
                {t.about.description}
              </p>
              <div className="flex gap-4">
                <div className="p-4 border border-gray-200 dark:border-graphite rounded-lg flex-1 bg-white/50 dark:bg-white/5">
                  <h4 className="text-3xl font-bold text-gradient-gold mb-1">+2</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.about.expLabel}</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-graphite rounded-lg flex-1 bg-white/50 dark:bg-white/5">
                  <h4 className="text-3xl font-bold text-gradient-gold mb-1">+30</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.about.projectsLabel}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2, ...t.about.skills[0] },
                { icon: Layout, ...t.about.skills[1] },
                { icon: Zap, ...t.about.skills[2] },
                { icon: Search, ...t.about.skills[3] },
              ].map((skill, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-graphite rounded-xl card-hover transition-all">
                  <skill.icon className="w-8 h-8 text-gold mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{skill.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. Projetos Principais --- */}
      <section id="projetos" className="py-24 relative">
        {/* Background sutil para diferenciar a seção */}
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-white/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.projects.titlePrefix} <span className="text-gradient-gold">{t.projects.titleHighlight}</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.projects.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <motion.div 
                key={project.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-graphite transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_14px_34px_rgba(255,74,18,0.08)]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent z-20">
                  <div className="h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 ease-out bg-gradient-gold" />
                </div>
                {/* Mockup de Imagem do Projeto */}
                <div className="h-64 bg-gray-200 dark:bg-white/10 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title[language]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                    <Monitor className="w-16 h-16 opacity-20" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gradient-gold">{project.title[language]}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{project.description[language]}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techs.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 badge-gradient-gold hover-gradient-gold text-black dark:text-white rounded-lg font-medium transition-colors border">
                      {t.projects.viewProject}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Diferenciais --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/40 to-gray-100/70 dark:via-white/[0.015] dark:to-white/[0.03] -z-20" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-gold/10 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-orange-500/10 dark:bg-red-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border badge-gradient-gold text-sm font-medium mb-5">
              <CheckCircle className="w-4 h-4" />
              {t.differentials.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t.differentials.titlePrefix} <span className="text-gradient-gold">{t.differentials.titleHighlight}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              {t.differentials.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {t.differentials.items.map((diff, idx) => {
              const DiffIcon = differentialIcons[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  className="group relative text-left p-6 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm hover:border-gold/40 hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-300 shadow-sm hover:shadow-[0_10px_35px_rgba(255,74,18,0.10)]"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-colors" />

                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                      <DiffIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] text-gray-400 dark:text-gray-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {diff.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 7. Contato via WhatsApp --- */}
      <section id="contato" className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.contact.titlePrefix} <span className="text-gradient-gold">{t.contact.titleHighlight}</span></h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-graphite shadow-xl transition-all"
          >
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const numeroWhatsApp = "5599984735063";
                const nome = e.target.nome.value;
                const assunto = e.target.assunto.value;
                const mensagem = e.target.mensagem.value;
                const textoFormatado = `*${t.contact.whatsappTemplateTitle}*%0A%0A*${t.contact.whatsappName}:* ${nome}%0A*${t.contact.whatsappSubject}:* ${assunto}%0A*${t.contact.whatsappMessage}:* ${mensagem}`;
                window.open(`https://wa.me/${numeroWhatsApp}?text=${textoFormatado}`, '_blank');
              }}
              className="flex flex-col gap-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.contact.nameLabel}</label>
                  <input type="text" id="nome" name="nome" required placeholder={t.contact.namePlaceholder} 
                         className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/10 border border-transparent focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all dark:text-white placeholder-gray-400" />
                </div>
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.contact.subjectLabel}</label>
                  <input type="text" id="assunto" name="assunto" required placeholder={t.contact.subjectPlaceholder} 
                         className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/10 border border-transparent focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all dark:text-white placeholder-gray-400" />
                </div>
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.contact.messageLabel}</label>
                <textarea id="mensagem" name="mensagem" required rows="4" placeholder={t.contact.messagePlaceholder} 
                          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/10 border border-transparent focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all dark:text-white resize-none placeholder-gray-400"></textarea>
              </div>
              <button type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                      className="mt-2 flex items-center justify-center gap-2 w-full md:w-auto md:self-end px-8 py-4 bg-gradient-gold text-black dark:text-white font-bold rounded-lg hover:brightness-110 hover:shadow-[0_0_22px_rgba(227,25,20,0.42)] transition-all duration-300">
                {t.contact.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* --- 8. Rodapé --- */}
      <footer className="bg-white/50 dark:bg-white/5 py-8 border-t border-gray-200 dark:border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} MizaelDev {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}



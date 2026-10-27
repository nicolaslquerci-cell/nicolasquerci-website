"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const navLinks = ["Projetos", "Sobre mim", "Serviços", "Contato"];
const languageLinks = ["Português", "Inglês", "Espanhol"];
const contactLinks = [
  { label: "Email", value: "contato@nicolasquerci.com", href: "mailto:contato@nicolasquerci.com" },
  { label: "LinkedIn", value: "linkedin.com/in/nicolasquerci", href: "https://www.linkedin.com/in/nicolasquerci" },
  { label: "Behance", value: "behance.net/nicolasquerci", href: "https://www.behance.net/nicolasquerci" },
  { label: "GitHub", value: "github.com/nicolasquerci", href: "https://github.com/nicolasquerci" },
];
const somaProjectImages = [
  { src: "/soma-project.png", alt: "Tela do aplicativo Soma em um iPhone" },
  { src: "/soma-carousel-1.png", alt: "Tela de conversa do assistente Soma no iPhone" },
  { src: "/soma-carousel-2.png", alt: "Tela inicial do aplicativo Soma no iPhone" },
  { src: "/soma-carousel-3.png", alt: "Tela de notificações do aplicativo Soma no iPhone" },
];
const skillToolGroups = [
  {
    title: "UX Research & Teste de Usabilidade",
    items: [
      { label: "Maze", icon: "maze" },
      { label: "Usertesting", icon: "usertesting" },
    ],
  },
  {
    title: "Design & Prototipação",
    items: [
      { label: "Figma", icon: "figma" },
      { label: "FigJam", icon: "figma" },
      { label: "Photoshop", icon: "photoshop" },
      { label: "Illustrator", icon: "illustrator" },
    ],
  },
  {
    title: "Systems & Handoff",
    items: [
      { label: "Design Systems", icon: "systems" },
      { label: "Componentes", icon: "components" },
      { label: "Variáveis", icon: "variables" },
      { label: "Design Tokens", icon: "tokens" },
      { label: "Dev Handoff", icon: "handoff" },
    ],
  },
  {
    title: "Dados & Otimização",
    items: [
      { label: "Google Analytics", icon: "analytics" },
      { label: "Métricas de Produto", icon: "metrics" },
      { label: "Análise de Comportamento", icon: "behavior" },
    ],
  },
  {
    title: "Front-end & Tecnologia",
    items: [
      { label: "HTML", icon: "html" },
      { label: "CSS", icon: "css" },
      { label: "JavaScript", icon: "javascript" },
      { label: "React", icon: "react" },
      { label: "Git/Github", icon: "git" },
    ],
  },
];
const skillToolIcons: Record<string, string> = {
  analytics: "/tool-icon-analytics.png",
  behavior: "/tool-icon-analisedecomportamento.svg",
  components: "/tool-icon-componentes.svg",
  css: "/tool-icon-css.svg",
  git: "/tool-icon-github.svg",
  handoff: "/tool-icon-devhandoff.svg",
  html: "/tool-icon-html.svg",
  javascript: "/tool-icon-javascript.svg",
  metrics: "/tool-icon-metricasdeproduto.svg",
  react: "/tool-icon-react.svg",
  systems: "/tool-icon-designsystems.svg",
  tokens: "/tool-icon-designtokens.svg",
  variables: "/tool-icon-variaveis.svg",
  figma: "/tool-icon-figma.png",
  illustrator: "/tool-icon-illustrator.png",
  maze: "/tool-icon-maze.png",
  usertesting: "/tool-icon-usertesting.png",
};

export default function Home() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [activeAboutView, setActiveAboutView] = useState("sobre-mim");
  const [isAboutViewChanging, setIsAboutViewChanging] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeProjectImageIndex, setActiveProjectImageIndex] = useState(0);

  useEffect(() => {
    const updateHeader = () => {
      const projectsSection = document.getElementById("projetos");
      const aboutSection = document.getElementById("sobre-mim");
      const contactSection = document.getElementById("contato");

      if (!projectsSection) {
        return;
      }

      const projectsTop = projectsSection.getBoundingClientRect().top;
      const aboutTop = aboutSection?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const contactTop = contactSection?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;

      setIsHeaderExpanded(projectsTop <= 120);

      if (contactTop <= 160) {
        setActiveSection("contato");
        return;
      }

      if (aboutTop <= 160) {
        setActiveSection("sobre-mim");
        return;
      }

      if (projectsTop <= 160) {
        setActiveSection("projetos");
        return;
      }

      setActiveSection("");
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    if (somaProjectImages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveProjectImageIndex((currentIndex) =>
        (currentIndex + 1) % somaProjectImages.length,
      );
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  const changeAboutView = (nextView: string) => {
    setIsAboutMenuOpen(false);

    if (nextView === activeAboutView) {
      return;
    }

    setIsAboutViewChanging(true);

    window.setTimeout(() => {
      setActiveAboutView(nextView);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsAboutViewChanging(false));
      });
    }, 180);
  };

  const aboutViewClassName = isAboutViewChanging ? " is-switching" : "";
  const aboutPillLabel =
    activeAboutView === "filosofia"
      ? "Filosofia"
      : activeAboutView === "skills"
        ? "Skills & Ferramentas"
        : "Sobre mim";
  const aboutPillClassName =
    activeAboutView === "filosofia"
      ? " is-compact"
      : activeAboutView === "skills"
        ? " is-wide"
        : "";

  return (
    <main className="site-shell">
      <div className="site-grid">
        <header
          className={`site-header${isHeaderExpanded ? " site-header-expanded" : ""}`}
          aria-label="Cabeçalho principal"
        >
          <a href="#top" className="site-logo" aria-label="Página inicial">
            <img src="/logo.png" alt="" width="30" height="30" />
          </a>

          <nav className="site-nav" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const linkId = link.toLowerCase().replaceAll(" ", "-");
              const isActive = linkId === activeSection;

              return (
                <a
                  key={link}
                  href={`#${linkId}`}
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "is-active" : undefined}
                >
                  {link}
                </a>
              );
            })}
          </nav>

          <div className="language-selector">
            <button
              className="language-button"
              type="button"
              aria-label="Selecionar idioma"
              aria-expanded={isLanguageMenuOpen}
              aria-controls="language-dropdown"
              onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
            >
              <span aria-hidden="true" className="language-icon" />
            </button>

            {isLanguageMenuOpen ? (
              <div id="language-dropdown" className="language-dropdown">
                {languageLinks.map((language) => (
                  <a
                    key={language}
                    href={`#${language.toLowerCase()}`}
                    aria-current={language === "Português" ? "true" : undefined}
                  >
                    {language}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <section className="hero-copy" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-title">
            <span>Transformando</span>
            <span>complexidade em</span>
            <span className="hero-title-script">experiências simples.</span>
          </h1>
          <p className="hero-description">
            Transformo problemas complexos em experiências digitais intuitivas,
            combinando pesquisa, estratégia de produto e design de interfaces
            para criar soluções que façam sentido para usuários e negócios.
          </p>
          <div className="hero-actions">
            <a href="#projetos" className="hero-button">
              <span>Projetos</span>
            </a>
            <a href="#contato" className="hero-button">
              <span>Contato</span>
            </a>
          </div>
        </section>

        <div className="hero-photo" aria-label="Espaço reservado para foto">
          <div className="hero-photo-inner">
            <img src="/hero-photo.png" alt="Nicolas Querci" />
          </div>
        </div>
      
        <div className="skill-pills" aria-label="Especialidades">
          <span className="skill-pill skill-pill-frontend"><span className="skill-pill-badge" aria-hidden="true" /><span>Frontend Developer</span></span>
          <span className="skill-pill skill-pill-figma"><span className="skill-pill-badge" aria-hidden="true" /><span>Figma &amp; Prototyping</span></span>
          <span className="skill-pill skill-pill-ux"><span className="skill-pill-badge" aria-hidden="true" /><span>UX Research &amp; UI Design</span></span>
          <span className="skill-pill skill-pill-experience"><span className="skill-pill-badge" aria-hidden="true" /><span>+4 anos de experiência</span></span>
        </div>
      </div>
      <section id="projetos" className="projects-section" aria-label="Projetos">
        <div className="projects-grid">
          <div className="project-header-row">
            <img className="project-logo" src="/logo-soma.png" alt="Soma" />
            <div className="project-nav-buttons" aria-label="Navegação entre projetos">
              <button className="project-nav-button project-nav-button-left" type="button" aria-label="Projeto anterior">
                <span aria-hidden="true" className="project-nav-icon" />
              </button>
              <button className="project-nav-button project-nav-button-right" type="button" aria-label="Próximo projeto">
                <span aria-hidden="true" className="project-nav-icon" />
              </button>
            </div>
          </div>

          <div className="project-copy">
            <h2 className="project-title">
              <span>Experiência financeira</span>
              <span>compartilhada <span className="project-title-script">entre casais.</span></span>
            </h2>
            <p className="project-description">
              Soma é uma experiência de finanças compartilhadas criada para tornar a gestão financeira entre casais mais simples e transparente. A partir de UX Research e análise do comportamento dos usuários, transformei dores relacionadas à divisão de despesas, organização e planejamento em jornadas, fluxos e soluções de produto focadas em colaboração e facilidade de uso.
            </p>
            <div className="project-tags" aria-label="Ferramentas e métodos usados no projeto">
              <span className="project-tag">UserTesting</span>
              <span className="project-tag">FigJam</span>
              <span className="project-tag">Figma</span>
              <span className="project-tag">Mobile</span>
            </div>
          </div>

          <div className="project-deck" aria-label="Preview visual do projeto Soma">
            <div className="project-card-back project-card-back-3" />
            <div className="project-card-back project-card-back-2" />
            <div className="project-card-back project-card-back-1" />
            <div className="project-card-front">
              <div className="project-image-shell">
                {somaProjectImages.map((image, imageIndex) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={imageIndex === activeProjectImageIndex ? "is-active" : undefined}
                    aria-hidden={imageIndex === activeProjectImageIndex ? undefined : "true"}
                  />
                ))}
                <div className="project-progress" aria-hidden="true">
                  {somaProjectImages.map((image, imageIndex) => (
                    <span
                      key={image.src}
                      className={imageIndex === activeProjectImageIndex ? "is-active" : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a href="#" className="project-details-button">
            <span>Detalhes</span>
          </a>
        </div>
      </section>
      <section id="sobre-mim" className="about-section" aria-label="Sobre mim">
        <div className="about-grid">
          <div className="about-section-actions" aria-label="Controles da seção Sobre mim">
              <span className={`about-section-pill${aboutPillClassName}`}>
                {aboutPillLabel}
              </span>
            <div className="about-menu-wrapper">
              <button
                className="about-menu-button"
                type="button"
                aria-label="Abrir navegação Sobre mim"
                aria-expanded={isAboutMenuOpen}
                aria-controls="about-menu-dropdown"
                onClick={() => setIsAboutMenuOpen((isOpen) => !isOpen)}
              >
                <span aria-hidden="true" />
              </button>

              {isAboutMenuOpen ? (
                <div id="about-menu-dropdown" className="about-menu-dropdown">
                  <button
                    type="button"
                    aria-current={activeAboutView === "sobre-mim" ? "true" : undefined}
                    onClick={() => changeAboutView("sobre-mim")}
                  >
                    Sobre mim
                  </button>
                <button
                  type="button"
                  aria-current={activeAboutView === "filosofia" ? "true" : undefined}
                  onClick={() => changeAboutView("filosofia")}
                >
                  Filosofia
                </button>
                <button
                  type="button"
                  aria-current={activeAboutView === "skills" ? "true" : undefined}
                  onClick={() => changeAboutView("skills")}
                >
                  Skills & Ferramentas
                </button>
                  <button type="button">Trajetória</button>
                </div>
              ) : null}
            </div>
          </div>

          {activeAboutView === "sobre-mim" ? (
            <>
              <div className={`about-image-card${aboutViewClassName}`}>
                <div className="about-image-inner">
                  <img src="/about-architecture.png" alt="Mesa de arquitetura com laptop exibindo interface digital" />
                </div>
              </div>

              <div className={`about-content${aboutViewClassName}`}>
                <h2 className="about-heading">
                  <span>Mudei o meio,</span>
                  <span>não o <em>propósito.</em></span>
                </h2>
                <div className="about-body">
                  <p>
                    Minha trajetória no design começou na arquitetura, onde surgiu meu interesse por entender
                    como decisões de projeto influenciam comportamentos, percepções e o bem-estar das pessoas.
                  </p>
                  <p>
                    Com o tempo, esse interesse ultrapassou os espaços físicos e encontrou no digital uma nova
                    forma de expressão. Foi ainda na arquitetura que comecei a me aproximar de interfaces e a
                    perceber no UX algo que já orientava meu trabalho: entender pessoas antes de projetar soluções.
                  </p>
                  <p>
                    Hoje, em UX/UI e Product Design, essa experiência se traduz na forma como abordo problemas:
                    buscando compreender o contexto, questionar necessidades, estruturar informações e equilibrar
                    experiência do usuário, objetivos de negócio e viabilidade técnica.
                  </p>
                  <p>
                    A arquitetura mudou para produtos digitais. A intenção continua a mesma: projetar experiências
                    que façam sentido para quem as utiliza.
                  </p>
                </div>
                <img className="about-underline" src="/about-underline.svg" alt="" aria-hidden="true" />
              </div>
            </>
          ) : (
            <>
              <div className={`${activeAboutView === "skills" ? "skills-content" : "philosophy-content"}${aboutViewClassName}`}>
                <h2 className={activeAboutView === "skills" ? "skills-heading" : "philosophy-heading"}>
                  <span>{activeAboutView === "skills" ? "Ferramentas mudam," : "Menos certezas,"}</span>
                  <span>
                    {activeAboutView === "skills" ? (
                      <>
                        O processo <em>evolui.</em>
                      </>
                    ) : (
                      <>
                        melhores <em>perguntas.</em>
                      </>
                    )}
                  </span>
                </h2>
                <div className={activeAboutView === "skills" ? "skills-body" : "philosophy-body"}>
                  {activeAboutView === "skills" ? (
                    <>
                      <p>
                        Uso ferramentas como parte do processo, não como o processo em si.
                        Do Figma à análise de métricas, escolho recursos de acordo com o
                        problema, o estágio do produto e o tipo de evidência necessária para
                        avançar.
                      </p>
                      <p>
                        No Figma, estruturo desde explorações e protótipos até interfaces
                        prontas para desenvolvimento. Trabalho com Design Systems,
                        componentes, variantes e Design Tokens para construir experiências
                        consistentes, escaláveis e mais próximas da implementação.
                      </p>
                      <p>
                        Com testes de usabilidade, valido hipóteses e identifico pontos de
                        fricção antes e depois de uma solução chegar ao produto. Já dados e
                        métricas ajudam a entender o impacto das decisões, acompanhar
                        comportamentos e encontrar novas oportunidades de melhoria.
                      </p>
                      <p>
                        Mais do que dominar ferramentas, busco conectá-las em um processo
                        contínuo de entender, construir, validar e aprender.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Para mim, Product Design começa antes da interface. Começa entendendo o contexto,
                        questionando premissas e criando clareza sobre qual problema estamos tentando resolver e para quem.
                      </p>
                      <p>
                        Meu processo combina pesquisa, dados e proximidade com usuários, negócio e tecnologia.
                        Não trato métodos como uma sequência rígida de etapas: escolho ferramentas e nível de
                        profundidade de acordo com o problema, as evidências disponíveis e o momento do produto.
                        O processo deve servir à decisão, não o contrário.
                      </p>
                      <p>
                        Nas dinâmicas, enxergo meu papel menos como alguém que conduz uma reunião e mais como um
                        facilitador de decisões. Estruturo discussões, torno diferentes perspectivas visíveis,
                        separo opiniões de evidências e ajudo o time a transformar incertezas em hipóteses que
                        possam ser priorizadas, prototipadas e validadas.
                      </p>
                      <p>
                        No fim, meu objetivo não é defender uma interface. É construir, junto ao time, a melhor
                        decisão possível naquele contexto equilibrando necessidades reais dos usuários, objetivos
                        do negócio e viabilidade técnica.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className={`${activeAboutView === "skills" ? "skills-toolkit" : "philosophy-image-card"}${aboutViewClassName}`}>
                {activeAboutView === "skills" ? (
                  <div className="skills-tool-groups" aria-label="Skills e ferramentas utilizadas">
                    {skillToolGroups.map((group) => (
                      <section className="skills-tool-group" key={group.title}>
                        <h3>{group.title}</h3>
                        <div className="skills-tool-list">
                          {group.items.map((item) => (
                            <span
                              className={`skills-tool-chip${item.icon ? ` has-icon icon-${item.icon}` : ""}`}
                              key={item.label}
                            >
                              {item.icon ? (
                                <span className="skills-tool-icon" aria-hidden="true">
                                  {skillToolIcons[item.icon]?.endsWith(".svg") ? (
                                      <span
                                        className="skills-tool-svg"
                                      style={{ "--tool-icon": `url(${skillToolIcons[item.icon]})` } as CSSProperties}
                                      />
                                  ) : skillToolIcons[item.icon] ? (
                                    <img src={skillToolIcons[item.icon]} alt="" />
                                  ) : null}
                                </span>
                              ) : null}
                              {item.label}
                            </span>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="philosophy-image-inner">
                    <img src="/philosophy-workshop.png" alt="Monitor com quadro de descoberta de produto no Figma" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <section id="contato" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-grid">
          <div className="contact-eyebrow">Contato</div>

          <div className="contact-copy">
            <h2 id="contact-title" className="contact-title">
              <span>Vamos transformar uma ideia</span>
              <span>
                em uma <em>experiência simples?</em>
              </span>
            </h2>
            <p className="contact-description">
              Se você tem um produto para estruturar, uma interface para evoluir ou uma jornada que precisa fazer
              mais sentido para pessoas e negócios, vamos conversar.
            </p>
            <a className="contact-primary-button" href="mailto:contato@nicolasquerci.com">
              <span>Enviar email</span>
            </a>
          </div>

          <div className="contact-panel" aria-label="Canais de contato">
            <div className="contact-panel-header">
              <span>Disponível para</span>
              <strong>Projetos, produtos digitais e colaborações.</strong>
            </div>

            <div className="contact-link-list">
              {contactLinks.map((link) => (
                <a
                  className="contact-link"
                  href={link.href}
                  key={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-footnote">
            <span>UX/UI Design</span>
            <span>Product Design</span>
            <span>Design Systems</span>
            <span>Front-end</span>
          </div>
        </div>
      </section>
    </main>
  );
}






























import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Code2,
  Lightbulb,
  MapPin,
  Mic2,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

// As imagens devem ficar dentro de: public/images/
const palestrantes = [
  {
    iniciais: "BG",
    nome: "Bill Gates",
    genero: "homem",
    cargo: "Cofundador da Microsoft e empresário de tecnologia.",
    tema: "Tecnologia que conecta: transformando conhecimento em inovação e oportunidades para o futuro",
    classe: "avatar-lilac",
    foto: "/images/bill-gates.webp",
  },
  {
    iniciais: "EV",
    nome: "Erika Vitória",
    cargo: "Engenheira de Software",
    tema: "Não basta desenvolver tecnologias: precisamos criar soluções que conectem pessoas, transformem realidades e abram portas para o futuro.",
    classe: "avatar-blue",
    foto: "/images/Erika.png",
    genero: "mulher",
  },
  {
    iniciais: "BA",
    nome: "Filipe Deschamps",
    genero: "homem",
    cargo: "Desenvolvedor de Software",
    tema: "O futuro não é apenas escrito em código, é construído por quem tem coragem de inovar",
    classe: "avatar-orange",
    foto: "/images/Filipe.png",
  },
];

function AvatarPalestrante({ palestrante }) {
  const { iniciais, nome, classe, foto } = palestrante;

  return (
    <div className={`speaker-avatar ${classe}`}>
      {foto ? (
        <img
          src={foto}
          alt={`Foto de ${nome}`}
          loading="lazy"
          onError={(event) => {
            // Mostra as iniciais se a imagem não for encontrada.
            event.currentTarget.style.display = "none";
            event.currentTarget.parentElement.classList.add("image-not-found");
            event.currentTarget.parentElement.setAttribute(
              "aria-label",
              iniciais
            );
          }}
        />
      ) : (
        iniciais
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> ENCONTRO DE TECNOLOGIA 2026
            </div>

            <h1>
              O futuro não se espera.
              <br />
              <span className="gradient-text">A gente constrói.</span>
            </h1>

            <p className="hero-description">
              Um dia para aprender, compartilhar ideias e conectar pessoas que
              estão transformando o mundo por meio da tecnologia.
            </p>

            <div className="hero-actions">
              <Link to="/inscricao" className="button button-primary">
                Quero participar <ArrowUpRight size={18} />
              </Link>
              <a href="#sobre" className="button button-ghost">
                Conheça o evento <ArrowDown size={17} />
              </a>
            </div>

            <div className="hero-proof">
              <div className="proof-avatars">
                <span>MC</span>
                <span>RL</span>
                <span>BA</span>
                <span>+</span>
              </div>
              <div>
                <strong>Conhecimento que conecta</strong>
                <small>Ideias novas começam em boas conversas.</small>
              </div>
            </div>
          </div>

          <div
            className="hero-art"
            aria-label="Ilustração abstrata de tecnologia"
          >
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-glow" />
            <div className="art-core">
              <Code2 size={76} strokeWidth={1.25} />
            </div>

            <div className="floating-card card-ai">
              <span className="float-icon purple">
                <Sparkles size={18} />
              </span>
              <span>
                <strong>Inteligência artificial</strong>
                <small>Novas possibilidades</small>
              </span>
            </div>

            <div className="floating-card card-code">
              <span className="float-icon cyan">
                <Code2 size={18} />
              </span>
              <span>
                <strong>Código e criatividade</strong>
                <small>Ideias em movimento</small>
              </span>
            </div>

            <div className="floating-card card-people">
              <span className="float-icon orange">
                <Users size={18} />
              </span>
              <span>
                <strong>Pessoas conectadas</strong>
                <small>Comunidade em primeiro lugar</small>
              </span>
            </div>

            <div className="art-spark spark-a">✳</div>
            <div className="art-spark spark-b">✦</div>
          </div>
        </div>

        <div className="container event-strip">
          <div>
            <span className="strip-icon">
              <CalendarDays size={20} />
            </span>
            <span>
              <small>QUANDO</small>
              <strong>21 de novembro de 2026</strong>
            </span>
          </div>

          <div>
            <span className="strip-icon">
              <MapPin size={20} />
            </span>
            <span>
              <small>ONDE</small>
              <strong>Centro de Eventos TechConnect</strong>
            </span>
          </div>

          <div>
            <span className="strip-icon">
              <Users size={20} />
            </span>
            <span>
              <small>PARA QUEM</small>
              <strong>Estudantes e profissionais</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="section section-light" id="sobre">
        <div className="container about-layout">
          <div className="section-heading">
            <span className="section-kicker">SOBRE O EVENTO</span>
            <h2>
              Mais do que tecnologia.
              <br />
              <span className="text-muted">Um espaço para evoluir.</span>
            </h2>
          </div>

          <div className="about-copy">
            <p>
              O TechConnect é um evento criado para aproximar pessoas
              apaixonadas por tecnologia. Uma experiência com conversas
              inspiradoras, aprendizados práticos e oportunidades para trocar
              conhecimentos.
            </p>

            <div className="feature-grid">
              <article className="feature-card">
                <span className="feature-icon violet">
                  <Lightbulb size={21} />
                </span>
                <h3>Novas ideias</h3>
                <p>
                  Descubra tendências e formas diferentes de resolver
                  problemas.
                </p>
              </article>

              <article className="feature-card">
                <span className="feature-icon blue">
                  <Zap size={21} />
                </span>
                <h3>Aprendizado real</h3>
                <p>
                  Leve inspirações e conhecimentos para seus próximos projetos.
                </p>
              </article>

              <article className="feature-card">
                <span className="feature-icon orange">
                  <Users size={21} />
                </span>
                <h3>Conexões</h3>
                <p>
                  Conheça pessoas que também querem construir o futuro.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section speakers-section">
        <div className="container">
          <div className="section-topline">
            <div>
              <span className="section-kicker">QUEM VAI COMPARTILHAR</span>
              <h2>Ideias de quem faz.</h2>
            </div>
            <span className="speaker-note">
              <Mic2 size={17} /> 3 palestras inspiradoras
            </span>
          </div>

          <div className="speaker-grid">
            {palestrantes.map((palestrante) => (
              <article
                className={`speaker-card ${palestrante.genero}`}
                key={palestrante.nome}
              >
                <AvatarPalestrante palestrante={palestrante} />
                <span className="speaker-label">PALESTRANTE</span>
                <h3>{palestrante.nome}</h3>
                <p className="speaker-role">{palestrante.cargo}</p>
                <div className="speaker-divider" />
                <p className="speaker-topic">“{palestrante.tema}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-panel">
          <div className="cta-decoration">
            <Sparkles size={50} />
          </div>
          <div>
            <span className="section-kicker">
              SUA PRÓXIMA IDEIA COMEÇA AQUI
            </span>
            <h2>Faça parte dessa conversa.</h2>
            <p>
              Reserve seu lugar e venha descobrir o que podemos construir
              juntos.
            </p>
          </div>
          <Link to="/inscricao" className="button button-light">
            Inscreva-se agora <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

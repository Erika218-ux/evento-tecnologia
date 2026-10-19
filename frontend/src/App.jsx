import { NavLink, Route, Routes, Link } from "react-router-dom";
import { ArrowUpRight, Code2, Menu, Sparkles, Users, CalendarDays, MapPin, Ticket, Zap } from "lucide-react";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Inscricao from "./pages/Inscricao.jsx";
import Inscritos from "./pages/Inscritos.jsx";
// O useState permite controlar se o menu do celular está aberto ou fechado.
function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="TechConnect início">
            <span className="brand-mark"><Code2 size={21} /></span>
            <span>tech<span className="brand-accent">connect</span><small>TECNOLOGIA • IDEIAS • FUTURO</small></span>
          </Link>
          <button className="mobile-menu" onClick={() => setMenuAberto(!menuAberto)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>            
          <nav className={menuAberto ? "nav-links nav-open" : "nav-links"}>
            <NavLink to="/" end onClick={() => setMenuAberto(false)}>O evento</NavLink>
            <NavLink to="/inscricao" onClick={() => setMenuAberto(false)}>Inscrição</NavLink>
            <NavLink to="/inscritos" onClick={() => setMenuAberto(false)}>Inscritos</NavLink>
            <Link className="nav-cta" to="/inscricao" onClick={() => setMenuAberto(false)}>Garanta sua vaga <ArrowUpRight size={16} /></Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/inscritos" element={<Inscritos />} />
          <Route path="*" element={<div className="container not-found"><h1>Página não encontrada</h1><Link className="button button-primary" to="/">Voltar ao início</Link></div>} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark"><Code2 size={19} /></span>
            <span>tech<span className="brand-accent">connect</span><small>TECNOLOGIA • IDEIAS • FUTURO</small></span>
          </Link>
          <p>Feito para conectar pessoas e novas possibilidades.</p>
          <span className="footer-year">© 2026 TechConnect</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return <Layout />;
}

// Importa as páginas que serão exibidas conforme a rota escolhida 

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, RefreshCw, Search, Trash2, Users, UserRound, Mail, Phone, Ticket, AlertCircle, UserPlus } from "lucide-react";
import { excluirInscricao, listarInscricoes } from "../api.js";

export default function Inscritos() {
  const [inscricoes, setInscricoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [removendo, setRemovendo] = useState(null);
  const [aviso, setAviso] = useState("");

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      setInscricoes(await listarInscricoes());
    } catch (error) {
      setErro(error.message || "Não foi possível carregar as inscrições. Verifique se o backend está funcionando.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  async function remover(inscricao) {
    const confirmar = window.confirm(`Deseja realmente excluir a inscrição de ${inscricao.nome}?`);
    if (!confirmar) return;
    setRemovendo(inscricao.id);
    setErro("");
    setAviso("");
    try {
      const resultado = await excluirInscricao(inscricao.id);
      setInscricoes((atuais) => atuais.filter((item) => item.id !== inscricao.id));
      setAviso(resultado.mensagem || "Inscrição excluída.");
    } catch (error) {
      setErro(error.message || "Não foi possível excluir a inscrição.");
    } finally {
      setRemovendo(null);
    }
  }

  const filtradas = inscricoes.filter((i) =>
    `${i.nome} ${i.email} ${i.tipoIngresso}`.toLowerCase().includes(busca.toLowerCase())
  );

  return <section className="attendees-page">
    <div className="container">
      <div className="attendees-heading">
        <div><Link to="/" className="back-link">← Voltar ao evento</Link><span className="section-kicker">PAINEL DA ORGANIZAÇÃO</span><h1>Lista de <span className="gradient-text">inscritos.</span></h1><p>Acompanhe as pessoas que garantiram sua participação no TechConnect.</p></div>
        <Link to="/inscricao" className="button button-primary"><UserPlus size={17} /> Nova inscrição <ArrowUpRight size={17} /></Link>
      </div>

      <div className="attendee-stats">
        <div className="stat-card"><span className="stat-icon"><Users size={21} /></span><div><small>TOTAL DE INSCRITOS</small><strong>{inscricoes.length}</strong></div></div>
        <div className="stat-card"><span className="stat-icon stat-icon-purple"><UserRound size={21} /></span><div><small>ESTUDANTES</small><strong>{inscricoes.filter(i => i.tipoIngresso === "estudante").length}</strong></div></div>
        <div className="stat-card"><span className="stat-icon stat-icon-orange"><Ticket size={21} /></span><div><small>PROFISSIONAIS</small><strong>{inscricoes.filter(i => i.tipoIngresso === "profissional").length}</strong></div></div>
      </div>

      <div className="attendees-panel">
        <div className="panel-toolbar"><div><h2>Participantes</h2><p>Inscrições registradas no sistema</p></div><div className="toolbar-actions"><div className="search-box"><Search size={17} /><input aria-label="Buscar participante" placeholder="Buscar por nome ou e-mail" value={busca} onChange={e => setBusca(e.target.value)} /></div><button className="icon-button" onClick={carregar} title="Atualizar lista" aria-label="Atualizar lista"><RefreshCw size={17} /></button></div></div>

        {erro && <div className="alert alert-error"><AlertCircle size={18} />{erro}</div>}
        {aviso && <div className="alert alert-success">{aviso}</div>}

        {carregando ? <div className="empty-state"><span className="loader" /><p>Carregando inscrições...</p></div> :
          filtradas.length === 0 ? <div className="empty-state"><span className="empty-icon"><Users size={28} /></span><h3>{busca ? "Nenhum resultado encontrado" : "Ainda não há inscritos"}</h3><p>{busca ? "Tente buscar por outro nome ou e-mail." : "Quando alguém se inscrever, os dados aparecerão aqui."}</p>{!busca && <Link to="/inscricao" className="button button-primary">Fazer primeira inscrição <ArrowUpRight size={17} /></Link>}</div> :
          <div className="table-scroll"><table className="attendees-table"><thead><tr><th>PARTICIPANTE</th><th>CONTATO</th><th>TIPO DE INGRESSO</th><th className="action-column">AÇÃO</th></tr></thead><tbody>{filtradas.map((i) => <tr key={i.id}><td><div className="person-cell"><span className="person-avatar">{i.nome.trim().split(/\s+/).slice(0,2).map(n => n[0]).join("").toUpperCase()}</span><span><strong>{i.nome}</strong><small>Inscrição #{i.id}</small></span></div></td><td><div className="contact-cell"><span><Mail size={14} /> {i.email}</span><span><Phone size={14} /> {i.telefone || "Não informado"}</span></div></td><td><span className={i.tipoIngresso === "estudante" ? "ticket-badge student-badge" : "ticket-badge pro-badge"}>{i.tipoIngresso === "estudante" ? "Estudante" : "Profissional"}</span></td><td className="action-column"><button className="delete-button" onClick={() => remover(i)} disabled={removendo === i.id} aria-label={`Excluir inscrição de ${i.nome}`} title="Excluir inscrição"><Trash2 size={16} /> <span>{removendo === i.id ? "Excluindo..." : "Excluir"}</span></button></td></tr>)}</tbody></table></div>
        }
        <div className="panel-footer"><span>Exibindo {filtradas.length} de {inscricoes.length} inscrição(ões)</span><span><span className="status-dot" /> Dados atualizados ao carregar</span></div>
      </div>
      <p className="admin-note">Esta tela não exige login, conforme o enunciado do projeto.</p>
    </div>
  </section>;
}

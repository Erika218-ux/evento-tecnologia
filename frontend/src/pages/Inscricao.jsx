import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Code2, Mail, UserRound, Phone, Ticket, ShieldCheck } from "lucide-react";
import { criarInscricao } from "../api.js";

export default function Inscricao() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", tipoIngresso: "estudante" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);

  function atualizar(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErro("");
    setSucesso("");
  }

  async function enviar(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");
    setEnviando(true);
    try {
      const resultado = await criarInscricao(form);
      setSucesso(resultado.mensagem || "Inscrição realizada com sucesso!");
      setForm({ nome: "", email: "", telefone: "", tipoIngresso: "estudante" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErro(error.message || "Não foi possível fazer a inscrição. Confira se o servidor está ligado.");
    } finally {
      setEnviando(false);
    }
  }

  return <section className="form-page">
    <div className="container form-layout">
      <div className="form-intro">
        <Link to="/" className="back-link"><ArrowLeft size={16} /> Voltar ao evento</Link>
        <span className="section-kicker">GARANTA SUA VAGA</span>
        <h1>Uma nova ideia pode começar <span className="gradient-text">com você.</span></h1>
        <p>Preencha seus dados para participar do TechConnect. É rápido e gratuito.</p>
        <div className="form-benefits">
          <div><span><CheckCircle2 size={18} /></span><p><strong>Conteúdo inspirador</strong><small>Aprenda com pessoas da área.</small></p></div>
          <div><span><CheckCircle2 size={18} /></span><p><strong>Novas conexões</strong><small>Conheça uma comunidade de tecnologia.</small></p></div>
          <div><span><CheckCircle2 size={18} /></span><p><strong>Inscrição simples</strong><small>Preencha os campos e pronto.</small></p></div>
        </div>
        <div className="form-date"><span><Ticket size={19} /></span><div><small>DATA DO EVENTO</small><strong>21 de novembro de 2026</strong></div></div>
      </div>

      <div className="form-card">
        <div className="form-card-heading"><span className="form-card-icon"><Code2 size={22} /></span><div><h2>Inscrição no evento</h2><p>Os campos com * são obrigatórios.</p></div></div>
        {erro && <div className="alert alert-error" role="alert">{erro}</div>}
        {sucesso && <div className="alert alert-success" role="status"><CheckCircle2 size={19} /><div><strong>{sucesso}</strong><p>Seu cadastro foi enviado. Você já pode conferir a lista de inscritos.</p><button className="text-button" onClick={() => navigate("/inscritos")}>Ver inscritos <ArrowRight size={15} /></button></div></div>}
        <form onSubmit={enviar}>
          <label htmlFor="nome">Nome completo <span>*</span></label>
          <div className="input-wrap"><UserRound size={18} /><input id="nome" name="nome" value={form.nome} onChange={atualizar} placeholder="Ex.: Maria Silva" autoComplete="name" required /></div>

          <label htmlFor="email">E-mail <span>*</span></label>
          <div className="input-wrap"><Mail size={18} /><input id="email" name="email" type="email" value={form.email} onChange={atualizar} placeholder="voce@exemplo.com" autoComplete="email" required /></div>

        <label htmlFor="telefone">Telefone <small>(opcional)</small></label>
<div className="input-wrap"><Phone size={18} /><input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={atualizar} placeholder="(11) 99999-9999" autoComplete="tel" /></div>

          <fieldset className="ticket-fieldset"><legend>Tipo de ingresso <span>*</span></legend>
            <div className="ticket-options">
              <label className={form.tipoIngresso === "estudante" ? "ticket-option selected" : "ticket-option"}>
                <input type="radio" name="tipoIngresso" value="estudante" checked={form.tipoIngresso === "estudante"} onChange={atualizar} />
                <span className="ticket-radio" /><span><strong>Estudante</strong><small>Para quem está estudando</small></span>
              </label>
              <label className={form.tipoIngresso === "profissional" ? "ticket-option selected" : "ticket-option"}>
                <input type="radio" name="tipoIngresso" value="profissional" checked={form.tipoIngresso === "profissional"} onChange={atualizar} />
                <span className="ticket-radio" /><span><strong>Profissional</strong><small>Para quem já atua na área</small></span>
              </label>
            </div>
          </fieldset>
          <button type="submit" className="button button-primary submit-button" disabled={enviando}>{enviando ? "Enviando inscrição..." : "Confirmar inscrição"} <ArrowRight size={18} /></button>
          <p className="privacy-note"><ShieldCheck size={15} /> Seus dados serão usados para organizar as inscrições deste evento.</p>
        </form>
      </div>
    </div>
  </section>;
}

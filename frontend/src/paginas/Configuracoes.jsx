import { useState, useEffect } from 'react'
import { Save, Check, TriangleAlert } from 'lucide-react'
import { chamarApi } from '../api.js'
import Avatar from '../componentes/Avatar.jsx'

// Página de configurações: edita nome, bio e foto de perfil.
function Configuracoes() {
  const [foto, setFoto] = useState('sem-foto.svg')
  const [nome, setNome] = useState('')
  const [bio, setBio] = useState('')
  const [usuario, setUsuario] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function carregarPerfil() {
    try {
      const dados = await chamarApi('/perfil')
      setFoto(dados.foto)
      setNome(dados.nome)
      setBio(dados.bio)
      setUsuario(dados.usuario)
    } catch (problema) {
      setErro(problema.message)
    }
  }
  useEffect(() => {
    carregarPerfil()
  }, [])

  async function salvar(evento) {
  evento.preventDefault()
  const formulario = evento.target
  setMensagem('')
  setErro('')
  try {
    // Os campos têm name="nome", name="bio" e name="foto": o FormData leva todos
    const dados = await chamarApi('/perfil', 'PATCH', new FormData(formulario))
    setFoto(dados.foto) // mostra a foto nova, se a pessoa trocou
    formulario.foto.value = '' // limpa o campo da foto: ela já foi enviada
    setMensagem('Perfil atualizado com sucesso!')
  } catch (problema) {
    setErro(problema.message)
  }
}

  return (
    <>
      <h1 className="fs-xl mb-5">Configurações</h1>
      <article className="card">
        <div className="card-body">
          <form className="d-grid gap-5" onSubmit={salvar}>
            <div className="d-flex align-items-center gap-6">
              <Avatar foto={foto} grande />
              <label className="form-field flex-grow-1 min-w-0">
                <span className="form-label">Foto de perfil</span>
                <input className="form-control" type="file" name="foto" accept="image/*" />
              </label>
            </div>

            <label className="form-field">
              <span className="form-label">Nome</span>
              <input
                className="form-control"
                type="text"
                name="nome"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
              />
            </label>

            <label className="form-field">
              <span className="form-label">Bio</span>
              <textarea
                className="form-control"
                name="bio"
                rows="3"
                value={bio}
                onChange={(evento) => setBio(evento.target.value)}
              />
            </label>

           <label className="form-field">
              <span className="form-label">Usuario</span>
              <input
                className="form-control"
                type="text"
                name="usuario"
                value={usuario}
                onChange={(evento) => setUsuario(evento.target.value)}
              />
            </label>

            {erro && (
              <div className="alert theme-danger" role="alert">
                <TriangleAlert size={18} /> {erro}
              </div>
            )}

            {mensagem && (
              <div className="alert theme-success" role="status">
                <Check size={18} /> {mensagem}
              </div>
            )}

            <button className="btn-solid theme-primary" type="submit">
              <Save size={18} /> Salvar
            </button>

          </form>
        </div>
      </article>
    </>
  )
}

export default Configuracoes

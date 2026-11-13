import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './paginas/Login.jsx'
import Feed from './paginas/Feed.jsx'
import Perfil from './paginas/Perfil.jsx'
import Configuracoes from './paginas/Configuracoes.jsx'
import RotaPrivada from './componentes/RotaPrivada.jsx'

// O "mapa" do site: cada endereço (path) mostra uma página diferente
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RotaPrivada />}>
        <Route path="/" element={<Feed />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Route>

      {/* Qualquer outro endereço volta para o feed */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
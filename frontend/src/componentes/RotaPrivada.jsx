import { Navigate, Outlet } from 'react-router-dom'
 
// O "porteiro" do front-end: quem não tem token volta para o login.
// Quem tem, vê o menu e a página que foi pedida (o Outlet é o lugar dela).
function RotaPrivada() {
  const token = localStorage.getItem('token')
 
  if (!token) {
    return <Navigate to="/login" />
  }
 
  return <Outlet />
}

export default RotaPrivada
// Dentro de src/api.js
export const URL_API = 'http://localhost:3000'; // Coloque a porta do seu backend

export function urlFoto(nome) {
  return `${URL_API}/uploads/${nome}`
}

export async function chamarApi(caminho, metodo = 'GET', corpo) {
  let resposta
 
  try {
    resposta = await fetch(URL_API + caminho, {
      method: metodo,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: corpo,
    })
    } catch {
  throw new Error('Não consegui falar com o servidor. Ele está ligado?')
}
 
// Token vencido ou inválido: apaga o token e volta para o login
if (resposta.status === 401) {
  localStorage.removeItem('token')
  window.location.href = '/login'
}

const dados = await resposta.json()
 
  if (!resposta.ok) {
    throw new Error(dados.erro)
  }
 
  return dados
}
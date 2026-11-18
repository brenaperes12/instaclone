import { Images, Trash2 } from 'lucide-react'
import { urlFoto } from '../api.js'

function Galeria({ posts, apagar }) {
  return (
    <>
      {posts.length === 0 ? (
        <article className="card">
          <div className="card-body text-center fg-3">
            <Images size={40} className="align-self-center" />
            <p>Você ainda não publicou nenhuma foto.</p>
          </div>
        </article>
      ) : (
        <div className="d-grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="position-relative">
              <img
                className="w-100 ratio-1x1 object-fit-cover"
                src={urlFoto(post.imagem)}
                alt={post.legenda}
              />
              <button
                type="button"
                onClick={() => apagar(post.id)}
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                title="Apagar foto"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Galeria


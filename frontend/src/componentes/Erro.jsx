import { TriangleAlert } from "lucide-react";

function Erro ({ mensagem}) {
    if (!mensagem) return null

    return (
        <div className="alert theme-danger" role="alert">
            <TriangleAlert size={18} /> {mensagem}
        </div>
    )
}

export default Erro
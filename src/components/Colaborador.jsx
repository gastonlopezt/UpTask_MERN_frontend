import useProyectos from "../hooks/useProyectos"


const Colaborador = ({colaborador}) => {

    const {handleModalEliminarColaborador} = useProyectos()

    const {nombre, email} = colaborador

  return (
    <div className="border-b p-5 flex justify-between">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
            type="button"
            className="bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarColaborador(colaborador)}
        >
            Eliminar
        </button>
      </div>
    </div>
  )
}

export default Colaborador

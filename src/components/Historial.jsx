import { useState } from "react";
import Escudo from "./Escudo";

// Muestra todos los partidos registrados, con filtro por equipo
function Historial({ equipos, partidos, eliminarPartido }) {
  const [filtro, setFiltro] = useState("");

  function buscarEquipo(id) {
    return equipos.find((equipo) => equipo.id === id);
  }

  // Si hay un equipo seleccionado, solo se muestran sus partidos
  const partidosFiltrados = partidos.filter((partido) => {
    if (filtro === "") {
      return true;
    }
    const idFiltro = Number(filtro);
    return partido.localId === idFiltro || partido.visitanteId === idFiltro;
  });

  return (
    <section className="seccion">
      <h2>Historial de resultados</h2>

      <div className="campo filtro">
        <label>Filtrar por equipo</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todos los equipos</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.nombre}
            </option>
          ))}
        </select>
      </div>

      {partidos.length === 0 && (
        <p className="mensaje-vacio">Aún no hay partidos registrados.</p>
      )}

      {partidos.length > 0 && partidosFiltrados.length === 0 && (
        <p className="mensaje-vacio">Este equipo no tiene partidos registrados.</p>
      )}

      <ul className="lista-partidos">
        {partidosFiltrados.map((partido) => {
          const local = buscarEquipo(partido.localId);
          const visitante = buscarEquipo(partido.visitanteId);

          return (
            <li className="partido" key={partido.id}>
              <div className="marcador">
                <div className="equipo-marcador">
                  <Escudo equipo={local} tamano={36} />
                  <span>{local.nombre}</span>
                </div>
                <strong className="goles">
                  {partido.golesLocal} - {partido.golesVisitante}
                </strong>
                <div className="equipo-marcador">
                  <Escudo equipo={visitante} tamano={36} />
                  <span>{visitante.nombre}</span>
                </div>
              </div>
              <button
                className="boton-eliminar"
                onClick={() => eliminarPartido(partido.id)}
              >
                Eliminar
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Historial;

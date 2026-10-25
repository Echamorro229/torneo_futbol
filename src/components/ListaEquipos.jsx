import Escudo from "./Escudo";

// Muestra los equipos del torneo en tarjetas
function ListaEquipos({ equipos }) {
  return (
    <section className="seccion">
      <h2>Equipos</h2>
      <div className="grid-equipos">
        {equipos.map((equipo) => (
          <div className="tarjeta-equipo" key={equipo.id}>
            <Escudo equipo={equipo} tamano={60} />
            <p className="nombre-equipo">{equipo.nombre}</p>
            <span className="id-equipo">ID: {equipo.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListaEquipos;

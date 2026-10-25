import { useState } from "react";
import Escudo from "./Escudo";

// Formulario para registrar un partido nuevo
function FormularioPartido({ equipos, agregarPartido }) {
  const [local, setLocal] = useState("");
  const [visitante, setVisitante] = useState("");
  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [error, setError] = useState("");
  const [ultimoPartido, setUltimoPartido] = useState(null);

  // Funcion para saber si un texto es un numero entero mayor o igual a 0
  function esEnteroValido(valor) {
    if (valor === "") {
      return false;
    }
    const numero = Number(valor);
    return Number.isInteger(numero) && numero >= 0;
  }

  function manejarEnvio(e) {
    e.preventDefault();

    // Validaciones
    if (local === "" || visitante === "") {
      setError("Debes seleccionar el equipo local y el visitante.");
      return;
    }
    if (local === visitante) {
      setError("El equipo local y el visitante no pueden ser el mismo.");
      return;
    }
    if (!esEnteroValido(golesLocal) || !esEnteroValido(golesVisitante)) {
      setError("Los marcadores deben ser números enteros no negativos.");
      return;
    }

    const nuevoPartido = {
      id: Date.now(),
      localId: Number(local),
      visitanteId: Number(visitante),
      golesLocal: Number(golesLocal),
      golesVisitante: Number(golesVisitante),
    };

    agregarPartido(nuevoPartido);
    setUltimoPartido(nuevoPartido);

    // Limpiar el formulario
    setError("");
    setLocal("");
    setVisitante("");
    setGolesLocal("");
    setGolesVisitante("");
  }

  // Busca un equipo por su id
  function buscarEquipo(id) {
    return equipos.find((equipo) => equipo.id === id);
  }

  return (
    <section className="seccion">
      <h2>Registrar partido</h2>

      <form className="formulario" onSubmit={manejarEnvio}>
        <div className="fila-form">
          <div className="campo">
            <label>Equipo local</label>
            <select value={local} onChange={(e) => setLocal(e.target.value)}>
              <option value="">-- Selecciona --</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="campo campo-goles">
            <label>Goles</label>
            <input
              type="number"
              min="0"
              value={golesLocal}
              onChange={(e) => setGolesLocal(e.target.value)}
            />
          </div>
        </div>

        <p className="vs">VS</p>

        <div className="fila-form">
          <div className="campo">
            <label>Equipo visitante</label>
            <select
              value={visitante}
              onChange={(e) => setVisitante(e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="campo campo-goles">
            <label>Goles</label>
            <input
              type="number"
              min="0"
              value={golesVisitante}
              onChange={(e) => setGolesVisitante(e.target.value)}
            />
          </div>
        </div>

        {error !== "" && <p className="mensaje-error">{error}</p>}

        <button type="submit" className="boton">
          Guardar resultado
        </button>
      </form>

      {/* Muestra el ultimo resultado registrado con escudos y nombres */}
      {ultimoPartido !== null && (
        <div className="resultado-registrado">
          <p>Último resultado registrado:</p>
          <div className="marcador">
            <div className="equipo-marcador">
              <Escudo equipo={buscarEquipo(ultimoPartido.localId)} tamano={45} />
              <span>{buscarEquipo(ultimoPartido.localId).nombre}</span>
            </div>
            <strong className="goles">
              {ultimoPartido.golesLocal} - {ultimoPartido.golesVisitante}
            </strong>
            <div className="equipo-marcador">
              <Escudo
                equipo={buscarEquipo(ultimoPartido.visitanteId)}
                tamano={45}
              />
              <span>{buscarEquipo(ultimoPartido.visitanteId).nombre}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FormularioPartido;

import { useState } from "react";
import listaEquipos from "./equipos";
import ListaEquipos from "./components/ListaEquipos";
import FormularioPartido from "./components/FormularioPartido";
import Historial from "./components/Historial";
import TablaPosiciones from "./components/TablaPosiciones";

function App() {
  // Los equipos y los partidos se guardan en memoria con useState
  const [equipos] = useState(listaEquipos);
  const [partidos, setPartidos] = useState([]);

  // Agrega un partido nuevo a la lista
  function agregarPartido(partido) {
    setPartidos([...partidos, partido]);
  }

  // Elimina un partido usando su id
  function eliminarPartido(id) {
    const nuevaLista = partidos.filter((partido) => partido.id !== id);
    setPartidos(nuevaLista);
  }

  return (
    <div className="app">
      <header className="encabezado">
        <h1>Torneo de Fútbol Aficionado</h1>
        <p>Registra los resultados y consulta la tabla de posiciones</p>
      </header>

      <main className="contenido">
        <ListaEquipos equipos={equipos} />

        <div className="dos-columnas">
          <FormularioPartido equipos={equipos} agregarPartido={agregarPartido} />
          <Historial
            equipos={equipos}
            partidos={partidos}
            eliminarPartido={eliminarPartido}
          />
        </div>

        <TablaPosiciones equipos={equipos} partidos={partidos} />
      </main>

      <footer className="pie">Proyecto de React - Torneo de Fútbol - By Edinson Chamorro</footer>
    </div>
  );
}

export default App;

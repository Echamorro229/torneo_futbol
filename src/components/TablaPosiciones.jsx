import Escudo from "./Escudo";

// Calcula y muestra la tabla de posiciones a partir de los partidos
function TablaPosiciones({ equipos, partidos }) {
  // Para cada equipo se recorren los partidos con reduce() y se suman sus estadisticas
  const tabla = equipos.map((equipo) => {
    const estadisticas = partidos.reduce(
      (acumulado, partido) => {
        let golesPropios = 0;
        let golesRival = 0;

        if (partido.localId === equipo.id) {
          golesPropios = partido.golesLocal;
          golesRival = partido.golesVisitante;
        } else if (partido.visitanteId === equipo.id) {
          golesPropios = partido.golesVisitante;
          golesRival = partido.golesLocal;
        } else {
          // El equipo no jugo este partido
          return acumulado;
        }

        acumulado.pj = acumulado.pj + 1;
        acumulado.gf = acumulado.gf + golesPropios;
        acumulado.gc = acumulado.gc + golesRival;

        if (golesPropios > golesRival) {
          acumulado.pg = acumulado.pg + 1;
          acumulado.pts = acumulado.pts + 3;
        } else if (golesPropios === golesRival) {
          acumulado.pe = acumulado.pe + 1;
          acumulado.pts = acumulado.pts + 1;
        } else {
          acumulado.pp = acumulado.pp + 1;
        }

        return acumulado;
      },
      { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 }
    );

    return {
      ...equipo,
      ...estadisticas,
      dg: estadisticas.gf - estadisticas.gc,
    };
  });

  // Ordenar por puntos, luego diferencia de goles y luego goles a favor
  tabla.sort((a, b) => {
    if (b.pts !== a.pts) {
      return b.pts - a.pts;
    }
    if (b.dg !== a.dg) {
      return b.dg - a.dg;
    }
    return b.gf - a.gf;
  });

  return (
    <section className="seccion">
      <h2>Tabla de posiciones</h2>

      {partidos.length === 0 && (
        <p className="mensaje-vacio">
          No hay partidos registrados. La tabla se llenará cuando registres el
          primero.
        </p>
      )}

      <div className="contenedor-tabla">
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th className="col-equipo">Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((fila, index) => (
              <tr key={fila.id}>
                <td>{index + 1}</td>
                <td className="col-equipo">
                  <div className="equipo-tabla">
                    <Escudo equipo={fila} tamano={28} />
                    <span>{fila.nombre}</span>
                  </div>
                </td>
                <td>{fila.pj}</td>
                <td>{fila.pg}</td>
                <td>{fila.pe}</td>
                <td>{fila.pp}</td>
                <td>{fila.gf}</td>
                <td>{fila.gc}</td>
                <td>{fila.dg > 0 ? "+" + fila.dg : fila.dg}</td>
                <td className="puntos">{fila.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaPosiciones;

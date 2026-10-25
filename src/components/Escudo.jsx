// Componente que dibuja el escudo del equipo con su color y sus siglas
function Escudo({ equipo, tamano }) {
  if (equipo.escudo) {
    return (
      <img
        src={equipo.escudo}
        alt={"Escudo de " + equipo.nombre}
        width={tamano}
        height={tamano}
        className="escudo-img"
      />
    );
  }

  const estilo = {
    backgroundColor: equipo.color,
    width: tamano,
    height: tamano,
    fontSize: tamano / 3.5,
  };

  return (
    <div className="escudo" style={estilo}>
      {equipo.siglas}
    </div>
  );
}

export default Escudo;
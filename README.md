# Torneo de Fútbol Aficionado

Aplicación web en React para registrar resultados de partidos y ver la tabla de posiciones.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Luego abrir en el navegador la dirección que muestra la terminal (normalmente http://localhost:5173).

## Estructura

```
src/
  main.jsx                     -> punto de entrada
  App.jsx                      -> estado principal (equipos y partidos)
  equipos.js                   -> datos de los 6 equipos
  styles.css                   -> estilos (incluye diseño para móviles)
  components/
    Escudo.jsx                 -> dibuja el escudo de cada equipo
    ListaEquipos.jsx           -> tarjetas de equipos
    FormularioPartido.jsx      -> registro y validación de partidos
    Historial.jsx              -> lista de partidos, filtro y eliminar
    TablaPosiciones.jsx        -> cálculo y orden de la tabla
```

## Requisitos cumplidos

- Componentes funcionales con Hooks y datos en `useState` (sin backend).
- `map()` con `key` única para listas, `filter()` para filtrar y eliminar, `reduce()` para calcular estadísticas y `sort()` para ordenar la tabla.
- Eventos `onClick`, `onChange` y `onSubmit`.
- Validaciones: no repetir equipo y marcadores enteros no negativos.
- Victoria 3 pts, empate 1 pt, derrota 0 pts. Orden: puntos, diferencia de goles, goles a favor.

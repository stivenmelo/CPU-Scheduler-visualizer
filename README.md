# CPU Scheduler Visualizer — Visualizador de Planificación de CPU

Una herramienta visual e interactiva para entender cómo los sistemas operativos deciden qué proceso ejecutar en la CPU y en qué orden.

---

## ¿Qué es un Planificador de Procesos?

Cuando un computador tiene varios programas corriendo al mismo tiempo (por ejemplo, un navegador, un reproductor de música y un editor de texto), el sistema operativo debe decidir cuál de esos programas usa la CPU en cada momento. Esa decisión la toma el **Planificador de Procesos** (Process Scheduler).

Esta aplicación simula y anima visualmente cómo funcionan los algoritmos más importantes que usan los sistemas operativos para tomar esa decisión.

---

## Algoritmos incluidos

| Algoritmo | Tipo | Descripción breve |
|---|---|---|
| **FCFS** — First Come First Served | No apropiativo | El primer proceso en llegar es el primero en ejecutarse. Simple, pero puede generar el "efecto convoy" |
| **SJF** — Shortest Job First | No apropiativo | Cuando el CPU queda libre, elige el proceso con el menor tiempo de ráfaga |
| **SRTF** — Shortest Remaining Time First | Apropiativo | Como SJF, pero si llega un proceso más corto puede interrumpir al que está corriendo |
| **Round Robin** | Apropiativo | Cada proceso recibe un turno de tiempo fijo (quantum). Si no termina, vuelve al final de la cola |
| **Priority NP** — Prioridad sin desalojo | No apropiativo | Ejecuta primero el proceso de mayor prioridad. Una vez que inicia, no se interrumpe |
| **Priority P** — Prioridad con desalojo | Apropiativo | Si llega un proceso de mayor prioridad, interrumpe inmediatamente al que está corriendo |

> **Apropiativo** significa que el CPU puede quitarle el control a un proceso antes de que termine.  
> **No apropiativo** significa que el proceso corre hasta completarse sin interrupciones.

---

## ¿Qué muestra la simulación?

```
┌──────────────────────────────────────────────────────────┐
│  HEADER: Logo | Botones de nav | ES/EN  ☀/🌙  Teoría   │
├───────────────────────┬──────────────────────────────────┤
│                       │                                  │
│   CPU                 │   Cola de Listos (Ready Queue)   │
│   [ P2 ]  pulsando    │   [P1] → [P3] → [P4]            │
│   ████████  60%       │                                  │
│                       │                                  │
├───────────────────────┴──────────────────────────────────┤
│   Diagrama de Gantt                                      │
│   [  P1  ][  P2  ][    P3    ][  P4  ]                   │
│   0       4       8          15      20                  │
├──────────────────────────────────────────────────────────┤
│   [▶ Play]  [↺ Reset]    0.25× 0.5× 1× 2× 4×   5/18    │
└──────────────────────────────────────────────────────────┘
```

- **CPU Display** — Muestra qué proceso está usando el CPU en este momento con una animación de pulso y barra de progreso
- **Cola de Listos** — Los procesos que esperan su turno entran y salen con animaciones fluidas
- **Diagrama de Gantt** — Se construye bloque por bloque en tiempo real, mostrando cuándo ejecutó cada proceso
- **Panel de Teoría** — Al tocar el botón "Teoría", se despliega un panel con la explicación del algoritmo, complejidad, ventajas y desventajas
- **Métricas finales** — Al terminar la simulación aparece una tabla con tiempos de espera, retorno y respuesta por proceso

---

## Escenarios de demostración

La app incluye 4 conjuntos de procesos listos para usar:

| Escenario | Propósito |
|---|---|
| **Clásico** | Comparar todos los algoritmos con el mismo conjunto de procesos |
| **Efecto Convoy** | Ver por qué FCFS puede ser muy ineficiente cuando hay un proceso largo al inicio |
| **Round Robin** | 5 procesos similares para ver la rotación justa del quantum |
| **Inanición** | Mostrar cómo los procesos de baja prioridad pueden esperar indefinidamente en Priority-P |

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 18 | Interfaz de usuario |
| **Vite** | 5 | Build tool y servidor de desarrollo |
| **TypeScript** | 5 | Tipado estático |
| **Framer Motion** | 11 | Animaciones fluidas |
| **Tailwind CSS** | 4 | Estilos utilitarios |
| **Zustand** | 4 | Estado global de la simulación |
| **React Router** | 6 | Navegación entre páginas |
| **react-i18next** | 14 | Soporte bilingüe ES / EN |

---

## Requisitos previos

Antes de instalar o correr el proyecto, asegúrate de tener instalado:

- **Node.js** versión 18 o superior — [descargar en nodejs.org](https://nodejs.org)
- **npm** versión 9 o superior (viene incluido con Node.js)

Para verificar que los tienes instalados, abre una terminal y ejecuta:

```bash
node --version   # debe mostrar v18.x.x o superior
npm --version    # debe mostrar 9.x.x o superior
```

---

## Instalación

### 1. Navega a la carpeta del proyecto

```bash
cd planificador-procesos
```

### 2. Instala las dependencias

```bash
npm install
```

Este comando descarga todas las librerías necesarias en la carpeta `node_modules/`. Solo necesitas hacerlo una vez.

---

## Cómo correr el proyecto

### Modo desarrollo (recomendado para explorar o modificar)

```bash
npm run dev
```

Luego abre tu navegador en:

```
http://localhost:5173
```

El servidor recarga automáticamente cada vez que guardas un cambio en el código.

---

### Modo producción (para generar la versión final optimizada)

**Paso 1 — Compilar:**

```bash
npm run build
```

Esto genera la carpeta `dist/` con todos los archivos optimizados listos para desplegar en cualquier servidor web (Nginx, Apache, Netlify, Vercel, etc.).

**Paso 2 — Vista previa local del build:**

```bash
npm run preview
```

Abre tu navegador en:

```
http://localhost:4173
```

---

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm install` | Instala todas las dependencias |
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:5173` |
| `npm run build` | Compila el proyecto para producción en la carpeta `dist/` |
| `npm run preview` | Sirve localmente el build de producción en `localhost:4173` |

---

## Estructura del proyecto

```
planificador-procesos/
├── src/
│   ├── algorithms/          # Lógica pura de cada algoritmo (sin React)
│   │   ├── fcfs.ts
│   │   ├── sjf.ts
│   │   ├── srtf.ts
│   │   ├── roundRobin.ts
│   │   ├── priorityNP.ts
│   │   ├── priorityP.ts
│   │   ├── utils.ts         # Merge de bloques Gantt + cálculo de métricas
│   │   └── index.ts         # Registro y factory de algoritmos
│   ├── constants/           # Colores, configuración de algoritmos, escenarios demo
│   ├── features/            # Componentes agrupados por funcionalidad
│   │   ├── algorithmSelector/  # Cards de selección de algoritmo
│   │   ├── cpuDisplay/         # Visualización del CPU con animación
│   │   ├── ganttChart/         # Diagrama de Gantt animado
│   │   ├── layout/             # Header y MainLayout
│   │   ├── processTable/       # Tabla de procesos con estado en tiempo real
│   │   ├── readyQueue/         # Cola de listos animada
│   │   ├── simulationControls/ # Controles Play/Pause/Reset/Speed
│   │   └── theoryPanel/        # Panel deslizante con teoría del algoritmo
│   ├── hooks/               # Lógica reutilizable
│   │   ├── useSimulationEngine.ts  # Motor de tick (setInterval)
│   │   └── useTheme.ts             # Aplica dark/light en <html>
│   ├── i18n/                # Traducciones ES / EN
│   │   └── locales/
│   │       ├── es.json
│   │       └── en.json
│   ├── pages/               # Páginas de la SPA
│   │   ├── HomePage.tsx         # Selección de algoritmo y escenario
│   │   └── SimulatorPage.tsx    # Simulación completa
│   ├── store/               # Estado global con Zustand
│   │   ├── useSimulationStore.ts
│   │   └── useUIStore.ts
│   └── types/               # Tipos TypeScript compartidos
│       └── index.ts
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

---

## Cómo usar la aplicación paso a paso

1. **Abre la app** en `http://localhost:5173`
2. **Selecciona un algoritmo** en la página principal (FCFS, SJF, SRTF, Round Robin, Priority NP o Priority P)
3. **(Opcional)** Cambia el escenario de demostración según lo que quieras ilustrar
4. **(Opcional)** Si seleccionas Round Robin, ajusta el quantum con los botones `+` y `−`
5. **Haz clic en "Abrir Simulador"** para ir a la página de simulación
6. **Presiona ▶ Play** para iniciar la animación
7. Ajusta la **velocidad** (0.25× a 4×) para ir más lento o más rápido
8. Observa el **CPU**, la **Cola de Listos** y el **Diagrama de Gantt** animándose en sincronía
9. Haz clic en **Teoría** (encabezado) para ver la explicación del algoritmo seleccionado
10. Al completarse la simulación, revisa las **métricas finales** de cada proceso

---

## Autor

Desarrollado con React + Vite + Framer Motion como herramienta educativa para la visualización de algoritmos de Planificación de Procesos de Sistemas Operativos.

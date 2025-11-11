# 🎮 Juego de Plataformas 2D - Tile-Based Adventure

Un emocionante juego de plataformas 2D desarrollado con HTML5 Canvas, CSS3 y JavaScript vanilla. El jugador puede elegir entre múltiples personajes únicos, explorar diferentes niveles, enfrentar diversos enemigos y recoger power-ups especiales.

## 🌟 Características

- **4 Personajes Únicos**: Cada uno con habilidades especiales diferentes
- **3 Niveles Épicos**: Bosque Encantado, Cueva Sombría y Torre del Mago
- **3 Tipos de Enemigos**: Básicos, rápidos y saltarines con IA única
- **Sistema de Power-ups**: Velocidad, escudo y salto doble
- **Gráficos Pixel Art**: Estilo retro con animaciones suaves
- **Física Realista**: Sistema de gravedad y colisiones mejorado
- **Sistema de Partículas**: Efectos visuales dinámicos
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Arquitectura Modular**: Código organizado en clases y módulos

## 👥 Personajes Disponibles

### ⚔️ Caballero
- **Habilidad**: Equilibrado en velocidad y salto
- **Velocidad**: 4 | **Salto**: 13 | **Vidas**: 3
- **Ideal para**: Principiantes y juego balanceado

### � Ninja
- **Habilidad**: Rápido pero frágil
- **Velocidad**: 6 | **Salto**: 15 | **Vidas**: 2
- **Ideal para**: Jugadores experimentados que buscan velocidad

### 🧙 Mago
- **Habilidad**: Salto mágico pero lento
- **Velocidad**: 3 | **Salto**: 16 | **Vidas**: 4
- **Ideal para**: Estrategia y exploración vertical

### 🤖 Robot
- **Habilidad**: Resistente pero pesado
- **Velocidad**: 3.5 | **Salto**: 11 | **Vidas**: 5
- **Ideal para**: Jugadores que prefieren resistencia

## 🗺️ Niveles

### 🌲 Nivel 1: Bosque Encantado
- **Dificultad**: Fácil
- **Enemigos**: Básicos y algunos power-ups
- **Ambiente**: Bosque místico con plataformas naturales

### 🕳️ Nivel 2: Cueva Sombría
- **Dificultad**: Medio
- **Enemigos**: Básicos, rápidos y saltarines
- **Ambiente**: Cueva oscura con desafíos verticales

### 🏰 Nivel 3: Torre del Mago
- **Dificultad**: Difícil
- **Enemigos**: Todos los tipos con patrones complejos
- **Ambiente**: Torre mágica con obstáculos avanzados

## 👹 Enemigos

### 🔴 Enemigo Básico
- Movimiento horizontal simple
- Cambia dirección en bordes
- **Puntos**: 50

### 🔴💨 Enemigo Rápido
- Movimiento horizontal a doble velocidad
- Efectos visuales de velocidad
- **Puntos**: 75

### 🟠⬆️ Enemigo Saltarín
- Salta cada 2 segundos
- Movimiento horizontal más lento
- **Puntos**: 100

## 🌟 Power-ups

### 💨 Velocidad
- **Duración**: 10 segundos
- **Efecto**: Aumenta velocidad del personaje x1.5
- **Visual**: Líneas de velocidad azules

### 🛡️ Escudo
- **Duración**: 8 segundos
- **Efecto**: Inmunidad total a daño
- **Visual**: Círculo dorado parpadeante

### 🚀 Salto Doble
- **Duración**: 15 segundos
- **Efecto**: Permite saltar en el aire una vez
- **Visual**: Partículas púrpuras y cambio de color

## 🎯 Objetivo del Juego

- 🪙 **Recoger monedas** para aumentar tu puntuación (10 puntos cada una)
- 👹 **Evitar o eliminar enemigos** saltándoles encima (50-100 puntos)
- 🌟 **Recoger power-ups** para obtener habilidades temporales (25 puntos)
- ❤️ **Mantener tus vidas** según el personaje elegido
- 🏆 **Completar todos los niveles** para ganar el juego

## 🎮 Controles

| Tecla | Acción |
|-------|--------|
| `A` o `←` | Mover izquierda |
| `D` o `→` | Mover derecha |
| `ESPACIO` | Saltar / Doble saltar (con power-up) |
| `C` | Seleccionar personaje (en menú) |
| `L` | Seleccionar nivel (en menú) |
| `ENTER` | Confirmar selección |
| `ESC` | Volver al menú anterior |

## 📁 Estructura del Proyecto

```
Juego de Plataformas 2D/
├── index.html      # Estructura HTML del juego
├── style.css       # Estilos y animaciones CSS
├── game.js         # Lógica completa del juego
└── README.md       # Documentación del proyecto
```

## 🛠️ Arquitectura del Código

### JavaScript (game.js)
- **Clases de Personajes**:
  - `Player`: Manejo del jugador con 4 personajes únicos
  - `Enemy`: 3 tipos de enemigos con IA especializada
  - `Coin`: Sistema de recolección de monedas
  - `PowerUp`: 3 tipos de mejoras temporales
- **Sistemas de Juego**:
  - `MenuSystem`: Navegación y selección de personajes/niveles
  - `ParticleSystem`: Efectos visuales avanzados
  - `Game`: Controlador principal con estados múltiples
  - `Renderer`: Sistema de renderizado optimizado
  - `GameUtils`: Utilidades y helpers

### Estados del Juego
- `MENU`: Menú principal
- `CHARACTER_SELECT`: Selección de personaje
- `LEVEL_SELECT`: Selección de nivel
- `PLAYING`: Jugando
- `GAME_OVER`: Fin del juego

### CSS (style.css)
- **Diseño Responsive**: Adaptable a móviles y tablets
- **Animaciones CSS**: Efectos suaves y transiciones
- **Temas Visuales**: Paleta de colores cohesiva por nivel
- **Efectos Especiales**: Glows, sombras y gradientes

### HTML (index.html)
- **Estructura Semántica**: Uso correcto de etiquetas HTML5
- **Accesibilidad**: ARIA labels y roles
- **Meta Tags**: SEO y viewport optimizado

## 🚀 Cómo Jugar

1. **Abrir el juego**: Abre `index.html` en tu navegador
2. **Seleccionar personaje**: Presiona `C` y usa `←→` para elegir
3. **Seleccionar nivel**: Presiona `L` y usa `↑↓` para elegir
4. **Iniciar**: Presiona `ENTER` para comenzar
5. **Mover**: Usa `A`/`D` o las flechas para moverte
6. **Saltar**: Presiona `ESPACIO` para saltar
7. **Power-ups**: Recógelos para obtener habilidades temporales
8. **Completar**: Recoge todas las monedas para avanzar al siguiente nivel

## 💡 Características Técnicas

### Nuevas Mecánicas de Juego
- **Sistema de Personajes**: 4 personajes con estadísticas únicas
- **Progresión de Niveles**: 3 niveles con dificultad creciente
- **Enemigos Diversificados**: 3 tipos con comportamientos únicos
- **Power-ups Temporales**: 3 mejoras con efectos visuales
- **Doble Salto**: Mecánica avanzada de movimiento
- **Sistema de Escudo**: Protección temporal contra daño

### Optimizaciones de Rendimiento
- **Estados de Juego**: Gestión eficiente de menús y gameplay
- **Renderizado Condicional**: Solo dibuja elementos activos
- **Gestión de Memoria**: Limpieza automática de partículas y entidades
- **Animaciones Fluidas**: 60 FPS consistentes

### Características Avanzadas
- **Menús Interactivos**: Navegación completa con teclado
- **Colisiones Precisas**: Sistema mejorado por tipo de tile
- **IA Enemiga Variada**: Patrones únicos por tipo
- **Efectos Visuales**: Partículas contextuales y power-ups
- **Progresión Automática**: Avance automático entre niveles
- **Sistema de Puntuación**: Bonus por tipo de acción

## 🎨 Paleta de Colores Expandida

### Personajes
| Personaje | Color Principal | Color Claro | Significado |
|-----------|----------------|-------------|-------------|
| Caballero | `#4ecca3` | `#6fddcc` | Equilibrio |
| Ninja | `#2a2a2a` | `#4a4a4a` | Velocidad |
| Mago | `#8e44ad` | `#bb8fce` | Magia |
| Robot | `#e74c3c` | `#f1948a` | Resistencia |

### Power-ups
| Power-up | Color | Significado |
|----------|-------|-------------|
| Velocidad | `#3498db` | Rapidez |
| Escudo | `#f39c12` | Protección |
| Doble Salto | `#9b59b6` | Elevación |

### Niveles
| Nivel | Color de Fondo | Ambiente |
|-------|----------------|----------|
| Bosque | `#0a4a2a` | Natural |
| Cueva | `#2c1810` | Misterioso |
| Torre | `#4a1a4a` | Mágico |

## 🔧 Personalización

### Modificar Niveles
Edita el objeto `LEVELS` en `game.js`:
- `0`: Espacio vacío
- `1`: Plataforma sólida
- `2`: Moneda
- `3`: Enemigo básico
- `4`: Enemigo rápido
- `5`: Enemigo saltarín
- `6`: Power-up aleatorio

### Crear Nuevos Personajes
Agrega al objeto `CHARACTERS` con estas propiedades:
- `name`: Nombre del personaje
- `description`: Descripción de habilidades
- `width/height`: Tamaño del personaje
- `moveSpeed`: Velocidad de movimiento
- `jumpForce`: Fuerza del salto
- `maxLives`: Vidas iniciales
- `color/lightColor`: Colores del sprite
- `emoji`: Icono representativo

### Crear Nuevos Power-ups
Modifica la clase `PowerUp` para agregar:
- Nuevos tipos en el constructor
- Efectos personalizados en `applyPowerUp`
- Visuales únicos en el método `draw`

### Ajustar Configuración
Modifica el objeto `CONFIG` para cambiar:
- Tamaño de tiles
- Física del juego
- Puntuaciones
- Velocidades

## � Futuras Mejoras Implementadas

- ✅ **Múltiples personajes con habilidades únicas**
- ✅ **Sistema de niveles progresivo**
- ✅ **Diferentes tipos de enemigos**
- ✅ **Power-ups y mejoras temporales**
- ✅ **Menú de selección completo**
- ✅ **Doble salto y habilidades especiales**
- ✅ **Sistema de escudo y protección**
- ✅ **Efectos visuales mejorados**

## 🎯 Futuras Mejoras Planeadas

- [ ] Efectos de sonido y música
- [ ] Más tipos de power-ups (invisibilidad, imán de monedas)
- [ ] Sistema de logros y desbloqueos
- [ ] Controles táctiles móviles
- [ ] Niveles con elementos destructibles
- [ ] Boss battles al final de cada mundo
- [ ] Sistema de guardado de progreso
- [ ] Modo multijugador local
- [ ] Editor de niveles
- [ ] Clasificaciones online

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la branch (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

**¡Disfruta jugando y programando! 🎮✨**
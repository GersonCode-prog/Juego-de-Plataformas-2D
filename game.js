/* =====================================
   JUEGO DE PLATAFORMAS 2D - LÓGICA
   ===================================== */

// =============================================
// CONFIGURACIÓN Y CONSTANTES DEL JUEGO
// =============================================

const CONFIG = {
    TILE_SIZE: 40,
    GRAVITY: 0.6,
    MAX_FALL_SPEED: 15,
    COIN: {
        RADIUS: 12,
        POINTS: 10
    },
    ENEMY: {
        WIDTH: 32,
        HEIGHT: 32,
        SPEED: 2,
        KILL_POINTS: 50
    }
};

// PERSONAJES CON DIFERENTES HABILIDADES Y PRECIOS
const CHARACTERS = {
    KNIGHT: {
        name: "Caballero",
        description: "Equilibrado en velocidad y salto",
        width: 32,
        height: 32,
        moveSpeed: 4,
        jumpForce: -13,
        maxLives: 3,
        color: '#4ecca3',
        lightColor: '#6fddcc',
        emoji: '⚔️',
        price: 0, // Gratis (personaje inicial)
        unlocked: true
    },
    NINJA: {
        name: "Ninja",
        description: "Rápido pero frágil",
        width: 28,
        height: 30,
        moveSpeed: 6,
        jumpForce: -15,
        maxLives: 2,
        color: '#2a2a2a',
        lightColor: '#4a4a4a',
        emoji: '🥷',
        price: 50,
        unlocked: false
    },
    WIZARD: {
        name: "Mago",
        description: "Salto mágico pero lento",
        width: 30,
        height: 34,
        moveSpeed: 3,
        jumpForce: -16,
        maxLives: 4,
        color: '#8e44ad',
        lightColor: '#bb8fce',
        emoji: '🧙',
        price: 75,
        unlocked: false
    },
    ROBOT: {
        name: "Robot",
        description: "Resistente pero pesado",
        width: 34,
        height: 34,
        moveSpeed: 3.5,
        jumpForce: -11,
        maxLives: 5,
        color: '#e74c3c',
        lightColor: '#f1948a',
        emoji: '🤖',
        price: 100,
        unlocked: false
    }
};

// NIVELES DEL JUEGO (0=vacío, 1=plataforma, 2=moneda, 3=enemigo básico, 4=enemigo rápido, 5=enemigo saltarín, 6=power-up)
const LEVELS = {
    1: {
        name: "Bosque Encantado",
        difficulty: "Fácil",
        background: '#0a4a2a',
        map: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
            [0,0,0,2,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
            [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,3,0,0,0,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
            [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
            [1,1,1,0,0,6,0,0,0,0,0,0,0,0,6,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,3,0,0,0,2,0,0,3,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    },
    2: {
        name: "Cueva Sombría",
        difficulty: "Medio",
        background: '#2c1810',
        map: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
            [0,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,0],
            [0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0],
            [0,0,1,1,1,1,0,0,0,2,2,0,0,0,1,1,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,1,1,0,6,6,0,1,1,0,0,0,0,0,1],
            [0,0,3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,0,0],
            [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0],
            [0,0,0,0,0,2,0,0,1,1,1,1,0,0,2,0,0,0,0,0],
            [0,0,0,1,1,1,1,0,0,5,5,0,0,1,1,1,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
            [0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
            [1,1,1,0,0,3,3,0,0,0,0,0,0,3,3,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    },
    3: {
        name: "Torre del Mago",
        difficulty: "Difícil",
        background: '#4a1a4a',
        map: [
            [0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0],
            [0,0,0,2,0,0,0,1,1,1,1,1,1,0,0,0,2,0,0,0],
            [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
            [0,0,0,4,0,0,0,0,2,6,6,2,0,0,0,0,4,0,0,0],
            [0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0],
            [0,0,2,0,0,0,1,1,1,1,1,1,1,1,0,0,0,2,0,0],
            [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0],
            [0,0,4,0,0,2,0,0,0,5,5,0,0,0,2,0,0,4,0,0],
            [1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,3,0,4,0,3,0,0,2,2,2,2,0,0,3,0,4,0,3,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    }
};

// =============================================
// VARIABLES GLOBALES DEL JUEGO
// =============================================

let canvas, ctx;
let score = 0;
let totalCoins = 0; // Monedas acumuladas totales
let lives = 3;
let keys = {};
let gameRunning = false;
let particles = [];
let currentLevel = 1;
let selectedCharacter = 'KNIGHT';
let gameState = 'MENU'; // Comenzar con menú principal
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Mapa del nivel actual
let levelMap = [];

// Variables de entidades
let player;
let enemies;
let coins;
let powerUps;

// =============================================
// SISTEMA DE GUARDADO LOCAL
// =============================================

class SaveSystem {
    static save() {
        const saveData = {
            totalCoins: totalCoins,
            unlockedCharacters: {},
            selectedCharacter: selectedCharacter
        };
        
        // Guardar personajes desbloqueados
        Object.keys(CHARACTERS).forEach(key => {
            saveData.unlockedCharacters[key] = CHARACTERS[key].unlocked;
        });
        
        localStorage.setItem('tileAdventureSave', JSON.stringify(saveData));
    }
    
    static load() {
        const saveData = JSON.parse(localStorage.getItem('tileAdventureSave'));
        if (saveData) {
            totalCoins = saveData.totalCoins || 0;
            selectedCharacter = saveData.selectedCharacter || 'KNIGHT';
            
            // Cargar personajes desbloqueados
            if (saveData.unlockedCharacters) {
                Object.keys(saveData.unlockedCharacters).forEach(key => {
                    if (CHARACTERS[key]) {
                        CHARACTERS[key].unlocked = saveData.unlockedCharacters[key];
                    }
                });
            }
        }
    }
    
    static addCoins(amount) {
        totalCoins += amount;
        SaveSystem.save();
    }
    
    static getCoins() {
        return totalCoins;
    }
    
    static spendCoins(amount) {
        if (totalCoins >= amount) {
            totalCoins -= amount;
            SaveSystem.save();
            return true;
        }
        return false;
    }
    
    static unlockCharacter(characterKey) {
        CHARACTERS[characterKey].unlocked = true;
        SaveSystem.save();
    }
}

// =============================================
// SISTEMA DE MENÚS
// =============================================

class MenuSystem {
    static drawCharacterSelect() {
        Renderer.clearScreen();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('SELECCIONAR PERSONAJE', canvas.width/2, 60);
        
        // Mostrar monedas totales
        ctx.font = 'bold 20px Courier New';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(`💰 Monedas: ${totalCoins}`, canvas.width/2, 90);
        
        let x = isMobile ? 80 : 100;
        let y = isMobile ? 140 : 160;
        const spacing = isMobile ? 140 : 180;
        const charactersPerRow = isMobile ? 2 : 4;
        let currentIndex = 0;
        
        Object.keys(CHARACTERS).forEach((key, index) => {
            const char = CHARACTERS[key];
            const isSelected = key === selectedCharacter;
            const isUnlocked = char.unlocked;
            
            // Marco de selección
            if (isSelected) {
                ctx.strokeStyle = '#ffd700';
                ctx.lineWidth = 4;
                ctx.strokeRect(x - 10, y - 50, 120, 160);
            }
            
            // Marco de bloqueado
            if (!isUnlocked) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(x - 10, y - 50, 120, 160);
                
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 2;
                ctx.strokeRect(x - 10, y - 50, 120, 160);
            }
            
            // Emoji del personaje
            ctx.font = '36px Arial';
            ctx.fillStyle = isUnlocked ? '#fff' : '#666';
            ctx.fillText(char.emoji, x + 50, y);
            
            // Nombre
            ctx.font = 'bold 14px Courier New';
            ctx.fillText(char.name, x + 50, y + 25);
            
            if (isUnlocked) {
                // Estadísticas
                ctx.font = '10px Courier New';
                ctx.fillText(`Vel: ${char.moveSpeed}`, x + 50, y + 40);
                ctx.fillText(`Salto: ${Math.abs(char.jumpForce)}`, x + 50, y + 52);
                ctx.fillText(`Vidas: ${char.maxLives}`, x + 50, y + 64);
                
                // Descripción
                ctx.font = '8px Courier New';
                ctx.fillText(char.description, x + 50, y + 78);
            } else {
                // Precio
                ctx.font = 'bold 14px Courier New';
                ctx.fillStyle = '#ffd700';
                ctx.fillText(`💰 ${char.price}`, x + 50, y + 45);
                
                // Botón comprar si tiene suficientes monedas
                if (totalCoins >= char.price) {
                    ctx.fillStyle = '#27ae60';
                    ctx.fillRect(x + 10, y + 55, 80, 20);
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 10px Courier New';
                    ctx.fillText('COMPRAR', x + 50, y + 67);
                } else {
                    ctx.fillStyle = '#e74c3c';
                    ctx.fillRect(x + 10, y + 55, 80, 20);
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 10px Courier New';
                    ctx.fillText('NO TIENES', x + 50, y + 65);
                    ctx.fillText('SUFICIENTE', x + 50, y + 75);
                }
            }
            
            currentIndex++;
            if (currentIndex % charactersPerRow === 0) {
                x = isMobile ? 80 : 100;
                y += isMobile ? 140 : 180;
            } else {
                x += spacing;
            }
        });
        
        // Instrucciones
        ctx.font = isMobile ? '14px Courier New' : '16px Courier New';
        ctx.fillStyle = '#aaa';
        ctx.textAlign = 'center';
        if (isMobile) {
            ctx.fillText('Toca para seleccionar/comprar', canvas.width/2, canvas.height - 60);
            ctx.fillText('Botón JUGAR para continuar', canvas.width/2, canvas.height - 40);
        } else {
            ctx.fillText('← → para navegar, ENTER para seleccionar/comprar', canvas.width/2, canvas.height - 60);
            ctx.fillText('L para ir a niveles', canvas.width/2, canvas.height - 40);
        }
        
        // Botón continuar para móviles
        if (isMobile && CHARACTERS[selectedCharacter].unlocked) {
            ctx.fillStyle = '#27ae60';
            ctx.fillRect(canvas.width/2 - 60, canvas.height - 100, 120, 30);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px Courier New';
            ctx.fillText('JUGAR', canvas.width/2, canvas.height - 82);
        }
    }
    
    static drawLevelSelect() {
        Renderer.clearScreen();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('SELECCIONAR NIVEL', canvas.width/2, 60);
        
        // Mostrar personaje seleccionado
        ctx.font = '16px Courier New';
        ctx.fillText(`Personaje: ${CHARACTERS[selectedCharacter].emoji} ${CHARACTERS[selectedCharacter].name}`, canvas.width/2, 90);
        
        let y = 140;
        Object.keys(LEVELS).forEach((key, index) => {
            const level = LEVELS[key];
            const isSelected = parseInt(key) === currentLevel;
            
            if (isSelected) {
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(50, y - 25, canvas.width - 100, 50);
                ctx.fillStyle = '#000';
            } else {
                ctx.fillStyle = '#fff';
            }
            
            ctx.font = 'bold 18px Courier New';
            ctx.fillText(`Nivel ${key}: ${level.name}`, canvas.width/2, y);
            ctx.font = '14px Courier New';
            ctx.fillText(`Dificultad: ${level.difficulty}`, canvas.width/2, y + 15);
            
            y += 60;
        });
        
        // Instrucciones
        ctx.font = '16px Courier New';
        ctx.fillStyle = '#aaa';
        if (isMobile) {
            ctx.fillText('Toca para seleccionar nivel', canvas.width/2, canvas.height - 60);
            ctx.fillText('Botón JUGAR para comenzar', canvas.width/2, canvas.height - 40);
        } else {
            ctx.fillText('↑ ↓ para navegar, ENTER para jugar', canvas.width/2, canvas.height - 60);
            ctx.fillText('ESC para volver a personajes', canvas.width/2, canvas.height - 40);
        }
        
        // Botón jugar para móviles
        if (isMobile) {
            ctx.fillStyle = '#27ae60';
            ctx.fillRect(canvas.width/2 - 60, canvas.height - 100, 120, 30);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px Courier New';
            ctx.fillText('JUGAR', canvas.width/2, canvas.height - 82);
        }
    }
    
    static handleMenuInput(key) {
        switch (gameState) {
            case 'MENU':
                if (key === 'enter' || key === ' ') {
                    gameState = 'CHARACTER_SELECT';
                }
                break;
                
            case 'CHARACTER_SELECT':
                if (key === 'escape' || key === 'l') {
                    gameState = 'LEVEL_SELECT';
                } else if (key === 'arrowright') {
                    MenuSystem.nextCharacter();
                } else if (key === 'arrowleft') {
                    MenuSystem.prevCharacter();
                } else if (key === 'enter') {
                    MenuSystem.selectOrBuyCharacter();
                }
                break;
                
            case 'LEVEL_SELECT':
                if (key === 'escape') {
                    gameState = 'CHARACTER_SELECT';
                } else if (key === 'arrowup') {
                    MenuSystem.prevLevel();
                } else if (key === 'arrowdown') {
                    MenuSystem.nextLevel();
                } else if (key === 'enter') {
                    Game.startGame();
                }
                break;
        }
    }
    
    static selectOrBuyCharacter() {
        const char = CHARACTERS[selectedCharacter];
        if (char.unlocked) {
            // Ya está desbloqueado, ir a selección de nivel
            gameState = 'LEVEL_SELECT';
        } else {
            // Intentar comprar
            if (SaveSystem.spendCoins(char.price)) {
                SaveSystem.unlockCharacter(selectedCharacter);
                // Efectos visuales de compra
                ParticleSystem.createParticles(canvas.width/2, canvas.height/2, '#ffd700', 20);
            }
        }
    }
    
    static nextCharacter() {
        const unlockedCharacters = Object.keys(CHARACTERS);
        let currentIndex = unlockedCharacters.indexOf(selectedCharacter);
        
        do {
            currentIndex = (currentIndex + 1) % unlockedCharacters.length;
            selectedCharacter = unlockedCharacters[currentIndex];
        } while (!CHARACTERS[selectedCharacter].unlocked && currentIndex !== unlockedCharacters.indexOf(selectedCharacter));
    }
    
    static prevCharacter() {
        const unlockedCharacters = Object.keys(CHARACTERS);
        let currentIndex = unlockedCharacters.indexOf(selectedCharacter);
        
        do {
            currentIndex = currentIndex === 0 ? unlockedCharacters.length - 1 : currentIndex - 1;
            selectedCharacter = unlockedCharacters[currentIndex];
        } while (!CHARACTERS[selectedCharacter].unlocked && currentIndex !== unlockedCharacters.indexOf(selectedCharacter));
    }
    
    static nextLevel() {
        const levels = Object.keys(LEVELS);
        if (currentLevel < levels.length) {
            currentLevel++;
        }
    }
    
    static prevLevel() {
        if (currentLevel > 1) {
            currentLevel--;
        }
    }
    
    static handleMobileTouch(x, y) {
        if (gameState === 'MENU') {
            // Botón jugar en menú principal
            if (x >= canvas.width/2 - 100 && x <= canvas.width/2 + 100 &&
                y >= 280 && y <= 340) {
                gameState = 'CHARACTER_SELECT';
            }
        } else if (gameState === 'CHARACTER_SELECT') {
            // Detectar toque en personajes
            let charX = 80;
            let charY = 140;
            const spacing = 140;
            const charactersPerRow = 2;
            let currentIndex = 0;
            
            Object.keys(CHARACTERS).forEach((key) => {
                if (x >= charX - 10 && x <= charX + 110 && 
                    y >= charY - 50 && y <= charY + 110) {
                    selectedCharacter = key;
                    MenuSystem.selectOrBuyCharacter();
                    return;
                }
                
                currentIndex++;
                if (currentIndex % charactersPerRow === 0) {
                    charX = 80;
                    charY += 140;
                } else {
                    charX += spacing;
                }
            });
            
            // Botón jugar
            if (x >= canvas.width/2 - 60 && x <= canvas.width/2 + 60 &&
                y >= canvas.height - 100 && y <= canvas.height - 70 &&
                CHARACTERS[selectedCharacter].unlocked) {
                gameState = 'LEVEL_SELECT';
            }
        } else if (gameState === 'LEVEL_SELECT') {
            // Detectar toque en niveles
            let y = 140;
            Object.keys(LEVELS).forEach((key, index) => {
                if (x >= 50 && x <= canvas.width - 50 && 
                    y >= y - 25 && y <= y + 25) {
                    currentLevel = parseInt(key);
                    return;
                }
                y += 60;
            });
            
            // Botón jugar
            if (x >= canvas.width/2 - 60 && x <= canvas.width/2 + 60 &&
                y >= canvas.height - 100 && y <= canvas.height - 70) {
                Game.startGame();
            }
        }
    }
    
    static drawMainMenu() {
        Renderer.clearScreen();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('TILE-BASED ADVENTURE', canvas.width/2, 150);
        
        ctx.font = '18px Courier New';
        ctx.fillStyle = '#aaa';
        ctx.fillText('¡Recoge monedas y desbloquea personajes!', canvas.width/2, 180);
        
        // Mostrar monedas totales
        ctx.font = 'bold 24px Courier New';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(`💰 Monedas: ${totalCoins}`, canvas.width/2, 220);
        
        // Botón de iniciar
        ctx.fillStyle = '#4ecca3';
        ctx.fillRect(canvas.width/2 - 100, 280, 200, 60);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Courier New';
        ctx.fillText('JUGAR', canvas.width/2, 320);
        
        // Instrucciones
        ctx.fillStyle = '#fff';
        ctx.font = '14px Courier New';
        ctx.fillText('Presiona ENTER para comenzar', canvas.width/2, 380);
    }
    
    static drawLevelSelect() {
        Renderer.clearScreen();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('SELECCIONAR NIVEL', canvas.width/2, 60);
        
        ctx.font = '16px Courier New';
        ctx.fillStyle = '#aaa';
        ctx.fillText('Elige tu aventura', canvas.width/2, 85);
        
        // Mostrar personaje seleccionado
        ctx.font = 'bold 18px Courier New';
        ctx.fillStyle = '#4ecca3';
        ctx.fillText(`Personaje: ${CHARACTERS[selectedCharacter].emoji} ${CHARACTERS[selectedCharacter].name}`, canvas.width/2, 110);
        
        let y = 160;
        Object.keys(LEVELS).forEach((key, index) => {
            const level = LEVELS[key];
            const isSelected = parseInt(key) === currentLevel;
            
            // Fondo del nivel
            ctx.fillStyle = isSelected ? '#4ecca3' : '#333';
            ctx.fillRect(50, y - 30, canvas.width - 100, 60);
            
            // Texto del nivel
            ctx.fillStyle = isSelected ? '#000' : '#fff';
            ctx.font = 'bold 18px Courier New';
            ctx.textAlign = 'left';
            ctx.fillText(`${level.emoji} Nivel ${key}: ${level.name}`, 70, y - 5);
            
            ctx.font = '14px Courier New';
            ctx.fillStyle = isSelected ? '#222' : '#aaa';
            ctx.fillText(level.description, 70, y + 15);
            
            y += 80;
        });
        
        // Instrucciones
        ctx.fillStyle = '#fff';
        ctx.font = '14px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('↑↓ para cambiar, ENTER para jugar, ESC para volver', canvas.width/2, canvas.height - 30);
    }
}

// =============================================
// OBJETOS DEL JUEGO
// =============================================

class Player {
    constructor(x, y, characterType = 'KNIGHT') {
        this.characterType = characterType;
        this.character = CHARACTERS[characterType];
        
        this.x = x;
        this.y = y;
        this.width = this.character.width;
        this.height = this.character.height;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.direction = 1;
        this.frame = 0;
        this.animTimer = 0;
        this.invincible = 0;
        this.moveSpeed = this.character.moveSpeed;
        this.jumpForce = this.character.jumpForce;
        
        // Power-ups
        this.powerUps = {
            speed: 0,
            shield: 0,
            doubleJump: 0
        };
        this.hasJumped = false;
        this.canDoubleJump = false;
    }

    reset() {
        this.x = 100;
        this.y = 400;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.direction = 1;
        this.frame = 0;
        this.animTimer = 0;
        this.hasJumped = false;
        this.canDoubleJump = false;
    }

    applyPowerUp(type) {
        switch (type) {
            case 'SPEED':
                this.powerUps.speed = 600; // 10 segundos a 60 FPS
                break;
            case 'SHIELD':
                this.powerUps.shield = 480; // 8 segundos
                break;
            case 'DOUBLE_JUMP':
                this.powerUps.doubleJump = 900; // 15 segundos
                break;
        }
    }

    update() {
        // Actualizar power-ups
        this.updatePowerUps();
        
        // Movimiento horizontal con speed boost
        this.vx = 0;
        const currentSpeed = this.powerUps.speed > 0 ? this.moveSpeed * 1.5 : this.moveSpeed;
        
        if (keys['a'] || keys['arrowleft']) {
            this.vx = -currentSpeed;
            this.direction = -1;
        }
        if (keys['d'] || keys['arrowright']) {
            this.vx = currentSpeed;
            this.direction = 1;
        }

        // Gravedad
        this.vy += CONFIG.GRAVITY;
        if (this.vy > CONFIG.MAX_FALL_SPEED) this.vy = CONFIG.MAX_FALL_SPEED;

        // Movimiento con colisiones
        this.handleHorizontalCollision();
        this.handleVerticalCollision();

        // Límites del mundo
        this.handleWorldBounds();

        // Animación
        this.updateAnimation();

        // Reducir invencibilidad (pero no si tiene escudo)
        if (this.invincible > 0 && this.powerUps.shield === 0) this.invincible--;
    }

    updatePowerUps() {
        Object.keys(this.powerUps).forEach(key => {
            if (this.powerUps[key] > 0) {
                this.powerUps[key]--;
            }
        });
    }

    handleHorizontalCollision() {
        this.x += this.vx;
        
        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                if (levelMap[row][col] === 1) {
                    const tile = GameUtils.getTileRect(col, row);
                    if (GameUtils.checkCollision(this, tile)) {
                        if (this.vx > 0) {
                            this.x = tile.x - this.width;
                        } else {
                            this.x = tile.x + tile.width;
                        }
                        this.vx = 0;
                    }
                }
            }
        }
    }

    handleVerticalCollision() {
        this.y += this.vy;
        const wasOnGround = this.onGround;
        this.onGround = false;

        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                if (levelMap[row][col] === 1) {
                    const tile = GameUtils.getTileRect(col, row);
                    if (GameUtils.checkCollision(this, tile)) {
                        if (this.vy > 0) {
                            this.y = tile.y - this.height;
                            this.vy = 0;
                            this.onGround = true;
                            // Reset double jump cuando toca el suelo
                            if (!wasOnGround) {
                                this.hasJumped = false;
                                this.canDoubleJump = false;
                            }
                        } else {
                            this.y = tile.y + tile.height;
                            this.vy = 0;
                        }
                    }
                }
            }
        }
    }

    handleWorldBounds() {
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y > canvas.height) {
            Game.loseLife();
        }
    }

    updateAnimation() {
        if (this.vx !== 0) {
            this.animTimer++;
            if (this.animTimer > 8) {
                this.frame = (this.frame + 1) % 4;
                this.animTimer = 0;
            }
        } else {
            this.frame = 0;
        }
    }

    jump() {
        if (!gameRunning) return;
        
        if (this.onGround) {
            // Salto normal
            this.vy = this.jumpForce;
            this.onGround = false;
            this.hasJumped = true;
            if (this.powerUps.doubleJump > 0) {
                this.canDoubleJump = true;
            }
        } else if (this.canDoubleJump && this.powerUps.doubleJump > 0) {
            // Doble salto
            this.vy = this.jumpForce * 0.8;
            this.canDoubleJump = false;
            ParticleSystem.createParticles(
                this.x + this.width/2, 
                this.y + this.height, 
                '#9b59b6', 
                8
            );
        }
    }

    draw() {
        ctx.save();
        
        // Parpadeo cuando es invencible o efectos de power-ups
        if (this.invincible > 0 && this.powerUps.shield === 0 && Math.floor(this.invincible / 5) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }
        
        // Efecto de escudo
        if (this.powerUps.shield > 0) {
            const shieldRadius = 25;
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, shieldRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // Efecto de velocidad
        if (this.powerUps.speed > 0) {
            // Líneas de velocidad
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const offset = i * 8;
                ctx.beginPath();
                ctx.moveTo(this.x - offset, this.y + 5 + i * 8);
                ctx.lineTo(this.x - offset - 15, this.y + 5 + i * 8);
                ctx.stroke();
            }
        }
        
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        if (this.direction < 0) ctx.scale(-1, 1);
        
        // Cuerpo con color del personaje
        let bodyColor = this.character.color;
        if (this.powerUps.doubleJump > 0) {
            // Efecto púrpura para doble salto
            bodyColor = '#9b59b6';
        }
        
        ctx.fillStyle = bodyColor;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height - 8);
        
        // Cabeza
        ctx.fillStyle = this.character.lightColor;
        ctx.fillRect(-this.width/2 + 4, -this.height/2 - 8, this.width - 8, 12);
        
        // Ojos
        ctx.fillStyle = '#000';
        const eyeOffset = this.frame % 2 === 0 ? 0 : 1;
        ctx.fillRect(-8 + eyeOffset, -this.height/2 - 4, 3, 3);
        ctx.fillRect(5 + eyeOffset, -this.height/2 - 4, 3, 3);
        
        // Piernas (animación)
        ctx.fillStyle = bodyColor;
        const legOffset = Math.sin(this.frame) * 3;
        ctx.fillRect(-10, this.height/2 - 8 + legOffset, 6, 8);
        ctx.fillRect(4, this.height/2 - 8 - legOffset, 6, 8);
        
        // Emoji del personaje arriba de la cabeza
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.character.emoji, 0, -this.height/2 - 15);
        
        // Indicadores de power-ups activos
        let powerUpY = -this.height/2 - 35;
        if (this.powerUps.speed > 0) {
            ctx.fillText('💨', -15, powerUpY);
            powerUpY -= 15;
        }
        if (this.powerUps.shield > 0) {
            ctx.fillText('🛡️', 0, powerUpY);
            powerUpY -= 15;
        }
        if (this.powerUps.doubleJump > 0) {
            ctx.fillText('🚀', 15, powerUpY);
        }
        
        ctx.restore();
    }
}

class Enemy {
    constructor(x, y, type = 'BASIC') {
        this.x = x;
        this.y = y;
        this.width = CONFIG.ENEMY.WIDTH;
        this.height = CONFIG.ENEMY.HEIGHT;
        this.type = type;
        this.frame = 0;
        this.animTimer = 0;
        this.active = true;
        this.timer = 0;
        
        // Configuración por tipo de enemigo
        switch (type) {
            case 'BASIC':
                this.vx = CONFIG.ENEMY.SPEED;
                this.color = '#e94560';
                this.points = 50;
                break;
            case 'FAST':
                this.vx = CONFIG.ENEMY.SPEED * 2;
                this.color = '#ff6b6b';
                this.points = 75;
                break;
            case 'JUMPER':
                this.vx = CONFIG.ENEMY.SPEED * 0.5;
                this.vy = 0;
                this.jumpTimer = 0;
                this.color = '#ff9f43';
                this.points = 100;
                break;
        }
    }

    update() {
        if (!this.active) return;

        this.timer++;

        switch (this.type) {
            case 'BASIC':
            case 'FAST':
                this.updateBasic();
                break;
            case 'JUMPER':
                this.updateJumper();
                break;
        }

        // Animación
        this.animTimer++;
        if (this.animTimer > 10) {
            this.frame = (this.frame + 1) % 2;
            this.animTimer = 0;
        }

        // Colisión con jugador
        this.checkPlayerCollision();
    }

    updateBasic() {
        this.x += this.vx;

        // Cambiar dirección en bordes
        const leftTile = GameUtils.getTileAt(this.x - 5, this.y + this.height);
        const rightTile = GameUtils.getTileAt(this.x + this.width + 5, this.y + this.height);
        
        if (leftTile !== 1 || rightTile !== 1) {
            this.vx *= -1;
        }
    }

    updateJumper() {
        // Movimiento horizontal
        this.x += this.vx;

        // Salto cada 2 segundos
        this.jumpTimer++;
        if (this.jumpTimer > 120 && this.vy === 0) {
            this.vy = -12;
            this.jumpTimer = 0;
        }

        // Gravedad
        this.vy += CONFIG.GRAVITY;
        if (this.vy > CONFIG.MAX_FALL_SPEED) this.vy = CONFIG.MAX_FALL_SPEED;

        // Movimiento vertical
        this.y += this.vy;

        // Colisión vertical con tiles
        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                if (levelMap[row][col] === 1) {
                    const tile = GameUtils.getTileRect(col, row);
                    if (GameUtils.checkCollision(this, tile)) {
                        if (this.vy > 0) {
                            this.y = tile.y - this.height;
                            this.vy = 0;
                        }
                    }
                }
            }
        }

        // Cambiar dirección en bordes
        const leftTile = GameUtils.getTileAt(this.x - 5, this.y + this.height + 10);
        const rightTile = GameUtils.getTileAt(this.x + this.width + 5, this.y + this.height + 10);
        
        if (leftTile !== 1 || rightTile !== 1) {
            this.vx *= -1;
        }
    }

    checkPlayerCollision() {
        if (!GameUtils.checkCollision(player, this) || player.invincible > 0) return;

        if (player.vy > 0 && player.y + player.height - 10 < this.y) {
            // Saltar sobre enemigo
            player.vy = -10;
            score += this.points;
            ParticleSystem.createParticles(
                this.x + this.width/2, 
                this.y + this.height/2, 
                this.color
            );
            this.active = false;
        } else {
            Game.loseLife();
        }
    }

    draw() {
        if (!this.active || this.x < -100) return;
        
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        
        // Cuerpo enemigo con color específico
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        // Efectos especiales por tipo
        if (this.type === 'FAST') {
            // Líneas de velocidad
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const offset = i * 5;
                ctx.beginPath();
                ctx.moveTo(-this.width/2 - offset, -5 + i * 5);
                ctx.lineTo(-this.width/2 - offset - 10, -5 + i * 5);
                ctx.stroke();
            }
        }
        
        if (this.type === 'JUMPER') {
            // Indicador de salto
            if (this.jumpTimer > 100) {
                ctx.fillStyle = '#fff';
                ctx.fillRect(-3, -this.height/2 - 10, 6, 6);
            }
        }
        
        // Ojos
        ctx.fillStyle = '#fff';
        ctx.fillRect(-12 + this.frame * 2, -8, 6, 6);
        ctx.fillRect(6 - this.frame * 2, -8, 6, 6);
        
        ctx.fillStyle = '#000';
        ctx.fillRect(-10 + this.frame * 2, -6, 2, 2);
        ctx.fillRect(8 - this.frame * 2, -6, 2, 2);
        
        // Dientes
        for (let i = -12; i < 12; i += 6) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(i, 8, 4, 6);
        }
        
        ctx.restore();
    }
}

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = CONFIG.COIN.RADIUS;
        this.active = true;
        this.angle = 0;
    }

    update() {
        if (!this.active) return;
        
        this.angle += 0.1;
        
        const dist = Math.hypot(
            player.x + player.width/2 - this.x, 
            player.y + player.height/2 - this.y
        );
        
        if (dist < this.radius + 16) {
            this.active = false;
            score += CONFIG.COIN.POINTS;
            SaveSystem.addCoins(1);
            ParticleSystem.createParticles(this.x, this.y, '#ffd700', 12);
        }
    }

    draw() {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffed4e';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius - 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
        
        ctx.restore();
    }
}

class PowerUp {
    constructor(x, y, type = 'SPEED') {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.type = type;
        this.active = true;
        this.angle = 0;
        this.pulseScale = 1;
        
        // Configuración por tipo
        switch (type) {
            case 'SPEED':
                this.color = '#3498db';
                this.emoji = '💨';
                this.effect = 'Velocidad aumentada por 10 segundos';
                break;
            case 'SHIELD':
                this.color = '#f39c12';
                this.emoji = '🛡️';
                this.effect = 'Invencibilidad por 8 segundos';
                break;
            case 'DOUBLE_JUMP':
                this.color = '#9b59b6';
                this.emoji = '🚀';
                this.effect = 'Salto doble por 15 segundos';
                break;
        }
    }
    
    update() {
        if (!this.active) return;
        
        this.angle += 0.05;
        this.pulseScale = 1 + Math.sin(this.angle * 3) * 0.2;
        
        // Colisión con jugador
        const dist = Math.hypot(
            player.x + player.width/2 - this.x,
            player.y + player.height/2 - this.y
        );
        
        if (dist < 20) {
            this.collect();
        }
    }
    
    collect() {
        this.active = false;
        score += 25;
        ParticleSystem.createParticles(this.x, this.y, this.color, 15);
        
        // Aplicar efecto al jugador
        player.applyPowerUp(this.type);
    }
    
    draw() {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.pulseScale, this.pulseScale);
        ctx.rotate(this.angle);
        
        // Círculo base
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Borde brillante
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Emoji
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.rotate(-this.angle);
        ctx.fillText(this.emoji, 0, 0);
        
        ctx.restore();
    }
}

// =============================================
// SISTEMA DE PARTÍCULAS
// =============================================

class ParticleSystem {
    static createParticles(x, y, color, count = 8) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                color: color
            });
        }
    }

    static update() {
        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.life--;
            return p.life > 0;
        });
    }

    static draw() {
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 30;
            ctx.fillRect(p.x, p.y, 4, 4);
        });
        ctx.globalAlpha = 1;
    }
}

// =============================================
// UTILIDADES DEL JUEGO
// =============================================

class GameUtils {
    static getTileAt(x, y) {
        const col = Math.floor(x / CONFIG.TILE_SIZE);
        const row = Math.floor(y / CONFIG.TILE_SIZE);
        if (row >= 0 && row < levelMap.length && col >= 0 && col < levelMap[0].length) {
            return levelMap[row][col];
        }
        return 0;
    }

    static getTileRect(col, row) {
        return {
            x: col * CONFIG.TILE_SIZE,
            y: row * CONFIG.TILE_SIZE,
            width: CONFIG.TILE_SIZE,
            height: CONFIG.TILE_SIZE
        };
    }

    static checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
}

// =============================================
// RENDERIZADO
// =============================================

class Renderer {
    static drawMap() {
        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                const tile = levelMap[row][col];
                const x = col * CONFIG.TILE_SIZE;
                const y = row * CONFIG.TILE_SIZE;
                
                if (tile === 1) {
                    // Plataforma
                    ctx.fillStyle = '#0f3460';
                    ctx.fillRect(x, y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
                    
                    ctx.fillStyle = '#16537e';
                    ctx.fillRect(x + 2, y + 2, CONFIG.TILE_SIZE - 4, CONFIG.TILE_SIZE - 4);
                    
                    // Detalles
                    ctx.fillStyle = '#0a2540';
                    ctx.fillRect(x + 5, y + 5, 5, 5);
                    ctx.fillRect(x + 30, y + 5, 5, 5);
                    ctx.fillRect(x + 5, y + 30, 5, 5);
                    ctx.fillRect(x + 30, y + 30, 5, 5);
                }
            }
        }
    }

    static clearScreen() {
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// =============================================
// CONTROLADOR DEL JUEGO PRINCIPAL
// =============================================

class Game {
    static init() {
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');
        
        // Cargar datos guardados
        SaveSystem.load();
        
        this.setupEventListeners();
        this.gameLoop();
    }

    static startGame() {
        gameState = 'PLAYING';
        gameRunning = true;
        score = 0;
        lives = CHARACTERS[selectedCharacter].maxLives;
        
        // Cargar nivel actual
        levelMap = LEVELS[currentLevel].map;
        
        this.initializeEntities();
        this.updateUI();
    }

    static initializeEntities() {
        // Inicializar jugador con personaje seleccionado
        player = new Player(100, 400, selectedCharacter);

        // Inicializar monedas
        coins = [];
        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                if (levelMap[row][col] === 2) {
                    coins.push(new Coin(
                        col * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE/2,
                        row * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE/2
                    ));
                }
            }
        }

        // Inicializar enemigos con diferentes tipos
        enemies = [];
        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                let enemyType = 'BASIC';
                if (levelMap[row][col] === 3) enemyType = 'BASIC';
                else if (levelMap[row][col] === 4) enemyType = 'FAST';
                else if (levelMap[row][col] === 5) enemyType = 'JUMPER';
                
                if (levelMap[row][col] >= 3 && levelMap[row][col] <= 5) {
                    enemies.push(new Enemy(
                        col * CONFIG.TILE_SIZE,
                        row * CONFIG.TILE_SIZE,
                        enemyType
                    ));
                }
            }
        }

        // Inicializar power-ups
        powerUps = [];
        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                if (levelMap[row][col] === 6) {
                    const powerUpTypes = ['SPEED', 'SHIELD', 'DOUBLE_JUMP'];
                    const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
                    powerUps.push(new PowerUp(
                        col * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE/2,
                        row * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE/2,
                        randomType
                    ));
                }
            }
        }
        
        // Limpiar partículas
        particles = [];
    }

    static setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            keys[key] = true;
            
            if (gameState !== 'PLAYING') {
                MenuSystem.handleMenuInput(key);
                return;
            }
            
            if (key === ' ') {
                e.preventDefault();
                player.jump();
            }
        });

        document.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            gameState = 'MENU';
            gameRunning = false;
            document.getElementById('gameOver').style.display = 'none';
        });

        // Eventos táctiles para móvil
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            if (gameState === 'CHARACTER_SELECT' || gameState === 'MENU' || gameState === 'LEVEL_SELECT') {
                MenuSystem.handleMobileTouch(x, y);
            } else if (gameState === 'PLAYING') {
                Game.handleGameTouch(x, y);
            }
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
        });
    }

    static update() {
        if (gameState !== 'PLAYING' || !gameRunning) return;

        player.update();
        enemies.forEach(enemy => enemy.update());
        coins.forEach(coin => coin.update());
        powerUps.forEach(powerUp => powerUp.update());
        ParticleSystem.update();
        
        // Verificar si se completó el nivel
        const activeCoins = coins.filter(coin => coin.active);
        if (activeCoins.length === 0) {
            this.levelComplete();
        }
    }

    static render() {
        switch (gameState) {
            case 'MENU':
                MenuSystem.drawMainMenu();
                break;
            case 'CHARACTER_SELECT':
                MenuSystem.drawCharacterSelect();
                break;
            case 'LEVEL_SELECT':
                MenuSystem.drawLevelSelect();
                break;
            case 'PLAYING':
                this.renderGame();
                break;
        }
    }

    static handleGameTouch(x, y) {
        // Controles táctiles durante el juego
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        // Área izquierda para movimiento
        if (x < canvasWidth * 0.3) {
            // Izquierda
            if (x < canvasWidth * 0.15) {
                keys['arrowleft'] = true;
                setTimeout(() => { keys['arrowleft'] = false; }, 100);
            }
            // Derecha
            else {
                keys['arrowright'] = true;
                setTimeout(() => { keys['arrowright'] = false; }, 100);
            }
        }
        // Área derecha para salto
        else if (x > canvasWidth * 0.7) {
            player.jump();
        }
    }

    static renderGame() {
        // Cambiar color de fondo según el nivel
        canvas.style.background = LEVELS[currentLevel].background;
        Renderer.clearScreen();
        Renderer.drawMap();
        
        powerUps.forEach(powerUp => powerUp.draw());
        coins.forEach(coin => coin.draw());
        enemies.forEach(enemy => enemy.draw());
        if (player) player.draw();
        ParticleSystem.draw();
        
        // Información del nivel
        ctx.fillStyle = '#fff';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'left';
        ctx.fillText(`Nivel: ${currentLevel} - ${LEVELS[currentLevel].name}`, 10, 30);
        ctx.fillText(`Personaje: ${CHARACTERS[selectedCharacter].emoji} ${CHARACTERS[selectedCharacter].name}`, 10, 50);
        
        // Mostrar monedas acumuladas
        const totalCoins = SaveSystem.getCoins();
        ctx.fillStyle = '#ffd700';
        ctx.fillText(`💰 Monedas: ${totalCoins}`, 10, 70);
        
        // Información de power-ups activos
        ctx.fillStyle = '#fff';
        let powerUpInfo = [];
        if (player.powerUps.speed > 0) powerUpInfo.push(`💨 Velocidad: ${Math.ceil(player.powerUps.speed/60)}s`);
        if (player.powerUps.shield > 0) powerUpInfo.push(`🛡️ Escudo: ${Math.ceil(player.powerUps.shield/60)}s`);
        if (player.powerUps.doubleJump > 0) powerUpInfo.push(`🚀 Doble Salto: ${Math.ceil(player.powerUps.doubleJump/60)}s`);
        
        powerUpInfo.forEach((info, index) => {
            ctx.fillText(info, 10, 90 + index * 20);
        });
    }

    static levelComplete() {
        score += 100; // Bonus por completar nivel
        ParticleSystem.createParticles(canvas.width/2, canvas.height/2, '#ffd700', 30);
        
        if (currentLevel < Object.keys(LEVELS).length) {
            currentLevel++;
            setTimeout(() => {
                this.startGame(); // Cargar siguiente nivel
            }, 2000);
        } else {
            // Juego completado
            this.gameWon();
        }
    }

    static gameWon() {
        gameRunning = false;
        document.getElementById('finalScore').textContent = `¡FELICITACIONES! Juego completado. Puntuación Final: ${score}`;
        document.getElementById('gameOver').style.display = 'block';
    }

    static loseLife() {
        // Si tiene escudo activo, no pierde vida
        if (player.powerUps.shield > 0) {
            player.powerUps.shield = 0; // Consumir escudo
            ParticleSystem.createParticles(
                player.x + player.width/2, 
                player.y + player.height/2, 
                '#f39c12', 
                15
            );
            return;
        }
        
        if (player.invincible > 0) return;
        
        lives--;
        player.invincible = 120;
        player.reset();
        
        ParticleSystem.createParticles(
            player.x + player.width/2, 
            player.y + player.height/2, 
            '#e94560', 
            20
        );
        
        if (lives <= 0) {
            this.gameOver();
        }
        
        this.updateUI();
    }

    static updateUI() {
        document.getElementById('score').textContent = `Puntos: ${score}`;
        document.getElementById('lives').textContent = `Vidas: ${'❤️'.repeat(lives)}`;
    }

    static gameOver() {
        gameRunning = false;
        gameState = 'GAME_OVER';
        document.getElementById('finalScore').textContent = `Puntuación Final: ${score}`;
        document.getElementById('gameOver').style.display = 'block';
    }

    static gameLoop() {
        Game.update();
        Game.render();
        requestAnimationFrame(Game.gameLoop);
    }
}

// =============================================
// INICIALIZACIÓN DEL JUEGO
// =============================================

// Inicializar el juego cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
document.addEventListener('DOMContentLoaded', () => {
    // --- APP STATE ---
    const state = {
        currentScreen: 'landing-page',
        user: {
            firstName: '',
            lastName: '',
            age: '',
            bestScore: 0
        },
        game: {
            score: 0,
            bestScore: 0,
            snake: [{ x: 10, y: 10 }],
            food: { x: 5, y: 5 },
            direction: { x: 0, y: 0 },
            nextDirection: { x: 0, y: 0 },
            gridSize: 20,
            tileCount: 20,
            speed: 100,
            interval: null,
            isPaused: false
        }
    };

    // --- DOM ELEMENTS ---
    const screens = {
        landing: document.getElementById('landing-page'),
        profile: document.getElementById('profile-page'),
        game: document.getElementById('game-page'),
        leaderboard: document.getElementById('leaderboard-page')
    };

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('current-score');
    const bestScoreEl = document.getElementById('best-score');
    const gameOverOverlay = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const finalBestEl = document.getElementById('final-best');

    const ENTER_BTN = document.getElementById('enter-btn');
    const PROFILE_FORM = document.getElementById('profile-form');
    const RESTART_BTN = document.getElementById('restart-btn');
    const LEADERBOARD_BTN = document.getElementById('leaderboard-btn');
    const BACK_HOME_BTN = document.getElementById('back-to-home-btn');

    // --- NAVIGATION ---
    function showScreen(screenId) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenId.split('-')[0]].classList.add('active');
        state.currentScreen = screenId;
        
        if (screenId === 'landing-page') {
            startBackgroundAnimations();
        } else {
            stopBackgroundAnimations();
        }
    }

    ENTER_BTN.addEventListener('click', () => showScreen('profile-page'));

    PROFILE_FORM.addEventListener('submit', async (e) => {
        e.preventDefault();
        state.user.firstName = document.getElementById('first-name').value;
        state.user.lastName = document.getElementById('last-name').value;
        state.user.age = document.getElementById('age').value;

        // Save User to Backend
        try {
            await fetch('/save_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.user)
            });
        } catch (err) {
            console.warn('Backend not available, proceeding locally.');
        }

        showScreen('game-page');
        resetGame();
    });

    RESTART_BTN.addEventListener('click', () => {
        gameOverOverlay.classList.add('hidden');
        resetGame();
    });

    LEADERBOARD_BTN.addEventListener('click', () => {
        showScreen('leaderboard-page');
        loadLeaderboard();
    });

    BACK_HOME_BTN.addEventListener('click', () => showScreen('landing-page'));

    // --- BACKGROUND ANIMATIONS (Phase 1) ---
    let bgInterval = null;
    function startBackgroundAnimations() {
        const bgContainer = document.getElementById('bg-snakes');
        if (!bgContainer) return;

        bgInterval = setInterval(() => {
            const snake = document.createElement('div');
            snake.className = 'snake-segment';
            const size = Math.random() * 20 + 10;
            snake.style.width = `${size}px`;
            snake.style.height = `${size}px`;
            snake.style.left = `${Math.random() * 100}%`;
            snake.style.top = '-50px';
            snake.style.opacity = Math.random() * 0.5 + 0.1;

            bgContainer.appendChild(snake);

            const duration = Math.random() * 3000 + 2000;
            const animation = snake.animate([
                { transform: 'translateY(0) rotate(0deg)' },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)` }
            ], {
                duration: duration,
                easing: 'linear'
            });

            animation.onfinish = () => snake.remove();
        }, 500);
    }

    function stopBackgroundAnimations() {
        clearInterval(bgInterval);
        const bgContainer = document.getElementById('bg-snakes');
        if (bgContainer) bgContainer.innerHTML = '';
    }

    // --- GAME LOGIC (Phase 2) ---
    function resetGame() {
        state.game.snake = [{ x: 10, y: 10 }];
        state.game.score = 0;
        state.game.direction = { x: 0, y: 0 };
        state.game.nextDirection = { x: 0, y: 0 };
        scoreEl.innerText = '0';
        spawnFood();
        
        if (state.game.interval) clearInterval(state.game.interval);
        state.game.interval = setInterval(gameLoop, state.game.speed);
    }

    function spawnFood() {
        state.game.food = {
            x: Math.floor(Math.random() * state.game.tileCount),
            y: Math.floor(Math.random() * state.game.tileCount)
        };
        // Ensure food doesn't spawn on snake
        if (state.game.snake.some(seg => seg.x === state.game.food.x && seg.y === state.game.food.y)) {
            spawnFood();
        }
    }

    function gameLoop() {
        // Update Direction
        state.game.direction = state.game.nextDirection;
        if (state.game.direction.x === 0 && state.game.direction.y === 0) {
            draw();
            return;
        }

        // Move Snake
        const head = { 
            x: state.game.snake[0].x + state.game.direction.x, 
            y: state.game.snake[0].y + state.game.direction.y 
        };

        // Collision Check: Walls
        if (head.x < 0 || head.x >= state.game.tileCount || head.y < 0 || head.y >= state.game.tileCount) {
            return gameOver();
        }

        // Collision Check: Self
        if (state.game.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
            return gameOver();
        }

        state.game.snake.unshift(head);

        // Check Food
        if (head.x === state.game.food.x && head.y === state.game.food.y) {
            state.game.score += 100;
            scoreEl.innerText = state.game.score;
            spawnFood();
        } else {
            state.game.snake.pop();
        }

        draw();
    }

    function draw() {
        // Clear Canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Snake
        ctx.fillStyle = '#39FF14';
        state.game.snake.forEach((seg, index) => {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#39FF14';
            ctx.fillRect(
                seg.x * state.game.gridSize, 
                seg.y * state.game.gridSize, 
                state.game.gridSize - 2, 
                state.game.gridSize - 2
            );
        });

        // Draw Food
        ctx.fillStyle = '#FF3131';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FF3131';
        ctx.fillRect(
            state.game.food.x * state.game.gridSize, 
            state.game.food.y * state.game.gridSize, 
            state.game.gridSize - 2, 
            state.game.gridSize - 2
        );
    }

    async function gameOver() {
        clearInterval(state.game.interval);
        
        if (state.game.score > state.game.bestScore) {
            state.game.bestScore = state.game.score;
            bestScoreEl.innerText = state.game.bestScore;
        }

        finalScoreEl.innerText = state.game.score;
        finalBestEl.innerText = state.game.bestScore;
        gameOverOverlay.classList.remove('hidden');

        // Submit Score to Backend
        try {
            await fetch('/submit_score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    score: state.game.score,
                    username: `${state.user.firstName} ${state.user.lastName}`
                })
            });
        } catch (err) {
            console.warn('Backend not available for score submission.');
        }
    }

    // --- CONTROLS ---
    window.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (state.game.direction.y !== 1) state.game.nextDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (state.game.direction.y !== -1) state.game.nextDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (state.game.direction.x !== 1) state.game.nextDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (state.game.direction.x !== -1) state.game.nextDirection = { x: 1, y: 0 };
                break;
        }
    });

    // --- LEADERBOARD ---
    async function loadLeaderboard() {
        const list = document.getElementById('leaderboard-list');
        list.innerHTML = 'LOADING...';
        
        try {
            const resp = await fetch('/leaderboard');
            const data = await resp.json();
            
            list.innerHTML = '';
            data.forEach((entry, idx) => {
                const item = document.createElement('div');
                item.className = 'leaderboard-item';
                item.innerHTML = `
                    <span>${idx + 1}. ${entry.username}</span>
                    <span>${entry.score} pts</span>
                `;
                list.appendChild(item);
            });
        } catch (err) {
            list.innerHTML = 'OFFLINE MODE - NO SCORES';
        }
    }

    // Init
    startBackgroundAnimations();
});

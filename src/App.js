import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameInfo from './components/GameInfo';
import GameCanvas from './components/GameCanvas';
import GameOver from './components/GameOver';
import LevelComplete from './components/LevelComplete';
import LandingPage from './components/LandingPage';

function App() {
    // Canvas dimensions (keep UI fully visible without scrolling)
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 500;

    // Per-level ball speed
    const getBallSpeed = (level) => {
        if (level >= 3) return 8.5;
        if (level === 2) return 8;
        return 7;
    };
    // Game state
    const [gameState, setGameState] = useState({
        score: 0,
        lives: 3,
        level: 1,
        gameTime: 0,
        gameRunning: false,
        gameStartTime: 0,
        totalGameTime: 0
    });

    const [gameOver, setGameOver] = useState({
        show: false,
        message: '',
        finalTime: 0
    });

    const [showLanding, setShowLanding] = useState(true);

    const [levelComplete, setLevelComplete] = useState(false);
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const keysRef = useRef({ left: false, right: false, space: false });
    const prevBallRef = useRef(null);

    // Game objects
    const [gameObjects, setGameObjects] = useState({
        paddle: { x: CANVAS_WIDTH / 2 - 50, y: CANVAS_HEIGHT - 30, width: 100, height: 15, speed: 8 },
        ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, radius: 8, dx: 0, dy: 0, speed: getBallSpeed(1) },
        bricks: []
    });

    // Initialize game
    const initGame = useCallback(() => {
        const levelConfig = getLevelConfig(gameState.level);
        const bricks = [];

        for (let row = 0; row < levelConfig.rows; row++) {
            for (let col = 0; col < levelConfig.cols; col++) {
                bricks.push({
                    x: col * (levelConfig.brickWidth + levelConfig.padding) + levelConfig.offsetLeft,
                    y: row * (levelConfig.brickHeight + levelConfig.padding) + levelConfig.offsetTop,
                    width: levelConfig.brickWidth,
                    height: levelConfig.brickHeight,
                    visible: true,
                    color: getBrickColor(row),
                    points: levelConfig.pointsPerBrick
                });
            }
        }

        setGameObjects(prev => ({
            ...prev,
            bricks,
            paddle: { ...prev.paddle, x: CANVAS_WIDTH / 2 - 50, y: CANVAS_HEIGHT - 30 },
            ball: { ...prev.ball, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, dx: 0, dy: 0, speed: getBallSpeed(gameState.level) }
        }));
    }, [gameState.level]);

    // Get level configuration
    const getLevelConfig = (level) => {
        const configs = {
            1: { rows: 4, cols: 8, brickWidth: 80, brickHeight: 25, padding: 5, offsetTop: 60, offsetLeft: 40, pointsPerBrick: 10 },
            2: { rows: 5, cols: 10, brickWidth: 70, brickHeight: 20, padding: 5, offsetTop: 50, offsetLeft: 35, pointsPerBrick: 15 },
            3: { rows: 6, cols: 12, brickWidth: 60, brickHeight: 18, padding: 4, offsetTop: 40, offsetLeft: 30, pointsPerBrick: 20 }
        };
        return configs[level] || configs[1];
    };

    // Get brick color
    const getBrickColor = (row) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f9ca24'];
        return colors[row % colors.length];
    };

    // Update paddle position
    const updatePaddle = useCallback(() => {
        setGameObjects(prev => {
            let newX = prev.paddle.x;

            if (keysRef.current.left && prev.paddle.x > 0) {
                newX = prev.paddle.x - prev.paddle.speed;
            }
            if (keysRef.current.right && prev.paddle.x < CANVAS_WIDTH - prev.paddle.width) {
                newX = prev.paddle.x + prev.paddle.speed;
            }

            // Move ball with paddle when not in motion
            let ballX = prev.ball.x;
            if (!gameState.gameRunning) {
                ballX = newX + prev.paddle.width / 2;
            }

            return {
                ...prev,
                paddle: { ...prev.paddle, x: newX },
                ball: { ...prev.ball, x: ballX }
            };
        });
    }, [gameState.gameRunning]);

    // Update ball position
    const updateBall = useCallback(() => {
        if (!gameState.gameRunning) return;

        setGameObjects(prev => {
            // remember previous ball position for swept collisions
            prevBallRef.current = { x: prev.ball.x, y: prev.ball.y };
            const newBall = { ...prev.ball };
            newBall.x += newBall.dx;
            newBall.y += newBall.dy;

            // Ball collision with walls
            if (newBall.x - newBall.radius < 0 || newBall.x + newBall.radius > CANVAS_WIDTH) {
                newBall.dx = -newBall.dx;
            }
            if (newBall.y - newBall.radius < 0) {
                newBall.dy = -newBall.dy;
            }

            // Ball collision with paddle
            if (newBall.y + newBall.radius > prev.paddle.y &&
                newBall.y - newBall.radius < prev.paddle.y + prev.paddle.height &&
                newBall.x > prev.paddle.x &&
                newBall.x < prev.paddle.x + prev.paddle.width) {

                const hitPos = (newBall.x - prev.paddle.x) / prev.paddle.width;
                const angle = (hitPos - 0.5) * Math.PI / 3;
                newBall.dx = Math.sin(angle) * newBall.speed;
                newBall.dy = -Math.abs(Math.cos(angle) * newBall.speed);
            }

            // Ball falls below paddle
            if (newBall.y > CANVAS_HEIGHT) {
                setGameState(prev => {
                    const newLives = prev.lives - 1;
                    if (newLives <= 0) {
                        setGameOver({
                            show: true,
                            message: `Game Over! Final Time: ${Math.floor((Date.now() - prev.gameStartTime) / 1000)}s | Level: ${prev.level}`,
                            finalTime: Math.floor((Date.now() - prev.gameStartTime) / 1000)
                        });
                        return { ...prev, gameRunning: false, lives: newLives };
                    }
                    return { ...prev, lives: newLives };
                });

                // Reset ball to paddle center
                newBall.x = prev.paddle.x + prev.paddle.width / 2;
                newBall.y = prev.paddle.y - newBall.radius - 5;
                newBall.dx = 0;
                newBall.dy = 0;
                setGameState(prev => ({ ...prev, gameRunning: false }));
            }

            return { ...prev, ball: newBall };
        });
    }, [gameState.gameRunning, gameState.lives, gameState.gameStartTime, gameState.level]);

    // Check ball collision with bricks
    const checkBrickCollision = useCallback(() => {
        setGameObjects(prev => {
            const newBricks = [...prev.bricks];
            let newScore = gameState.score;
            let ball = { ...prev.ball };
            const prevPos = prevBallRef.current || { x: ball.x, y: ball.y };

            newBricks.forEach((brick, index) => {
                if (brick.visible &&
                    // Swept AABB across ball movement to avoid tunneling
                    !(Math.max(prevPos.x, ball.x) + ball.radius < brick.x ||
                        Math.min(prevPos.x, ball.x) - ball.radius > brick.x + brick.width ||
                        Math.max(prevPos.y, ball.y) + ball.radius < brick.y ||
                        Math.min(prevPos.y, ball.y) - ball.radius > brick.y + brick.height)) {

                    // Determine collision side by minimal overlap at current position
                    const overlapLeft = (ball.x + ball.radius) - brick.x;
                    const overlapRight = (brick.x + brick.width) - (ball.x - ball.radius);
                    const overlapTop = (ball.y + ball.radius) - brick.y;
                    const overlapBottom = (brick.y + brick.height) - (ball.y - ball.radius);
                    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                    if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                        ball.dx = -ball.dx;
                    } else {
                        ball.dy = -ball.dy;
                    }

                    newBricks[index] = { ...brick, visible: false };
                    newScore += brick.points;
                }
            });

            // Check if all bricks are broken
            if (newBricks.every(brick => !brick.visible)) {
                if (gameState.level < 3) {
                    // Advance to next level and reinit bricks/ball
                    setGameState(prev => ({ ...prev, level: prev.level + 1, gameRunning: false }));
                    setLevelComplete(true);
                    // Center ball on paddle and stop movement between levels
                    const centeredBallX = prev.paddle.x + prev.paddle.width / 2;
                    const centeredBallY = prev.paddle.y - prev.ball.radius - 5;
                    setGameObjects(p => ({
                        ...p,
                        ball: { ...p.ball, x: centeredBallX, y: centeredBallY, dx: 0, dy: 0, speed: getBallSpeed(gameState.level + 1) }
                    }));
                    // Ensure next level bricks appear promptly
                    setTimeout(() => {
                        setLevelComplete(false);
                        initGame();
                    }, 1200);
                } else {
                    setGameOver({
                        show: true,
                        message: `Congratulations! Game Completed! Final Time: ${Math.floor((Date.now() - gameState.gameStartTime) / 1000)}s`,
                        finalTime: Math.floor((Date.now() - gameState.gameStartTime) / 1000)
                    });
                    setGameState(prev => ({ ...prev, gameRunning: false }));
                }
            }

            setGameState(prev => ({ ...prev, score: newScore }));
            return { ...prev, bricks: newBricks, ball };
        });
    }, [gameState.score, gameState.level, gameState.gameStartTime]);

    // Start ball movement
    const startBall = useCallback(() => {
        if (!gameState.gameRunning) {
            setGameState(prev => ({
                ...prev,
                gameRunning: true,
                gameStartTime: prev.gameStartTime || Date.now()
            }));

            setGameObjects(prev => ({
                ...prev,
                ball: {
                    ...prev.ball,
                    dx: (Math.random() - 0.5) * 4,
                    dy: -prev.ball.speed
                }
            }));
        }
    }, [gameState.gameRunning]);

    // Restart game
    const restartGame = useCallback(() => {
        setGameState({
            score: 0,
            lives: 3,
            level: 1,
            gameTime: 0,
            gameRunning: false,
            gameStartTime: 0,
            totalGameTime: 0
        });
        setGameOver({ show: false, message: '', finalTime: 0 });
        setLevelComplete(false);
        initGame();
    }, [initGame]);

    // Game loop
    const gameLoop = useCallback(() => {
        // Always update paddle (even when game is not running)
        updatePaddle();

        // Only update ball and check collisions when game is running
        if (gameState.gameRunning) {
            updateBall();
            checkBrickCollision();
        }

        // Update timer
        if (gameState.gameStartTime > 0) {
            setGameState(prev => ({
                ...prev,
                gameTime: Math.floor((Date.now() - prev.gameStartTime) / 1000)
            }));
        }
    }, [updatePaddle, updateBall, checkBrickCollision, gameState.gameRunning, gameState.gameStartTime]);

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key.toLowerCase()) {
                case 'a':
                case 'arrowleft':
                    keysRef.current.left = true;
                    break;
                case 'd':
                case 'arrowright':
                    keysRef.current.right = true;
                    break;
                case ' ':
                    e.preventDefault();
                    if (gameOver.show) {
                        restartGame();
                    } else {
                        startBall();
                    }
                    break;
            }
        };

        const handleKeyUp = (e) => {
            switch (e.key.toLowerCase()) {
                case 'a':
                case 'arrowleft':
                    keysRef.current.left = false;
                    break;
                case 'd':
                case 'arrowright':
                    keysRef.current.right = false;
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [startBall, restartGame, gameOver.show]);

    // Game loop effect - always run to handle paddle movement
    useEffect(() => {
        gameLoopRef.current = setInterval(gameLoop, 16); // ~60fps

        return () => clearInterval(gameLoopRef.current);
    }, [gameLoop]);

    // Initialize game on mount and level change
    useEffect(() => {
        initGame();
    }, [initGame]);

    if (showLanding) {
        return <LandingPage onPlay={() => setShowLanding(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-game-bg to-game-bg-secondary flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            <div className="game-container w-full max-w-4xl">
                <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                    <img src="/favicon.png" alt="Brick Smacher" className="w-8 h-8 sm:w-10 sm:h-10 rounded" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">Brick Smasher</h1>
                </div>

                <GameInfo
                    score={gameState.score}
                    lives={gameState.lives}
                    level={gameState.level}
                    gameTime={gameState.gameTime}
                />

                <div className="relative w-full">
                    <GameCanvas
                        ref={canvasRef}
                        gameObjects={gameObjects}
                        gameRunning={gameState.gameRunning}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                    />

                    {gameOver.show && (
                        <GameOver
                            message={gameOver.message}
                            onRestart={restartGame}
                            onHome={() => setShowLanding(true)}
                        />
                    )}

                    {levelComplete && (
                        <LevelComplete />
                    )}
                </div>

                <div className="mt-4 sm:mt-6 text-center text-white text-sm sm:text-base">
                    <p className="mb-1 sm:mb-2">Use <strong>A</strong> and <strong>D</strong> keys to move the paddle</p>
                    <p className="mb-1 sm:mb-2">Press <strong>SPACE</strong> to start the game</p>
                    <p>Press <strong>SPACE</strong> to restart after game over</p>
                </div>
            </div>
        </div>
    );
}

export default App;

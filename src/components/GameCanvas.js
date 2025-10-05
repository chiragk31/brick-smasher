import React, { forwardRef, useEffect, useRef } from 'react';

const GameCanvas = forwardRef(({ gameObjects, gameRunning, width = 700, height = 500 }, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw bricks
        gameObjects.bricks.forEach(brick => {
            if (brick.visible) {
                // Brick body
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);

                // Brick border
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);

                // Brick highlight
                const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.height);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
                ctx.fillStyle = gradient;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });

        // Draw paddle with gradient
        const paddleGradient = ctx.createLinearGradient(
            gameObjects.paddle.x,
            gameObjects.paddle.y,
            gameObjects.paddle.x,
            gameObjects.paddle.y + gameObjects.paddle.height
        );
        paddleGradient.addColorStop(0, '#4ecdc4');
        paddleGradient.addColorStop(1, '#44a08d');

        ctx.fillStyle = paddleGradient;
        ctx.fillRect(
            gameObjects.paddle.x,
            gameObjects.paddle.y,
            gameObjects.paddle.width,
            gameObjects.paddle.height
        );

        // Draw paddle border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            gameObjects.paddle.x,
            gameObjects.paddle.y,
            gameObjects.paddle.width,
            gameObjects.paddle.height
        );

        // Draw ball with gradient
        ctx.beginPath();
        ctx.arc(gameObjects.ball.x, gameObjects.ball.y, gameObjects.ball.radius, 0, Math.PI * 2);

        const ballGradient = ctx.createRadialGradient(
            gameObjects.ball.x - 3,
            gameObjects.ball.y - 3,
            0,
            gameObjects.ball.x,
            gameObjects.ball.y,
            gameObjects.ball.radius
        );
        ballGradient.addColorStop(0, '#ffffff');
        ballGradient.addColorStop(1, '#ff6b6b');

        ctx.fillStyle = ballGradient;
        ctx.fill();
        ctx.closePath();

        // Draw ball border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();

    }, [gameObjects, gameRunning]);

    return (
        <div className="w-full flex justify-center">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="game-canvas w-full max-w-full mx-auto block"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    aspectRatio: `${width}/${height}`
                }}
            />
        </div>
    );
});

GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;

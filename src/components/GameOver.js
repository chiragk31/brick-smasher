import React from 'react';

const GameOver = ({ message, onRestart, onHome }) => {
    return (
        <div className="game-overlay">
            <div className="bg-black/90 p-8 rounded-2xl text-center border-4 border-white max-w-md mx-4">
                <h2 className="text-4xl md:text-5xl font-bold text-game-accent mb-4 drop-shadow-lg">
                    {message.includes('Congratulations') ? '🎉' : '💥'} Game Over!
                </h2>
                <p className="text-xl text-white mb-6 leading-relaxed">
                    {message}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={onRestart}
                        className="game-button text-lg px-8 py-4"
                    >
                        🎮 Play Again
                    </button>
                    <button
                        onClick={onHome}
                        className="game-button text-lg px-8 py-4 from-game-accent to-game-accent"
                    >
                        ⤴️ Return Home
                    </button>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                    Press <strong>SPACE</strong> to restart
                </p>
            </div>
        </div>
    );
};

export default GameOver;

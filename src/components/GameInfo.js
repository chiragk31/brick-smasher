import React from 'react';

const GameInfo = ({ score, lives, level, gameTime }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="game-info-item flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <span className="text-lg sm:text-2xl">🏆</span>
                <span>Score: {score}</span>
            </div>

            <div className="game-info-item flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <span className="text-lg sm:text-2xl">❤️</span>
                <span>Lives: {lives}</span>
            </div>

            <div className="game-info-item flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <span className="text-lg sm:text-2xl">🎯</span>
                <span>Level: {level}</span>
            </div>

            <div className="game-info-item flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <span className="text-lg sm:text-2xl">⏱️</span>
                <span>Time: {gameTime}s</span>
            </div>
        </div>
    );
};

export default GameInfo;

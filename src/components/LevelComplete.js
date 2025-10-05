import React from 'react';

const LevelComplete = () => {
    return (
        <div className="game-overlay">
            <div className="bg-black/90 p-8 rounded-2xl text-center border-4 border-game-primary max-w-md mx-4 animate-pulse-slow">
                <h2 className="text-4xl md:text-5xl font-bold text-game-primary mb-4 drop-shadow-lg animate-bounce-slow">
                    🎉 Level Complete!
                </h2>
                <p className="text-xl text-white mb-4">
                    Advancing to next level...
                </p>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-game-primary"></div>
                </div>
            </div>
        </div>
    );
};

export default LevelComplete;

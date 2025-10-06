import React from 'react';

const MobileControls = ({ onLeft, onRight, onLaunch, gameRunning }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 sm:hidden">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {/* Left Arrow */}
                <button
                    onTouchStart={(e) => {
                        e.preventDefault();
                        onLeft(true);
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        onLeft(false);
                    }}
                    onMouseDown={() => onLeft(true)}
                    onMouseUp={() => onLeft(false)}
                    onMouseLeave={() => onLeft(false)}
                    className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white p-4 rounded-full border-2 border-white/30 transition-all duration-150"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                </button>

                {/* Launch Ball Button */}
                <button
                    onClick={onLaunch}
                    disabled={gameRunning}
                    className={`px-8 py-4 rounded-full font-bold text-white transition-all duration-300 ${gameRunning
                        ? 'bg-gray-500/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-game-primary to-game-secondary hover:scale-105 active:scale-95'
                        }`}
                >
                    {gameRunning ? '🎮' : '🚀'} {gameRunning ? 'Playing' : 'Launch'}
                </button>

                {/* Right Arrow */}
                <button
                    onTouchStart={(e) => {
                        e.preventDefault();
                        onRight(true);
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        onRight(false);
                    }}
                    onMouseDown={() => onRight(true)}
                    onMouseUp={() => onRight(false)}
                    onMouseLeave={() => onRight(false)}
                    className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white p-4 rounded-full border-2 border-white/30 transition-all duration-150"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                </button>
            </div>

            <p className="text-center text-white/70 text-xs mt-2">
                Touch and hold arrows to move • Tap Launch to start
            </p>
        </div>
    );
};

export default MobileControls;

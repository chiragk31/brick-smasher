import React from 'react';

const LandingPage = ({ onPlay }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-game-bg to-game-bg-secondary flex items-center justify-center p-4">
            <div className="game-container w-full max-w-3xl text-white text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">Brick Smasher</h1>
                <p className="opacity-90 mb-6 text-lg">A modern, responsive brick smasher built with React & Tailwind CSS.</p>

                <div className="bg-white/10 rounded-xl p-5 text-left mb-6">
                    <h2 className="text-2xl font-bold mb-3">How to Play</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Use A/D or Arrow keys to move the paddle</li>
                        <li>Press SPACE to launch the ball</li>
                        <li>Break all bricks to advance levels</li>
                        <li>Complete all 3 levels as fast as you can</li>
                    </ul>
                </div>

                <button onClick={onPlay} className="game-button text-xl px-10 py-4">Play the Game</button>

                <div className="mt-8 opacity-80 text-lg text-bold">
                    Developed by <span className="font-semibold">chiragk31</span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;



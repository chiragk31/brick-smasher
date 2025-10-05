# 🎮 Brick Breaker React

A modern, responsive Brick Breaker game built with React and Tailwind CSS. Features three difficulty levels, real-time scoring, and beautiful animations.

![Game Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Brick+Breaker+React)

## 🚀 Features

### 🎯 Core Gameplay
- **Responsive Controls**: Smooth paddle movement with keyboard controls
- **Physics Engine**: Realistic ball bouncing with angle-based paddle hits
- **Three Levels**: Progressive difficulty with increasing brick counts
- **Scoring System**: Points increase with level difficulty
- **Lives System**: 3 lives with persistent timer across lives

### 🎨 Modern Design
- **Tailwind CSS**: Beautiful, responsive design with custom animations
- **Glassmorphism**: Modern glass-like effects and gradients
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: 60fps gameplay with CSS animations
- **Custom Colors**: Game-themed color palette

### 🎮 Game Features
- **Level Progression**: 3 levels with increasing difficulty
- **Real-time Timer**: Persistent timer across lives and levels
- **Level Complete**: Animated transitions between levels
- **Game Over States**: Different messages for win/lose scenarios
- **Keyboard Controls**: Full keyboard navigation support

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework
- **HTML5 Canvas**: High-performance game rendering
- **JavaScript ES6+**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/<your-username>/brick-smasher.git
cd brick-smasher

# Install dependencies
npm install

# Start development server
npm start
```

The game will open at `http://localhost:3000`

## 🎮 How to Play

### Controls
- **Movement**: `A`/`D` keys or arrow keys to move paddle
- **Launch Ball**: Press `SPACE` to start the game
- **Restart**: Press `SPACE` after game over to restart

### Gameplay
1. **Start**: Press `SPACE` to launch the ball
2. **Move Paddle**: Use `A`/`D` keys to keep the ball in play
3. **Break Bricks**: Destroy all bricks to advance to next level
4. **Score Points**: Earn points for each brick destroyed
5. **Complete Levels**: Progress through 3 increasingly difficult levels

## 🎯 Game Levels

### Level 1 (Easy)
- **Bricks**: 4 rows × 8 columns = 32 bricks
- **Size**: Large bricks (80×25px)
- **Points**: 10 points per brick
- **Spacing**: Generous spacing

### Level 2 (Medium)
- **Bricks**: 5 rows × 10 columns = 50 bricks
- **Size**: Medium bricks (70×20px)
- **Points**: 15 points per brick
- **Spacing**: Standard spacing

### Level 3 (Hard)
- **Bricks**: 6 rows × 12 columns = 72 bricks
- **Size**: Small bricks (60×18px)
- **Points**: 20 points per brick
- **Spacing**: Tight spacing

## 📱 Responsive Design

### Desktop (1024px+)
- Full-size canvas (800×600px)
- Large game info display
- Full keyboard controls

### Tablet (768px - 1023px)
- Responsive canvas scaling
- Optimized touch controls
- Adjusted spacing

### Mobile (320px - 767px)
- Full-width responsive canvas
- Touch-friendly interface
- Optimized for portrait mode

## 🎨 Design System

### Colors
- **Primary**: `#4ecdc4` (Teal)
- **Secondary**: `#44a08d` (Dark Teal)
- **Accent**: `#ff6b6b` (Coral)
- **Background**: `#667eea` to `#764ba2` (Gradient)

### Typography
- **Font**: Inter, system fonts
- **Sizes**: Responsive text scaling
- **Weights**: Bold for emphasis

### Animations
- **Bounce**: Level complete celebrations
- **Pulse**: Loading states
- **Gradient**: Background animations
- **Smooth**: 60fps game loop

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GameCanvas.js      # Canvas rendering component
│   ├── GameInfo.js        # Score/lives/timer display
│   ├── GameOver.js        # Game over overlay
│   └── LevelComplete.js   # Level complete animation
├── App.js                 # Main game logic and state
├── index.js               # React entry point
└── index.css              # Tailwind CSS imports
```

## 🔧 Development

### Available Scripts
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Key Components

#### App.js
- Main game state management
- Game loop and physics
- Keyboard event handling
- Level progression logic

#### GameCanvas.js
- HTML5 Canvas rendering
- Game object drawing
- Gradient effects
- Responsive canvas sizing

#### GameInfo.js
- Real-time score display
- Lives and timer tracking
- Level indicator
- Responsive info cards

## 🎮 Game Mechanics

### Physics
- **Ball Movement**: Realistic physics with angle-based bouncing
- **Collision Detection**: Pixel-perfect collision detection
- **Paddle Physics**: Angle-based ball deflection
- **Wall Bouncing**: Consistent wall collision behavior

### State Management
- **Game State**: Score, lives, level, timer
- **Object State**: Paddle, ball, bricks positions
- **UI State**: Game over, level complete states
- **Input State**: Keyboard key states

### Performance
- **60fps Game Loop**: Smooth animation
- **Efficient Rendering**: Canvas optimization
- **Memory Management**: Proper cleanup
- **Responsive Updates**: Adaptive to screen size

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
```bash
# Build the project then drop the build/ folder into your host
npm run build

# Netlify: drag-and-drop build/ in the dashboard
# Vercel: select this repo; framework: Create React App
# GitHub Pages (via gh-pages):
#   npm i -D gh-pages
#   add to package.json:
#     "homepage": ".",
#     "scripts": { "predeploy": "npm run build", "deploy": "gh-pages -d build" }
#   then: npm run deploy
```

## 🧭 Publish to GitHub

```bash
cd "E:/Cursor Projects/Brick Breaker React"
git init
git add .
git commit -m "Initial commit: Brick Smacher (React + Tailwind)"
git branch -M main
git remote add origin https://github.com/<your-username>/brick-smasher.git
git push -u origin main
```

## 🎯 Future Enhancements

### Planned Features
- **Sound Effects**: Audio feedback for actions
- **Particle Effects**: Visual effects for brick breaking
- **Power-ups**: Special abilities and items
- **High Score**: Local storage for best times
- **Multiplayer**: Two-player mode
- **Touch Controls**: Mobile touch support

### Technical Improvements
- **TypeScript**: Type safety
- **State Management**: Redux/Zustand
- **Testing**: Unit and integration tests
- **PWA**: Progressive Web App features
- **Performance**: WebGL rendering

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Enjoy playing Brick Breaker React! 🎮✨**

Built with ❤️ using React and Tailwind CSS

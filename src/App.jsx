import { useState, useEffect, useRef } from 'react'
import './App.css'
import Board from './components/Board'
import Controls from './components/Controls'
import Stats from './components/Stats'
import { ICON_IDS } from './components/icons'

// Small tactile buzz on supported devices — makes matches feel physical.
const buzz = ms => { try { navigator.vibrate?.(ms) } catch { /* unsupported */ } }

const TIME_LIMITS = { easy: 30, medium: 50, hard: 80 };
const PAIRS = { easy: 4, medium: 8, hard: 12 };

const generateCards = (difficulty) => {
  const pairCount = PAIRS[difficulty] || 4;
  const chosen = ICON_IDS.slice(0, pairCount);
  return [...chosen, ...chosen]
    .map((value, id) => ({ id, value, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

function App() {
  const [gameStatus, setGameStatus] = useState(null);
  const [timer, setTimer] = useState(0);
  const [screen, setScreen] = useState('welcome');
  const [difficulty, setDifficulty] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboKey, setComboKey] = useState(0);
  const streak = useRef(0);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('card_memory_game_stats');
    return saved ? JSON.parse(saved) : {
      wins: 0, losses: 0, bestTimes: { easy: null, medium: null, hard: null },
    };
  });

  useEffect(() => {
    localStorage.setItem('card_memory_game_stats', JSON.stringify(stats));
  }, [stats]);

  // Countdown
  useEffect(() => {
    if (screen !== 'game') return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [screen]);

  // Lose on timeout
  useEffect(() => {
    if (screen === 'game' && timer === 0) {
      setScreen('score');
      setGameStatus('lose');
      setStats((p) => ({ ...p, losses: p.losses + 1 }));
    }
  }, [timer, screen]);

  // Win when all matched
  useEffect(() => {
    if (cards.length === 0 || !cards.every((c) => c.isMatched)) return;
    setScreen('score');
    setGameStatus('win');
    setStats((prev) => {
      const best = prev.bestTimes[difficulty];
      const record = best == null || timer > best;
      return {
        ...prev,
        wins: prev.wins + 1,
        bestTimes: { ...prev.bestTimes, [difficulty]: record ? timer : best },
      };
    });
  }, [cards, difficulty, timer]);

  const handleCardClick = (cardId) => {
    if (lockBoard) return;
    const clicked = cards.find((c) => c.id === cardId);
    if (clicked.isFlipped || clicked.isMatched) return;

    const flipped = cards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c));
    setCards(flipped);
    buzz(8); // soft tick on every flip

    if (selectedCards.length === 0) {
      setSelectedCards([clicked]);
      return;
    }

    // Second pick — counts as a move
    setMoves((m) => m + 1);
    const first = selectedCards[0];

    if (first.value === clicked.value) {
      setCards(flipped.map((c) =>
        c.id === first.id || c.id === cardId ? { ...c, isMatched: true } : c
      ));
      setSelectedCards([]);
      streak.current += 1;
      buzz([12, 30, 22]); // satisfying double-tap on a match
      if (streak.current >= 2) { setCombo(streak.current); setComboKey((k) => k + 1); }
    } else {
      streak.current = 0;
      buzz(30); // one longer buzz on a miss
      setLockBoard(true);
      setTimeout(() => {
        setCards((prev) => prev.map((c) =>
          c.id === first.id || c.id === cardId ? { ...c, isFlipped: false } : c
        ));
        setSelectedCards([]);
        setLockBoard(false);
      }, 900);
    }
  };

  const startGame = (level) => {
    setTimer(TIME_LIMITS[level]);
    setGameStatus(null);
    setCards(generateCards(level));
    setDifficulty(level);
    setMoves(0);
    setCombo(0);
    streak.current = 0;
    setScreen('game');
  };

  // Timer ring geometry
  const R = 30, C = 2 * Math.PI * R;
  const frac = difficulty ? timer / TIME_LIMITS[difficulty] : 1;
  const low = frac <= 0.25;

  return (
    <div className="game-container">
      {combo > 0 && <div className="combo" key={comboKey}><strong>{combo}×</strong> streak</div>}

      <div className="screen" key={screen}>
          {screen === 'welcome' && (
            <div className="panel">
              <p className="eyebrow">A focus game</p>
              <h1 className="title">Card<br />Memory</h1>
              <p className="lede">Flip, remember, match. Beat the clock across three levels — every pair you find buys back a little calm.</p>
              <button className="btn btn--primary" onClick={() => setScreen('difficulty')}>Start Playing</button>
            </div>
          )}

          {screen === 'difficulty' && (
            <Controls onStartGame={startGame} onBack={() => setScreen('welcome')} />
          )}

          {screen === 'game' && (
            <>
              <div className="hud">
                <div className="hud__stat">
                  <span className="hud__label">Moves</span>
                  <span className="hud__value">{moves}</span>
                </div>

                <div className={`ring${low ? ' is-low' : ''}`}>
                  <svg width="66" height="66" viewBox="0 0 66 66">
                    <circle className="ring__track" cx="33" cy="33" r={R} fill="none" strokeWidth="4" />
                    <circle
                      className="ring__fill" cx="33" cy="33" r={R} fill="none" strokeWidth="4"
                      strokeDasharray={C} strokeDashoffset={C * (1 - frac)}
                    />
                  </svg>
                  <span className="ring__num">{timer}</span>
                </div>

                <div className="hud__stat" style={{ textAlign: 'right' }}>
                  <span className="hud__label">Level</span>
                  <span className="hud__value" style={{ textTransform: 'capitalize', fontSize: '1rem' }}>{difficulty}</span>
                </div>
              </div>

              <Board cards={cards} onCardClick={handleCardClick} />

              <button className="btn btn--quiet" style={{ marginTop: 22 }} onClick={() => setScreen('welcome')}>
                Quit game
              </button>
            </>
          )}

          {screen === 'score' && (
            <Stats
              timer={timer}
              moves={moves}
              stats={stats}
              gameStatus={gameStatus}
              onPlayAgain={() => setScreen('difficulty')}
              onHome={() => setScreen('welcome')}
            />
          )}
      </div>
    </div>
  );
}

export default App;

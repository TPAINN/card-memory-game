const Stats = ({ timer, moves, stats, gameStatus, onPlayAgain, onHome }) => {
  const isWin = gameStatus === 'win';

  return (
    <div className="panel">
      <div className={`result-badge result-badge--${isWin ? 'win' : 'lose'}`}>
        {isWin ? '🏆' : '⏳'}
      </div>
      <h2 className={`result-title result-title--${isWin ? 'win' : 'lose'}`}>
        {isWin ? 'You Won' : 'Time’s Up'}
      </h2>
      <p className="result-sub">
        {isWin
          ? `Solved in ${moves} moves with ${timer}s to spare.`
          : 'The board beat the clock this time.'}
      </p>

      <div className="stat-card">
        <h3>This run</h3>
        <div className="stat-row"><span>Moves</span><strong>{moves}</strong></div>
        <div className="stat-row"><span>Time {isWin ? 'left' : 'remaining'}</span><strong>{timer}s</strong></div>

        <h3>Overall</h3>
        <div className="stat-row"><span>Wins</span><strong className="val-emerald">{stats.wins}</strong></div>
        <div className="stat-row"><span>Losses</span><strong className="val-rose">{stats.losses}</strong></div>

        <h3>Personal best · seconds left</h3>
        <div className="stat-row">
          <span>Easy</span>
          {stats.bestTimes.easy != null
            ? <strong className="val-emerald">{stats.bestTimes.easy}s</strong>
            : <strong className="val-empty">—</strong>}
        </div>
        <div className="stat-row">
          <span>Medium</span>
          {stats.bestTimes.medium != null
            ? <strong className="val-gold">{stats.bestTimes.medium}s</strong>
            : <strong className="val-empty">—</strong>}
        </div>
        <div className="stat-row">
          <span>Hard</span>
          {stats.bestTimes.hard != null
            ? <strong className="val-rose">{stats.bestTimes.hard}s</strong>
            : <strong className="val-empty">—</strong>}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn--primary" onClick={onPlayAgain}>Play Again</button>
        <button className="btn btn--ghost" onClick={onHome}>Home</button>
      </div>
    </div>
  );
};

export default Stats;

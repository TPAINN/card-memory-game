const LEVELS = [
  { id: 'easy',   name: 'Easy',   meta: '4 pairs · 30s', cls: 'diff--easy' },
  { id: 'medium', name: 'Medium', meta: '8 pairs · 50s', cls: 'diff--medium' },
  { id: 'hard',   name: 'Hard',   meta: '12 pairs · 80s', cls: 'diff--hard' },
];

const Controls = ({ onStartGame, onBack }) => {
  return (
    <div className="panel">
      <p className="eyebrow">Choose your challenge</p>
      <h2 className="title title--sm">Select Difficulty</h2>

      <div className="diff-grid">
        {LEVELS.map((lvl) => (
          <button key={lvl.id} className={`diff ${lvl.cls}`} onClick={() => onStartGame(lvl.id)}>
            <span className="diff__dot" />
            <span className="diff__name">{lvl.name}</span>
            <span className="diff__meta">{lvl.meta}</span>
          </button>
        ))}
      </div>

      <button className="btn btn--quiet" onClick={onBack}>← Back</button>
    </div>
  );
};

export default Controls;

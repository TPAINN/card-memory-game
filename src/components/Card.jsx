const Card = ({ card, onClick, delay = 0 }) => {
  const revealed = card.isFlipped || card.isMatched;
  return (
    <div
      className={`card${revealed ? ' is-flipped' : ''}${card.isMatched ? ' is-matched' : ''}`}
      onClick={() => onClick(card.id)}
      style={{ animationDelay: `${delay}ms` }}
      role="button"
      aria-label={revealed ? card.value : 'hidden card'}
    >
      <div className="card__face card__back">✦</div>
      <div className="card__face card__front">{card.value}</div>
    </div>
  );
};

export default Card;

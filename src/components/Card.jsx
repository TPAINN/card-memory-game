import { Glyph } from './icons';

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
      <div className="card__face card__back"><span className="card__dot" /></div>
      <div className="card__face card__front"><Glyph name={card.value} className="card__glyph" /></div>
    </div>
  );
};

export default Card;

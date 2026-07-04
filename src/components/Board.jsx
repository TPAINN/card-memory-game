import Card from './Card';

const Board = ({ cards, onCardClick }) => {
  return (
    <div className="grid-container" data-count={cards.length}>
      {cards.map((card, i) => (
        <Card key={card.id} card={card} onClick={onCardClick} delay={i * 30} />
      ))}
    </div>
  );
};

export default Board;

export const MemoryGameCode = {
    installation: "",
    imports: "",
    parameters: "",
    usage: `  <MemoryGame 
        emojis={['🙈', '🚀', '🐶', '🌈', '🎸', '🍕', '🦄', '🏀']}
        questionMarkColor="#30c1f2"
        />`,
    code: `import { useState, useEffect } from 'react';

// Array of emoji pairs for the memory game
const emojiPairs = ['🍎', '🚀', '🐶', '🌈', '🎸', '🍕', '🦄', '🏀'];
const defaultQuestionMarkColor = "#000";

export default function MemoryGame() {
  // Adding game statistics
  const emojis = emojiPairs;
  const questionMarkColor = defaultQuestionMarkColor;
  const [moves, setMoves] = useState(0);
  const [matchesFound, setMatchesFound] = useState(0);
  
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableDeck, setDisableDeck] = useState(false);
  const [shake, setShake] = useState([]);

  // Initialize cards with shuffled emojis
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if game is won and reset
  useEffect(() => {
    if (matched.length === emojis.length * 2 && matched.length > 0) {
      setMatchesFound(emojis.length);
      setTimeout(() => {
        resetGame();
      }, 1000);
    }
  }, [matched]);

  // Handle flipped cards
  useEffect(() => {
    if (flipped.length === 2) {
      setDisableDeck(true);
      
      const [firstIndex, secondIndex] = flipped;
      
      if (cards[firstIndex] === cards[secondIndex]) {
        // Cards match
        setMatched(prev => [...prev, firstIndex, secondIndex]);
        resetFlippedCards();
      } else {
        // Cards don't match, shake them
        setShake([firstIndex, secondIndex]);
        
        // Reset shake and flip back after delay
        setTimeout(() => {
          setShake([]);
          resetFlippedCards();
        }, 1000);
      }
    }
  }, [flipped]);

  const resetFlippedCards = () => {
    setFlipped([]);
    setDisableDeck(false);
  };

  const shuffleCards = () => {
    // Create array with pairs of emojis
    const duplicatedEmojis = [...emojis, ...emojis];
    
    // Shuffle the array
    const shuffledEmojis = duplicatedEmojis
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledEmojis);
    setFlipped([]);
    setMatched([]);
    setShake([]);
    setDisableDeck(false);
    setMoves(0);
    setMatchesFound(0);
  };

  const resetGame = () => {
    setTimeout(() => {
      shuffleCards();
    }, 500);
  };

  const handleCardClick = (index) => {
    // Don't allow flipping if deck is disabled or card is already flipped/matched
    if (disableDeck || flipped.includes(index) || matched.includes(index)) {
      return;
    }
    
    // Only allow flipping 2 cards at a time
    if (flipped.length < 2) {
      setFlipped(prev => [...prev, index]);
      if (flipped.length === 1) {
        setMoves(moves => moves + 1);
      }
    }
  };

  const isCardFlipped = (index) => {
    return flipped.includes(index) || matched.includes(index);
  };

  const isCardShaking = (index) => {
    return shake.includes(index);
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-80 md:w-96">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">Moves: {moves}</div>
        <div className="text-sm font-medium">Matches: {matchesFound}/{emojis.length}</div>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full">
        {cards.map((emoji, index) => (
          <div 
            key={index}
            onClick={() => handleCardClick(index)}
            className={\`
              relative h-16 w-16 cursor-pointer
              rounded-xl transform transition-all duration-300
              \${isCardShaking(index) ? 'animate-shake' : ''}
              \${isCardFlipped(index) ? '' : 'hover:scale-105'}
            \`}
          >
            <div 
              className={\`
                w-full h-full absolute flex items-center justify-center
                rounded-xl shadow-md 
                bg-gradient-to-br from-indigo-100 to-indigo-200
                transform transition-all duration-500 ease-in-out
                \${isCardFlipped(index) ? 'rotateY-180 opacity-0' : 'opacity-100'}
              \`}
            >
              <span className="text-2xl font-extrabold" style={{color: questionMarkColor}}>?</span>
            </div>
            
            <div 
              className={\`
                w-full h-full absolute flex items-center justify-center
                rounded-xl shadow-md 
                \${matched.includes(index) 
                  ? 'bg-gradient-to-br from-green-100 to-green-200' 
                  : 'bg-gradient-to-br from-indigo-50 to-white'}
                transform transition-all duration-500 ease-in-out
                \${isCardFlipped(index) ? 'opacity-100 scale-100' : 'rotateY-180 opacity-0 scale-90'}
              \`}
            >
              <span className={\`text-4xl transform transition-all duration-500 \${matched.includes(index) ? 'animate-bounce' : ''}\`}>
                {emoji}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={resetGame}
        className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Reset Game
      </button>
      
      <style jsx>{\`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      \`}</style>
    </div>
  );
}`
};

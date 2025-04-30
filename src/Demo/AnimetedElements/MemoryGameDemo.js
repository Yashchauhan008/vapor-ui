import React from 'react'
import MemoryGame from '../../content/AnimatedElements/MemoryGame';
const ChandelierDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box p-16">
        <MemoryGame 
        emojis={['🙈', '🚀', '🐶', '🌈', '🎸', '🍕', '🦄', '🏀']}
        questionMarkColor="#30c1f2"
        />
        </div>
        <div className="states">
          <h3>Customization</h3>
          <h3>Props</h3>
          <h3>Dependencies</h3>
        </div>
      </div>
    </>
  )
}

export default ChandelierDemo
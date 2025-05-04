import React from 'react'
import MemoryGame from '../../content/AnimatedElements/MemoryGame';
import PropsTable from '../../components/PropTable';
import DependencyList from '../../components/DependencyList';
const ChandelierDemo = () => {

  const props = [
    {
      property: "emojis",
      type: "string[]",
      default: "['🍎', '🚀', '🐶', '🌈', '🎸', '🍕', '🦄', '🏀']",
      description: "An array of emoji strings used to generate matching card pairs for the memory game."
    },
    {
      property: "questionMarkColor",
      type: "string (CSS color)",
      default: '"#000"',
      description: "Color of the question mark shown on the back of unflipped cards."
    }
  ];

  const deps = ["react"]

  
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
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={deps}/>
        </div>
      </div>
    </>
  )
}

export default ChandelierDemo
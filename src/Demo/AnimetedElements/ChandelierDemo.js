import React from 'react'
import Chandelier from '../../content/AnimatedElements/Chandelier';
const ChandelierDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box" style={{paddingTop: '0px'}}>
        <Chandelier color="#fff" lightColor="#01EBFF"/>
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
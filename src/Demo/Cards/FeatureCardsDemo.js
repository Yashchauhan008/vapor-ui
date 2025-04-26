import React from 'react'
import FeatureCards from '../../content/Cards/FeatureCards'

const FeatureCardsDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
          <FeatureCards/>
        </div>
        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div>
          <h3>Props</h3>
          <h3>Dependencies</h3>
        </div>
      </div>
    </>
  )
}

export default FeatureCardsDemo
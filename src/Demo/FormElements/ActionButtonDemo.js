import React from 'react'
import Button1 from '../../content/FormElements/ActionButton'


const ActionButtonDemo = () => {
  return (
    <>
  <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-5 p-12">
          <Button1
            circleColor={["#01EBFF", "#01EBFF90"]}
            hoverTextColor="#000"
            fontWeight="thin"
          >
            Welcome Champ 😎
          </Button1>
          <Button1 circleColor="#FF5733" fontWeight="light">Login 🙏🏻</Button1>
          <Button1 circleColor={["#FF5733", "#FFC300"]} fontWeight="bold">Explore</Button1>
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

export default ActionButtonDemo
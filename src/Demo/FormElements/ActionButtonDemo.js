import React from 'react'
import ActionButton from '../../content/FormElements/ActionButton'
import DependencyList from '../../components/DependencyList';
import PropsTable from '../../components/PropTable';


const ActionButtonDemo = () => {
  const props = [
    {
      property: "children",
      type: "ReactNode",
      default: "undefined (required)",
      description: "The text or JSX content to display inside the button."
    },
    {
      property: "circleColor",
      type: "string | [string, string]",
      default: '"#01EBFF"',
      description: "Color for the expanding circle background. Can be a solid color (string) or a gradient as an array of two strings."
    },
    {
      property: "hoverTextColor",
      type: "string",
      default: '"#fff"',
      description: "Text color on hover. Applied via CSS custom property."
    },
    {
      property: "fontWeight",
      type: "string",
      default: '"bold"',
      description: "Font weight for the button text. Accepts Tailwind-compatible weight values (e.g., 'light', 'semibold', 'extrabold')."
    }
  ];

  
  return (
    <>
  <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-5 p-12">
          <ActionButton
            circleColor={["#01EBFF", "#01EBFF90"]}
            hoverTextColor="#000"
            fontWeight="thin"
          >
            Welcome Champ 😎
          </ActionButton>
          <ActionButton circleColor="#FF5733" fontWeight="light">Login 🙏🏻</ActionButton>
          <ActionButton circleColor={["#FF5733", "#FFC300"]} fontWeight="bold">Explore</ActionButton>
        </div>
        <div className="states">
          {/* <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div> */}
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={["react"]}/>
        </div>
      </div>
    </>
  )
}

export default ActionButtonDemo
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppleDock from "../../content/AnimatedElements/AppleDock";
import tikTok from "../../assets/images/appleDockImages/tik-tok.png";
import instagram from "../../assets/images/appleDockImages/instagram.png";
import tinder from "../../assets/images/appleDockImages/connection.png";
import spotify from "../../assets/images/appleDockImages/spotify.png";
import slack from "../../assets/images/appleDockImages/slack.png";
import figma from "../../assets/images/appleDockImages/figma.png";
import chrome from "../../assets/images/appleDockImages/chrome.png";
import PropTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

// Import the force rerender hook
const useForceRerender = () => {
  const [key, setKey] = useState(0);

  const forceRerender = React.useCallback(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  return [key, forceRerender];
};

const AppleDockDemo = () => {
  // Force rerender hook
  const [renderKey, forceRerender] = useForceRerender();

  // Default items data
  const defaultItems = [
    { id: 1, name: "Finder", imageurl: tikTok },
    { id: 2, name: "Safari", imageurl: instagram },
    { id: 3, name: "Messages", imageurl: tinder },
    { id: 4, name: "Mail", imageurl: spotify },
    { id: 5, name: "Photos", imageurl: slack },
    { id: 6, name: "Music", imageurl: figma },
    { id: 7, name: "Settings", imageurl: chrome },
  ];

  // State for customizable properties
  const [items, setItems] = useState(defaultItems);
  const [baseSize, setBaseSize] = useState(56);
  const [baseGap, setBaseGap] = useState(12);
  const [hoverScale, setHoverScale] = useState(1.8);
  const [neighborScale, setNeighborScale] = useState(1.4);
  const [secondNeighborScale, setSecondNeighborScale] = useState(1.2);
  const [itemCount, setItemCount] = useState(defaultItems.length);

  // Update items array when count changes
  useEffect(() => {
    if (itemCount > defaultItems.length) {
      // Add items if needed
      const newItems = [...items];
      for (let i = items.length + 1; i <= itemCount; i++) {
        // Cycle through available images
        const imageIndex = (i - 1) % defaultItems.length;
        newItems.push({
          id: i,
          name: `Item ${i}`,
          image: defaultItems[imageIndex].image,
        });
      }
      setItems(newItems);
    } else {
      // Remove items if needed
      setItems(items.slice(0, itemCount));
    }
    forceRerender(); // Force rerender when items change
  }, [itemCount]);

  // Handle slider changes with force rerender
  const handleSliderChange = (setter, value, shouldForceRerender = true) => {
    setter(value);
    if (shouldForceRerender) {
      forceRerender();
    }
  };

  // Dock props documentation
  const dockProps = [
    {
      property: "items",
      type: "Array",
      default: "[]",
      description:
        "Array of items to display in the dock. Each item should have id, name, and image properties.",
    },
    {
      property: "baseSize",
      type: "number",
      default: "56",
      description: "Base size in pixels for dock items when not hovered.",
    },
    {
      property: "baseGap",
      type: "number",
      default: "12",
      description: "Gap between dock items in pixels.",
    },
    {
      property: "hoverScale",
      type: "number",
      default: "1.8",
      description: "Scale factor applied to the item being hovered.",
    },
    {
      property: "neighborScale",
      type: "number",
      default: "1.4",
      description:
        "Scale factor applied to the direct neighbors of the hovered item.",
    },
    {
      property: "secondNeighborScale",
      type: "number",
      default: "1.2",
      description:
        "Scale factor applied to the second neighbors of the hovered item.",
    },
  ];

  const deps = ["react","framer-motion"]
  return (
    <>
      <div className="demo-box">
        <div className="preview-box bg-black p-6 rounded-lg mb-6">
          <AppleDock
            key={renderKey} // Apply the render key for forced updates
            items={items}
            baseSize={baseSize}
            baseGap={baseGap}
            hoverScale={hoverScale}
            neighborScale={neighborScale}
            secondNeighborScale={secondNeighborScale}
          />
        </div>
        <div className="states">
          <h3 className="text-xl font-medium mb-4">Customization</h3>
          <div className="customization-box rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="customization-item">
                <label className="text-gray-300 mb-2">Item Count</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={itemCount}
                    onChange={(e) => setItemCount(parseInt(e.target.value))}
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {itemCount}
                  </span>
                </div>
              </div>

              <div className="customization-item">
                <label className="block text-gray-300 mb-2">
                  Base Size (px)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="30"
                    max="80"
                    value={baseSize}
                    onChange={(e) =>
                      handleSliderChange(setBaseSize, parseInt(e.target.value))
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {baseSize}
                  </span>
                </div>
              </div>

              <div className="customization-item">
                <label className="block text-gray-300 mb-2">
                  Base Gap (px)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={baseGap}
                    onChange={(e) =>
                      handleSliderChange(setBaseGap, parseInt(e.target.value))
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {baseGap}
                  </span>
                </div>
              </div>

              <div className="customization-item">
                <label className="block text-gray-300 mb-2">Hover Scale</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.1"
                    value={hoverScale}
                    onChange={(e) =>
                      handleSliderChange(
                        setHoverScale,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {hoverScale.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="customization-item">
                <label className="block text-gray-300 mb-2">
                  Neighbor Scale
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={neighborScale}
                    onChange={(e) =>
                      handleSliderChange(
                        setNeighborScale,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {neighborScale.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="customization-item">
                <label className="block text-gray-300 mb-2">
                  Second Neighbor Scale
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="1.8"
                    step="0.1"
                    value={secondNeighborScale}
                    onChange={(e) =>
                      handleSliderChange(
                        setSecondNeighborScale,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {secondNeighborScale.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-medium mb-4">Props</h3>

          <PropTable properties={dockProps}/>

          <h3 className="text-xl font-medium mb-4">Dependencies</h3>
          <DependencyList deps={deps}/>
          
        </div>
      </div>
      <style jsx>{`
        .props-table-wrapper {
          border-radius: 8px;
          overflow: hidden;
          background-color: #000;
        }

        .props-table th {
          font-weight: normal;
          color: #ddd;
          padding: 16px;
          text-align: left;
        }

        .props-table td {
          padding: 16px;
        }

        .props-table tr {
          border-bottom: 1px solid #222;
        }

        .props-table tr:last-child {
          border-bottom: none;
        }

        input[type="range"] {
          height: 5px;
          background: #444;
          border-radius: 5px;
          -webkit-appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AppleDockDemo;

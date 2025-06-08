// export default function PropsTable({ properties }) {
//     const propsList = properties || [];
  
//     // Determine which fields are present in at least one object
//     const showType = propsList.some(prop => prop.type);
//     const showDefault = propsList.some(prop => prop.default);
//     const showDescription = propsList.some(prop => prop.description);
  
//     return (
//       <div className="rounded-lg overflow-hidden bg-black mb-6">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b border-gray-800">
//               <th className="p-4 text-left text-gray-500">Property</th>
//               {showType && <th className="p-4 text-left text-gray-500">Type</th>}
//               {showDefault && <th className="p-4 text-left text-gray-500">Default</th>}
//               {showDescription && (
//                 <th className="p-4 text-left text-gray-500">Description</th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {propsList.map((prop, index) => (
//               <tr key={index} className="border-b border-gray-800">
//                 <td className="p-4">
//                   <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md">
//                     {prop.property}
//                   </span>
//                 </td>
//                 {showType && (
//                   <td className="p-4 text-gray-400">{prop.type || "-"}</td>
//                 )}
//                 {showDefault && (
//                   <td className="p-4">
//                     <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md">
//                       {prop.default || "-"}
//                     </span>
//                   </td>
//                 )}
//                 {showDescription && (
//                   <td className="p-4 text-gray-300">{prop.description || "-"}</td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
  

export default function PropsTable({ properties }) {
  const propsList = properties || [];

  // Determine which fields are present in at least one object
  const showType = propsList.some(prop => prop.type);
  const showDefault = propsList.some(prop => prop.default);
  const showDescription = propsList.some(prop => prop.description);

  return (
    <div className="rounded-lg overflow-hidden bg-black mb-6">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="p-4 text-left text-gray-500">Property</th>
              {showType && <th className="p-4 text-left text-gray-500">Type</th>}
              {showDefault && <th className="p-4 text-left text-gray-500">Default</th>}
              {showDescription && (
                <th className="p-4 text-left text-gray-500">Description</th>
              )}
            </tr>
          </thead>
          <tbody>
            {propsList.map((prop, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="p-4">
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md">
                    {prop.property}
                  </span>
                </td>
                {showType && (
                  <td className="p-4 text-gray-400">{prop.type || "-"}</td>
                )}
                {showDefault && (
                  <td className="p-4">
                    <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md">
                      {prop.default || "-"}
                    </span>
                  </td>
                )}
                {showDescription && (
                  <td className="p-4 text-gray-300">{prop.description || "-"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        {propsList.map((prop, index) => (
          <div key={index} className="border-b border-gray-800 p-4 last:border-b-0">
            <div className="mb-3">
              <span className="text-gray-500 text-sm font-medium">Property</span>
              <div className="mt-1">
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md">
                  {prop.property}
                </span>
              </div>
            </div>
            
            {showType && prop.type && (
              <div className="mb-3">
                <span className="text-gray-500 text-sm font-medium">Type</span>
                <div className="mt-1 text-gray-400">{prop.type}</div>
              </div>
            )}
            
            {showDefault && prop.default && (
              <div className="mb-3">
                <span className="text-gray-500 text-sm font-medium">Default</span>
                <div className="mt-1">
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md">
                    {prop.default}
                  </span>
                </div>
              </div>
            )}
            
            {showDescription && prop.description && (
              <div className="mb-0">
                <span className="text-gray-500 text-sm font-medium">Description</span>
                <div className="mt-1 text-gray-300">{prop.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
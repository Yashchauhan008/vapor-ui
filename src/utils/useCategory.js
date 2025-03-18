import { useParams } from "react-router-dom";

const useCategory = () => {
  const { category, subcategory } = useParams();

  // Function to format category names (replace "-" with " " and capitalize)
  const formatName = (name) => {
    return name
      ? name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
  };

  return {
    category: formatName(category),
    subcategory: formatName(subcategory),
  };
};

export default useCategory;

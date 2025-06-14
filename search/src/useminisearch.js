import { useEffect, useState, useRef } from "react";
import MiniSearch from "minisearch";

const useMiniSearch = () => {
  const [products, setProducts] = useState([]);
  const miniSearchRef = useRef(
    new MiniSearch({
      fields: ["title", "category"],
      storeFields: ["title", "category", "id"],
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      miniSearchRef.current.removeAll();
      miniSearchRef.current.addAll(data);
    };

    fetchData();
  }, []);

  return {
    products,
    miniSearch: miniSearchRef.current,
  };
};

export default useMiniSearch;

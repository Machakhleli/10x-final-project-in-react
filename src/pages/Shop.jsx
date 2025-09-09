import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import SearchInput from "../components/SearchInput";

const PRODUCTS = [
  {
    id: 1,
    name: "Office Chair",
    category: "Furniture",
    price: 120,
    description: "Ergonomic office chair with lumbar support.",
  },
  {
    id: 2,
    name: "Laptop Desk",
    category: "Furniture",
    price: 200,
    description: "Portable adjustable desk for laptops.",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Sportswear",
    price: 80,
    description: "Lightweight running shoes with cushioning.",
  },
  {
    id: 4,
    name: "Basketball",
    category: "Sportswear",
    price: 50,
    description: "Official size basketball for indoor and outdoor use.",
  },
  {
    id: 5,
    name: "Smartphone",
    category: "Electronics",
    price: 799,
    description: "Latest-gen smartphone with OLED display.",
  },
  {
    id: 6,
    name: "Headphones",
    category: "Electronics",
    price: 199,
    description: "Noise-cancelling over-ear headphones.",
  },
  {
    id: 7,
    name: "T-shirt",
    category: "Clothing",
    price: 25,
    description: "Comfortable cotton t-shirt available in multiple colors.",
  },
  {
    id: 8,
    name: "Jeans",
    category: "Clothing",
    price: 60,
    description: "Slim fit denim jeans with stretch fabric.",
  },
  {
    id: 9,
    name: "Coffee Table",
    category: "Furniture",
    price: 150,
    description: "Stylish wooden coffee table for living rooms.",
  },
  {
    id: 10,
    name: "Smartwatch",
    category: "Electronics",
    price: 250,
    description: "Fitness tracking smartwatch with heart-rate monitor.",
  },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const categories = [
    "All",
    "Furniture",
    "Sportswear",
    "Electronics",
    "Clothing",
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Shop</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <SearchInput onSearch={setSearchQuery} />
      </div>

      {/* Products */}
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/shop/${product.id}`)}
              className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-bold text-blue-600">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-500">
          {searchQuery || selectedCategory !== "All"
            ? "No matching products"
            : "No products available"}
        </p>
      )}

      {/* Load More */}
      {visibleCount < filteredProducts.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export { PRODUCTS };

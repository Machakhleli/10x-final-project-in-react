import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import SearchInput from "../components/SearchInput";

export const PRODUCTS = [
  {
    id: 1,
    name: "Office Chair",
    category: "Furniture",
    price: 120,
    description: "Ergonomic office chair with lumbar support.",
    image:
      "https://newtralchair.com/cdn/shop/files/2d_-1_2454075d-b257-4c0d-8e4f-780f64f12297.jpg?v=1730702081",
  },
  {
    id: 2,
    name: "Laptop Desk",
    category: "Furniture",
    price: 200,
    description: "Portable adjustable desk for laptops.",
    image: "https://i.ebayimg.com/images/g/yWQAAeSwANVowPZC/s-l1600.webp",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Sportswear",
    price: 80,
    description: "Lightweight running shoes with cushioning.",
    image:
      "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/g/20/d4dc0b57-e3a4-43f7-9aca-4ad75f723b86.jpg",
  },
  {
    id: 4,
    name: "Basketball",
    category: "Sportswear",
    price: 50,
    description: "Official size basketball for indoor and outdoor use.",
    image: "https://m.media-amazon.com/images/I/7130TNMAnYL._AC_SX679_.jpg",
  },
  {
    id: 5,
    name: "Smartphone",
    category: "Electronics",
    price: 1399,
    description: "Latest-gen smartphone with OLED display.",
    image:
      "https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2Ffd6e39f8-dfc5-4b86-b91c-99cc6493ce06_Thumb.jpeg&w=384&q=100",
  },
  {
    id: 6,
    name: "Headphones",
    category: "Electronics",
    price: 199,
    description: "Noise-cancelling over-ear headphones.",
    image:
      "https://gamezone.ge/images/thumbnails/570/570/detailed/23/LOGITECH_G_PRO_X2_LIGHTSPEED_Wireless_Gaming_Headset_-_Blue_Mic_-_BLACK_L981-001263.jpg.png",
  },
  {
    id: 7,
    name: "Smart Watch",
    category: "Electronics",
    price: 800,
    description: "Fitness tracker and smartwatch.",
    image: "https://pcshop.ge/wp-content/uploads/2025/08/I35265.jpg",
  },
  {
    id: 8,
    name: "Yoga Mat",
    category: "Sportswear",
    price: 30,
    description: "Non-slip yoga mat for home workouts.",
    image: "https://i.ebayimg.com/images/g/Jv8AAOSwuJRiLlec/s-l1600.webp",
  },
  {
    id: 9,
    name: "Desk Lamp",
    category: "Furniture",
    price: 45,
    description: "Adjustable LED desk lamp with dimming options.",
    image:
      "https://m.media-amazon.com/images/I/71c2qNppclL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
  },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
const PAGE_SIZE = 6;

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const navigate = useNavigate();

  const filteredProducts = PRODUCTS.filter((product) => {
    const isCategoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const isSearchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Our Products
        </h1>
        <p className="text-gray-500 mt-2">
          Find exactly what you're looking for.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <CategoryFilter
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <SearchInput onSearch={setSearchQuery} />
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/shop/${product.id}`)}
              className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-bold text-blue-600 mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-500 text-lg">
          No matching products.
        </p>
      )}

      {visibleCount < filteredProducts.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

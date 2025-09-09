import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../pages/Shop";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-blue-600 font-semibold text-xl">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

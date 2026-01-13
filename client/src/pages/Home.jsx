import React, { useEffect, useMemo, useState, useContext } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setError(null);
      setLoading(true);
      try {
        const res = await api.get("/item/get-item");
        if (!mounted) return;
        const data = res?.data?.data || res?.data?.items || res?.data || [];
        const arr = Array.isArray(data) ? data : [];
        setItems(arr);

        const mapped = arr.map((it) => ({
          id: it._id || it.id || String(Math.random()).slice(2, 9),
          name: it.title || it.name || "Untitled product",
          price:
            typeof it.price !== "undefined" && it.price !== null
              ? Number(it.price)
              : 0,
          category: it.category || it.categoryName || "Uncategorized",
          image:
            it.image || it.imageUrl || "https://via.placeholder.com/600x400?text=Product",
        }));
        setProducts(mapped);
      } catch (err) {
        if (!mounted) return;
        if (err?.response?.status === 404) {
          setItems([]);
        } else if (err?.response?.status === 401) {
          setError("Unauthorized — please login");
        } else {
          setError(err?.response?.data?.message || err.message || "Failed to load items");
        }
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const categories = useMemo(() => {
    const setC = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(setC)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, query, category, sort]);

  return (
    <div className="max-w-[1200px] mx-auto p-5 font-inter text-gray-900">
      {/* Big Hero */}
      <div
        className="w-full h-[300px] rounded-xl overflow-hidden mb-5 flex items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=1400&q=80&auto=format&fit=crop')",
        }}
      >
        <div className="pl-10 text-left">
          <h2 className="text-4xl font-extrabold">Summer Sale — Up to 50% off</h2>
          <p className="mt-1 text-base">Limited time offers across our bestselling collections.</p>
          <div className="mt-3">
            <button className="px-3 py-2 bg-white text-gray-900 rounded-lg font-semibold">
              Shop Offers
            </button>
          </div>
        </div>
      </div>

      {/* Header + Filters Toggle */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-semibold">Products</h2>
          <span className="text-gray-500 text-sm">{filtered.length} result(s)</span>
        </div>

        <button
          onClick={() => setShowFilters((s) => !s)}
          aria-expanded={showFilters}
          aria-controls="filter-panel"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div
          id="filter-panel"
          className="flex gap-3 items-center mb-3"
        >
          <div>
            <label className="block mb-1">Category</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Sort</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price — Low to High</option>
              <option value="price-desc">Price — High to Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 mt-4">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full bg-white"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-[140px] object-cover"
            />
            <div className="p-3 flex flex-col gap-2 flex-1">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-gray-500 text-sm">{p.category}</div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div className="font-bold">₹{p.price.toFixed(2)}</div>
                <button
                  onClick={() => addToCart(p)}
                  className="px-2 py-1 bg-gray-900 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 mt-4">No products found. Try a different search.</p>
      )}
    </div>
  );
}
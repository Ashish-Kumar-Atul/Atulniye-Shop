import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Simple cart page matching the site's theme. Uses localStorage key 'cart' as an array of items:
// { id, name, price, image, qty }

const styles = {
  page: {
    fontFamily:
      "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: '#111827',
    padding: 20,
    maxWidth: 1100,
    margin: '0 auto',
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  muted: { color: '#6b7280', fontSize: 13 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  card: { display: 'flex', gap: 12, padding: 12, borderRadius: 10, background: 'white', border: '1px solid #e6e6e6' },
  img: { width: 96, height: 72, objectFit: 'cover', borderRadius: 8 },
  qtyRow: { display: 'flex', gap: 8, alignItems: 'center' },
  smallBtn: { padding: '6px 8px', borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' },
  checkoutBox: { padding: 16, borderRadius: 10, background: 'white', border: '1px solid #e6e6e6' },
  primaryBtn: { padding: '10px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 },
};

const SAMPLE = [
  { id: 'p1', name: 'Handcrafted Leather Wallet', price: 29.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=60&auto=format&fit=crop', qty: 1 },
  { id: 'p4', name: 'Ceramic Mug — Matte White', price: 12.0, image: 'https://images.unsplash.com/photo-1517686469429-8a3f1d5f1b2b?w=800&q=60&auto=format&fit=crop', qty: 2 },
];

export default function MyCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) {
        setCart(JSON.parse(raw));
      } else {
        // seed with sample data so the page isn't empty
        setCart(SAMPLE);
      }
    } catch (e) {
      setCart(SAMPLE);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  function updateQty(id, qty) {
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it)));
  }

  function removeItem(id) {
    setCart((c) => c.filter((it) => it.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((s, it) => s + it.price * (it.qty || 1), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = +(subtotal * 0.06).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>Your Cart</h1>
          <div style={styles.muted}>{cart.length} item(s)</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ ...styles.smallBtn }}>Continue shopping</button>
          </Link>
          <button onClick={clearCart} style={{ ...styles.smallBtn }}>Clear</button>
        </div>
      </div>

      <div style={styles.grid}>
        <div>
          <div style={styles.list}>
            {cart.length === 0 && (
              <div style={{ padding: 20, borderRadius: 10, background: 'white', border: '1px solid #e6e6e6' }}>
                <p style={{ margin: 0 }}>Your cart is empty.</p>
                <div style={{ marginTop: 8 }}>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <button style={styles.primaryBtn}>Continue shopping</button>
                  </Link>
                </div>
              </div>
            )}

            {cart.map((it) => (
              <div key={it.id} style={styles.card}>
                <img src={it.image} alt={it.name} style={styles.img} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 700 }}>{it.name}</div>
                  <div style={styles.muted}>{(it.price || 0).toFixed(2)}</div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={styles.qtyRow}>
                      <button onClick={() => updateQty(it.id, (it.qty || 1) - 1)} style={styles.smallBtn} aria-label="Decrease">-</button>
                      <div style={{ minWidth: 28, textAlign: 'center' }}>{it.qty || 1}</div>
                      <button onClick={() => updateQty(it.id, (it.qty || 1) + 1)} style={styles.smallBtn} aria-label="Increase">+</button>
                    </div>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ fontWeight: 800 }}>${((it.price || 0) * (it.qty || 1)).toFixed(2)}</div>
                      <button onClick={() => removeItem(it.id)} style={{ ...styles.smallBtn }}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside style={styles.checkoutBox}>
          <h3 style={{ marginTop: 0 }}>Order summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={styles.muted}>Subtotal</div>
            <div>₹{subtotal.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={styles.muted}>Shipping</div>
            <div>₹{shipping.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={styles.muted}>Tax</div>
            <div>₹{tax.toFixed(2)}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, marginBottom: 12 }}>
            <div>Total</div>
            <div>₹{total.toFixed(2)}</div>
          </div>

          <div>
            <button style={{ ...styles.primaryBtn, width: '100%' }} onClick={() => alert('Checkout placeholder')}>Checkout</button>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 28, color: '#6b7280', fontSize: 13 }}>
        Questions? Email support@atulniye.example
      </div>
    </div>
  );
}

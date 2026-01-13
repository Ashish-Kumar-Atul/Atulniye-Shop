import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3 text-white">
              <img src="/vite.svg" alt="Atulniye" className="h-10 w-auto" />
              <span className="text-2xl font-bold">AtulniyeShop</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-gray-400">
              AtulniyeShop brings you curated collections of apparel, accessories and home goods — thoughtfully made and
              sustainably sourced.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-300">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/shop" className="text-gray-400 hover:text-white">All Products</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
              <li><Link to="/deals" className="text-gray-400 hover:text-white">Deals</Link></li>
              <li><Link to="/gift-cards" className="text-gray-400 hover:text-white">Gift Cards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-300">Customer Service</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Shipping & Returns</Link></li>
              <li><Link to="/payment" className="hover:text-white">Payment Options</Link></li>
              <li><Link to="/track-order" className="hover:text-white">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-300">Get our newsletter</h3>
            <p className="mt-4 text-sm text-gray-400">Sign up for early access to new collections, promotions, and exclusive offers.</p>
            <form className="mt-4 flex w-full max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-l-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none" placeholder="you@example.com" />
              <button type="submit" className="ml-2 inline-flex items-center rounded-r-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">Subscribe</button>
            </form>
            <div className="mt-6 text-sm text-gray-400">
              <div>Contact us: <a href="mailto:support@atulniyeshop.com" className="text-gray-200 hover:underline">support@atulniyeshop.com</a></div>
              <div className="mt-2">Phone: +1 (555) 123-4567</div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-sm text-gray-500">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} AtulniyeShop. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

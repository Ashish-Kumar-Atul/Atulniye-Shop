import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, MagnifyingGlassIcon, UserCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarDefault() {
  const [query, setQuery] = useState('')
  const { cartCount } = useCart();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  async function handleLogout(e) {
    e.preventDefault()
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.warn('Logout error', err)
    } finally {
      setUser(null)
      navigate('/')
    }
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex items-center gap-2">
                    <img className="h-8 w-auto" src="/vite.svg" alt="Logo" />
                    <span className="font-semibold text-gray-800">AtulniyeShop</span>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">

                  <NavLink to="/" className={({ isActive }) => classNames('px-3 py-2 text-sm font-medium', isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900')}>Home</NavLink>

                  {user?.role === "user" && (<NavLink to="/shop" className={({ isActive }) => classNames('px-3 py-2 text-sm font-medium', isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900')}>Shop</NavLink>)}

                  {user?.role === "seller" && (<NavLink to="/my-products" className={({ isActive }) => classNames('px-3 py-2 text-sm font-medium', isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900')}>My Products</NavLink>)}

                  {user?.role === "seller" && (<NavLink to="/my-stats" className={({ isActive }) => classNames('px-3 py-2 text-sm font-medium', isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900')}>My Stats</NavLink>)}
                  
                  {user?.role === "user" && (
                    <Menu as="div" className="relative">
                      <Menu.Button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Categories</Menu.Button>
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to="/categories/men" className={classNames('block px-4 py-2 text-sm', active ? 'bg-gray-100' : 'text-gray-700')}>Men</NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to="/categories/women" className={classNames('block px-4 py-2 text-sm', active ? 'bg-gray-100' : 'text-gray-700')}>Women</NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink to="/categories/home" className={classNames('block px-4 py-2 text-sm', active ? 'bg-gray-100' : 'text-gray-700')}>Home</NavLink>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  )}
                  


                  {user?.role === "user" && (
                    <NavLink to="/my-orders" className={({ isActive }) => classNames('px-3 py-2 text-sm font-medium', isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900')}>My Orders</NavLink>
                  )}
                  </div>
              </div>

              <div className="flex flex-1 items-center justify-center px-2 md:ml-6 md:justify-end">
                <div className="w-full max-w-lg md:max-w-xs">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Search products..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Cart, Profile and Login button */}

                {user?.role === "user" && (
                    <div className="ml-4 flow-root lg:ml-6">
                      <Link to="/my-cart" className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon className="h-6 w-6 text-gray-700 group-hover:text-gray-900" aria-hidden="true" />
                          <span className="ml-2 text-sm font-medium text-gray-700">{cartCount}</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </Link>
                    </div>
                )}

                {user?.role === "seller" && (
                  <div className="ml-4 flow-root lg:ml-6">
                      <Link to="/add-item" className="group -m-2 flex items-center p-2">
                          <PlusIcon className="h-6 w-6 text-gray-700 group-hover:text-gray-900" aria-hidden="true" />
                          <span className="ml-2 text-sm font-medium text-gray-700">Add</span>
                          <span className="sr-only">Add new product</span>
                        </Link>
                    </div>
                )}

                  {user? (
                  <>
                    <div className="ml-4 flow-root lg:ml-6">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon className="h-6 w-6 text-gray-700" />
                          </Menu.Button>
                        </div>
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Account</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Orders</a>
                            <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700">Logout</button>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </>
                  ) : (
                    <div className="ml-3 hidden sm:flex sm:items-center">
                      <Link to="/login" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Login
                      </Link>
                    </div>
                  ) }
              </div>
            </div>
          </div>


          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavLink to="/" className={({ isActive }) => classNames('block rounded-md px-3 py-2 text-base font-medium', isActive ? 'text-indigo-600' : 'text-gray-700')}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => classNames('block rounded-md px-3 py-2 text-base font-medium', isActive ? 'text-indigo-600' : 'text-gray-700')}>Shop</NavLink>
              <div className="px-3">
                <details className="rounded-md">
                  <summary className="cursor-pointer py-2 text-base font-medium text-gray-700">Categories</summary>
                  <div className="mt-2 space-y-1 pl-4">
                    <NavLink to="/categories/men" className="block text-gray-700">Men</NavLink>
                    <NavLink to="/categories/women" className="block text-gray-700">Women</NavLink>
                    <NavLink to="/categories/home" className="block text-gray-700">Home</NavLink>
                  </div>
                </details>
              </div>
              <NavLink to="/deals" className={({ isActive }) => classNames('block rounded-md px-3 py-2 text-base font-medium', isActive ? 'text-indigo-600' : 'text-gray-700')}>Deals</NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
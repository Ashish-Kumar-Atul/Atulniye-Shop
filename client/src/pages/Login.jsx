import React, { useState, useContext } from 'react'
import api from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Login() {
	const navigate = useNavigate()
	const { setUser, checkAuth } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState(null)

	async function handleSubmit(e) {
    
		e.preventDefault()
		setError(null)
		setSubmitting(true)
		try {
			const res = await api.post('/auth/login-user', { email, password })
			if (res?.data?.user) {
				setUser(res.data.user)
				if (typeof checkAuth === 'function') checkAuth()
				navigate('/')
			} else {
				setError(res?.data?.message || 'Login failed')
			}
		} catch (err) {
			setError(err?.response?.data?.message || err.message || 'Network error')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				{/* Left visual panel */}
				<div className="hidden md:flex flex-col items-start justify-center px-8">
					<h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome back</h1>
					<p className="text-lg text-gray-600 mb-6">Sign in to access your account, view orders and continue where you left off.</p>
					<div className="w-full bg-white rounded-xl p-6 shadow-md">
						<img src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=60&auto=format&fit=crop" alt="shop" className="w-full h-56 object-cover rounded-md" />
						<p className="mt-4 text-sm text-gray-500">Discover curated goods and exclusive offers tailored for you.</p>
					</div>
				</div>

				{/* Right form panel */}
				<div className="flex items-center justify-center">
					<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
						<div className="mb-6 text-center">
							<div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AS</div>
							<h2 className="mt-4 text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
							<p className="mt-2 text-sm text-gray-500">Don't have an account? <Link to="/get-started" className="text-blue-600 hover:underline">Create one</Link></p>
						</div>

						<form className="space-y-5" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter your password"
								/>
							</div>

							{error && <div className="text-sm text-red-600">{error}</div>}

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
									<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
								</div>

								<div className="text-sm">
									<Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={submitting}
									className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60"
								>
									{submitting ? 'Signing in...' : 'Sign in'}
								</button>
							</div>

							<div className="pt-2 border-t border-gray-100 text-center">
								<p className="text-sm text-gray-500">Or continue with</p>
								<div className="mt-3 flex justify-center gap-3">
									<button type="button" className="inline-flex items-center px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
										<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.772-1.63 1.562v1.874h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/></svg>
										Facebook
									</button>
									<button type="button" className="inline-flex items-center px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
										<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3" stroke="#1DB954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
										Continue
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}


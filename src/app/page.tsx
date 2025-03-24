"use client";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <header className="navbar bg-base-100 shadow-lg w-full p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Investor Connect</h1>
        <div>
          <Link href="/auth/login" className="btn btn-primary">
            Login
          </Link>
          <Link href="/auth/register" className="btn btn-secondary ml-2">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center text-center mt-12">
        <h2 className="text-4xl font-bold">
          Seamless Investor-Company Communication
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Secure, real-time messaging to build valuable connections.
        </p>
        <a href="/register" className="btn btn-primary mt-6">
          Get Started
        </a>
      </main>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-3/4">
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Real-time Messaging</h3>
          <p className="text-gray-600">
            Chat with investors and companies instantly.
          </p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Secure & Private</h3>
          <p className="text-gray-600">End-to-end encrypted communication.</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Easy Introductions</h3>
          <p className="text-gray-600">
            Seamless networking with trusted connections.
          </p>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-3/4">
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Real-time Messaging</h3>
          <p className="text-gray-600">
            Chat with investors and companies instantly.
          </p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Secure & Private</h3>
          <p className="text-gray-600">End-to-end encrypted communication.</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Easy Introductions</h3>
          <p className="text-gray-600">
            Seamless networking with trusted connections.
          </p>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-3/4">
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Real-time Messaging</h3>
          <p className="text-gray-600">
            Chat with investors and companies instantly.
          </p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Secure & Private</h3>
          <p className="text-gray-600">End-to-end encrypted communication.</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-semibold">Easy Introductions</h3>
          <p className="text-gray-600">
            Seamless networking with trusted connections.
          </p>
        </div>
      </section>

      <footer className="mt-16 p-4 w-full text-center bg-base-300">
        <p>&copy; 2025 Investor Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}

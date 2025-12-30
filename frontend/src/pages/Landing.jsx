import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function Landing() {
  const [openAuth, setOpenAuth] = useState(false);
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">

     {/* Header */}
<header className="flex justify-between items-center px-10 py-6 bg-white shadow-md sticky top-0 z-50">
  {/* Logo */}
  <div className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
    {/* Logo Circle */}
    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                    flex items-center justify-center rounded-full shadow-xl transform hover:scale-105 
                    transition-transform duration-300 cursor-pointer">
      <span className="text-lg font-bold">PM</span>
    </div>
    {/* Text */}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 
                     text-2xl md:text-3xl font-extrabold">
      TaskTracker Pro
    </span>
  </div>
        {/* Auth Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setMode("login");
              setOpenAuth(true);
            }}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </button>

          <button
            onClick={() => {
              setMode("signup");
              setOpenAuth(true);
            }}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 pt-28">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
          Manage Projects <br />
          <span className="text-blue-600">Smarter & Faster</span>
        </h1>

        <p className="max-w-2xl text-gray-800 text-lg mb-10">
          A modern project management platform to organize tasks,
          track progress, and collaborate efficiently.
        </p>

        <div className="flex gap-5">
          <button
            onClick={() => {
              setMode("signup");
              setOpenAuth(true);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Get Started Free
          </button>

          <button
            onClick={() => {
              setMode("login");
              setOpenAuth(true);
            }}
            className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="mt-28 px-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto flex-1">
        {[
          {
            title: "Project Tracking",
            desc: "Monitor project progress with real-time status updates.",
          },
          {
            title: "Task Management",
            desc: "Create, assign, and prioritize tasks effortlessly.",
          },
          {
            title: "Team Collaboration",
            desc: "Work together with comments, updates, and roles.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:scale-105 transition shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

     {/* Footer CTA */}
<footer className="mt-12 bg-white border-t border-gray-200 py-20 flex flex-col items-center relative">
  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 text-center">
    Ready to boost productivity?
  </h2>

  {/* Description */}
  <p className="text-gray-600 max-w-xl mb-8 text-lg text-center">
    Join teams who manage work efficiently with <span className="font-semibold text-blue-600">TaskTracker Pro</span>.
  </p>

  {/* CTA Button */}
  <button
    onClick={() => {
      setMode("signup");
      setOpenAuth(true);
    }}
    className="bg-blue-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl mb-12"
  >
    Create Free Account
  </button>

  {/* Bottom text */}
  <p className="text-gray-800 text-lg absolute bottom-4">
    &copy; {new Date().getFullYear()} TaskTracker Pro. All rights reserved.
  </p>
</footer>


      {/* Auth Modal */}
      {openAuth && (
        <AuthModal mode={mode} close={() => setOpenAuth(false)} />
      )}
    </div>
  );
}

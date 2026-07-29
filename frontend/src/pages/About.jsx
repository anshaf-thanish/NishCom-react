import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-10 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl text-center">
      <img
        src="/dp.jpg"
        alt="@thanish"
        className="w-44 h-44 rounded-full object-cover border-4 border-orange-500 mb-6 shadow-lg shadow-orange-500/40 mx-auto"
      />
      <h2 className="text-4xl font-bold text-white mb-2">About Me</h2>
      <h3 className="text-xl text-orange-500 mb-4">
        Thanish Anshaf (@anshafthanish)
      </h3>

      <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto mb-8">
        <strong>Join the community and grow together!</strong> Welcome to my
        platform where we build, deploy, and scale highly engineered systems.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-zinc-800 text-white rounded-lg border border-white/10 hover:bg-zinc-700 transition"
        >
          🌐 Website
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-red-500/20 text-red-500 rounded-lg border border-red-500 hover:bg-red-500/30 transition"
        >
          📺 YouTube
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-pink-500/20 text-pink-500 rounded-lg border border-pink-500 hover:bg-pink-500/30 transition"
        >
          📸 Instagram
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-blue-500/20 text-blue-500 rounded-lg border border-blue-500 hover:bg-blue-500/30 transition"
        >
          💼 LinkedIn
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-zinc-800 text-white rounded-lg border border-white/10 hover:bg-zinc-700 transition"
        >
          ✖️ X (Twitter)
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-green-500/20 text-green-500 rounded-lg border border-green-500 hover:bg-green-500/30 transition"
        >
          💬 WhatsApp
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-2 bg-zinc-800 text-white rounded-lg border border-white/10 hover:bg-zinc-700 transition"
        >
          🔗 Linktree
        </a>
      </div>
    </div>
  );
};

export default About;

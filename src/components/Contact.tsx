'use client';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-zinc-950 px-6 text-center border-t border-white/10">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Have an idea?
        </h2>
        <a 
          href="mailto:contact@example.com"
          className="inline-block text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-80 transition-opacity"
        >
          Let's build it together
        </a>
      </div>
    </section>
  );
}
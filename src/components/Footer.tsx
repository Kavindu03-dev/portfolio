export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 px-6 py-10">
      <div className="container mx-auto text-center">
        <p className="font-share-tech text-xs text-gray-600 tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} Built with honor and code.
        </p>
      </div>
    </footer>
  );
}
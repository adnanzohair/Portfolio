import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center px-6 pt-24">
      <div className="text-center">
        <p className="font-display text-accent text-sm tracking-[0.3em]">404 / LOST IN THE GRID</p>
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold tracking-tighter mt-4">PAGE NOT FOUND.</h1>
        <Link to="/" className="inline-flex mt-8 px-7 py-3 rounded-full bg-accent text-bg font-medium">Return home</Link>
      </div>
    </main>
  );
}

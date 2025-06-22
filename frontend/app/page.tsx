import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Queue Management System</h1>
          <p className="text-lg text-gray-600 mb-8">Real-time queue management with Socket.io</p>
        </div>

        <div className="flex gap-4 items-center justify-center flex-col sm:flex-row w-full">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/join"
          >
            Join Queue
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/login"
          >
            Admin Login
          </Link>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] space-y-2">
            <li className="tracking-[-.01em]">
              Click "Join Queue" to enter your name and join the queue
            </li>
            <li className="tracking-[-.01em]">
              Get redirected to a status page showing your position
            </li>
            <li className="tracking-[-.01em]">
              Wait for your turn - you'll get notified when called
            </li>
            <li className="tracking-[-.01em]">
              Admins can manage the queue from the admin dashboard
            </li>
          </ol>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-sm text-gray-500">
          Built with Next.js, Socket.io, and Express
        </span>
      </footer>
    </div>
  );
}

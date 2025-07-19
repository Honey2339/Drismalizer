"use client";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

const saira = Bebas_Neue({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  return (
    <nav className="bg-white text-black border-b-2 border-zinc-600">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 gap-2 flex items-center justify-center">
            <div>
              <Image
                className={`h-9 w-9 object-contain`}
                src="/drismalizer.png"
                alt="logo"
                width={200}
                height={200}
              />
            </div>
            <Link
              href="/"
              className={`${saira.className} text-3xl text-zinc-800 mt-1 font-semibold`}
            >
              Drismalizer
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/docs" className="hover:text-gray-400">
              Docs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

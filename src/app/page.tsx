"use client";
import { useGithubStars } from "@/lib/useGithubStar";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import OpenSourceBadge from "@/components/custom/OpenSourceBadge";
import { Bebas_Neue, Poppins } from "next/font/google";
import LogoIcon from "@/components/custom/LogoIcon";
import { Button } from "@/components/ui/button";

const poppings = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

const saira = Bebas_Neue({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const { star, error } = useGithubStars();

  const handleStart = () => {
    window.location.href = process.env.NEXT_PUBLIC_CANVAS_URL as string;
  };
  return (
    <div
      className={`${poppings.className} flex h-screen items-center justify-center`}
    >
      <hr className="animate-grow-x absolute top-12 left-0 h-px w-full border-dashed sm:top-24 bg-zinc-400" />
      <hr className="animate-grow-x absolute bottom-12 left-0 h-px w-full border-dashed sm:bottom-24 bg-zinc-400" />
      <hr className="animate-grow-y absolute top-0 left-12 h-full w-px border-dashed sm:left-24 bg-zinc-400" />
      <hr className="animate-grow-y absolute right-12 bottom-0 h-full w-px border-dashed sm:right-24 bg-zinc-400" />

      <div className="flex flex-col items-center justify-center gap-2">
        {!error && (
          <Link href="https://github.com/Honey2339" target="_blank">
            <div className="bg-secondary-foreground/5 relative mb-4 flex items-center gap-2 rounded-lg px-4 py-1">
              <StarFilledIcon className="size-5 text-yellow-500" />
              <NumberFlow className="text-2xl font-bold" value={star} />
            </div>
          </Link>
        )}
        <OpenSourceBadge />
        <div className="flex items-center gap-3">
          <LogoIcon />
          <div
            className={`${saira.className} text-5xl text-zinc-800 mt-1 font-semibold`}
          >
            Drismalizer
          </div>
        </div>
        <p className="text-muted-foreground text-center text-sm">
          Visualize your drizzle schema today!
        </p>
        <div className="mt-4 flex gap-2">
          <Button className="font-semibold bg-zinc-800" onClick={handleStart}>
            Get Started
          </Button>
          <Button className="font-semibold bg-lime-500 hover:bg-lime-400">
            Peerlist
          </Button>
        </div>
      </div>
    </div>
  );
}

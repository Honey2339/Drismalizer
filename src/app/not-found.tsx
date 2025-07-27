"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Bebas_Neue, Poppins } from "next/font/google";
import LogoIcon from "@/components/custom/LogoIcon";
import { ArrowLeftIcon, HomeIcon } from "@radix-ui/react-icons";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div
      className={`${poppins.className} min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-zinc-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <hr className="animate-grow-x absolute top-8 left-0 h-px w-full border-dashed border-gray-300" />
        <hr className="animate-grow-x absolute bottom-8 left-0 h-px w-full border-dashed border-gray-300" />
        <hr className="animate-grow-y absolute top-0 left-8 h-full w-px border-dashed border-gray-300" />
        <hr className="animate-grow-y absolute right-8 bottom-0 h-full w-px border-dashed border-gray-300" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in-up">
          <LogoIcon />
          <div
            className={`${bebasNeue.className} text-3xl text-zinc-800 font-semibold`}
          >
            Drismalizer
          </div>
        </div>

        <div className="relative mb-6 opacity-0 animate-fade-in-up delay-200">
          <div
            className={`${bebasNeue.className} text-9xl sm:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-800 to-zinc-600 drop-shadow-sm`}
          >
            404
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-zinc-400/10 blur-2xl rounded-full"></div>
        </div>

        <div className="mb-8 opacity-0 animate-fade-in-up delay-300">
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-800 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
            The page you&#39;re looking for seems to have wandered off into the
            digital void. Let&#39;s get you back on track!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-500">
          <Button
            onClick={handleGoHome}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <HomeIcon className="w-4 h-4" />
            Go Home
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grow-x {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes grow-y {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-grow-x {
          animation: grow-x 1s ease-out;
        }

        .animate-grow-y {
          animation: grow-y 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;

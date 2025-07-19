import { useEffect, useState } from "react";
import { GithubStars } from "./types";

export function useGithubStars() {
  const [star, setStar] = useState<number>(999);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.github.com/repos/honey2339/hail",
          {
            next: {
              revalidate: 60 * 60,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stars");
        }

        const data: GithubStars = await response.json();
        setStar(data.stargazers_count);
        console.log(data.stargazers_count);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchStars();
  }, []);

  return { star, error, isLoading };
}

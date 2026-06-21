export type RepoData = {
  stars: number;
  version: string;
  url: string;
};

const GITHUB_REPO = "diegoleteliers10/fasty";
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;
const FALLBACK_VERSION = "v0.4.1";

let cache: Promise<RepoData> | null = null;

export const fetchRepo = (): Promise<RepoData> => {
  if (cache) return cache;
  cache = (async (): Promise<RepoData> => {
    try {
      const [repoRes, releaseRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
          headers: { Accept: "application/vnd.github+json", "User-Agent": "fasty-site" },
        }),
        fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
          headers: { Accept: "application/vnd.github+json", "User-Agent": "fasty-site" },
        }),
      ]);
      const data = repoRes.ok
        ? ((await repoRes.json()) as { stargazers_count?: number; html_url?: string })
        : {};
      const release = releaseRes.ok
        ? ((await releaseRes.json()) as { tag_name?: string })
        : {};
      return {
        stars: typeof data.stargazers_count === "number" ? data.stargazers_count : 0,
        version: typeof release.tag_name === "string" ? release.tag_name : FALLBACK_VERSION,
        url: typeof data.html_url === "string" ? data.html_url : GITHUB_URL,
      };
    } catch {
      return { stars: 0, version: FALLBACK_VERSION, url: GITHUB_URL };
    }
  })();
  return cache;
};

export const formatStars = (n: number): string => {
  if (n < 1000) return String(n);
  if (n < 10_000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  if (n < 1_000_000) return Math.round(n / 1000) + "k";
  return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
};

export const stripVersionPrefix = (v: string): string => v.replace(/^v/, "");

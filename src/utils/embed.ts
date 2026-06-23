export type EmbedInfo = {
  provider: "youtube" | "twitch";
  src: string;
  title: string;
};

function getYouTubeId(url: URL) {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0];
  }

  if (url.hostname.includes("youtube.com")) {
    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/").filter(Boolean)[1];
    }

    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/").filter(Boolean)[1];
    }

    return url.searchParams.get("v");
  }

  return null;
}

function getTwitchClipSlug(url: URL) {
  const parts = url.pathname.split("/").filter(Boolean);

  if (url.hostname === "clips.twitch.tv") {
    return parts[0];
  }

  const clipIndex = parts.findIndex((part) => part === "clip");

  if (url.hostname.includes("twitch.tv") && clipIndex >= 0) {
    return parts[clipIndex + 1];
  }

  return null;
}

export function getClipEmbed(urlValue?: string): EmbedInfo | null {
  if (!urlValue?.trim()) {
    return null;
  }

  try {
    const url = new URL(urlValue);
    const youtubeId = getYouTubeId(url);

    if (youtubeId) {
      return {
        provider: "youtube",
        src: `https://www.youtube.com/embed/${youtubeId}`,
        title: "Clipe do YouTube",
      };
    }

    const twitchClipSlug = getTwitchClipSlug(url);

    if (twitchClipSlug) {
      const parent =
        typeof window === "undefined" ? "localhost" : window.location.hostname || "localhost";

      return {
        provider: "twitch",
        src: `https://clips.twitch.tv/embed?clip=${twitchClipSlug}&parent=${parent}`,
        title: "Clipe da Twitch",
      };
    }
  } catch {
    return null;
  }

  return null;
}

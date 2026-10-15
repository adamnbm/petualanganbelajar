// =========================================================================
// TARUH LINK YOUTUBE DI SINI:
// Cukup ganti nilai 'youtubeUrl' di bawah dengan link YouTube videomu.
// =========================================================================

export const TUTORIAL_VIDEOS = [
  {
    id: "video_guru",
    title: "1. Tutorial untuk Guru",
    // 👇 Ganti link video YouTube untuk Guru di sini:
    youtubeUrl: "https://youtu.be/ADTfvADE1_c?si=q-dI6HK1yH_cDXQ1",
  },
  {
    id: "video_siswa",
    title: "2. Tutorial untuk Siswa",
    // 👇 Ganti link video YouTube untuk Siswa di sini:
    youtubeUrl: "https://youtu.be/0Dkh6AnCoz0?si=oCKcTr1FxCmCjpiA",
  }
];

/**
 * Otomatis ubah link YouTube (biasa/share/shorts) jadi embed agar bisa diputar langsung di Chrome
 */
export function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();

  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("youtube-nocookie.com/embed/")) {
    const base = trimmed.split("?")[0];
    return `${base}?rel=0&modestbranding=1&playsinline=1`;
  }

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);

  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1&playsinline=1`;
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube-nocookie.com/embed/${trimmed}?rel=0&modestbranding=1&playsinline=1`;
  }

  return trimmed;
}

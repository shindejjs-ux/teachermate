export function getPreviewUrl(url: string) {
  if (!url) return "";

  // Local PDF
  if (url.startsWith("/")) {
    return url;
  }

  // Google Drive
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([^/]+)/);

    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return url;
}
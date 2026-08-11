export function getPreviewUrl(url: string): string {
  if (!url) return "";

  // Local PDF
  if (url.startsWith("/")) {
    return url;
  }

  // Google Drive Preview
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([^/]+)/);

    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return url;
}

export function getGoogleViewerUrl(url: string): string {
  if (!url) return "";

  // Local PDF
  if (url.startsWith("/")) {
    return url;
  }

  // Google Drive Google Docs Viewer
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([^/]+)/);

    if (match) {
      const fileId = match[1];

      return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(
        `https://drive.google.com/uc?export=download&id=${fileId}`
      )}`;
    }
  }

  return url;
}
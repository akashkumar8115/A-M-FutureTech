const FILE_ID_REGEX = /(?:\/d\/|id=|\/file\/d\/)([a-zA-Z0-9_-]+)/;

export function extractDriveFileId(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const match = trimmed.match(FILE_ID_REGEX);
  if (match?.[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) return trimmed;
  return '';
}

export function toDriveImageUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http') && !trimmed.includes('drive.google.com') && !trimmed.includes('docs.google.com')) {
    return trimmed;
  }
  const fileId = extractDriveFileId(trimmed);
  if (!fileId) return trimmed;
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

export function parseTags(tagsJson: string): string[] {
  try {
    return JSON.parse(tagsJson);
  } catch (e) {
    console.error("Error parsing tags:", e);
    return []; // Return empty array in case of error
  }
}

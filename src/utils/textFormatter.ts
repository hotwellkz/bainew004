export function formatAIResponse(text: string): string {
  return text
    .replace(/#{1,6}\s+([^\n]+)/g, (_, title) => title) // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove code blocks
    .trim();
}
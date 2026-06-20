export default function stringToHex(str: any) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); // djb2 hash
    hash |= 0; // Convert to 32-bit integer
  }
  // Extract RGB components and convert to hex
  const r = (hash >> 16) & 0xFF;
  const g = (hash >> 8) & 0xFF;
  const b = hash & 0xFF;
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}


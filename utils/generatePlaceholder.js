import { getPlaiceholder } from 'plaiceholder';

export async function generatePlaceholder(imageUrl) {
  const { base64 } = await getPlaiceholder(imageUrl);
  return base64;
}
import { insightPersonas } from './salesPersonas';

export function selectPersona(): { persona: string, seed: number } {
  const generateSeed = () => {
    const randomFactor = Math.floor(Math.random() * 1000);
    const timeFactor = new Date().getTime() % 1000;
    return (randomFactor + timeFactor) % insightPersonas.length;
  };

  const seed = generateSeed();
  const persona = insightPersonas[seed];

  return { persona, seed };
}
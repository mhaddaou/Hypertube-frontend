import type { MovieComment } from "@/types/movie";

// Temporary static data until backend comments endpoint is connected.
export const fallbackComments: MovieComment[] = [
  {
    user: "Johannes Hudson",
    text: "A tense and atmospheric watch with strong visuals. The pacing keeps the story moving and the world feels bigger than the frame.",
  },
  {
    user: "Valentina Brooks",
    text: "The cinematography and sound design carry a lot of emotion. Great pick for a late-night sci-fi session.",
  },
  {
    user: "Christopher Jackson",
    text: "The characters could use more time, but the action beats and mood are exactly what I wanted.",
  },
  {
    user: "Cameron Martinez",
    text: "Solid rewatch value. The visuals look especially good on a larger screen.",
  },
];

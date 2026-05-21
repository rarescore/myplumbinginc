export type RouteQuizId = "rare" | "logic" | "morality";

export const quizMeta = {
  rare: {
    routeId: "rare",
    engineId: "rarity",
    title: "Are You Rare?",
    shortTitle: "Rarity Test",
    url: "/are-you-rare",
    quizUrl: "/quiz/rare",
    time: "About 7–9 min",
    eyebrow: "Originality, instinct, rarity",
    cta: "Reveal My RareScore",
    description: "See how uncommon your personality, choices, and instincts really are.",
    longDescription:
      "The Rarity Test looks at originality, independence, social perception, instinct patterns, and how often your choices differ from the crowd.",
    shareMessage: (score: number, result: string) =>
      `I just got my RareScore: ${score}. My result was: ${result}. Take the test and see how rare you are.`,
    measures: [
      "Originality and unusual associations",
      "Independence and comfort being hard to define",
      "Emotional depth and instinctive pattern reading",
      "How often your answers break common response patterns"
    ],
  },
  logic: {
    routeId: "logic",
    engineId: "logic",
    title: "IQ Test",
    shortTitle: "IQ Test",
    url: "/iq-test",
    quizUrl: "/quiz/logic",
    time: "About 10–12 min",
    eyebrow: "Patterns, focus, problem solving",
    cta: "Start IQ Test",
    description: "Estimate your IQ-style score through patterns, logic, focus, and problem solving.",
    longDescription:
      "Challenge your pattern recognition, focus, visual reasoning, number sequences, and problem solving with a fast, interactive IQ-style test.",
    shareMessage: (score: number, result: string) =>
      `My RareScore IQ result was ${score}. Result type: ${result}. Try it and see what score you get.`,
    measures: [
      "Pattern recognition",
      "Number sequences",
      "Visual and spatial reasoning",
      "Deductive logic and fast thinking"
    ],
  },
  morality: {
    routeId: "morality",
    engineId: "morality",
    title: "Morality Test",
    shortTitle: "Morality Test",
    url: "/morality-test",
    quizUrl: "/quiz/morality",
    time: "About 7–9 min",
    eyebrow: "Values, pressure, judgment",
    cta: "Start Morality Test",
    description: "What do your choices say about who you are when nobody is watching?",
    longDescription:
      "The Morality Test explores loyalty, fairness, empathy, honesty, responsibility, courage, and how you make decisions under pressure.",
    shareMessage: (score: number, result: string) =>
      `I scored ${score} on the RareScore Morality Test. My result was: ${result}. Take it and see what your choices say about you.`,
    measures: [
      "Fairness and justice",
      "Empathy and loyalty",
      "Honesty and responsibility",
      "Rule respect, independence, and practical judgment"
    ],
  },
} as const;

export function getMeta(id: RouteQuizId) {
  return quizMeta[id];
}

export function routeToEngineId(id: RouteQuizId) {
  return quizMeta[id].engineId as "rarity" | "logic" | "morality";
}

export function routeFromEngine(engineId: string): RouteQuizId {
  if (engineId === "rarity") return "rare";
  if (engineId === "logic") return "logic";
  return "morality";
}

export function scoreLabelForRoute(routeId: RouteQuizId) {
  if (routeId === "logic") return "IQ";
  if (routeId === "morality") return "Morality Score";
  return "RareScore";
}

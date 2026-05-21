/*
  RareScore Quiz Engine
  Paste into a Next.js or React project as something like: lib/rarescoreQuizEngine.ts
  This file includes:
  1. TypeScript interfaces
  2. 90 usable questions across Morality, Logic IQ Style, and Rarity
  3. Scoring engines
  4. Result category logic
  5. Example React quiz and result logic
  6. Certificate preview data

  Important positioning:
  The Logic test returns an entertainment based Logic IQ style estimate. It is not a clinical IQ test.
*/

import React, { useMemo, useState } from "react";

export type TestId = "morality" | "logic" | "rarity";
export type QuestionType =
  | "multiple_choice"
  | "forced_choice"
  | "scenario"
  | "social_judgment"
  | "visual_odd_one_out"
  | "visual_pattern"
  | "slider"
  | "written_one_word"
  | "written_short";

export type MoralityTrait =
  | "empathy"
  | "justice"
  | "honesty"
  | "loyalty"
  | "responsibility"
  | "ruleRespect"
  | "independence"
  | "pragmatism"
  | "courage"
  | "fairness";

export type RarityTrait =
  | "originality"
  | "independence"
  | "curiosity"
  | "emotionalDepth"
  | "instinct"
  | "socialEnergy"
  | "patternBreaking";

export type LogicSkill =
  | "pattern_recognition"
  | "number_sequences"
  | "word_logic"
  | "spatial_reasoning"
  | "visual_reasoning"
  | "trick_logic"
  | "memory_reasoning"
  | "deductive_reasoning"
  | "analogies"
  | "fast_thinking";

export type ShapeVisual = {
  id: string;
  shape: "circle" | "square" | "triangle" | "diamond" | "star" | "hexagon" | "pentagon" | "line" | "arrow" | "crescent";
  fill?: "solid" | "outline" | "striped" | "dotted";
  color?: string;
  rotation?: number;
  size?: "small" | "medium" | "large";
  count?: number;
  border?: string;
  pattern?: "none" | "one_dot" | "two_dots" | "center_line" | "diagonal_line" | "cross";
};

export type VisualPrompt = {
  layout: "grid" | "sequence" | "matrix";
  shapes: ShapeVisual[];
  instruction?: string;
};

export type ChoiceOption = {
  id: string;
  text: string;
  scores?: Partial<Record<MoralityTrait | RarityTrait, number>>;
  rarityPoints?: number;
};

export type ScoringGuide = {
  common: string[];
  uncommon: string[];
  rare: string[];
  fallbackRule: string;
  keywordMap?: {
    common?: string[];
    uncommon?: string[];
    rare?: string[];
  };
};

export type BaseQuestion = {
  id: string;
  test: TestId;
  type: QuestionType;
  question: string;
  timeSuggestionSeconds?: number;
};

export type MoralityQuestion = BaseQuestion & {
  test: "morality";
  options: ChoiceOption[];
  traitTags: MoralityTrait[];
  measures: string;
};

export type LogicQuestion = BaseQuestion & {
  test: "logic";
  options: { id: string; text: string }[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  skill: LogicSkill;
  explanation: string;
  scoringValue: number;
  visualPrompt?: VisualPrompt;
};

export type RarityQuestion = BaseQuestion & {
  test: "rarity";
  options?: ChoiceOption[];
  traitTags: RarityTrait[];
  scoringGuide?: ScoringGuide;
  slider?: {
    min: number;
    max: number;
    leftLabel: string;
    rightLabel: string;
  };
  visualPrompt?: VisualPrompt;
  measures: string;
};

export type UserAnswers = Record<string, string | number>;

export type InsightCard = {
  title: string;
  body: string;
};

export type TestResult = {
  score: number;
  percentile?: number;
  type: string;
  title: string;
  paragraph: string;
  traits: Record<string, number>;
  insightCards: InsightCard[];
  shareLine: string;
  rawScore?: number;
  weightedScore?: number;
  maxWeightedScore?: number;
};

export const loadingMicrocopy = [
  "Calculating your RareScore...",
  "Comparing your patterns...",
  "Mapping your instincts...",
  "Building your result...",
  "Revealing what makes you rare...",
];

export const moralityQuestions: MoralityQuestion[] = [
  {
    id: "m1",
    test: "morality",
    type: "scenario",
    question: "Your friend wins a small contest by bending a rule nobody noticed. The prize should probably go to someone else. What do you do?",
    options: [
      { id: "A", text: "Tell the organizer directly because fairness matters more than loyalty.", scores: { justice: 3, honesty: 2, courage: 2, loyalty: -1 } },
      { id: "B", text: "Pull your friend aside and give them a chance to fix it privately.", scores: { loyalty: 2, honesty: 2, empathy: 1, pragmatism: 2 } },
      { id: "C", text: "Say nothing because it is not your fight.", scores: { pragmatism: 1, responsibility: -1, justice: -1 } },
      { id: "D", text: "Ask the person who lost how much it matters before acting.", scores: { empathy: 2, fairness: 2, pragmatism: 1 } },
    ],
    traitTags: ["justice", "honesty", "loyalty", "courage"],
    measures: "How the user balances fairness, loyalty, private accountability, and public correction.",
  },
  {
    id: "m2",
    test: "morality",
    type: "forced_choice",
    question: "A rule feels unfair but breaking it would help someone who genuinely needs help. Which instinct wins first?",
    options: [
      { id: "A", text: "Follow the rule and look for an official exception.", scores: { ruleRespect: 3, responsibility: 2, pragmatism: 1 } },
      { id: "B", text: "Break the rule quietly if the harm is low and the need is real.", scores: { empathy: 3, independence: 2, moralCourage: 0 } as any },
      { id: "C", text: "Challenge the rule openly so the system improves.", scores: { justice: 3, courage: 2, independence: 2 } },
      { id: "D", text: "Ask who could be hurt before deciding.", scores: { fairness: 3, responsibility: 2, empathy: 1 } },
    ],
    traitTags: ["ruleRespect", "empathy", "justice", "responsibility"],
    measures: "Whether the user prioritizes rules, outcomes, reform, or harm analysis.",
  },
  {
    id: "m3",
    test: "morality",
    type: "social_judgment",
    question: "Someone posts a harsh but true comment about a public mistake. How do you judge it?",
    options: [
      { id: "A", text: "Truth matters. People should handle criticism.", scores: { honesty: 3, independence: 2, empathy: -1 } },
      { id: "B", text: "Truth matters, but cruelty makes it less moral.", scores: { empathy: 3, honesty: 2, fairness: 2 } },
      { id: "C", text: "Public criticism is usually performative. Handle it privately.", scores: { pragmatism: 2, loyalty: 1, empathy: 1 } },
      { id: "D", text: "It depends on whether the mistake harmed other people.", scores: { justice: 2, responsibility: 2, fairness: 2 } },
    ],
    traitTags: ["honesty", "empathy", "justice", "fairness"],
    measures: "How the user separates truth from delivery and public accountability from humiliation.",
  },
  {
    id: "m4",
    test: "morality",
    type: "multiple_choice",
    question: "You find $100 in a parking lot with no ID nearby. What feels most right?",
    options: [
      { id: "A", text: "Turn it in to the nearest business or authority.", scores: { honesty: 3, ruleRespect: 2, responsibility: 2 } },
      { id: "B", text: "Wait nearby briefly, then turn it in if nobody returns.", scores: { honesty: 2, empathy: 2, pragmatism: 2 } },
      { id: "C", text: "Keep it because there is no realistic way to find the owner.", scores: { pragmatism: 2, honesty: -1 } },
      { id: "D", text: "Donate it so at least it helps someone.", scores: { empathy: 2, fairness: 1, independence: 1 } },
    ],
    traitTags: ["honesty", "responsibility", "ruleRespect", "empathy"],
    measures: "Property ethics, responsibility when nobody is watching, and practical honesty.",
  },
  {
    id: "m5",
    test: "morality",
    type: "scenario",
    question: "At work, a teammate is blamed for a delay that was partly your fault. Nobody asks you directly. What do you do?",
    options: [
      { id: "A", text: "Speak up immediately and take your share of responsibility.", scores: { honesty: 3, responsibility: 3, courage: 2 } },
      { id: "B", text: "Message the teammate first and agree how to explain it.", scores: { loyalty: 2, responsibility: 2, pragmatism: 2 } },
      { id: "C", text: "Only speak up if the teammate is seriously affected.", scores: { pragmatism: 2, empathy: 1, honesty: -1 } },
      { id: "D", text: "Stay quiet because leadership should investigate properly.", scores: { responsibility: -2, ruleRespect: 1 } },
    ],
    traitTags: ["honesty", "responsibility", "courage", "loyalty"],
    measures: "Accountability under pressure and willingness to absorb reputational cost.",
  },
  {
    id: "m6",
    test: "morality",
    type: "forced_choice",
    question: "Which is worse?",
    options: [
      { id: "A", text: "Breaking a promise to protect someone from serious harm.", scores: { loyalty: 2, empathy: 2, pragmatism: 1 } },
      { id: "B", text: "Keeping a promise that lets someone else get hurt.", scores: { justice: 3, responsibility: 2, empathy: 2 } },
      { id: "C", text: "Both are wrong, but harm matters more than the promise.", scores: { fairness: 2, empathy: 2, responsibility: 2 } },
      { id: "D", text: "Both depend completely on what was promised.", scores: { pragmatism: 3, independence: 1 } },
    ],
    traitTags: ["loyalty", "empathy", "responsibility", "pragmatism"],
    measures: "How the user ranks promises against preventable harm.",
  },
  {
    id: "m7",
    test: "morality",
    type: "scenario",
    question: "A stranger cuts in line, but they look stressed and embarrassed. What do you do?",
    options: [
      { id: "A", text: "Politely point out the line and ask them to move back.", scores: { fairness: 3, courage: 1, ruleRespect: 2 } },
      { id: "B", text: "Let it go unless others are clearly upset.", scores: { empathy: 2, pragmatism: 2 } },
      { id: "C", text: "Ask if they are in an emergency before judging.", scores: { empathy: 3, fairness: 2, responsibility: 1 } },
      { id: "D", text: "Say nothing, but feel annoyed.", scores: { pragmatism: 1, courage: -1 } },
    ],
    traitTags: ["fairness", "empathy", "courage", "ruleRespect"],
    measures: "Everyday justice, conflict tolerance, and charitable interpretation.",
  },
  {
    id: "m8",
    test: "morality",
    type: "multiple_choice",
    question: "A family member asks you to lie for them about something minor. What is your line?",
    options: [
      { id: "A", text: "I do not lie, even for family.", scores: { honesty: 3, ruleRespect: 2, independence: 1 } },
      { id: "B", text: "I would cover for them if nobody is harmed.", scores: { loyalty: 3, pragmatism: 2 } },
      { id: "C", text: "I would help them explain the truth in the least damaging way.", scores: { honesty: 2, loyalty: 2, empathy: 2 } },
      { id: "D", text: "I would decide based on whether they are avoiding responsibility.", scores: { responsibility: 3, justice: 2, fairness: 1 } },
    ],
    traitTags: ["honesty", "loyalty", "responsibility", "pragmatism"],
    measures: "Truthfulness when loyalty creates emotional pressure.",
  },
  {
    id: "m9",
    test: "morality",
    type: "social_judgment",
    question: "A person steals food because they are hungry. What is your first judgment?",
    options: [
      { id: "A", text: "It is still wrong, but the response should be compassionate.", scores: { ruleRespect: 2, empathy: 3, fairness: 2 } },
      { id: "B", text: "Need changes the morality of the action.", scores: { empathy: 3, independence: 2, justice: 1 } },
      { id: "C", text: "The bigger moral failure is the system that left them hungry.", scores: { justice: 3, empathy: 2, independence: 2 } },
      { id: "D", text: "Stealing cannot be normalized, even for sympathetic reasons.", scores: { ruleRespect: 3, responsibility: 2, honesty: 1 } },
    ],
    traitTags: ["empathy", "ruleRespect", "justice", "fairness"],
    measures: "How the user balances legality, survival, compassion, and systemic judgment.",
  },
  {
    id: "m10",
    test: "morality",
    type: "scenario",
    question: "You see a popular person quietly excluding someone from a group. Nobody else seems to notice. What do you do?",
    options: [
      { id: "A", text: "Include the person directly and make space for them.", scores: { empathy: 3, courage: 2, fairness: 2 } },
      { id: "B", text: "Talk to the popular person privately later.", scores: { pragmatism: 2, loyalty: 1, empathy: 2 } },
      { id: "C", text: "Call it out in the moment.", scores: { justice: 3, courage: 3, independence: 2 } },
      { id: "D", text: "Stay out of it because group dynamics are complicated.", scores: { pragmatism: 1, courage: -1, empathy: -1 } },
    ],
    traitTags: ["empathy", "courage", "justice", "fairness"],
    measures: "Bystander ethics and social courage when status pressure is present.",
  },
  {
    id: "m11",
    test: "morality",
    type: "forced_choice",
    question: "Which statement feels closer to your moral style?",
    options: [
      { id: "A", text: "Good intentions matter most.", scores: { empathy: 3, loyalty: 1 } },
      { id: "B", text: "Real outcomes matter most.", scores: { responsibility: 2, pragmatism: 3 } },
      { id: "C", text: "Fair process matters most.", scores: { justice: 2, ruleRespect: 3, fairness: 2 } },
      { id: "D", text: "Context decides which one matters most.", scores: { pragmatism: 3, independence: 2, fairness: 1 } },
    ],
    traitTags: ["empathy", "responsibility", "ruleRespect", "pragmatism"],
    measures: "Whether the user leans intention based, outcome based, process based, or context based.",
  },
  {
    id: "m12",
    test: "morality",
    type: "scenario",
    question: "A coworker tells you a secret that suggests they may hurt their own future badly, but not immediately. What do you do?",
    options: [
      { id: "A", text: "Keep the secret and support them privately.", scores: { loyalty: 3, empathy: 2 } },
      { id: "B", text: "Encourage them to get help and set a deadline before involving anyone.", scores: { empathy: 3, responsibility: 2, pragmatism: 2 } },
      { id: "C", text: "Tell someone who can help, even if they get upset.", scores: { responsibility: 3, courage: 2, empathy: 1 } },
      { id: "D", text: "Ask them directly what kind of help they want from you.", scores: { empathy: 3, fairness: 1, pragmatism: 2 } },
    ],
    traitTags: ["loyalty", "empathy", "responsibility", "courage"],
    measures: "Boundaries around confidentiality, care, and responsible intervention.",
  },
  {
    id: "m13",
    test: "morality",
    type: "multiple_choice",
    question: "You receive too much change from a cashier who seems exhausted. What happens next?",
    options: [
      { id: "A", text: "Return it immediately.", scores: { honesty: 3, responsibility: 2, empathy: 1 } },
      { id: "B", text: "Return it because the cashier could get blamed.", scores: { empathy: 3, honesty: 2, responsibility: 2 } },
      { id: "C", text: "Keep it if it is a large company and the amount is small.", scores: { pragmatism: 1, honesty: -2, fairness: -1 } },
      { id: "D", text: "Pause and check the receipt first to make sure.", scores: { responsibility: 2, fairness: 2, pragmatism: 1 } },
    ],
    traitTags: ["honesty", "responsibility", "empathy", "fairness"],
    measures: "Integrity with small temptations and empathy for indirect consequences.",
  },
  {
    id: "m14",
    test: "morality",
    type: "social_judgment",
    question: "Someone refuses to forgive a person who apologized sincerely. How do you see it?",
    options: [
      { id: "A", text: "Forgiveness cannot be owed. The hurt person decides.", scores: { empathy: 3, independence: 2, fairness: 1 } },
      { id: "B", text: "If the apology is sincere, forgiveness is morally better.", scores: { empathy: 1, loyalty: 1, responsibility: 2 } },
      { id: "C", text: "Repair matters more than the apology itself.", scores: { responsibility: 3, justice: 2, fairness: 2 } },
      { id: "D", text: "It depends on whether the behavior changed.", scores: { pragmatism: 3, responsibility: 2 } },
    ],
    traitTags: ["empathy", "responsibility", "fairness", "pragmatism"],
    measures: "How the user evaluates apology, repair, boundaries, and forgiveness.",
  },
  {
    id: "m15",
    test: "morality",
    type: "scenario",
    question: "A team vote goes against your opinion, and you strongly believe the team is making a mistake. What do you do?",
    options: [
      { id: "A", text: "Support the decision because the process was fair.", scores: { ruleRespect: 2, fairness: 2, responsibility: 1 } },
      { id: "B", text: "Respect the vote but document your concern clearly.", scores: { responsibility: 3, independence: 2, pragmatism: 2 } },
      { id: "C", text: "Keep pushing because the right answer matters more than agreement.", scores: { courage: 2, independence: 3, justice: 1 } },
      { id: "D", text: "Step back and let the result prove itself.", scores: { pragmatism: 2, responsibility: 1 } },
    ],
    traitTags: ["ruleRespect", "independence", "responsibility", "courage"],
    measures: "Respect for collective process versus conviction and dissent.",
  },
  {
    id: "m16",
    test: "morality",
    type: "multiple_choice",
    question: "Which compliment would mean the most to you?",
    options: [
      { id: "A", text: "You always try to do the right thing.", scores: { justice: 2, honesty: 2, responsibility: 1 } },
      { id: "B", text: "You make people feel safe and understood.", scores: { empathy: 3, loyalty: 1 } },
      { id: "C", text: "You do not let pressure change your values.", scores: { independence: 3, courage: 2 } },
      { id: "D", text: "You are fair even when it costs you.", scores: { fairness: 3, justice: 2, courage: 1 } },
    ],
    traitTags: ["justice", "empathy", "independence", "fairness"],
    measures: "Self identified moral identity and what kind of goodness the user values most.",
  },
  {
    id: "m17",
    test: "morality",
    type: "scenario",
    question: "You can help one close friend a lot, or five strangers a little. Which choice pulls you harder?",
    options: [
      { id: "A", text: "Help the close friend because loyalty has weight.", scores: { loyalty: 3, empathy: 1 } },
      { id: "B", text: "Help the five strangers because more people benefit.", scores: { fairness: 2, justice: 2, responsibility: 1 } },
      { id: "C", text: "Choose based on who has the greater need.", scores: { empathy: 3, fairness: 2, pragmatism: 1 } },
      { id: "D", text: "Look for a way to split the help.", scores: { pragmatism: 3, fairness: 2, empathy: 1 } },
    ],
    traitTags: ["loyalty", "fairness", "empathy", "pragmatism"],
    measures: "Partiality, utilitarian instinct, need sensitivity, and compromise seeking.",
  },
  {
    id: "m18",
    test: "morality",
    type: "social_judgment",
    question: "A person follows the law exactly but uses it to take advantage of someone less informed. Your view?",
    options: [
      { id: "A", text: "Legal does not always mean moral.", scores: { justice: 3, fairness: 3, independence: 1 } },
      { id: "B", text: "People are responsible for understanding what they agree to.", scores: { responsibility: 3, ruleRespect: 2 } },
      { id: "C", text: "The informed person has a duty not to exploit the gap.", scores: { empathy: 2, fairness: 3, justice: 2 } },
      { id: "D", text: "The solution is clearer rules, not emotional judgment.", scores: { ruleRespect: 3, pragmatism: 2 } },
    ],
    traitTags: ["justice", "fairness", "responsibility", "ruleRespect"],
    measures: "Distinction between legality, exploitation, personal responsibility, and fairness.",
  },
  {
    id: "m19",
    test: "morality",
    type: "scenario",
    question: "Your group wants to ignore a quiet member's idea, but you think the idea is actually strong. What do you do?",
    options: [
      { id: "A", text: "Repeat the idea and give them credit.", scores: { fairness: 3, empathy: 2, courage: 1 } },
      { id: "B", text: "Ask them a question so they can explain it themselves.", scores: { empathy: 3, fairness: 2, pragmatism: 2 } },
      { id: "C", text: "Tell the group they are missing the best option.", scores: { courage: 2, justice: 2, independence: 2 } },
      { id: "D", text: "Mention it later to the leader privately.", scores: { pragmatism: 2, responsibility: 1 } },
    ],
    traitTags: ["fairness", "empathy", "courage", "justice"],
    measures: "Credit sharing, social protection, and intervention style.",
  },
  {
    id: "m20",
    test: "morality",
    type: "forced_choice",
    question: "Which moral mistake bothers you more?",
    options: [
      { id: "A", text: "Being unfair.", scores: { fairness: 3, justice: 2 } },
      { id: "B", text: "Being dishonest.", scores: { honesty: 3, responsibility: 1 } },
      { id: "C", text: "Being disloyal.", scores: { loyalty: 3, empathy: 1 } },
      { id: "D", text: "Being passive when someone needed help.", scores: { empathy: 2, courage: 2, responsibility: 2 } },
    ],
    traitTags: ["fairness", "honesty", "loyalty", "responsibility"],
    measures: "The user's strongest moral pain point.",
  },
  {
    id: "m21",
    test: "morality",
    type: "scenario",
    question: "You learn a friend is cheating in a class or certification that could affect future clients. What do you do?",
    options: [
      { id: "A", text: "Report it because future people could be harmed.", scores: { justice: 3, responsibility: 3, courage: 2 } },
      { id: "B", text: "Confront them and tell them to stop before you report it.", scores: { loyalty: 2, honesty: 2, responsibility: 2 } },
      { id: "C", text: "Offer to help them study so they do not need to cheat.", scores: { empathy: 3, loyalty: 2, responsibility: 1 } },
      { id: "D", text: "Stay out unless the cheating creates immediate danger.", scores: { pragmatism: 2, responsibility: -1 } },
    ],
    traitTags: ["justice", "responsibility", "loyalty", "empathy"],
    measures: "Ethics when private wrongdoing creates public risk.",
  },
  {
    id: "m22",
    test: "morality",
    type: "multiple_choice",
    question: "A stranger is rude to you for no clear reason. Your first move?",
    options: [
      { id: "A", text: "Stay calm and assume they may be having a bad day.", scores: { empathy: 3, pragmatism: 2 } },
      { id: "B", text: "Set a boundary immediately.", scores: { courage: 2, independence: 2, responsibility: 1 } },
      { id: "C", text: "Respond with the same energy so they learn.", scores: { justice: 1, courage: 1, empathy: -1 } },
      { id: "D", text: "Ignore it unless it affects someone else.", scores: { pragmatism: 2, fairness: 1 } },
    ],
    traitTags: ["empathy", "courage", "pragmatism", "independence"],
    measures: "Emotional restraint, boundary setting, and reciprocity under disrespect.",
  },
  {
    id: "m23",
    test: "morality",
    type: "scenario",
    question: "You are choosing between two qualified people. One had fewer opportunities but showed huge growth. The other has the stronger record. Who gets the chance?",
    options: [
      { id: "A", text: "The stronger record. Standards should be consistent.", scores: { ruleRespect: 2, fairness: 1, responsibility: 2 } },
      { id: "B", text: "The person with fewer opportunities if their growth shows rare drive.", scores: { justice: 2, empathy: 2, independence: 1 } },
      { id: "C", text: "Create a trial so both can prove themselves.", scores: { fairness: 3, pragmatism: 3, responsibility: 1 } },
      { id: "D", text: "Choose based on who will benefit others more in the role.", scores: { responsibility: 2, justice: 2, pragmatism: 2 } },
    ],
    traitTags: ["fairness", "justice", "responsibility", "pragmatism"],
    measures: "Merit, equity, potential, and practical fairness.",
  },
  {
    id: "m24",
    test: "morality",
    type: "social_judgment",
    question: "Is it moral to embarrass one person publicly if it prevents many people from being misled?",
    options: [
      { id: "A", text: "Yes, if the public risk is real.", scores: { justice: 3, courage: 2, pragmatism: 1 } },
      { id: "B", text: "Only after private correction fails.", scores: { empathy: 2, fairness: 2, responsibility: 2 } },
      { id: "C", text: "No, public embarrassment usually becomes cruelty.", scores: { empathy: 3, loyalty: 1 } },
      { id: "D", text: "It depends on how much power the person has.", scores: { justice: 2, fairness: 2, pragmatism: 2 } },
    ],
    traitTags: ["justice", "empathy", "fairness", "courage"],
    measures: "Public accountability, proportionality, and harm prevention.",
  },
  {
    id: "m25",
    test: "morality",
    type: "multiple_choice",
    question: "When two values conflict, what do you trust most?",
    options: [
      { id: "A", text: "Clear principles.", scores: { ruleRespect: 2, honesty: 2, justice: 1 } },
      { id: "B", text: "The likely consequences.", scores: { pragmatism: 3, responsibility: 2 } },
      { id: "C", text: "The people who will be hurt most.", scores: { empathy: 3, fairness: 2 } },
      { id: "D", text: "My own judgment after hearing every side.", scores: { independence: 3, fairness: 1, responsibility: 1 } },
    ],
    traitTags: ["ruleRespect", "pragmatism", "empathy", "independence"],
    measures: "Primary decision anchor under moral ambiguity.",
  },
  {
    id: "m26",
    test: "morality",
    type: "scenario",
    question: "A new person in your group keeps making awkward comments, but you can tell they are trying. How do you respond?",
    options: [
      { id: "A", text: "Help them adjust without making them feel stupid.", scores: { empathy: 3, loyalty: 1, responsibility: 1 } },
      { id: "B", text: "Correct them clearly so they learn fast.", scores: { honesty: 2, responsibility: 2, fairness: 1 } },
      { id: "C", text: "Let the group norms teach them naturally.", scores: { pragmatism: 2 } },
      { id: "D", text: "Defend them if others start mocking them.", scores: { courage: 2, empathy: 2, justice: 1 } },
    ],
    traitTags: ["empathy", "honesty", "responsibility", "courage"],
    measures: "Correction style, patience, and protection of social outsiders.",
  },
  {
    id: "m27",
    test: "morality",
    type: "forced_choice",
    question: "What should matter more when judging a bad action?",
    options: [
      { id: "A", text: "The damage caused.", scores: { responsibility: 3, justice: 2 } },
      { id: "B", text: "The intention behind it.", scores: { empathy: 3, fairness: 1 } },
      { id: "C", text: "Whether the person repairs it.", scores: { responsibility: 3, pragmatism: 2 } },
      { id: "D", text: "Whether they knew better.", scores: { fairness: 3, justice: 1 } },
    ],
    traitTags: ["responsibility", "empathy", "fairness", "justice"],
    measures: "Moral evaluation model: harm, intent, repair, or awareness.",
  },
  {
    id: "m28",
    test: "morality",
    type: "scenario",
    question: "A leader you respect makes a decision that benefits the group but quietly harms one powerless person. What do you do?",
    options: [
      { id: "A", text: "Challenge the leader directly.", scores: { courage: 3, justice: 3, independence: 2 } },
      { id: "B", text: "Raise the issue privately and propose a fix.", scores: { pragmatism: 3, justice: 2, responsibility: 2 } },
      { id: "C", text: "Accept it if the group benefit is much greater.", scores: { pragmatism: 2, empathy: -1 } },
      { id: "D", text: "Support the harmed person and gather facts first.", scores: { empathy: 3, fairness: 2, responsibility: 1 } },
    ],
    traitTags: ["courage", "justice", "empathy", "pragmatism"],
    measures: "Power ethics, minority harm, and courage against respected authority.",
  },
  {
    id: "m29",
    test: "morality",
    type: "multiple_choice",
    question: "What makes someone trustworthy fastest?",
    options: [
      { id: "A", text: "They tell the truth even when it costs them.", scores: { honesty: 3, courage: 2 } },
      { id: "B", text: "They show up when people need them.", scores: { loyalty: 3, responsibility: 2 } },
      { id: "C", text: "They treat low status people with respect.", scores: { empathy: 2, justice: 2, fairness: 3 } },
      { id: "D", text: "Their actions stay consistent over time.", scores: { responsibility: 3, ruleRespect: 1, pragmatism: 1 } },
    ],
    traitTags: ["honesty", "loyalty", "fairness", "responsibility"],
    measures: "The user's trust trigger and moral credibility standard.",
  },
  {
    id: "m30",
    test: "morality",
    type: "scenario",
    question: "You can win an argument by using a detail you know would deeply embarrass the other person. What do you do?",
    options: [
      { id: "A", text: "Do not use it. Winning is not worth unnecessary harm.", scores: { empathy: 3, fairness: 2, responsibility: 1 } },
      { id: "B", text: "Use it only if the issue is serious and the detail is relevant.", scores: { justice: 2, pragmatism: 2, responsibility: 1 } },
      { id: "C", text: "Use it if they are being dishonest or manipulative.", scores: { justice: 2, courage: 1, empathy: -1 } },
      { id: "D", text: "Warn them privately that the detail matters before saying it publicly.", scores: { fairness: 2, honesty: 2, pragmatism: 2 } },
    ],
    traitTags: ["empathy", "fairness", "justice", "honesty"],
    measures: "Restraint, proportionality, and ethical use of sensitive information.",
  },
];

export const logicQuestions: LogicQuestion[] = [
  {
    id: "l1",
    test: "logic",
    type: "multiple_choice",
    question: "Pretend you are in a horse race with 8 racers. You are in 4th place and you pass the person in 3rd place. What place are you in?",
    options: [
      { id: "A", text: "1st" },
      { id: "B", text: "2nd" },
      { id: "C", text: "3rd" },
      { id: "D", text: "4th" },
    ],
    correctAnswer: "C",
    difficulty: 1,
    skill: "trick_logic",
    explanation: "Passing the person in 3rd means you take their position, so you are now in 3rd place.",
    scoringValue: 1,
  },
  {
    id: "l2",
    test: "logic",
    type: "multiple_choice",
    question: "What comes next: 2, 4, 8, 16, ?",
    options: [
      { id: "A", text: "20" },
      { id: "B", text: "24" },
      { id: "C", text: "30" },
      { id: "D", text: "32" },
    ],
    correctAnswer: "D",
    difficulty: 1,
    skill: "number_sequences",
    explanation: "Each number doubles. 16 x 2 = 32.",
    scoringValue: 1,
  },
  {
    id: "l3",
    test: "logic",
    type: "multiple_choice",
    question: "All glim are tor. Some tor are vep. Which statement must be true?",
    options: [
      { id: "A", text: "All glim are vep" },
      { id: "B", text: "Some glim are vep" },
      { id: "C", text: "All glim are tor" },
      { id: "D", text: "No tor are glim" },
    ],
    correctAnswer: "C",
    difficulty: 2,
    skill: "deductive_reasoning",
    explanation: "The first statement directly says all glim are tor. Nothing proves glim overlap with vep.",
    scoringValue: 2,
  },
  {
    id: "l4",
    test: "logic",
    type: "visual_odd_one_out",
    question: "Which shape does not belong?",
    visualPrompt: {
      layout: "grid",
      shapes: [
        { id: "A", shape: "circle", fill: "solid", color: "blue", rotation: 0, size: "medium" },
        { id: "B", shape: "circle", fill: "solid", color: "blue", rotation: 0, size: "medium" },
        { id: "C", shape: "triangle", fill: "solid", color: "blue", rotation: 0, size: "medium" },
        { id: "D", shape: "circle", fill: "solid", color: "blue", rotation: 0, size: "medium" },
      ],
    },
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
      { id: "C", text: "C" },
      { id: "D", text: "D" },
    ],
    correctAnswer: "C",
    difficulty: 1,
    skill: "visual_reasoning",
    explanation: "C is the only triangle. The others are circles.",
    scoringValue: 1,
  },
  {
    id: "l5",
    test: "logic",
    type: "multiple_choice",
    question: "Book is to reading as fork is to...",
    options: [
      { id: "A", text: "Kitchen" },
      { id: "B", text: "Eating" },
      { id: "C", text: "Plate" },
      { id: "D", text: "Metal" },
    ],
    correctAnswer: "B",
    difficulty: 1,
    skill: "analogies",
    explanation: "A book is used for reading. A fork is used for eating.",
    scoringValue: 1,
  },
  {
    id: "l6",
    test: "logic",
    type: "multiple_choice",
    question: "What comes next: 3, 6, 11, 18, 27, ?",
    options: [
      { id: "A", text: "36" },
      { id: "B", text: "38" },
      { id: "C", text: "40" },
      { id: "D", text: "42" },
    ],
    correctAnswer: "B",
    difficulty: 3,
    skill: "number_sequences",
    explanation: "The differences are +3, +5, +7, +9, so the next difference is +11. 27 + 11 = 38.",
    scoringValue: 3,
  },
  {
    id: "l7",
    test: "logic",
    type: "multiple_choice",
    question: "Which word is the odd one out?",
    options: [
      { id: "A", text: "Whisper" },
      { id: "B", text: "Shout" },
      { id: "C", text: "Murmur" },
      { id: "D", text: "Glance" },
    ],
    correctAnswer: "D",
    difficulty: 2,
    skill: "word_logic",
    explanation: "Whisper, shout, and murmur are sound or speech actions. Glance is visual.",
    scoringValue: 2,
  },
  {
    id: "l8",
    test: "logic",
    type: "visual_pattern",
    question: "The shapes rotate 90 degrees clockwise each step. Which option completes the sequence?",
    visualPrompt: {
      layout: "sequence",
      shapes: [
        { id: "1", shape: "triangle", fill: "solid", color: "purple", rotation: 0 },
        { id: "2", shape: "triangle", fill: "solid", color: "purple", rotation: 90 },
        { id: "3", shape: "triangle", fill: "solid", color: "purple", rotation: 180 },
      ],
      instruction: "Choose the triangle rotation that comes next.",
    },
    options: [
      { id: "A", text: "Triangle rotated 0 degrees" },
      { id: "B", text: "Triangle rotated 90 degrees" },
      { id: "C", text: "Triangle rotated 270 degrees" },
      { id: "D", text: "Square rotated 270 degrees" },
    ],
    correctAnswer: "C",
    difficulty: 2,
    skill: "spatial_reasoning",
    explanation: "0, 90, 180, then 270 degrees completes the rotation pattern.",
    scoringValue: 2,
  },
  {
    id: "l9",
    test: "logic",
    type: "multiple_choice",
    question: "A bat and ball cost $1.10 total. The bat costs $1 more than the ball. How much is the ball?",
    options: [
      { id: "A", text: "$0.05" },
      { id: "B", text: "$0.10" },
      { id: "C", text: "$0.15" },
      { id: "D", text: "$1.00" },
    ],
    correctAnswer: "A",
    difficulty: 3,
    skill: "trick_logic",
    explanation: "If the ball is $0.05, the bat is $1.05, totaling $1.10.",
    scoringValue: 3,
  },
  {
    id: "l10",
    test: "logic",
    type: "multiple_choice",
    question: "If CLOUD is coded as DMPVE, how is RAIN coded?",
    options: [
      { id: "A", text: "SBJO" },
      { id: "B", text: "QZHM" },
      { id: "C", text: "TBKP" },
      { id: "D", text: "SCHO" },
    ],
    correctAnswer: "A",
    difficulty: 2,
    skill: "pattern_recognition",
    explanation: "Each letter moves forward by one. RAIN becomes SBJO.",
    scoringValue: 2,
  },
  {
    id: "l11",
    test: "logic",
    type: "multiple_choice",
    question: "Three boxes are labeled Apples, Oranges, and Mixed. Every label is wrong. You may pick one fruit from one box. Which box should you pick from to identify all boxes?",
    options: [
      { id: "A", text: "Apples" },
      { id: "B", text: "Oranges" },
      { id: "C", text: "Mixed" },
      { id: "D", text: "Any box" },
    ],
    correctAnswer: "C",
    difficulty: 4,
    skill: "deductive_reasoning",
    explanation: "The box labeled Mixed cannot be mixed because every label is wrong. One fruit reveals whether it is all apples or all oranges, then the other labels can be solved.",
    scoringValue: 4,
  },
  {
    id: "l12",
    test: "logic",
    type: "visual_odd_one_out",
    question: "Which tile does not belong? Look for the hidden rule, not just the shape.",
    visualPrompt: {
      layout: "grid",
      shapes: [
        { id: "A", shape: "square", fill: "outline", color: "black", rotation: 0, pattern: "one_dot" },
        { id: "B", shape: "triangle", fill: "outline", color: "black", rotation: 0, pattern: "one_dot" },
        { id: "C", shape: "diamond", fill: "outline", color: "black", rotation: 0, pattern: "one_dot" },
        { id: "D", shape: "hexagon", fill: "outline", color: "black", rotation: 0, pattern: "two_dots" },
      ],
    },
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
      { id: "C", text: "C" },
      { id: "D", text: "D" },
    ],
    correctAnswer: "D",
    difficulty: 2,
    skill: "visual_reasoning",
    explanation: "A, B, and C each have one dot. D has two dots.",
    scoringValue: 2,
  },
  {
    id: "l13",
    test: "logic",
    type: "multiple_choice",
    question: "Mia is taller than Leo. Leo is taller than Sam. Nora is shorter than Mia but taller than Leo. Who is shortest?",
    options: [
      { id: "A", text: "Mia" },
      { id: "B", text: "Leo" },
      { id: "C", text: "Sam" },
      { id: "D", text: "Nora" },
    ],
    correctAnswer: "C",
    difficulty: 2,
    skill: "deductive_reasoning",
    explanation: "The order is Mia, Nora, Leo, Sam. Sam is shortest.",
    scoringValue: 2,
  },
  {
    id: "l14",
    test: "logic",
    type: "multiple_choice",
    question: "Which number completes the analogy: 9 is to 81 as 7 is to ?",
    options: [
      { id: "A", text: "14" },
      { id: "B", text: "42" },
      { id: "C", text: "49" },
      { id: "D", text: "63" },
    ],
    correctAnswer: "C",
    difficulty: 1,
    skill: "analogies",
    explanation: "81 is 9 squared. 7 squared is 49.",
    scoringValue: 1,
  },
  {
    id: "l15",
    test: "logic",
    type: "multiple_choice",
    question: "You see these words for 4 seconds: river, candle, mirror, orange. Which one was related to reflection?",
    options: [
      { id: "A", text: "River" },
      { id: "B", text: "Candle" },
      { id: "C", text: "Mirror" },
      { id: "D", text: "Orange" },
    ],
    correctAnswer: "C",
    difficulty: 1,
    skill: "memory_reasoning",
    explanation: "Mirror is the item most directly related to reflection.",
    scoringValue: 1,
  },
  {
    id: "l16",
    test: "logic",
    type: "multiple_choice",
    question: "What comes next: 1, 1, 2, 3, 5, 8, ?",
    options: [
      { id: "A", text: "11" },
      { id: "B", text: "12" },
      { id: "C", text: "13" },
      { id: "D", text: "15" },
    ],
    correctAnswer: "C",
    difficulty: 2,
    skill: "number_sequences",
    explanation: "Each term is the sum of the previous two. 5 + 8 = 13.",
    scoringValue: 2,
  },
  {
    id: "l17",
    test: "logic",
    type: "visual_pattern",
    question: "Which option completes the pattern: one dot, two dots, three dots, ?",
    visualPrompt: {
      layout: "sequence",
      shapes: [
        { id: "1", shape: "circle", fill: "outline", color: "black", pattern: "one_dot" },
        { id: "2", shape: "circle", fill: "outline", color: "black", pattern: "two_dots" },
        { id: "3", shape: "circle", fill: "outline", color: "black", count: 3 },
      ],
    },
    options: [
      { id: "A", text: "Circle with one dot" },
      { id: "B", text: "Circle with two dots" },
      { id: "C", text: "Circle with four dots" },
      { id: "D", text: "Square with three dots" },
    ],
    correctAnswer: "C",
    difficulty: 1,
    skill: "pattern_recognition",
    explanation: "The number of dots increases by one each step.",
    scoringValue: 1,
  },
  {
    id: "l18",
    test: "logic",
    type: "multiple_choice",
    question: "Which phrase best completes this relationship: Seed is to tree as idea is to...",
    options: [
      { id: "A", text: "Thought" },
      { id: "B", text: "Plan" },
      { id: "C", text: "Project" },
      { id: "D", text: "Question" },
    ],
    correctAnswer: "C",
    difficulty: 2,
    skill: "analogies",
    explanation: "A seed can develop into a tree. An idea can develop into a project.",
    scoringValue: 2,
  },
  {
    id: "l19",
    test: "logic",
    type: "multiple_choice",
    question: "A clock shows 3:15. What is the smaller angle between the hour and minute hands?",
    options: [
      { id: "A", text: "0 degrees" },
      { id: "B", text: "7.5 degrees" },
      { id: "C", text: "15 degrees" },
      { id: "D", text: "30 degrees" },
    ],
    correctAnswer: "B",
    difficulty: 4,
    skill: "spatial_reasoning",
    explanation: "At 3:15, the minute hand is at 90 degrees and the hour hand has moved one quarter of the way from 3 to 4, which is 7.5 degrees past 90.",
    scoringValue: 4,
  },
  {
    id: "l20",
    test: "logic",
    type: "multiple_choice",
    question: "Which number is the odd one out: 16, 25, 36, 49, 60?",
    options: [
      { id: "A", text: "16" },
      { id: "B", text: "25" },
      { id: "C", text: "49" },
      { id: "D", text: "60" },
    ],
    correctAnswer: "D",
    difficulty: 2,
    skill: "number_sequences",
    explanation: "16, 25, 36, and 49 are perfect squares. 60 is not.",
    scoringValue: 2,
  },
  {
    id: "l21",
    test: "logic",
    type: "multiple_choice",
    question: "If no zargs are blue, and all blue things are round, what must be true?",
    options: [
      { id: "A", text: "No zargs are round" },
      { id: "B", text: "Some round things are zargs" },
      { id: "C", text: "No blue things are zargs" },
      { id: "D", text: "All round things are blue" },
    ],
    correctAnswer: "C",
    difficulty: 3,
    skill: "deductive_reasoning",
    explanation: "If no zargs are blue, then no blue things are zargs. The round category does not prove anything else.",
    scoringValue: 3,
  },
  {
    id: "l22",
    test: "logic",
    type: "visual_odd_one_out",
    question: "Which arrow does not belong?",
    visualPrompt: {
      layout: "grid",
      shapes: [
        { id: "A", shape: "arrow", fill: "solid", color: "green", rotation: 0 },
        { id: "B", shape: "arrow", fill: "solid", color: "green", rotation: 90 },
        { id: "C", shape: "arrow", fill: "solid", color: "green", rotation: 180 },
        { id: "D", shape: "arrow", fill: "solid", color: "green", rotation: 180 },
      ],
      instruction: "Three arrows follow a 90 degree rotation sequence. One breaks it.",
    },
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
      { id: "C", text: "C" },
      { id: "D", text: "D" },
    ],
    correctAnswer: "D",
    difficulty: 3,
    skill: "visual_reasoning",
    explanation: "The expected set is 0, 90, 180, 270. D repeats 180 instead of continuing to 270.",
    scoringValue: 3,
  },
  {
    id: "l23",
    test: "logic",
    type: "multiple_choice",
    question: "What comes next: J, F, M, A, M, J, ?",
    options: [
      { id: "A", text: "J" },
      { id: "B", text: "A" },
      { id: "C", text: "S" },
      { id: "D", text: "N" },
    ],
    correctAnswer: "A",
    difficulty: 2,
    skill: "pattern_recognition",
    explanation: "These are the first letters of the months: January, February, March, April, May, June, so July is next.",
    scoringValue: 2,
  },
  {
    id: "l24",
    test: "logic",
    type: "multiple_choice",
    question: "If 5 machines make 5 items in 5 minutes, how long do 100 machines take to make 100 items?",
    options: [
      { id: "A", text: "5 minutes" },
      { id: "B", text: "20 minutes" },
      { id: "C", text: "100 minutes" },
      { id: "D", text: "500 minutes" },
    ],
    correctAnswer: "A",
    difficulty: 3,
    skill: "fast_thinking",
    explanation: "Each machine makes one item in 5 minutes. 100 machines make 100 items in 5 minutes.",
    scoringValue: 3,
  },
  {
    id: "l25",
    test: "logic",
    type: "multiple_choice",
    question: "Find the missing number: 4, 9, 19, 39, ?",
    options: [
      { id: "A", text: "59" },
      { id: "B", text: "69" },
      { id: "C", text: "79" },
      { id: "D", text: "89" },
    ],
    correctAnswer: "C",
    difficulty: 4,
    skill: "number_sequences",
    explanation: "Each step doubles then adds 1: 4x2+1=9, 9x2+1=19, 19x2+1=39, 39x2+1=79.",
    scoringValue: 4,
  },
  {
    id: "l26",
    test: "logic",
    type: "visual_pattern",
    question: "Which option completes the matrix rule: each row adds one side to the shape?",
    visualPrompt: {
      layout: "matrix",
      shapes: [
        { id: "1", shape: "triangle", fill: "outline", color: "black" },
        { id: "2", shape: "square", fill: "outline", color: "black" },
        { id: "3", shape: "hexagon", fill: "outline", color: "black" },
      ],
      instruction: "The missing shape should have one more side than a square and one less than a hexagon.",
    },
    options: [
      { id: "A", text: "Circle" },
      { id: "B", text: "Triangle" },
      { id: "C", text: "Pentagon" },
      { id: "D", text: "Star" },
    ],
    correctAnswer: "C",
    difficulty: 3,
    skill: "spatial_reasoning",
    explanation: "The missing shape has 5 sides, so it is a pentagon. Render it as a true pentagon in the UI.",
    scoringValue: 3,
  },
  {
    id: "l27",
    test: "logic",
    type: "multiple_choice",
    question: "Which pair has the same relationship as lock and key?",
    options: [
      { id: "A", text: "Question and answer" },
      { id: "B", text: "Door and wall" },
      { id: "C", text: "Pen and paper" },
      { id: "D", text: "Rain and cloud" },
    ],
    correctAnswer: "A",
    difficulty: 3,
    skill: "analogies",
    explanation: "A key resolves or opens a lock. An answer resolves a question.",
    scoringValue: 3,
  },
  {
    id: "l28",
    test: "logic",
    type: "multiple_choice",
    question: "You have two coins that total 30 cents. One is not a nickel. What are the coins?",
    options: [
      { id: "A", text: "Two nickels" },
      { id: "B", text: "A quarter and a nickel" },
      { id: "C", text: "Three dimes" },
      { id: "D", text: "A dime and a penny" },
    ],
    correctAnswer: "B",
    difficulty: 3,
    skill: "trick_logic",
    explanation: "One coin is not a nickel, but the other coin can be. A quarter plus a nickel equals 30 cents.",
    scoringValue: 3,
  },
  {
    id: "l29",
    test: "logic",
    type: "multiple_choice",
    question: "A cube is painted on all sides and cut into 27 equal smaller cubes. How many small cubes have paint on exactly two faces?",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "12" },
      { id: "D", text: "24" },
    ],
    correctAnswer: "C",
    difficulty: 5,
    skill: "spatial_reasoning",
    explanation: "A 3x3x3 cube has one edge center cube on each of 12 edges. Those have paint on exactly two faces.",
    scoringValue: 5,
  },
  {
    id: "l30",
    test: "logic",
    type: "multiple_choice",
    question: "Five people are in a room. Each person shakes hands with every other person once. How many handshakes happen?",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "10" },
      { id: "C", text: "15" },
      { id: "D", text: "20" },
    ],
    correctAnswer: "B",
    difficulty: 3,
    skill: "deductive_reasoning",
    explanation: "Each pair shakes once. 5 choose 2 equals 10.",
    scoringValue: 3,
  },
];

export const rarityQuestions: RarityQuestion[] = [
  {
    id: "r1",
    test: "rarity",
    type: "written_one_word",
    question: "What is the first word you think of when you see the color yellow?",
    traitTags: ["originality", "emotionalDepth", "curiosity"],
    scoringGuide: {
      common: ["sun", "happy", "banana", "bright", "lemon"],
      uncommon: ["taxi", "gold", "warning", "childhood", "honey"],
      rare: ["silence", "fever", "memory", "electric", "nostalgia", "arrival"],
      fallbackRule: "Score by specificity, emotional association, and semantic distance from common bright objects.",
      keywordMap: {
        common: ["sun", "happy", "banana", "bright", "lemon", "light"],
        uncommon: ["taxi", "gold", "warning", "childhood", "honey", "school", "summer"],
        rare: ["silence", "fever", "memory", "electric", "nostalgia", "arrival", "signal", "ache"],
      },
    },
    measures: "Associative originality and emotional color mapping.",
  },
  {
    id: "r2",
    test: "rarity",
    type: "multiple_choice",
    question: "At a party where you know almost nobody, what do you naturally do first?",
    options: [
      { id: "A", text: "Find one person who seems interesting and go deep fast.", scores: { curiosity: 2, emotionalDepth: 2, socialEnergy: 1 }, rarityPoints: 3 },
      { id: "B", text: "Read the room quietly before joining anything.", scores: { instinct: 2, emotionalDepth: 1, independence: 1 }, rarityPoints: 2 },
      { id: "C", text: "Bring energy and start connecting people.", scores: { socialEnergy: 3, patternBreaking: 1 }, rarityPoints: 2 },
      { id: "D", text: "Stay close to whoever I came with.", scores: { socialEnergy: 1, instinct: 1 }, rarityPoints: 1 },
    ],
    traitTags: ["socialEnergy", "curiosity", "instinct", "emotionalDepth"],
    measures: "Social entry style and whether the user creates, observes, or conserves energy.",
  },
  {
    id: "r3",
    test: "rarity",
    type: "slider",
    question: "How often do you question why normal things are considered normal?",
    slider: { min: 0, max: 10, leftLabel: "Almost never", rightLabel: "Constantly" },
    traitTags: ["curiosity", "patternBreaking", "independence"],
    measures: "Norm questioning and reflective independence.",
  },
  {
    id: "r4",
    test: "rarity",
    type: "multiple_choice",
    question: "Pick the image idea you would rather hang on your wall.",
    options: [
      { id: "A", text: "A clean ocean horizon at sunset.", scores: { emotionalDepth: 1 }, rarityPoints: 1 },
      { id: "B", text: "A lonely gas station glowing at 2 a.m.", scores: { emotionalDepth: 3, originality: 2 }, rarityPoints: 4 },
      { id: "C", text: "A colorful abstract shape that means nothing at first.", scores: { originality: 3, curiosity: 2 }, rarityPoints: 3 },
      { id: "D", text: "A photo of friends laughing mid moment.", scores: { socialEnergy: 3, emotionalDepth: 1 }, rarityPoints: 2 },
    ],
    traitTags: ["originality", "emotionalDepth", "socialEnergy"],
    measures: "Aesthetic uniqueness and emotional atmosphere preference.",
  },
  {
    id: "r5",
    test: "rarity",
    type: "written_short",
    question: "Describe the feeling of midnight in one short phrase.",
    traitTags: ["originality", "emotionalDepth", "instinct"],
    scoringGuide: {
      common: ["dark", "quiet", "sleepy", "night time"],
      uncommon: ["peaceful reset", "empty streets", "secret hour", "calm danger"],
      rare: ["the world holding its breath", "blue silence", "a door between days", "soft electricity"],
      fallbackRule: "Score higher for metaphor, sensory detail, emotional specificity, and unexpected but coherent phrasing.",
      keywordMap: {
        common: ["dark", "quiet", "sleep", "night", "late"],
        uncommon: ["reset", "empty", "secret", "calm", "still", "alone"],
        rare: ["breath", "door", "blue", "electric", "between", "humming", "ghost"],
      },
    },
    measures: "Metaphoric thinking and sensory emotional language.",
  },
  {
    id: "r6",
    test: "rarity",
    type: "scenario",
    question: "You are given a free day with no responsibilities. What sounds most like you?",
    options: [
      { id: "A", text: "Go somewhere unfamiliar and let the day unfold.", scores: { curiosity: 3, instinct: 2, independence: 2 }, rarityPoints: 4 },
      { id: "B", text: "Recharge alone with comfort, food, and quiet.", scores: { emotionalDepth: 2, independence: 2 }, rarityPoints: 2 },
      { id: "C", text: "Call people and turn it into a spontaneous hangout.", scores: { socialEnergy: 3, instinct: 1 }, rarityPoints: 2 },
      { id: "D", text: "Use it to finish something I care about.", scores: { independence: 2, curiosity: 1 }, rarityPoints: 2 },
    ],
    traitTags: ["curiosity", "instinct", "independence", "socialEnergy"],
    measures: "Freedom style and how the user spends unstructured time.",
  },
  {
    id: "r7",
    test: "rarity",
    type: "multiple_choice",
    question: "Which compliment would feel weirdly accurate?",
    options: [
      { id: "A", text: "You notice what other people miss.", scores: { instinct: 2, curiosity: 2, emotionalDepth: 1 }, rarityPoints: 3 },
      { id: "B", text: "You make normal things feel interesting.", scores: { originality: 3, socialEnergy: 1 }, rarityPoints: 3 },
      { id: "C", text: "You are hard to predict in a good way.", scores: { patternBreaking: 3, independence: 2 }, rarityPoints: 4 },
      { id: "D", text: "You are steady when everyone else gets loud.", scores: { instinct: 2, emotionalDepth: 2 }, rarityPoints: 2 },
    ],
    traitTags: ["instinct", "originality", "patternBreaking", "emotionalDepth"],
    measures: "Self recognized uniqueness signal.",
  },
  {
    id: "r8",
    test: "rarity",
    type: "visual_association" as QuestionType,
    question: "Choose the visual that feels most like your mind on a good day.",
    visualPrompt: {
      layout: "grid",
      shapes: [
        { id: "A", shape: "circle", fill: "solid", color: "sky", pattern: "none" },
        { id: "B", shape: "line", fill: "solid", color: "black", pattern: "center_line" },
        { id: "C", shape: "star", fill: "outline", color: "purple", pattern: "one_dot" },
        { id: "D", shape: "crescent", fill: "solid", color: "gold", rotation: 45 },
      ],
    },
    options: [
      { id: "A", text: "Smooth circle" , scores: { emotionalDepth: 1, instinct: 1 }, rarityPoints: 1 },
      { id: "B", text: "Clean line" , scores: { independence: 2 }, rarityPoints: 2 },
      { id: "C", text: "Star with a hidden dot" , scores: { originality: 3, curiosity: 2 }, rarityPoints: 4 },
      { id: "D", text: "Tilted crescent" , scores: { instinct: 3, emotionalDepth: 2 }, rarityPoints: 3 },
    ],
    traitTags: ["originality", "instinct", "curiosity"],
    measures: "Abstract self association and visual identity preference.",
  },
  {
    id: "r9",
    test: "rarity",
    type: "multiple_choice",
    question: "When you disagree with a group, what usually happens inside you?",
    options: [
      { id: "A", text: "I hold my view but wait for the right moment.", scores: { instinct: 2, independence: 2 }, rarityPoints: 2 },
      { id: "B", text: "I say it if the point actually matters.", scores: { independence: 3, patternBreaking: 1 }, rarityPoints: 2 },
      { id: "C", text: "I get more curious about why everyone sees it differently.", scores: { curiosity: 3, emotionalDepth: 1 }, rarityPoints: 3 },
      { id: "D", text: "I usually assume I may be missing something.", scores: { curiosity: 2, emotionalDepth: 1 }, rarityPoints: 1 },
    ],
    traitTags: ["independence", "curiosity", "instinct", "patternBreaking"],
    measures: "Dissent style and openness under group pressure.",
  },
  {
    id: "r10",
    test: "rarity",
    type: "written_one_word",
    question: "What is the first word you think of when you hear the word mirror?",
    traitTags: ["emotionalDepth", "originality", "instinct"],
    scoringGuide: {
      common: ["reflection", "glass", "face", "look"],
      uncommon: ["truth", "reverse", "bathroom", "double"],
      rare: ["stranger", "echo", "proof", "mask", "portal", "trial"],
      fallbackRule: "Score by psychological depth, metaphor, and distance from object description.",
      keywordMap: {
        common: ["reflection", "glass", "face", "look", "self"],
        uncommon: ["truth", "reverse", "double", "bathroom", "image"],
        rare: ["stranger", "echo", "proof", "mask", "portal", "trial", "ghost"],
      },
    },
    measures: "Self association, symbolic thinking, and semantic distance.",
  },
  {
    id: "r11",
    test: "rarity",
    type: "slider",
    question: "How much do you trust your gut when you cannot explain it yet?",
    slider: { min: 0, max: 10, leftLabel: "I need proof first", rightLabel: "My gut is usually early" },
    traitTags: ["instinct", "independence"],
    measures: "Intuitive confidence and independent decision timing.",
  },
  {
    id: "r12",
    test: "rarity",
    type: "multiple_choice",
    question: "Which kind of mystery hooks you fastest?",
    options: [
      { id: "A", text: "A person who seems simple but clearly is not.", scores: { emotionalDepth: 3, curiosity: 2 }, rarityPoints: 3 },
      { id: "B", text: "A pattern in numbers, symbols, or timing.", scores: { curiosity: 3, originality: 1 }, rarityPoints: 3 },
      { id: "C", text: "A place that feels like it has a hidden story.", scores: { emotionalDepth: 2, instinct: 2, originality: 1 }, rarityPoints: 4 },
      { id: "D", text: "A social situation where everyone is pretending not to notice something.", scores: { instinct: 3, socialEnergy: 1 }, rarityPoints: 4 },
    ],
    traitTags: ["curiosity", "emotionalDepth", "instinct"],
    measures: "Curiosity target and hidden pattern sensitivity.",
  },
  {
    id: "r13",
    test: "rarity",
    type: "scenario",
    question: "You suddenly become good at one unusual skill overnight. Which one do you pick?",
    options: [
      { id: "A", text: "Reading micro expressions." , scores: { instinct: 3, socialEnergy: 1 }, rarityPoints: 3 },
      { id: "B", text: "Inventing melodies from random sounds." , scores: { originality: 3, emotionalDepth: 2 }, rarityPoints: 4 },
      { id: "C", text: "Remembering exact routes after seeing them once." , scores: { curiosity: 1, instinct: 2 }, rarityPoints: 2 },
      { id: "D", text: "Making strangers feel comfortable instantly." , scores: { socialEnergy: 3, emotionalDepth: 1 }, rarityPoints: 2 },
    ],
    traitTags: ["instinct", "originality", "socialEnergy"],
    measures: "Desired rare ability and motivational style.",
  },
  {
    id: "r14",
    test: "rarity",
    type: "written_short",
    question: "Name something ordinary that feels strangely beautiful to you.",
    traitTags: ["originality", "emotionalDepth", "curiosity"],
    scoringGuide: {
      common: ["sunset", "flowers", "music", "rain"],
      uncommon: ["laundry moving", "streetlights", "old signs", "steam"],
      rare: ["receipt ink", "elevator hum", "cracked paint", "grocery store silence", "dust in headlights"],
      fallbackRule: "Score higher for specific ordinary details that most people overlook, especially with sensory language.",
      keywordMap: {
        common: ["sunset", "flower", "music", "rain", "sky"],
        uncommon: ["streetlight", "laundry", "steam", "sign", "window", "coffee"],
        rare: ["receipt", "elevator", "cracked", "dust", "headlight", "tile", "neon"],
      },
    },
    measures: "Beauty detection in overlooked environments.",
  },
  {
    id: "r15",
    test: "rarity",
    type: "multiple_choice",
    question: "Your best ideas usually arrive when you are...",
    options: [
      { id: "A", text: "Walking or driving with no pressure.", scores: { instinct: 2, curiosity: 2 }, rarityPoints: 2 },
      { id: "B", text: "Talking out loud with someone sharp.", scores: { socialEnergy: 2, curiosity: 2 }, rarityPoints: 2 },
      { id: "C", text: "Alone, late, and slightly restless.", scores: { originality: 2, emotionalDepth: 3 }, rarityPoints: 4 },
      { id: "D", text: "Under a deadline with real stakes.", scores: { instinct: 2, patternBreaking: 2 }, rarityPoints: 3 },
    ],
    traitTags: ["curiosity", "emotionalDepth", "socialEnergy", "instinct"],
    measures: "Creative activation conditions and pressure response.",
  },
  {
    id: "r16",
    test: "rarity",
    type: "slider",
    question: "How often do people misunderstand your real reason for doing something?",
    slider: { min: 0, max: 10, leftLabel: "Rarely", rightLabel: "All the time" },
    traitTags: ["independence", "emotionalDepth", "patternBreaking"],
    measures: "Internal complexity and mismatch between motive and appearance.",
  },
  {
    id: "r17",
    test: "rarity",
    type: "multiple_choice",
    question: "Pick the risk that sounds most worth it.",
    options: [
      { id: "A", text: "Starting over somewhere new." , scores: { independence: 3, curiosity: 2 }, rarityPoints: 4 },
      { id: "B", text: "Being honest before you know how it will land." , scores: { emotionalDepth: 2, patternBreaking: 2 }, rarityPoints: 3 },
      { id: "C", text: "Backing an idea before anyone else sees it." , scores: { originality: 3, instinct: 2 }, rarityPoints: 4 },
      { id: "D", text: "Trusting someone deeply." , scores: { emotionalDepth: 3, socialEnergy: 1 }, rarityPoints: 2 },
    ],
    traitTags: ["independence", "originality", "instinct", "emotionalDepth"],
    measures: "Risk tolerance style and value based courage.",
  },
  {
    id: "r18",
    test: "rarity",
    type: "written_one_word",
    question: "What is the first word you think of when you see an empty chair?",
    traitTags: ["emotionalDepth", "originality", "instinct"],
    scoringGuide: {
      common: ["sit", "seat", "table", "room"],
      uncommon: ["waiting", "absence", "school", "dinner"],
      rare: ["ghost", "permission", "leftover", "silence", "missing", "invitation"],
      fallbackRule: "Score based on whether the answer is functional, narrative, emotional, or symbolic.",
      keywordMap: {
        common: ["sit", "seat", "chair", "table", "room"],
        uncommon: ["waiting", "absence", "school", "dinner", "alone"],
        rare: ["ghost", "permission", "leftover", "silence", "missing", "invitation", "memory"],
      },
    },
    measures: "Object symbolism and emotional narrative association.",
  },
  {
    id: "r19",
    test: "rarity",
    type: "multiple_choice",
    question: "Which sentence feels most like your private mind?",
    options: [
      { id: "A", text: "I am always connecting things that do not look connected." , scores: { curiosity: 3, patternBreaking: 2 }, rarityPoints: 4 },
      { id: "B", text: "I feel more than I explain." , scores: { emotionalDepth: 3, instinct: 1 }, rarityPoints: 3 },
      { id: "C", text: "I can become anyone socially, but I need time to return to myself." , scores: { socialEnergy: 2, emotionalDepth: 2 }, rarityPoints: 4 },
      { id: "D", text: "I would rather be accurate than understood quickly." , scores: { independence: 2, curiosity: 2 }, rarityPoints: 3 },
    ],
    traitTags: ["curiosity", "emotionalDepth", "socialEnergy", "independence"],
    measures: "Inner world structure and self perception.",
  },
  {
    id: "r20",
    test: "rarity",
    type: "slider",
    question: "How drawn are you to people, places, or ideas that feel slightly unusual?",
    slider: { min: 0, max: 10, leftLabel: "I like familiar things", rightLabel: "Unusual pulls me in" },
    traitTags: ["curiosity", "originality", "patternBreaking"],
    measures: "Novelty attraction and openness to the unconventional.",
  },
  {
    id: "r21",
    test: "rarity",
    type: "scenario",
    question: "You find a hidden door in a building you know well. First instinct?",
    options: [
      { id: "A", text: "Open it immediately." , scores: { curiosity: 3, instinct: 2 }, rarityPoints: 4 },
      { id: "B", text: "Take a photo and figure out why it is there." , scores: { curiosity: 3, independence: 1 }, rarityPoints: 3 },
      { id: "C", text: "Tell someone before touching it." , scores: { socialEnergy: 1, instinct: 1 }, rarityPoints: 1 },
      { id: "D", text: "Stand there imagining what could be behind it." , scores: { originality: 3, emotionalDepth: 2 }, rarityPoints: 4 },
    ],
    traitTags: ["curiosity", "instinct", "originality"],
    measures: "Mystery response, imagination, and action style.",
  },
  {
    id: "r22",
    test: "rarity",
    type: "multiple_choice",
    question: "What kind of person usually attracts your attention first?",
    options: [
      { id: "A", text: "The funny person everyone notices." , scores: { socialEnergy: 3 }, rarityPoints: 1 },
      { id: "B", text: "The quiet person who seems to know more than they say." , scores: { curiosity: 2, emotionalDepth: 2, instinct: 2 }, rarityPoints: 4 },
      { id: "C", text: "The person breaking the pattern in the room." , scores: { patternBreaking: 3, originality: 2 }, rarityPoints: 4 },
      { id: "D", text: "The kind person who checks on others quietly." , scores: { emotionalDepth: 2, instinct: 1 }, rarityPoints: 2 },
    ],
    traitTags: ["socialEnergy", "curiosity", "patternBreaking", "emotionalDepth"],
    measures: "Attention bias and social rarity detection.",
  },
  {
    id: "r23",
    test: "rarity",
    type: "written_short",
    question: "Give a title to a movie about your life right now.",
    traitTags: ["originality", "emotionalDepth", "patternBreaking"],
    scoringGuide: {
      common: ["my life", "new chapter", "the journey", "getting better"],
      uncommon: ["almost there", "under construction", "quiet chaos", "plot twist"],
      rare: ["the map keeps moving", "professional daydreamer", "static before the signal", "half built lightning"],
      fallbackRule: "Score higher for originality, tension, specificity, and a title that implies a personal story rather than a generic mood.",
      keywordMap: {
        common: ["life", "journey", "chapter", "better", "story"],
        uncommon: ["chaos", "construction", "twist", "almost", "storm"],
        rare: ["map", "signal", "static", "lightning", "unfinished", "orbit", "echo"],
      },
    },
    measures: "Narrative identity and creative self framing.",
  },
  {
    id: "r24",
    test: "rarity",
    type: "multiple_choice",
    question: "When you walk into a new place, what do you notice first?",
    options: [
      { id: "A", text: "The people and their energy." , scores: { socialEnergy: 3, instinct: 1 }, rarityPoints: 2 },
      { id: "B", text: "The exits, layout, and how things work." , scores: { instinct: 3, curiosity: 1 }, rarityPoints: 3 },
      { id: "C", text: "The mood, lighting, and hidden details." , scores: { emotionalDepth: 2, originality: 2, instinct: 2 }, rarityPoints: 4 },
      { id: "D", text: "What feels inefficient or badly designed." , scores: { curiosity: 2, patternBreaking: 2 }, rarityPoints: 3 },
    ],
    traitTags: ["socialEnergy", "instinct", "emotionalDepth", "curiosity"],
    measures: "Environmental scanning style and pattern awareness.",
  },
  {
    id: "r25",
    test: "rarity",
    type: "slider",
    question: "How much do you enjoy being hard to place into a category?",
    slider: { min: 0, max: 10, leftLabel: "I like being easy to understand", rightLabel: "I like being difficult to define" },
    traitTags: ["independence", "patternBreaking", "originality"],
    measures: "Identity independence and comfort with ambiguity.",
  },
  {
    id: "r26",
    test: "rarity",
    type: "multiple_choice",
    question: "Which small moment feels most satisfying?",
    options: [
      { id: "A", text: "Guessing what someone meant before they say it." , scores: { instinct: 3, emotionalDepth: 1 }, rarityPoints: 3 },
      { id: "B", text: "Finding the perfect word for a strange feeling." , scores: { emotionalDepth: 3, originality: 2 }, rarityPoints: 4 },
      { id: "C", text: "Making a room laugh unexpectedly." , scores: { socialEnergy: 3, patternBreaking: 1 }, rarityPoints: 2 },
      { id: "D", text: "Solving something by seeing the hidden pattern." , scores: { curiosity: 3, patternBreaking: 2 }, rarityPoints: 3 },
    ],
    traitTags: ["instinct", "emotionalDepth", "socialEnergy", "curiosity"],
    measures: "Reward sensitivity across social, emotional, and cognitive rarity.",
  },
  {
    id: "r27",
    test: "rarity",
    type: "written_one_word",
    question: "What is the first word you think of when you hear the word thunder?",
    traitTags: ["instinct", "emotionalDepth", "originality"],
    scoringGuide: {
      common: ["storm", "rain", "loud", "lightning"],
      uncommon: ["warning", "power", "childhood", "sky"],
      rare: ["applause", "giant", "message", "drums", "arrival", "permission"],
      fallbackRule: "Score by sensory vividness, symbolic distance, and whether the answer turns sound into image or meaning.",
      keywordMap: {
        common: ["storm", "rain", "loud", "lightning", "noise"],
        uncommon: ["warning", "power", "childhood", "sky", "fear"],
        rare: ["applause", "giant", "message", "drums", "arrival", "permission", "ceiling"],
      },
    },
    measures: "Sound association and symbolic instinct.",
  },
  {
    id: "r28",
    test: "rarity",
    type: "scenario",
    question: "You are offered two doors. One says predictable success. The other says unknown but unforgettable. Which do you choose today?",
    options: [
      { id: "A", text: "Predictable success." , scores: { independence: 1, instinct: 1 }, rarityPoints: 1 },
      { id: "B", text: "Unknown but unforgettable." , scores: { curiosity: 3, patternBreaking: 3, instinct: 2 }, rarityPoints: 5 },
      { id: "C", text: "I look for a third door." , scores: { originality: 3, independence: 3, patternBreaking: 2 }, rarityPoints: 5 },
      { id: "D", text: "I choose based on who is affected by my choice." , scores: { emotionalDepth: 2, socialEnergy: 1 }, rarityPoints: 2 },
    ],
    traitTags: ["curiosity", "patternBreaking", "independence", "instinct"],
    measures: "Adventure orientation and category breaking under opportunity.",
  },
  {
    id: "r29",
    test: "rarity",
    type: "multiple_choice",
    question: "Which type of silence do you understand best?",
    options: [
      { id: "A", text: "Peaceful silence." , scores: { emotionalDepth: 1 }, rarityPoints: 1 },
      { id: "B", text: "Awkward silence." , scores: { socialEnergy: 1, instinct: 2 }, rarityPoints: 2 },
      { id: "C", text: "Loaded silence where everyone knows something is unsaid." , scores: { instinct: 3, emotionalDepth: 3 }, rarityPoints: 4 },
      { id: "D", text: "Creative silence before an idea arrives." , scores: { originality: 2, curiosity: 2 }, rarityPoints: 3 },
    ],
    traitTags: ["emotionalDepth", "instinct", "socialEnergy", "originality"],
    measures: "Subtle emotional reading and meaning detection.",
  },
  {
    id: "r30",
    test: "rarity",
    type: "written_short",
    question: "Finish this sentence in your own way: I am rare because...",
    traitTags: ["originality", "independence", "emotionalDepth", "patternBreaking"],
    scoringGuide: {
      common: ["I am myself", "I am different", "I am unique", "nobody is like me"],
      uncommon: ["I notice things", "I care deeply", "I think differently", "I keep going"],
      rare: ["I turn pain into patterns", "I hear the room change", "I build doors where people see walls", "I remember what others throw away"],
      fallbackRule: "Score by specificity, self awareness, metaphor, and whether the user gives a real inner reason instead of a generic claim.",
      keywordMap: {
        common: ["unique", "different", "myself", "special"],
        uncommon: ["notice", "care", "think", "feel", "keep going"],
        rare: ["patterns", "doors", "walls", "room", "remember", "pain", "signal"],
      },
    },
    measures: "Self concept, originality, and depth of identity language.",
  },
];

export const moralityResults = {
  principledProtector: {
    title: "Principled Protector",
    paragraph: "You lead with a strong sense of right and wrong, especially when someone could be hurt or treated unfairly. You are willing to take heat if it protects the standard.",
    shareLine: "I got Principled Protector on RareScore. Fairness is my pressure test.",
  },
  empathicDiplomat: {
    title: "Empathic Diplomat",
    paragraph: "You read the human side of moral problems quickly. You care about truth, but you also care about how repair happens and how people are affected.",
    shareLine: "I got Empathic Diplomat on RareScore. I see the person inside the problem.",
  },
  independentJudge: {
    title: "Independent Judge",
    paragraph: "You do not outsource your moral compass to the crowd. You prefer to hear every side, then make your own call with clarity.",
    shareLine: "I got Independent Judge on RareScore. I do not let the room decide my values.",
  },
  loyalStrategist: {
    title: "Loyal Strategist",
    paragraph: "You value loyalty and private repair, but you are not blind to consequences. You usually look for the path that protects people without creating unnecessary damage.",
    shareLine: "I got Loyal Strategist on RareScore. I protect people and still think three moves ahead.",
  },
  ruleRespecter: {
    title: "Rule Respecter",
    paragraph: "You believe consistent standards matter because they protect people from chaos and favoritism. Your morality is steady, reliable, and process aware.",
    shareLine: "I got Rule Respecter on RareScore. I believe standards matter.",
  },
  moralRebel: {
    title: "Moral Rebel",
    paragraph: "You are not impressed by rules that fail real people. When the system and the human need collide, you are willing to challenge the system.",
    shareLine: "I got Moral Rebel on RareScore. I question rules that forget people.",
  },
  balancedRealist: {
    title: "Balanced Realist",
    paragraph: "You do not treat every moral question the same way. You weigh harm, context, people, and practical outcomes before deciding what is right.",
    shareLine: "I got Balanced Realist on RareScore. My morality changes with the facts, not the pressure.",
  },
} as const;

export const logicResults = {
  quickPatternThinker: {
    title: "Quick Pattern Thinker",
    paragraph: "You catch simple and medium patterns fast. Your strongest lane is quick recognition, clean instincts, and avoiding overthinking when the signal is clear.",
    shareLine: "I got Quick Pattern Thinker on RareScore. My brain moves fast when the pattern clicks.",
  },
  strategicProblemSolver: {
    title: "Strategic Problem Solver",
    paragraph: "You are strongest when a problem has layers. You slow down, organize the facts, and work toward the answer instead of guessing from the surface.",
    shareLine: "I got Strategic Problem Solver on RareScore. I solve by building the path.",
  },
  abstractReasoner: {
    title: "Abstract Reasoner",
    paragraph: "You are comfortable with relationships, symbols, analogies, and hidden rules. You tend to see the structure behind the content.",
    shareLine: "I got Abstract Reasoner on RareScore. I see the rule behind the question.",
  },
  sharpObserver: {
    title: "Sharp Observer",
    paragraph: "You notice visual and detail based differences quickly. Small changes, rotations, and overlooked clues are where your mind gets traction.",
    shareLine: "I got Sharp Observer on RareScore. I catch what changes.",
  },
  creativeAnalyst: {
    title: "Creative Analyst",
    paragraph: "You mix logic with flexible thinking. You are good at shifting angles when a question is trying to trap one single way of thinking.",
    shareLine: "I got Creative Analyst on RareScore. My logic has range.",
  },
  focusedThinker: {
    title: "Focused Thinker",
    paragraph: "You perform best when you slow the moment down and protect your focus. Your score reflects steady reasoning rather than random guessing.",
    shareLine: "I got Focused Thinker on RareScore. I think best when I lock in.",
  },
  rareLogicMind: {
    title: "Rare Logic Mind",
    paragraph: "You handled the hardest items with unusual consistency. Your result suggests a rare mix of pattern speed, deduction, and abstract flexibility.",
    shareLine: "I got Rare Logic Mind on RareScore. The hard questions were my playground.",
  },
} as const;

export const rarityResults = {
  theOriginal: {
    title: "The Original",
    paragraph: "Your rare signal comes from originality. You naturally reach for responses, ideas, and images that do not feel copied from the room.",
    shareLine: "I got The Original on RareScore. My mind does not follow the default path.",
  },
  theDeepObserver: {
    title: "The Deep Observer",
    paragraph: "You notice emotional details other people skip. Your rarity is quiet but powerful because you read meaning below the surface.",
    shareLine: "I got The Deep Observer on RareScore. I see what is underneath.",
  },
  thePatternBreaker: {
    title: "The Pattern Breaker",
    paragraph: "You are wired to challenge defaults. Your rare quality is the ability to step outside the expected answer and look for a different door.",
    shareLine: "I got The Pattern Breaker on RareScore. I do not stay inside the obvious box.",
  },
  theQuietRareType: {
    title: "The Quiet Rare Type",
    paragraph: "Your rarity is not loud. It shows up in your private observations, your restraint, and the way you notice what others rush past.",
    shareLine: "I got The Quiet Rare Type on RareScore. Quiet does not mean ordinary.",
  },
  theSocialSpark: {
    title: "The Social Spark",
    paragraph: "Your rare signal is social energy. You can shift the temperature of a room, connect people, and create moments others remember.",
    shareLine: "I got The Social Spark on RareScore. I change the room when I enter it.",
  },
  theUncommonThinker: {
    title: "The Uncommon Thinker",
    paragraph: "You connect ideas in ways that feel unexpected but still make sense. Your mind likes hidden links, unusual angles, and better questions.",
    shareLine: "I got The Uncommon Thinker on RareScore. I connect what others separate.",
  },
  theInstinctiveOutlier: {
    title: "The Instinctive Outlier",
    paragraph: "Your gut often arrives before your explanation. Your rarity is a strong instinct for people, timing, mood, and unseen shifts.",
    shareLine: "I got The Instinctive Outlier on RareScore. My gut gets there first.",
  },
  theCreativeSignal: {
    title: "The Creative Signal",
    paragraph: "You translate ordinary moments into something more vivid. Your rare quality is turning feeling, image, and pattern into meaning.",
    shareLine: "I got The Creative Signal on RareScore. I turn the ordinary into signal.",
  },
} as const;

const moralityTraitKeys: MoralityTrait[] = [
  "empathy",
  "justice",
  "honesty",
  "loyalty",
  "responsibility",
  "ruleRespect",
  "independence",
  "pragmatism",
  "courage",
  "fairness",
];

const rarityTraitKeys: RarityTrait[] = [
  "originality",
  "independence",
  "curiosity",
  "emotionalDepth",
  "instinct",
  "socialEnergy",
  "patternBreaking",
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number) {
  return Math.round(value);
}

function normalizeTraitScores<T extends string>(scores: Record<T, number>, maxByTrait: Record<T, number>) {
  const normalized = {} as Record<T, number>;
  Object.keys(scores).forEach((key) => {
    const trait = key as T;
    const max = Math.max(1, maxByTrait[trait]);
    normalized[trait] = round(clamp((scores[trait] / max) * 100, 0, 100));
  });
  return normalized;
}

function getTopTrait(traits: Record<string, number>) {
  return Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || "balanced";
}

export function scoreMoralityTest(answers: UserAnswers): TestResult {
  const rawScores = Object.fromEntries(moralityTraitKeys.map((t) => [t, 0])) as Record<MoralityTrait, number>;
  const maxByTrait = Object.fromEntries(moralityTraitKeys.map((t) => [t, 0])) as Record<MoralityTrait, number>;
  let answered = 0;

  for (const q of moralityQuestions) {
    for (const trait of moralityTraitKeys) {
      const possible = Math.max(...q.options.map((o) => Number(o.scores?.[trait] || 0)), 0);
      maxByTrait[trait] += possible;
    }

    const answer = String(answers[q.id] ?? "");
    const selected = q.options.find((o) => o.id === answer);
    if (!selected) continue;
    answered += 1;

    for (const [trait, value] of Object.entries(selected.scores || {})) {
      if (trait in rawScores) rawScores[trait as MoralityTrait] += Number(value);
    }
  }

  const traits = normalizeTraitScores(rawScores, maxByTrait);
  const completionFactor = answered / moralityQuestions.length;
  const positiveTraitAverage = Object.values(traits).reduce((a, b) => a + b, 0) / moralityTraitKeys.length;
  const score = round(clamp(positiveTraitAverage * completionFactor + 8 * completionFactor, 0, 100));

  const high = getTopTrait(traits);
  let resultKey: keyof typeof moralityResults = "balancedRealist";

  if ((traits.justice + traits.courage + traits.fairness) / 3 >= 72) resultKey = "principledProtector";
  else if ((traits.empathy + traits.fairness + traits.pragmatism) / 3 >= 70) resultKey = "empathicDiplomat";
  else if ((traits.independence + traits.justice + traits.honesty) / 3 >= 70) resultKey = "independentJudge";
  else if ((traits.loyalty + traits.pragmatism + traits.empathy) / 3 >= 68) resultKey = "loyalStrategist";
  else if ((traits.ruleRespect + traits.responsibility + traits.honesty) / 3 >= 68) resultKey = "ruleRespecter";
  else if ((traits.independence + traits.courage + traits.justice) / 3 >= 68 && traits.ruleRespect < 60) resultKey = "moralRebel";
  else if (high === "empathy") resultKey = "empathicDiplomat";
  else if (high === "loyalty") resultKey = "loyalStrategist";
  else if (high === "ruleRespect") resultKey = "ruleRespecter";
  else if (high === "independence") resultKey = "independentJudge";

  const selectedResult = moralityResults[resultKey];

  return {
    score,
    type: resultKey,
    title: selectedResult.title,
    paragraph: selectedResult.paragraph,
    traits,
    insightCards: [
      { title: "Your moral anchor", body: `Your strongest signal is ${formatTraitName(high)}. That means your decisions tend to return to this value when things get complicated.` },
      { title: "Your pressure test", body: "You are most revealing when loyalty, fairness, and consequences pull in different directions." },
      { title: "Your social effect", body: "People may experience you as someone who does not just ask what is allowed. You ask what is right, useful, and human." },
    ],
    shareLine: selectedResult.shareLine,
  };
}

export function scoreLogicTest(answers: UserAnswers): TestResult {
  let rawScore = 0;
  let weightedScore = 0;
  let maxWeightedScore = 0;
  const skillCorrect: Record<string, number> = {};
  const skillTotal: Record<string, number> = {};

  for (const q of logicQuestions) {
    maxWeightedScore += q.scoringValue;
    skillTotal[q.skill] = (skillTotal[q.skill] || 0) + q.scoringValue;
    const answer = String(answers[q.id] ?? "");
    if (answer === q.correctAnswer) {
      rawScore += 1;
      weightedScore += q.scoringValue;
      skillCorrect[q.skill] = (skillCorrect[q.skill] || 0) + q.scoringValue;
    }
  }

  const weightedAccuracy = maxWeightedScore ? weightedScore / maxWeightedScore : 0;

  // Entertainment based Logic IQ style estimate.
  // 70 to 145 range. Nonlinear curve makes mid scores believable and rewards hard item consistency.
  const logicIq = round(clamp(70 + Math.pow(weightedAccuracy, 0.82) * 75, 70, 145));
  const percentile = round(clamp(2 + Math.pow(weightedAccuracy, 1.7) * 96, 2, 98));

  const traits: Record<string, number> = {};
  Object.keys(skillTotal).forEach((skill) => {
    traits[skill] = round(((skillCorrect[skill] || 0) / skillTotal[skill]) * 100);
  });

  const topSkill = getTopTrait(traits);
  let resultKey: keyof typeof logicResults = "focusedThinker";
  if (logicIq >= 132) resultKey = "rareLogicMind";
  else if (topSkill === "pattern_recognition" || topSkill === "number_sequences") resultKey = "quickPatternThinker";
  else if (topSkill === "deductive_reasoning") resultKey = "strategicProblemSolver";
  else if (topSkill === "analogies" || topSkill === "word_logic") resultKey = "abstractReasoner";
  else if (topSkill === "visual_reasoning" || topSkill === "spatial_reasoning") resultKey = "sharpObserver";
  else if (topSkill === "trick_logic" || topSkill === "fast_thinking") resultKey = "creativeAnalyst";

  const selectedResult = logicResults[resultKey];

  return {
    score: logicIq,
    percentile,
    type: resultKey,
    title: selectedResult.title,
    paragraph: selectedResult.paragraph,
    traits,
    insightCards: [
      { title: "Logic IQ style score", body: `${logicIq}. This is a game based estimate for entertainment and self discovery, not a clinical IQ score.` },
      { title: "Strongest skill", body: `Your strongest measured lane was ${formatTraitName(topSkill)}.` },
      { title: "How it was scored", body: "Harder questions carried more weight, so solving difficult items mattered more than only collecting easy points." },
    ],
    shareLine: selectedResult.shareLine,
    rawScore,
    weightedScore,
    maxWeightedScore,
  };
}

function scoreWrittenAnswer(answerValue: string, guide?: ScoringGuide) {
  if (!guide) return 2;
  const answer = answerValue.toLowerCase().trim();
  if (!answer) return 0;

  const includesAny = (list: string[] = []) => list.some((item) => answer.includes(item.toLowerCase()));

  if (includesAny(guide.keywordMap?.rare || guide.rare)) return 5;
  if (includesAny(guide.keywordMap?.uncommon || guide.uncommon)) return 3.5;
  if (includesAny(guide.keywordMap?.common || guide.common)) return 1.5;

  const wordCount = answer.split(/\s+/).filter(Boolean).length;
  const hasMetaphorSignal = /like|feels|reminds|memory|ghost|door|signal|silence|electric|blue|ache|humming|map|echo/i.test(answer);
  const specificityBonus = answer.length >= 12 || wordCount >= 3 ? 1 : 0;
  const metaphorBonus = hasMetaphorSignal ? 1.25 : 0;

  return clamp(2 + specificityBonus + metaphorBonus, 1, 5);
}

export function scoreRarityTest(answers: UserAnswers): TestResult {
  const rawScores = Object.fromEntries(rarityTraitKeys.map((t) => [t, 0])) as Record<RarityTrait, number>;
  const maxByTrait = Object.fromEntries(rarityTraitKeys.map((t) => [t, 0])) as Record<RarityTrait, number>;
  let rarityPoints = 0;
  let maxRarityPoints = 0;
  let answered = 0;

  for (const q of rarityQuestions) {
    const answer = answers[q.id];
    if (answer === undefined || answer === "") continue;
    answered += 1;

    if (q.type === "slider") {
      const value = Number(answer);
      const normalized = clamp(value, 0, 10) / 10;
      const points = 1 + normalized * 4;
      rarityPoints += points;
      maxRarityPoints += 5;
      for (const trait of q.traitTags) {
        rawScores[trait] += points;
        maxByTrait[trait] += 5;
      }
      continue;
    }

    if (q.type === "written_one_word" || q.type === "written_short") {
      const points = scoreWrittenAnswer(String(answer), q.scoringGuide);
      rarityPoints += points;
      maxRarityPoints += 5;
      for (const trait of q.traitTags) {
        rawScores[trait] += points;
        maxByTrait[trait] += 5;
      }
      continue;
    }

    const selected = q.options?.find((o) => o.id === String(answer));
    if (!selected) continue;
    const selectedRarity = selected.rarityPoints ?? 2;
    rarityPoints += selectedRarity;
    maxRarityPoints += 5;

    for (const trait of rarityTraitKeys) {
      const possible = Math.max(...(q.options || []).map((o) => Number(o.scores?.[trait] || 0)), 0);
      maxByTrait[trait] += possible;
    }

    for (const [trait, value] of Object.entries(selected.scores || {})) {
      if (trait in rawScores) rawScores[trait as RarityTrait] += Number(value);
    }
  }

  const completionFactor = answered / rarityQuestions.length;
  const rarityAccuracy = maxRarityPoints ? rarityPoints / maxRarityPoints : 0;
  const score = round(clamp(35 + rarityAccuracy * 65 * completionFactor, 0, 100));
  const percentile = round(clamp(8 + Math.pow(score / 100, 1.9) * 91, 8, 99));
  const traits = normalizeTraitScores(rawScores, maxByTrait);
  const topTrait = getTopTrait(traits);

  let resultKey: keyof typeof rarityResults = "theQuietRareType";
  if (topTrait === "originality") resultKey = "theOriginal";
  else if (topTrait === "emotionalDepth") resultKey = "theDeepObserver";
  else if (topTrait === "patternBreaking") resultKey = "thePatternBreaker";
  else if (topTrait === "socialEnergy") resultKey = "theSocialSpark";
  else if (topTrait === "curiosity") resultKey = "theUncommonThinker";
  else if (topTrait === "instinct") resultKey = "theInstinctiveOutlier";
  else if (topTrait === "independence") resultKey = "theCreativeSignal";
  if (score >= 88 && (traits.originality + traits.emotionalDepth) / 2 >= 75) resultKey = "theCreativeSignal";

  const selectedResult = rarityResults[resultKey];

  return {
    score,
    percentile,
    type: resultKey,
    title: selectedResult.title,
    paragraph: selectedResult.paragraph,
    traits,
    insightCards: [
      { title: "Your rare signal", body: `Your highest signal is ${formatTraitName(topTrait)}. This is the pattern that makes your result feel most personal.` },
      { title: "Your percentile", body: `Your rarity profile is estimated around the ${percentile}th percentile for this quiz style.` },
      { title: "What made it unique", body: "Written responses, unusual preferences, and pattern breaking choices increased variation in your result." },
    ],
    shareLine: selectedResult.shareLine,
  };
}

function formatTraitName(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export const certificatePreviewData = {
  brand: "RareScore",
  lockedSections: [
    "Full trait explanation",
    "Premium certificate number",
    "Personality seal",
    "Downloadable share image",
  ],
  freeVisibleSections: [
    "Score",
    "Result type",
    "Short result paragraph",
    "Three insight cards",
  ],
  example: {
    name: "Your Name",
    test: "How Rare Are You Test",
    score: 91,
    title: "The Creative Signal",
    certificateLine: "Certified RareScore result based on response pattern, originality, and self discovery profile.",
  },
};

export function getQuestionsByTest(test: TestId) {
  if (test === "morality") return moralityQuestions;
  if (test === "logic") return logicQuestions;
  return rarityQuestions;
}

export function scoreTest(test: TestId, answers: UserAnswers): TestResult {
  if (test === "morality") return scoreMoralityTest(answers);
  if (test === "logic") return scoreLogicTest(answers);
  return scoreRarityTest(answers);
}

// Example visual renderer helper. Replace with your own SVG components for a more premium look.
export function ShapeRenderer({ shape }: { shape: ShapeVisual }) {
  const baseClass = "inline-flex items-center justify-center w-16 h-16 rounded-xl border bg-white";
  const rotation = { transform: `rotate(${shape.rotation || 0}deg)` };
  return (
    <div className={baseClass} aria-label={`${shape.id} ${shape.shape}`}>
      <div style={rotation} className="text-2xl font-bold">
        {shape.shape === "circle" && "●"}
        {shape.shape === "square" && "■"}
        {shape.shape === "triangle" && "▲"}
        {shape.shape === "diamond" && "◆"}
        {shape.shape === "star" && "☆"}
        {shape.shape === "hexagon" && "⬡"}
        {shape.shape === "line" && "━"}
        {shape.shape === "arrow" && "↑"}
        {shape.shape === "crescent" && "☾"}
      </div>
    </div>
  );
}

export function ExampleQuizComponent({ test }: { test: TestId }) {
  const questions = useMemo(() => getQuestionsByTest(test), [test]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [finished, setFinished] = useState(false);

  const current = questions[index] as MoralityQuestion | LogicQuestion | RarityQuestion;
  const progress = Math.round(((index + 1) / questions.length) * 100);

  function saveAnswer(value: string | number) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  }

  function next() {
    if (index < questions.length - 1) setIndex((v) => v + 1);
    else setFinished(true);
  }

  if (finished) {
    const result = scoreTest(test, answers);
    return <ExampleResultPage result={result} test={test} />;
  }

  const selectedValue = answers[current.id];
  const options = "options" in current ? current.options : undefined;

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <section className="w-full max-w-3xl rounded-3xl bg-white/10 border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between text-sm text-white/70 mb-5">
          <span>RareScore</span>
          <span>{progress}% complete</span>
        </div>

        <div className="h-2 rounded-full bg-white/10 mb-8 overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-6">{current.question}</h1>

        {"visualPrompt" in current && current.visualPrompt && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {current.visualPrompt.shapes.map((shape) => (
              <div key={shape.id} className="text-center">
                <ShapeRenderer shape={shape} />
                <div className="mt-2 text-sm text-white/70">{shape.id}</div>
              </div>
            ))}
          </div>
        )}

        {(current.type === "written_one_word" || current.type === "written_short") && (
          <input
            className="w-full rounded-2xl bg-white text-black p-4 outline-none mb-6"
            placeholder="Type your answer..."
            value={String(selectedValue || "")}
            onChange={(e) => saveAnswer(e.target.value)}
          />
        )}

        {current.type === "slider" && "slider" in current && current.slider && (
          <div className="mb-6">
            <input
              type="range"
              min={current.slider.min}
              max={current.slider.max}
              value={Number(selectedValue ?? 5)}
              onChange={(e) => saveAnswer(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/70 mt-2">
              <span>{current.slider.leftLabel}</span>
              <span>{current.slider.rightLabel}</span>
            </div>
          </div>
        )}

        {options && current.type !== "slider" && current.type !== "written_one_word" && current.type !== "written_short" && (
          <div className="grid gap-3 mb-6">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => saveAnswer(option.id)}
                className={`text-left rounded-2xl p-4 border transition ${
                  selectedValue === option.id ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <span className="font-semibold mr-2">{option.id}.</span>
                {option.text}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={next}
          disabled={selectedValue === undefined || selectedValue === ""}
          className="w-full rounded-2xl bg-white text-black py-4 font-semibold disabled:opacity-40"
        >
          {index === questions.length - 1 ? "Reveal my result" : "Next"}
        </button>
      </section>
    </main>
  );
}

export function ExampleResultPage({ result, test }: { result: TestResult; test: TestId }) {
  const scoreLabel = test === "logic" ? "Logic IQ Style Score" : test === "rarity" ? "RareScore" : "Morality Score";

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <section className="w-full max-w-4xl rounded-3xl bg-white/10 border border-white/10 p-8 shadow-2xl">
        <p className="text-white/60 mb-2">Your result is ready</p>
        <h1 className="text-5xl font-bold mb-3">{result.title}</h1>
        <div className="text-7xl font-black mb-4">{result.score}</div>
        <p className="text-white/70 mb-1">{scoreLabel}</p>
        {result.percentile && <p className="text-white/70 mb-6">Estimated percentile: {result.percentile}th</p>}
        <p className="text-xl leading-relaxed mb-8">{result.paragraph}</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {result.insightCards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-white/10 border border-white/10 p-5">
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white text-black p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40 pointer-events-none" />
          <div className="relative">
            <p className="text-sm uppercase tracking-widest text-black/50">Certificate Preview</p>
            <h2 className="text-3xl font-bold">{certificatePreviewData.brand}</h2>
            <p className="mt-2">{result.title} certificate preview is locked. Your score stays visible for free.</p>
          </div>
        </div>

        <button className="w-full rounded-2xl bg-white text-black py-4 font-semibold">
          Preview optional certificate
        </button>
      </section>
    </main>
  );
}

export const integrationNotes = {
  homepage: "Use time estimates on public cards, such as 3 minute morality test, 4 minute logic challenge, and 3 minute rarity test. Do not mention certificate price on the homepage hero.",
  quizPage: "Load the test by route param, call getQuestionsByTest(test), store answers by question ID, and show progress only after the quiz starts.",
  resultsPage: "Call scoreTest(test, answers), show the score for free, then show the certificate preview below the result without blocking the score.",
  certificatePage: "Pass the result object into a certificate template. Blur premium design sections until purchase, but keep the score and result type visible.",
};

export const exampleOutputs = {
  morality: scoreMoralityTest({
    m1: "B", m2: "D", m3: "B", m4: "A", m5: "A", m6: "C", m7: "C", m8: "C", m9: "A", m10: "A",
    m11: "D", m12: "B", m13: "B", m14: "D", m15: "B", m16: "D", m17: "C", m18: "A", m19: "B", m20: "D",
    m21: "B", m22: "A", m23: "C", m24: "B", m25: "C", m26: "A", m27: "C", m28: "D", m29: "C", m30: "A",
  }),
  logic: scoreLogicTest({
    l1: "C", l2: "D", l3: "C", l4: "C", l5: "B", l6: "B", l7: "D", l8: "C", l9: "A", l10: "A",
    l11: "C", l12: "D", l13: "C", l14: "C", l15: "C", l16: "C", l17: "C", l18: "C", l19: "B", l20: "D",
    l21: "C", l22: "D", l23: "A", l24: "A", l25: "C", l26: "C", l27: "A", l28: "B", l29: "C", l30: "B",
  }),
  rarity: scoreRarityTest({
    r1: "electric", r2: "A", r3: 8, r4: "B", r5: "a door between days", r6: "A", r7: "C", r8: "C", r9: "C", r10: "portal",
    r11: 8, r12: "D", r13: "B", r14: "dust in headlights", r15: "C", r16: 7, r17: "C", r18: "invitation", r19: "A", r20: 9,
    r21: "D", r22: "B", r23: "the map keeps moving", r24: "C", r25: 8, r26: "B", r27: "applause", r28: "C", r29: "C", r30: "I build doors where people see walls",
  }),
};


// ------------------------------
// PAID FRESH QUESTION SETS
// These are used after a paid Fresh Set or bundle checkout.
// Each bank has 30 different questions from the free version.
// ------------------------------

export const ADVANCED_FRESH_QUESTION_BANKS: Record<TestId, any[]> = {
  logic: [
    { id: "logic_adv_1", testId: "logic", type: "multiple_choice", question: "Which number completes the pattern? 4, 9, 19, 39, 79, ?", options: [{ id: "A", text: "119" }, { id: "B", text: "139" }, { id: "C", text: "159" }, { id: "D", text: "169" }], scoring: { correctAnswer: "C", points: 4, skill: "pattern recognition" } },
    { id: "logic_adv_2", testId: "logic", type: "multiple_choice", question: "If all Zarns are Vex, and no Vex are Lumo, what must be true?", options: [{ id: "A", text: "Some Zarns are Lumo" }, { id: "B", text: "No Zarns are Lumo" }, { id: "C", text: "All Lumo are Zarns" }, { id: "D", text: "Some Vex are not Zarns" }], scoring: { correctAnswer: "B", points: 4, skill: "deductive reasoning" } },
    { id: "logic_adv_3", testId: "logic", type: "visual_odd_one", question: "Which visual tile does not belong?", visualPrompt: { layout: "grid", instruction: "Look for the one tile that breaks the shared rule.", shapes: [{ id: "A", shape: "circle", fill: "solid", color: "blue", count: 2 }, { id: "B", shape: "square", fill: "solid", color: "blue", count: 2 }, { id: "C", shape: "triangle", fill: "solid", color: "blue", count: 2 }, { id: "D", shape: "diamond", fill: "solid", color: "purple", count: 2 }] }, options: [{ id: "A", text: "Blue circle with two dots" }, { id: "B", text: "Blue square with two dots" }, { id: "C", text: "Blue triangle with two dots" }, { id: "D", text: "Purple diamond with two dots" }], scoring: { correctAnswer: "D", points: 4, skill: "visual reasoning" } },
    { id: "logic_adv_4", testId: "logic", type: "multiple_choice", question: "A code changes TREE into USFF. Using the same rule, what does MOON become?", options: [{ id: "A", text: "NPPO" }, { id: "B", text: "NPPM" }, { id: "C", text: "LNNM" }, { id: "D", text: "OPQQ" }], scoring: { correctAnswer: "A", points: 3, skill: "coding logic" } },
    { id: "logic_adv_5", testId: "logic", type: "multiple_choice", question: "Which comes next? 1, 1, 2, 3, 5, 8, 13, ?", options: [{ id: "A", text: "18" }, { id: "B", text: "20" }, { id: "C", text: "21" }, { id: "D", text: "24" }], scoring: { correctAnswer: "C", points: 2, skill: "sequence reasoning" } },
    { id: "logic_adv_6", testId: "logic", type: "multiple_choice", question: "If 7 workers build 7 units in 7 days, how many units can 14 workers build in 14 days?", options: [{ id: "A", text: "14" }, { id: "B", text: "21" }, { id: "C", text: "28" }, { id: "D", text: "49" }], scoring: { correctAnswer: "C", points: 4, skill: "rate reasoning" } },
    { id: "logic_adv_7", testId: "logic", type: "visual_sequence", question: "Which rotated shape should come next?", visualPrompt: { layout: "row", instruction: "The triangle rotates 90 degrees clockwise each step.", shapes: [{ id: "1", shape: "triangle", rotation: 0, fill: "solid", color: "gold" }, { id: "2", shape: "triangle", rotation: 90, fill: "solid", color: "gold" }, { id: "3", shape: "triangle", rotation: 180, fill: "solid", color: "gold" }] }, options: [{ id: "A", text: "Triangle rotated 270 degrees" }, { id: "B", text: "Triangle rotated 0 degrees" }, { id: "C", text: "Square rotated 270 degrees" }, { id: "D", text: "Circle" }], scoring: { correctAnswer: "A", points: 4, skill: "spatial reasoning" } },
    { id: "logic_adv_8", testId: "logic", type: "multiple_choice", question: "What number is missing? 6, 11, 21, 41, ?", options: [{ id: "A", text: "61" }, { id: "B", text: "71" }, { id: "C", text: "81" }, { id: "D", text: "91" }], scoring: { correctAnswer: "C", points: 3, skill: "numeric pattern" } },
    { id: "logic_adv_9", testId: "logic", type: "multiple_choice", question: "Which word is to BOOK as MELODY is to SONG?", options: [{ id: "A", text: "Page" }, { id: "B", text: "Library" }, { id: "C", text: "Chapter" }, { id: "D", text: "Author" }], scoring: { correctAnswer: "C", points: 3, skill: "analogy" } },
    { id: "logic_adv_10", testId: "logic", type: "multiple_choice", question: "A is taller than B. C is shorter than B. D is taller than A. Who is shortest?", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }], scoring: { correctAnswer: "C", points: 2, skill: "ordering logic" } },
    { id: "logic_adv_11", testId: "logic", type: "visual_matrix", question: "Which tile best completes the pattern?", visualPrompt: { layout: "grid", instruction: "Shape sides increase while the dot count stays matched to the row.", shapes: [{ id: "A", shape: "triangle", fill: "outline", color: "gold", count: 1 }, { id: "B", shape: "square", fill: "outline", color: "gold", count: 1 }, { id: "C", shape: "pentagon", fill: "outline", color: "gold", count: 2 }] }, options: [{ id: "A", text: "Hexagon with two dots" }, { id: "B", text: "Circle with one dot" }, { id: "C", text: "Triangle with three dots" }, { id: "D", text: "Pentagon with one dot" }], scoring: { correctAnswer: "A", points: 5, skill: "matrix reasoning" } },
    { id: "logic_adv_12", testId: "logic", type: "multiple_choice", question: "Which number is different from the others?", options: [{ id: "A", text: "121" }, { id: "B", text: "144" }, { id: "C", text: "169" }, { id: "D", text: "190" }], scoring: { correctAnswer: "D", points: 3, skill: "classification" } },
    { id: "logic_adv_13", testId: "logic", type: "multiple_choice", question: "If the day after tomorrow is Friday, what day was yesterday?", options: [{ id: "A", text: "Monday" }, { id: "B", text: "Tuesday" }, { id: "C", text: "Wednesday" }, { id: "D", text: "Thursday" }], scoring: { correctAnswer: "B", points: 2, skill: "time reasoning" } },
    { id: "logic_adv_14", testId: "logic", type: "multiple_choice", question: "Complete the analogy: Lens is to Camera as Microphone is to ____.", options: [{ id: "A", text: "Speaker" }, { id: "B", text: "Recorder" }, { id: "C", text: "Sound" }, { id: "D", text: "Wire" }], scoring: { correctAnswer: "B", points: 3, skill: "functional analogy" } },
    { id: "logic_adv_15", testId: "logic", type: "multiple_choice", question: "What comes next? Z, X, U, Q, L, ?", options: [{ id: "A", text: "F" }, { id: "B", text: "G" }, { id: "C", text: "H" }, { id: "D", text: "I" }], scoring: { correctAnswer: "A", points: 5, skill: "letter pattern" } },
    { id: "logic_adv_16", testId: "logic", type: "visual_odd_one", question: "Which tile breaks the rotation pattern?", visualPrompt: { layout: "grid", instruction: "Three arrows follow a rotation rule. One does not.", shapes: [{ id: "A", shape: "arrow", rotation: 0, fill: "solid", color: "blue" }, { id: "B", shape: "arrow", rotation: 90, fill: "solid", color: "blue" }, { id: "C", shape: "arrow", rotation: 180, fill: "solid", color: "blue" }, { id: "D", shape: "arrow", rotation: 180, fill: "solid", color: "blue" }] }, options: [{ id: "A", text: "Arrow up" }, { id: "B", text: "Arrow rotated 90 degrees" }, { id: "C", text: "Arrow rotated 180 degrees" }, { id: "D", text: "Arrow should rotate 270 degrees but does not" }], scoring: { correctAnswer: "D", points: 4, skill: "visual sequencing" } },
    { id: "logic_adv_17", testId: "logic", type: "multiple_choice", question: "A box has 3 red, 4 blue, and 5 green balls. What is the minimum you must draw to guarantee two of the same color?", options: [{ id: "A", text: "3" }, { id: "B", text: "4" }, { id: "C", text: "5" }, { id: "D", text: "6" }], scoring: { correctAnswer: "B", points: 4, skill: "pigeonhole logic" } },
    { id: "logic_adv_18", testId: "logic", type: "multiple_choice", question: "Which equation follows the same hidden rule? 2 → 6, 3 → 12, 4 → 20, 5 → ?", options: [{ id: "A", text: "24" }, { id: "B", text: "25" }, { id: "C", text: "30" }, { id: "D", text: "35" }], scoring: { correctAnswer: "C", points: 3, skill: "function pattern" } },
    { id: "logic_adv_19", testId: "logic", type: "multiple_choice", question: "If no artists are dull and some writers are artists, which is true?", options: [{ id: "A", text: "Some writers are not dull" }, { id: "B", text: "All writers are artists" }, { id: "C", text: "No writers are dull" }, { id: "D", text: "All dull people are writers" }], scoring: { correctAnswer: "A", points: 4, skill: "syllogism" } },
    { id: "logic_adv_20", testId: "logic", type: "multiple_choice", question: "Which number completes the grid? Row 1: 2, 6, 12. Row 2: 3, 9, 18. Row 3: 4, 12, ?", options: [{ id: "A", text: "16" }, { id: "B", text: "20" }, { id: "C", text: "24" }, { id: "D", text: "28" }], scoring: { correctAnswer: "C", points: 3, skill: "grid pattern" } },
    { id: "logic_adv_21", testId: "logic", type: "visual_sequence", question: "Which dot count comes next?", visualPrompt: { layout: "row", instruction: "Dot count doubles each step.", shapes: [{ id: "1", shape: "circle", fill: "outline", color: "gold", count: 1 }, { id: "2", shape: "circle", fill: "outline", color: "gold", count: 2 }, { id: "3", shape: "circle", fill: "outline", color: "gold", count: 4 }] }, options: [{ id: "A", text: "Circle with one dot" }, { id: "B", text: "Circle with two dots" }, { id: "C", text: "Circle with three dots" }, { id: "D", text: "Circle with four dots" }], scoring: { correctAnswer: "D", points: 4, skill: "visual numeric pattern" } },
    { id: "logic_adv_22", testId: "logic", type: "multiple_choice", question: "Find the missing value: 8 is to 64 as 11 is to ____.", options: [{ id: "A", text: "99" }, { id: "B", text: "111" }, { id: "C", text: "121" }, { id: "D", text: "132" }], scoring: { correctAnswer: "C", points: 2, skill: "analogy math" } },
    { id: "logic_adv_23", testId: "logic", type: "multiple_choice", question: "A train travels 60 miles in 90 minutes. What is its average speed in mph?", options: [{ id: "A", text: "30" }, { id: "B", text: "40" }, { id: "C", text: "45" }, { id: "D", text: "60" }], scoring: { correctAnswer: "B", points: 3, skill: "rate math" } },
    { id: "logic_adv_24", testId: "logic", type: "multiple_choice", question: "Which pair has the same relationship as Seed : Tree?", options: [{ id: "A", text: "Spark : Fire" }, { id: "B", text: "Cloud : Rain" }, { id: "C", text: "Book : Shelf" }, { id: "D", text: "Glass : Water" }], scoring: { correctAnswer: "A", points: 3, skill: "relationship reasoning" } },
    { id: "logic_adv_25", testId: "logic", type: "multiple_choice", question: "If A = 1, B = 2, and CAT = 24, what is DOG?", options: [{ id: "A", text: "24" }, { id: "B", text: "26" }, { id: "C", text: "30" }, { id: "D", text: "32" }], scoring: { correctAnswer: "B", points: 3, skill: "coding arithmetic" } },
    { id: "logic_adv_26", testId: "logic", type: "multiple_choice", question: "Which statement is logically equivalent to: If it rains, the ground is wet?", options: [{ id: "A", text: "If the ground is wet, it rained" }, { id: "B", text: "If the ground is not wet, it did not rain" }, { id: "C", text: "If it does not rain, the ground is dry" }, { id: "D", text: "The ground is always wet" }], scoring: { correctAnswer: "B", points: 5, skill: "formal logic" } },
    { id: "logic_adv_27", testId: "logic", type: "visual_matrix", question: "Which tile completes the visual rule?", visualPrompt: { layout: "grid", instruction: "Shape changes, color stays, rotation increases.", shapes: [{ id: "1", shape: "square", fill: "solid", color: "purple", rotation: 0 }, { id: "2", shape: "diamond", fill: "solid", color: "purple", rotation: 45 }, { id: "3", shape: "triangle", fill: "solid", color: "purple", rotation: 90 }] }, options: [{ id: "A", text: "Triangle rotated 180 degrees" }, { id: "B", text: "Purple circle" }, { id: "C", text: "Gold diamond" }, { id: "D", text: "Blue square" }], scoring: { correctAnswer: "A", points: 4, skill: "matrix rotation" } },
    { id: "logic_adv_28", testId: "logic", type: "multiple_choice", question: "What is the next number? 100, 96, 88, 76, 60, ?", options: [{ id: "A", text: "42" }, { id: "B", text: "44" }, { id: "C", text: "46" }, { id: "D", text: "48" }], scoring: { correctAnswer: "B", points: 4, skill: "decreasing sequence" } },
    { id: "logic_adv_29", testId: "logic", type: "multiple_choice", question: "A cube is painted on all sides and cut into 27 equal cubes. How many small cubes have exactly two painted faces?", options: [{ id: "A", text: "6" }, { id: "B", text: "8" }, { id: "C", text: "12" }, { id: "D", text: "24" }], scoring: { correctAnswer: "C", points: 5, skill: "spatial reasoning" } },
    { id: "logic_adv_30", testId: "logic", type: "multiple_choice", question: "Which choice best completes the pattern? Calm is to Storm as Silence is to ____.", options: [{ id: "A", text: "Quiet" }, { id: "B", text: "Noise" }, { id: "C", text: "Night" }, { id: "D", text: "Space" }], scoring: { correctAnswer: "B", points: 2, skill: "opposites analogy" } },
  ],
  rarity: [
    { id: "rare_adv_1", testId: "rarity", type: "written_one_word", question: "What is the first unusual word that comes to mind when you see the color silver?", scoring: { noveltyWeight: 3, category: "association originality" } },
    { id: "rare_adv_2", testId: "rarity", type: "multiple_choice", question: "Which instinct feels most like you when everyone else is following the obvious path?", options: [{ id: "A", text: "I scan for the hidden path nobody noticed." }, { id: "B", text: "I follow the group until I have proof." }, { id: "C", text: "I create my own version of the path." }, { id: "D", text: "I wait until the crowd reveals the risk." }], scoring: { categories: { A: "patternOutlier", B: "normSensitive", C: "creatorSignal", D: "strategicObserver" } } },
    { id: "rare_adv_3", testId: "rarity", type: "slider", question: "How often do people misunderstand your real reason for doing something?", slider: { min: 1, max: 10, leftLabel: "Rarely", rightLabel: "Constantly" }, scoring: { category: "misreadDepth", highMeaning: "rare inner logic" } },
    { id: "rare_adv_4", testId: "rarity", type: "multiple_choice", question: "Pick the image your mind creates first: a locked glass room, a black ocean, a golden hallway, or a silent crowd.", options: [{ id: "A", text: "Locked glass room" }, { id: "B", text: "Black ocean" }, { id: "C", text: "Golden hallway" }, { id: "D", text: "Silent crowd" }], scoring: { categories: { A: "introspective", B: "depthSignal", C: "ambitionSignal", D: "socialPatterning" } } },
    { id: "rare_adv_5", testId: "rarity", type: "written_short", question: "In a few words, describe what the word rare feels like, not what it means.", scoring: { noveltyWeight: 4, category: "abstract originality" } },
    { id: "rare_adv_6", testId: "rarity", type: "multiple_choice", question: "When you get a strong gut feeling, what do you usually do?", options: [{ id: "A", text: "Trust it before I can explain it." }, { id: "B", text: "Test it quietly." }, { id: "C", text: "Ignore it until facts arrive." }, { id: "D", text: "Use it to ask better questions." }], scoring: { categories: { A: "instinctive", B: "strategicObserver", C: "normSensitive", D: "patternOutlier" } } },
    { id: "rare_adv_7", testId: "rarity", type: "multiple_choice", question: "Which kind of compliment feels most accurate?", options: [{ id: "A", text: "You notice things nobody else notices." }, { id: "B", text: "You are hard to categorize." }, { id: "C", text: "You make people think differently." }, { id: "D", text: "You stay calm when things get strange." }], scoring: { categories: { A: "patternOutlier", B: "identityRarity", C: "creatorSignal", D: "strategicObserver" } } },
    { id: "rare_adv_8", testId: "rarity", type: "visual_choice", question: "Which symbol feels most like your internal world?", visualPrompt: { layout: "grid", instruction: "Choose by instinct, not logic.", shapes: [{ id: "A", shape: "circle", fill: "outline", color: "gold", count: 1 }, { id: "B", shape: "star", fill: "solid", color: "purple" }, { id: "C", shape: "crescent", fill: "solid", color: "blue" }, { id: "D", shape: "diamond", fill: "solid", color: "gold" }] }, options: [{ id: "A", text: "Gold outlined circle with one dot" }, { id: "B", text: "Purple star" }, { id: "C", text: "Blue crescent" }, { id: "D", text: "Gold diamond" }], scoring: { categories: { A: "centeredOddity", B: "expressiveRare", C: "hiddenDepth", D: "precisionRare" } } },
    { id: "rare_adv_9", testId: "rarity", type: "slider", question: "How comfortable are you with being the only person who sees something differently?", slider: { min: 1, max: 10, leftLabel: "Uncomfortable", rightLabel: "Very comfortable" }, scoring: { category: "independence", highMeaning: "nonconformity" } },
    { id: "rare_adv_10", testId: "rarity", type: "multiple_choice", question: "In a group, your most natural role is usually:", options: [{ id: "A", text: "The quiet pattern reader" }, { id: "B", text: "The person who changes the energy" }, { id: "C", text: "The skeptic who protects the plan" }, { id: "D", text: "The one who says what everyone avoids" }], scoring: { categories: { A: "strategicObserver", B: "creatorSignal", C: "guardianPattern", D: "truthOutlier" } } },
    { id: "rare_adv_11", testId: "rarity", type: "written_one_word", question: "What is the first word you think of when you imagine a door in the sky?", scoring: { noveltyWeight: 4, category: "surreal association" } },
    { id: "rare_adv_12", testId: "rarity", type: "multiple_choice", question: "Which situation makes you feel most alive?", options: [{ id: "A", text: "Solving something others missed" }, { id: "B", text: "Building something from nothing" }, { id: "C", text: "Being understood deeply" }, { id: "D", text: "Breaking a stale pattern" }], scoring: { categories: { A: "patternOutlier", B: "creatorSignal", C: "depthSignal", D: "disruptorSignal" } } },
    { id: "rare_adv_13", testId: "rarity", type: "slider", question: "How often do your best ideas sound strange at first?", slider: { min: 1, max: 10, leftLabel: "Almost never", rightLabel: "Very often" }, scoring: { category: "ideaRarity", highMeaning: "original thinking" } },
    { id: "rare_adv_14", testId: "rarity", type: "multiple_choice", question: "If your personality had a texture, which one fits best?", options: [{ id: "A", text: "Polished stone" }, { id: "B", text: "Electric glass" }, { id: "C", text: "Soft smoke" }, { id: "D", text: "Sharp velvet" }], scoring: { categories: { A: "groundedRare", B: "highSignal", C: "hiddenDepth", D: "contrastRare" } } },
    { id: "rare_adv_15", testId: "rarity", type: "written_short", question: "Complete this sentence in your own way: Most people miss the fact that ____.", scoring: { noveltyWeight: 4, category: "insight originality" } },
    { id: "rare_adv_16", testId: "rarity", type: "multiple_choice", question: "Which fear is closest to yours?", options: [{ id: "A", text: "Living a predictable life" }, { id: "B", text: "Being misunderstood forever" }, { id: "C", text: "Wasting potential" }, { id: "D", text: "Becoming like everyone else" }], scoring: { categories: { A: "noveltyDrive", B: "depthSignal", C: "ambitionSignal", D: "identityRarity" } } },
    { id: "rare_adv_17", testId: "rarity", type: "multiple_choice", question: "When someone copies your idea, you usually feel:", options: [{ id: "A", text: "Annoyed because they missed the meaning" }, { id: "B", text: "Flattered but already onto the next thing" }, { id: "C", text: "Competitive" }, { id: "D", text: "Protective of the original vision" }], scoring: { categories: { A: "depthSignal", B: "creatorSignal", C: "ambitionSignal", D: "precisionRare" } } },
    { id: "rare_adv_18", testId: "rarity", type: "slider", question: "How much do you feel like your mind connects unrelated things quickly?", slider: { min: 1, max: 10, leftLabel: "Not much", rightLabel: "Constantly" }, scoring: { category: "associativeSpeed", highMeaning: "rare connection-making" } },
    { id: "rare_adv_19", testId: "rarity", type: "multiple_choice", question: "Pick the phrase that feels most true:", options: [{ id: "A", text: "I see the signal under the noise." }, { id: "B", text: "I am calm until I am not." }, { id: "C", text: "I do not fit cleanly anywhere." }, { id: "D", text: "I can become what the moment needs." }], scoring: { categories: { A: "patternOutlier", B: "contrastRare", C: "identityRarity", D: "adaptiveRare" } } },
    { id: "rare_adv_20", testId: "rarity", type: "written_one_word", question: "What one word comes to mind when you hear the phrase: invisible crown?", scoring: { noveltyWeight: 4, category: "symbolic association" } },
    { id: "rare_adv_21", testId: "rarity", type: "multiple_choice", question: "What kind of silence do you notice most?", options: [{ id: "A", text: "The silence before someone lies" }, { id: "B", text: "The silence after a hard truth" }, { id: "C", text: "The silence of focus" }, { id: "D", text: "The silence of being left out" }], scoring: { categories: { A: "socialPatterning", B: "truthOutlier", C: "precisionRare", D: "empathyRare" } } },
    { id: "rare_adv_22", testId: "rarity", type: "slider", question: "How often do you feel older or younger than your actual age internally?", slider: { min: 1, max: 10, leftLabel: "Rarely", rightLabel: "Very often" }, scoring: { category: "identityMismatch", highMeaning: "uncommon self-perception" } },
    { id: "rare_adv_23", testId: "rarity", type: "multiple_choice", question: "Which power would you choose for one day?", options: [{ id: "A", text: "Hear what people almost said" }, { id: "B", text: "See the future cost of every choice" }, { id: "C", text: "Create one perfect idea" }, { id: "D", text: "Disappear without being forgotten" }], scoring: { categories: { A: "socialPatterning", B: "strategicObserver", C: "creatorSignal", D: "identityRarity" } } },
    { id: "rare_adv_24", testId: "rarity", type: "written_short", question: "Name something ordinary that secretly feels mysterious to you.", scoring: { noveltyWeight: 3, category: "hidden wonder" } },
    { id: "rare_adv_25", testId: "rarity", type: "multiple_choice", question: "You are most drawn to people who are:", options: [{ id: "A", text: "Brilliant but strange" }, { id: "B", text: "Kind but quietly intense" }, { id: "C", text: "Powerful but disciplined" }, { id: "D", text: "Funny but hard to read" }], scoring: { categories: { A: "noveltyDrive", B: "depthSignal", C: "ambitionSignal", D: "socialPatterning" } } },
    { id: "rare_adv_26", testId: "rarity", type: "slider", question: "How strongly do you dislike being predictable?", slider: { min: 1, max: 10, leftLabel: "Not strongly", rightLabel: "Very strongly" }, scoring: { category: "antiPredictability", highMeaning: "rare identity drive" } },
    { id: "rare_adv_27", testId: "rarity", type: "multiple_choice", question: "If your thoughts had a weather pattern, it would be:", options: [{ id: "A", text: "Lightning far away" }, { id: "B", text: "A controlled storm" }, { id: "C", text: "Fog with a hidden sun" }, { id: "D", text: "Wind that changes direction fast" }], scoring: { categories: { A: "highSignal", B: "strategicIntensity", C: "hiddenDepth", D: "adaptiveRare" } } },
    { id: "rare_adv_28", testId: "rarity", type: "multiple_choice", question: "What makes you feel most different from others?", options: [{ id: "A", text: "How fast I notice patterns" }, { id: "B", text: "How deeply I feel things" }, { id: "C", text: "How much I want to build" }, { id: "D", text: "How little I need permission" }], scoring: { categories: { A: "patternOutlier", B: "depthSignal", C: "creatorSignal", D: "independence" } } },
    { id: "rare_adv_29", testId: "rarity", type: "written_one_word", question: "What one word describes the feeling of being almost understood?", scoring: { noveltyWeight: 5, category: "emotional precision" } },
    { id: "rare_adv_30", testId: "rarity", type: "multiple_choice", question: "What is rarest about you?", options: [{ id: "A", text: "My instincts" }, { id: "B", text: "My inner world" }, { id: "C", text: "My ability to adapt" }, { id: "D", text: "My refusal to become average" }], scoring: { categories: { A: "instinctive", B: "depthSignal", C: "adaptiveRare", D: "identityRarity" } } },
  ],
  morality: [
    { id: "morality_adv_1", testId: "morality", type: "multiple_choice", question: "A friend confesses they cheated to protect their family from financial harm. What matters most?", options: [{ id: "A", text: "The harm prevented" }, { id: "B", text: "The rule broken" }, { id: "C", text: "Whether anyone innocent was hurt" }, { id: "D", text: "Whether they take responsibility now" }], scoring: { values: { A: "care", B: "law", C: "fairness", D: "accountability" } } },
    { id: "morality_adv_2", testId: "morality", type: "multiple_choice", question: "You can expose a truth that helps many people but deeply hurts one innocent person. What do you do first?", options: [{ id: "A", text: "Expose it immediately" }, { id: "B", text: "Protect the innocent person first" }, { id: "C", text: "Find a way to reveal it with less damage" }, { id: "D", text: "Stay silent unless forced" }], scoring: { values: { A: "justice", B: "care", C: "prudence", D: "loyalty" } } },
    { id: "morality_adv_3", testId: "morality", type: "slider", question: "How acceptable is it to break a rule when the rule is outdated but still active?", slider: { min: 1, max: 10, leftLabel: "Never acceptable", rightLabel: "Often acceptable" }, scoring: { category: "rule flexibility" } },
    { id: "morality_adv_4", testId: "morality", type: "multiple_choice", question: "A stranger takes credit for your work, but they need the recognition more than you do. What do you do?", options: [{ id: "A", text: "Correct the record publicly" }, { id: "B", text: "Let it go" }, { id: "C", text: "Speak to them privately" }, { id: "D", text: "Use it as leverage later" }], scoring: { values: { A: "justice", B: "mercy", C: "dignity", D: "strategy" } } },
    { id: "morality_adv_5", testId: "morality", type: "multiple_choice", question: "Which is worse?", options: [{ id: "A", text: "A harmful truth spoken carelessly" }, { id: "B", text: "A comforting lie that delays pain" }, { id: "C", text: "A broken promise with a good reason" }, { id: "D", text: "A fair rule applied without compassion" }], scoring: { values: { A: "care", B: "truth", C: "loyalty", D: "mercy" } } },
    { id: "morality_adv_6", testId: "morality", type: "multiple_choice", question: "Your team can win by exploiting a loophole. Everyone else uses it too. What do you choose?", options: [{ id: "A", text: "Use it because it is allowed" }, { id: "B", text: "Avoid it because it violates the spirit" }, { id: "C", text: "Use it once and push to change the rule" }, { id: "D", text: "Ask the group to vote" }], scoring: { values: { A: "pragmatism", B: "integrity", C: "reform", D: "consensus" } } },
    { id: "morality_adv_7", testId: "morality", type: "slider", question: "How much should intent matter when judging a harmful action?", slider: { min: 1, max: 10, leftLabel: "Only impact matters", rightLabel: "Intent matters a lot" }, scoring: { category: "intent weighting" } },
    { id: "morality_adv_8", testId: "morality", type: "multiple_choice", question: "Someone who once betrayed you sincerely changes. What do they deserve?", options: [{ id: "A", text: "Forgiveness but not access" }, { id: "B", text: "A full second chance" }, { id: "C", text: "Respect from a distance" }, { id: "D", text: "Proof over time before anything changes" }], scoring: { values: { A: "boundaries", B: "mercy", C: "dignity", D: "accountability" } } },
    { id: "morality_adv_9", testId: "morality", type: "multiple_choice", question: "You find private information that could prevent someone from making a bad decision. What do you do?", options: [{ id: "A", text: "Use it to warn them directly" }, { id: "B", text: "Do not use private information" }, { id: "C", text: "Find a way to warn without revealing it" }, { id: "D", text: "Only act if the danger is serious" }], scoring: { values: { A: "protection", B: "privacy", C: "prudence", D: "threshold ethics" } } },
    { id: "morality_adv_10", testId: "morality", type: "multiple_choice", question: "Which value should win in a crisis?", options: [{ id: "A", text: "Safety" }, { id: "B", text: "Freedom" }, { id: "C", text: "Fairness" }, { id: "D", text: "Truth" }], scoring: { values: { A: "care", B: "liberty", C: "justice", D: "truth" } } },
    { id: "morality_adv_11", testId: "morality", type: "slider", question: "How responsible are you for harm caused by something you did not intend?", slider: { min: 1, max: 10, leftLabel: "Barely responsible", rightLabel: "Fully responsible" }, scoring: { category: "impact accountability" } },
    { id: "morality_adv_12", testId: "morality", type: "multiple_choice", question: "A leader lies to prevent panic during an emergency. Was it wrong?", options: [{ id: "A", text: "Yes, truth is required" }, { id: "B", text: "No, panic prevention matters more" }, { id: "C", text: "Only if the lie removes people's choice" }, { id: "D", text: "It depends on what they do after" }], scoring: { values: { A: "truth", B: "care", C: "autonomy", D: "accountability" } } },
    { id: "morality_adv_13", testId: "morality", type: "multiple_choice", question: "You can save five strangers by breaking a promise to one friend. What weighs most?", options: [{ id: "A", text: "The number of people helped" }, { id: "B", text: "The promise" }, { id: "C", text: "Whether the friend would understand" }, { id: "D", text: "Whether there is a third option" }], scoring: { values: { A: "utilitarian", B: "loyalty", C: "relationship ethics", D: "prudence" } } },
    { id: "morality_adv_14", testId: "morality", type: "multiple_choice", question: "Which person is most moral?", options: [{ id: "A", text: "The one who follows rules consistently" }, { id: "B", text: "The one who reduces suffering" }, { id: "C", text: "The one who tells the truth under pressure" }, { id: "D", text: "The one who protects the vulnerable" }], scoring: { values: { A: "law", B: "care", C: "truth", D: "protection" } } },
    { id: "morality_adv_15", testId: "morality", type: "slider", question: "How much should loyalty change what someone deserves?", slider: { min: 1, max: 10, leftLabel: "Not at all", rightLabel: "A lot" }, scoring: { category: "loyalty weighting" } },
    { id: "morality_adv_16", testId: "morality", type: "multiple_choice", question: "Your mistake benefits someone you dislike. What do you do?", options: [{ id: "A", text: "Fix it because it is wrong" }, { id: "B", text: "Leave it because they benefited" }, { id: "C", text: "Fix it quietly" }, { id: "D", text: "Tell them and fix it together" }], scoring: { values: { A: "integrity", B: "resentment", C: "prudence", D: "accountability" } } },
    { id: "morality_adv_17", testId: "morality", type: "multiple_choice", question: "If justice and mercy conflict, what should decide?", options: [{ id: "A", text: "The person's pattern over time" }, { id: "B", text: "The severity of the harm" }, { id: "C", text: "The chance they can change" }, { id: "D", text: "The needs of the harmed person" }], scoring: { values: { A: "accountability", B: "justice", C: "mercy", D: "care" } } },
    { id: "morality_adv_18", testId: "morality", type: "multiple_choice", question: "A rule treats everyone equally but hurts a vulnerable group more. Is it fair?", options: [{ id: "A", text: "Yes, equal treatment is fair" }, { id: "B", text: "No, impact matters" }, { id: "C", text: "Only if no better rule exists" }, { id: "D", text: "It depends on intent" }], scoring: { values: { A: "formal fairness", B: "equity", C: "pragmatism", D: "intent weighting" } } },
    { id: "morality_adv_19", testId: "morality", type: "slider", question: "How much should consequences matter compared to principles?", slider: { min: 1, max: 10, leftLabel: "Principles matter most", rightLabel: "Consequences matter most" }, scoring: { category: "consequence weighting" } },
    { id: "morality_adv_20", testId: "morality", type: "multiple_choice", question: "Someone asks for honesty but clearly cannot handle the truth. What do you do?", options: [{ id: "A", text: "Tell the full truth" }, { id: "B", text: "Tell a gentle version" }, { id: "C", text: "Ask if they want support or truth" }, { id: "D", text: "Avoid answering" }], scoring: { values: { A: "truth", B: "care", C: "consent", D: "avoidance" } } },
    { id: "morality_adv_21", testId: "morality", type: "multiple_choice", question: "You can help one person greatly or many people slightly. Which do you choose?", options: [{ id: "A", text: "One person greatly" }, { id: "B", text: "Many people slightly" }, { id: "C", text: "Whoever is most vulnerable" }, { id: "D", text: "Whoever I am responsible for" }], scoring: { values: { A: "depth care", B: "utility", C: "protection", D: "duty" } } },
    { id: "morality_adv_22", testId: "morality", type: "multiple_choice", question: "What makes an apology real?", options: [{ id: "A", text: "Admission" }, { id: "B", text: "Changed behavior" }, { id: "C", text: "Repairing damage" }, { id: "D", text: "Understanding the pain caused" }], scoring: { values: { A: "truth", B: "accountability", C: "repair", D: "empathy" } } },
    { id: "morality_adv_23", testId: "morality", type: "slider", question: "How much should people be judged by who they become instead of who they were?", slider: { min: 1, max: 10, leftLabel: "Past matters most", rightLabel: "Growth matters most" }, scoring: { category: "redemption weighting" } },
    { id: "morality_adv_24", testId: "morality", type: "multiple_choice", question: "A person does the right thing only for attention. How moral is the act?", options: [{ id: "A", text: "Still moral because it helped" }, { id: "B", text: "Less moral because motive matters" }, { id: "C", text: "Neutral" }, { id: "D", text: "Depends who benefited" }], scoring: { values: { A: "impact", B: "intent", C: "neutrality", D: "care" } } },
    { id: "morality_adv_25", testId: "morality", type: "multiple_choice", question: "What is your first duty when you have power?", options: [{ id: "A", text: "Use it fairly" }, { id: "B", text: "Protect people from harm" }, { id: "C", text: "Stay honest" }, { id: "D", text: "Avoid abusing it" }], scoring: { values: { A: "justice", B: "care", C: "truth", D: "restraint" } } },
    { id: "morality_adv_26", testId: "morality", type: "multiple_choice", question: "Someone is punished more harshly than they deserve, but they are guilty. What matters most?", options: [{ id: "A", text: "Correcting the unfair punishment" }, { id: "B", text: "The fact that they are guilty" }, { id: "C", text: "Preventing future harm" }, { id: "D", text: "Restoring balance" }], scoring: { values: { A: "fairness", B: "accountability", C: "safety", D: "restorative justice" } } },
    { id: "morality_adv_27", testId: "morality", type: "slider", question: "How important is personal freedom when it creates risk for others?", slider: { min: 1, max: 10, leftLabel: "Safety first", rightLabel: "Freedom first" }, scoring: { category: "freedom safety balance" } },
    { id: "morality_adv_28", testId: "morality", type: "multiple_choice", question: "A friend asks you to keep a secret that could hurt someone else. What do you do?", options: [{ id: "A", text: "Keep it because loyalty matters" }, { id: "B", text: "Break it to protect the person" }, { id: "C", text: "Push the friend to reveal it" }, { id: "D", text: "Ask for more context first" }], scoring: { values: { A: "loyalty", B: "protection", C: "accountability", D: "prudence" } } },
    { id: "morality_adv_29", testId: "morality", type: "multiple_choice", question: "Which is the strongest sign of character?", options: [{ id: "A", text: "What someone does when it costs them" }, { id: "B", text: "How they treat people with less power" }, { id: "C", text: "Whether they admit mistakes" }, { id: "D", text: "Whether they keep promises" }], scoring: { values: { A: "sacrifice", B: "care", C: "accountability", D: "loyalty" } } },
    { id: "morality_adv_30", testId: "morality", type: "multiple_choice", question: "If you could make one thing more common in people, what would it be?", options: [{ id: "A", text: "Courage" }, { id: "B", text: "Compassion" }, { id: "C", text: "Honesty" }, { id: "D", text: "Self-control" }], scoring: { values: { A: "courage", B: "care", C: "truth", D: "discipline" } } },
  ],
};

export function getAdvancedFreshQuestionsByTest(testId: TestId): any[] {
  return ADVANCED_FRESH_QUESTION_BANKS[testId] || [];
}

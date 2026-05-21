export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  ctaLabel: string;
  ctaHref: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const articles: Article[] = [
  {
    slug: "free-iq-test",
    title: "What Is a Free IQ Test and What Does It Actually Measure?",
    description: "Learn what online IQ-style tests measure, including pattern recognition, spatial reasoning, number logic, and problem solving.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "IQ Test",
    keywords: ["free IQ test", "online IQ test", "IQ-style test", "pattern recognition test"],
    ctaLabel: "Take the RareScore IQ Test",
    ctaHref: "/iq-test",
    intro: "A free IQ test should feel clear, focused, and challenging without overwhelming the user. RareScore’s IQ Test is built around fast reasoning, visual patterns, number sequences, and problem solving.",
    sections: [
      { heading: "What an IQ-style test looks at", body: ["Most people think of an IQ test as one single score, but the experience usually comes from several mental skills working together. Pattern recognition, spatial reasoning, short logic puzzles, number relationships, and attention to detail all contribute to how a person performs.", "RareScore uses a quick online format. The goal is not to replace a professionally administered exam. The goal is to give users a fast, engaging IQ-style score they can compare, share, and optionally save as a certificate."] },
      { heading: "Why visual questions matter", body: ["Visual questions make the test feel more real because they force the user to recognize relationships instead of only reading text. Rotating shapes, missing patterns, and odd-one-out tiles are easier to understand quickly and often feel more satisfying than long written questions."] },
      { heading: "How to use your result", body: ["Your result is best used as a self-discovery score. The score is free. If you want to keep a polished version of your result, you can unlock an Official RareScore Certificate after finishing the test."] }
    ],
    faqs: [
      { question: "Is RareScore a clinical IQ test?", answer: "No. RareScore is an online IQ-style test for entertainment and self-discovery." },
      { question: "Do I need an account?", answer: "No. You can start without creating an account." }
    ],
  },
  {
    slug: "what-is-a-morality-test",
    title: "What Is a Morality Test?",
    description: "A simple guide to morality tests, ethical dilemmas, fairness, loyalty, honesty, and decisions under pressure.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Morality Test",
    keywords: ["morality test", "moral compass test", "ethics test"],
    ctaLabel: "Take the Morality Test",
    ctaHref: "/morality-test",
    intro: "A morality test asks how you make decisions when values collide. It is not about being perfect. It is about understanding which values you naturally protect first.",
    sections: [
      { heading: "Morality is not always obvious", body: ["Most moral choices are easy when the right answer is obvious. The interesting part starts when truth conflicts with kindness, loyalty conflicts with fairness, or rules conflict with compassion."] },
      { heading: "What RareScore looks at", body: ["RareScore’s Morality Test explores honesty, fairness, loyalty, empathy, responsibility, courage, and practical judgment."] },
      { heading: "Why people like moral dilemmas", body: ["Moral dilemmas are shareable because two reasonable people can disagree. That makes them perfect for conversation."] }
    ],
    faqs: [
      { question: "Does the Morality Test judge me?", answer: "No. It gives a score and result type based on your answers." },
      { question: "Can I share my result?", answer: "Yes. You can share your score or challenge a friend." }
    ],
  },
  {
    slug: "what-makes-someone-rare",
    title: "What Makes Someone Rare?",
    description: "Explore rarity, originality, instinct, personality signals, and what makes someone feel hard to categorize.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Rarity Test",
    keywords: ["are you rare test", "rarity test", "rare personality"],
    ctaLabel: "Take the Are You Rare Test",
    ctaHref: "/are-you-rare",
    intro: "Being rare is not only about being different. It is about how your instincts, associations, choices, and inner logic separate you from common patterns.",
    sections: [
      { heading: "Rarity is more than uniqueness", body: ["A rare person may notice things others miss, connect unrelated ideas quickly, or make choices that are difficult to predict."] },
      { heading: "Why instinctive answers matter", body: ["Some questions ask for your first word, first image, or first instinct. These answers can reveal how your mind connects ideas before you overthink them."] },
      { heading: "How to interpret your RareScore", body: ["A higher RareScore may suggest uncommon associations, independent thinking, strong instinct, or a personality that does not fit simple categories."] }
    ],
    faqs: [
      { question: "Is being rare the same as being better?", answer: "No. Rare means uncommon or hard to categorize." },
      { question: "Can I get a certificate?", answer: "Yes. The certificate is optional after the free result." }
    ],
  },
  {
    slug: "pattern-recognition-test",
    title: "Pattern Recognition Test: Why Visual Reasoning Feels So Addictive",
    description: "Learn why pattern recognition questions are popular in IQ-style tests and how visual reasoning challenges the brain.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "IQ Test",
    keywords: ["pattern recognition test", "visual reasoning test", "shape pattern test"],
    ctaLabel: "Try the IQ Test",
    ctaHref: "/iq-test",
    intro: "Pattern recognition questions feel addictive because the brain wants closure. When a sequence is incomplete, we naturally want to solve it.",
    sections: [
      { heading: "Why patterns feel satisfying", body: ["A good pattern question gives the brain just enough information to search for a rule. When the rule clicks, the answer feels rewarding."] },
      { heading: "Common pattern types", body: ["Some patterns use number changes. Others use shape rotation, color changes, dot counts, direction, symmetry, or missing pieces."] },
      { heading: "Why pattern recognition matters", body: ["Pattern recognition helps you predict what comes next. It shows up in planning, design, math, strategy, and everyday decision making."] }
    ],
    faqs: [
      { question: "Are visual pattern tests the same as IQ tests?", answer: "They can be part of an IQ-style test, but a professional IQ exam is more controlled." }
    ],
  },
  {
    slug: "iq-test-vs-personality-test",
    title: "IQ Test vs Personality Test: What Is the Difference?",
    description: "Understand the difference between IQ-style tests, personality tests, rarity tests, and morality tests.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Self Discovery",
    keywords: ["IQ test vs personality test", "personality test", "self discovery test"],
    ctaLabel: "Choose a RareScore Test",
    ctaHref: "/tests",
    intro: "IQ-style tests and personality tests feel similar because both give a result, but they measure very different things.",
    sections: [
      { heading: "IQ-style tests focus on problem solving", body: ["An IQ-style test usually asks questions with stronger right or wrong answers, such as patterns, number sequences, visual reasoning, and logic."] },
      { heading: "Personality-style tests focus on patterns of choice", body: ["A personality test usually looks at preferences, instincts, social behavior, emotional reactions, and identity."] },
      { heading: "Morality tests focus on values", body: ["A morality test asks what you do when values collide."] }
    ],
    faqs: [
      { question: "Which test should I take first?", answer: "Take the one that makes you most curious." },
      { question: "Can I take all three?", answer: "Yes. First attempts are free." }
    ],
  },
  {
    slug: "why-people-share-quiz-results",
    title: "Why People Love Sharing Quiz Results",
    description: "Why online quiz results are so shareable and how scores become conversation starters.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Sharing",
    keywords: ["share quiz results", "online personality quizzes", "viral quizzes"],
    ctaLabel: "Take a Free RareScore Test",
    ctaHref: "/tests",
    intro: "Quiz results are shareable because they give people a simple way to express identity, curiosity, and comparison.",
    sections: [
      { heading: "A result gives people a label", body: ["A result like Pattern Strategist, Creative Signal, or Principled Protector gives people something to react to."] },
      { heading: "Scores create comparison", body: ["A score gives people a reason to challenge a friend."] },
      { heading: "Certificates make results feel official", body: ["An optional certificate gives users a polished version of the result."] }
    ],
    faqs: [
      { question: "Can I share my result?", answer: "Yes. Sharing the score is free." },
      { question: "Do I need a certificate to share?", answer: "No. The certificate is optional." }
    ],
  },
  {
    slug: "digital-certificate",
    title: "What Is a Digital Certificate?",
    description: "Learn what a digital certificate is and why people use certificates to save, print, or share online results.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Certificates",
    keywords: ["digital certificate", "online certificate", "PDF certificate"],
    ctaLabel: "Learn About RareScore Certificates",
    ctaHref: "/faq",
    intro: "A digital certificate is a downloadable file that presents a result, completion, or achievement in a polished format.",
    sections: [
      { heading: "Why people like certificates", body: ["A certificate turns a result into something more permanent. It gives the user a name, date, score, result type, and certificate ID."] },
      { heading: "Digital vs printed certificates", body: ["A digital certificate is best for quick download and social sharing. A printed or framed certificate is a premium physical version."] },
      { heading: "How RareScore certificates work", body: ["After completing a test, your score appears for free. If you choose to unlock a certificate, it includes your name, test name, score, result type, certificate ID, and issue date."] }
    ],
    faqs: [
      { question: "Do I need a certificate?", answer: "No. The score is free." },
      { question: "What formats are available?", answer: "Digital PDF, PNG, printed, and framed options are available." }
    ],
  },
  {
    slug: "moral-dilemmas-explained",
    title: "Moral Dilemmas Explained",
    description: "Why moral dilemmas are difficult and what they reveal about fairness, loyalty, truth, and compassion.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Morality Test",
    keywords: ["moral dilemmas", "morality questions", "ethical decision test"],
    ctaLabel: "Try the Morality Test",
    ctaHref: "/morality-test",
    intro: "A moral dilemma is difficult because two values can both feel right at the same time.",
    sections: [
      { heading: "Why dilemmas reveal values", body: ["When there is no perfect answer, your choice reveals what you protect first."] },
      { heading: "Intent vs impact", body: ["Some people judge an action by the intent behind it. Others focus on the impact it caused."] },
      { heading: "How RareScore uses dilemmas", body: ["RareScore presents quick scenarios and asks what matters most."] }
    ],
    faqs: [
      { question: "Are there right answers?", answer: "Many questions reveal priorities rather than one perfect answer." },
      { question: "Can two good people get different results?", answer: "Yes." }
    ],
  },
  {
    slug: "how-online-quizzes-work",
    title: "How Online Quizzes Work",
    description: "A simple explanation of how online quizzes use questions, scoring, results, and sharing.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "Online Quizzes",
    keywords: ["online quiz", "quiz scoring", "personality quiz"],
    ctaLabel: "Start a RareScore Test",
    ctaHref: "/tests",
    intro: "Online quizzes work by turning answers into a result that feels personal, simple, and shareable.",
    sections: [
      { heading: "Question design", body: ["A good quiz starts with questions that feel easy to answer but meaningful enough to affect the result."] },
      { heading: "Scoring", body: ["Scoring can be based on correct answers, category weights, sliders, or answer patterns."] },
      { heading: "Why design matters", body: ["A good quiz keeps one question in focus and gives clear next steps."] }
    ],
    faqs: [
      { question: "Why one question per screen?", answer: "It keeps the experience focused and mobile-friendly." },
      { question: "Can quizzes be fun and meaningful?", answer: "Yes." }
    ],
  },
  {
    slug: "how-rarescore-works",
    title: "How RareScore Works",
    description: "Learn how RareScore tests, scores, certificates, fresh question sets, and sharing features work.",
    date: "2026-05-13",
    readTime: "5 min read",
    category: "RareScore",
    keywords: ["RareScore", "RareScore test", "Official RareScore Certificate"],
    ctaLabel: "Choose a Test",
    ctaHref: "/tests",
    intro: "RareScore is built to be simple: choose a test, answer questions, get your score, and decide whether you want to save or share the result.",
    sections: [
      { heading: "The free test experience", body: ["Each first attempt is free. Users can choose the IQ Test, Morality Test, or Are You Rare test."] },
      { heading: "Certificates", body: ["Users can optionally unlock an Official RareScore Certificate. Digital, printed, and framed options are available."] },
      { heading: "Fresh Question Sets", body: ["Users who want a second result can unlock a Fresh 30 Question Set."] }
    ],
    faqs: [
      { question: "Is RareScore free?", answer: "The first attempt of each test is free." },
      { question: "What tests are available?", answer: "IQ, Morality, and Are You Rare." }
    ],
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { getMeta, routeToEngineId, RouteQuizId } from "../lib/quizMeta";
import {
  getQuestionsByTest,
  getAdvancedFreshQuestionsByTest,
  scoreTest,
  ShapeVisual,
  TestResult,
  UserAnswers,
} from "../lib/rarescoreQuizEngine";

type LooseShape = ShapeVisual & { shape: ShapeVisual["shape"] | "pentagon" };

function ShapeRenderer({ shape, isOption = false }: { shape: LooseShape; isOption?: boolean }) {
  const rotation = { transform: `rotate(${shape.rotation || 0}deg)` };
  const shapeClass = `realShape ${shape.shape || "diamond"} ${shape.fill || ""} ${shape.color || ""} ${isOption ? "optionShape" : ""}`;
  const dotCount =
    shape.count ||
    (shape.pattern === "two_dots" ? 2 : shape.pattern === "one_dot" ? 1 : 0);

  return (
    <div className={isOption ? "shapeOptionTile" : "shapeTile"} aria-label={`${shape.id} ${shape.shape}`}>
      <div style={rotation} className={shapeClass}>
        {shape.shape === "star" && "★"}
        {shape.shape === "arrow" && "↑"}
        {shape.shape === "crescent" && "☾"}
        {shape.shape === "line" && ""}
      </div>
      {dotCount > 0 && (
        <div className="dotPattern">
          {Array.from({ length: dotCount }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      )}
      {!isOption && <small>{shape.id}</small>}
    </div>
  );
}

function shapeFromOption(option: any, current: any): LooseShape | null {
  const existing = current?.visualPrompt?.shapes?.find((shape: ShapeVisual) => shape.id === option.id);
  if (existing) return existing as LooseShape;

  const text = String(option.text || "").toLowerCase();
  let shape: LooseShape["shape"] = "diamond";
  if (text.includes("circle")) shape = "circle";
  if (text.includes("square")) shape = "square";
  if (text.includes("triangle")) shape = "triangle";
  if (text.includes("pentagon")) shape = "pentagon";
  if (text.includes("hexagon")) shape = "hexagon";
  if (text.includes("star")) shape = "star";
  if (text.includes("line")) shape = "line";
  if (text.includes("arrow")) shape = "arrow";
  if (text.includes("crescent")) shape = "crescent";

  let rotation = 0;
  const rotationMatch = text.match(/(\d+)\s*degrees/);
  if (rotationMatch) rotation = Number(rotationMatch[1]);

  let count = 0;
  if (text.includes("one dot")) count = 1;
  if (text.includes("two dot")) count = 2;
  if (text.includes("three dot")) count = 3;
  if (text.includes("four dot")) count = 4;

  const hasShapeWord = /(circle|square|triangle|pentagon|hexagon|star|line|arrow|crescent)/.test(text);
  if (!hasShapeWord) return null;

  return {
    id: option.id,
    shape,
    fill: text.includes("outline") ? "outline" : "solid",
    color: shape === "circle" ? "blue" : shape === "triangle" ? "purple" : shape === "star" ? "gold" : "blue",
    rotation,
    count,
  } as LooseShape;
}

export default function QuizRunner({ type }: { type: RouteQuizId }) {
  const meta = getMeta(type);
  const engineId = routeToEngineId(type);
  const baseQuestions = useMemo(() => getQuestionsByTest(engineId), [engineId]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [timer, setTimer] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(60 * 60);
  const [freshMode, setFreshMode] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const questions = useMemo(() => freshMode ? getAdvancedFreshQuestionsByTest(engineId) : baseQuestions, [freshMode, engineId, baseQuestions]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFreshMode(params.get("fresh") === "1");
  }, []);

  const current: any = questions[index];
  const selectedValue = answers[current?.id];
  const progress = Math.round(((index + 1) / questions.length) * 100);
  const isVisualQuestion = Boolean(current?.visualPrompt) || String(current?.type || "").startsWith("visual");

  useEffect(() => {
    if (!started) return;
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [started]);

  const timerDisplay = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;

  function start() {
    if (type === "rare" && !birthDate) return;
    localStorage.setItem("rarescore:participant", JSON.stringify({ name: participantName, birthDate }));
    setStarted(true);
    setTimer(Date.now());
    setRemainingSeconds(60 * 60);
  }

  function saveAnswer(value: string | number) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  }

  function next() {
    if (selectedValue === undefined || selectedValue === "") return;

    const nextAnswers = { ...answers };

    if (index < questions.length - 1) {
      setIndex(index + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const result = scoreTest(engineId, nextAnswers) as TestResult;
    if (freshMode) result.title = `Advanced ${result.title}`;
    const payload = {
      testRoute: type,
      testTitle: meta.title,
      result,
      completedAt: new Date().toISOString(),
      secondsSpent: Math.max(1, Math.round((Date.now() - timer) / 1000)),
      participant: { name: participantName, birthDate },
      freshMode,
      answers: nextAnswers,
    };
    localStorage.setItem("rarescore:lastResult", JSON.stringify(payload));
    window.location.href = `/results?test=${type}`;
  }

  if (!started) {
    return (
      <main className="quizIntroFull">
        <div className="quizIntroCard">
          <a className="backLink" href={meta.url}>← Back to test details</a>
          <div className="sectionKicker">{meta.time}</div>
          <h1>{meta.title}</h1>
          <p>{meta.longDescription}</p>
          {type === "rare" && (
            <div className="rareIdentityFields">
              <label>Your name <input value={participantName} onChange={(e) => setParticipantName(e.target.value)} placeholder="Name for your report" /></label>
              <label>Birth date <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></label>
              <small>Used to personalize your rarity and numerology-style report.</small>
            </div>
          )}
          <div className="introBullets compactBullets">
            <span>{freshMode ? "Fresh 30 question set" : "30 questions"}</span>
            <span>Focus timer</span>
            <span>Instant result</span>
            <span>No account needed</span>
          </div>
          <button className="goldButton" onClick={start} disabled={type === "rare" && !birthDate}>Start Quiz <span>→</span></button>
        </div>
      </main>
    );
  }

  const options = "options" in current ? current.options : undefined;

  return (
    <main className="quizFull">
      <div className="quizTopBar">
        <a href={meta.url}>← Back</a>
        <span>Question {index + 1} of {questions.length}</span>
        <span>{timerDisplay}</span>
      </div>

      <div className="quizProgress"><div style={{ width: `${progress}%` }} /></div>

      <section className="questionCard">
        <div className="questionMeta">
          <span>{freshMode ? "Advanced Fresh Set" : meta.shortTitle}</span>
          <span>{isVisualQuestion ? "Choose the tile that completes the pattern." : "Answer honestly. There are no perfect answers."}</span>
        </div>
        <h1>{current.question}</h1>

        {"visualPrompt" in current && current.visualPrompt && (
          <div className={`visualPrompt ${current.visualPrompt.layout}`}>
            {current.visualPrompt.instruction && <p>{current.visualPrompt.instruction}</p>}
            <div className="shapeGrid">
              {current.visualPrompt.shapes.map((shape: ShapeVisual) => (
                <ShapeRenderer key={shape.id} shape={shape as LooseShape} />
              ))}
            </div>
          </div>
        )}

        {(current.type === "written_one_word" || current.type === "written_short") && (
          <input
            className="textAnswer"
            placeholder={current.type === "written_one_word" ? "Type one word..." : "Type a short phrase..."}
            value={String(selectedValue || "")}
            onChange={(e) => saveAnswer(e.target.value)}
            autoFocus
          />
        )}

        {current.type === "slider" && "slider" in current && current.slider && (
          <div className="sliderWrap">
            <input
              type="range"
              min={current.slider.min}
              max={current.slider.max}
              value={Number(selectedValue ?? 5)}
              onChange={(e) => saveAnswer(Number(e.target.value))}
            />
            <div className="sliderLabels">
              <span>{current.slider.leftLabel}</span>
              <strong>{selectedValue ?? 5}</strong>
              <span>{current.slider.rightLabel}</span>
            </div>
          </div>
        )}

        {options && current.type !== "slider" && current.type !== "written_one_word" && current.type !== "written_short" && (
          <div className={`answerGrid ${isVisualQuestion ? "visualAnswerGrid" : ""}`}>
            {options.map((option: any) => {
              const visualShape = isVisualQuestion ? shapeFromOption(option, current) : null;
              return (
                <button
                  key={option.id}
                  onClick={() => saveAnswer(option.id)}
                  className={selectedValue === option.id ? "selected" : ""}
                >
                  <strong>{option.id}</strong>
                  {visualShape ? (
                    <span className="visualChoice">
                      <ShapeRenderer shape={visualShape} isOption />
                      <em>{option.text}</em>
                    </span>
                  ) : (
                    <span>{option.text}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={next}
          disabled={selectedValue === undefined || selectedValue === ""}
          className="nextButton"
        >
          {index === questions.length - 1 ? "Reveal My Score" : "Next Question"}
        </button>
      </section>
    </main>
  );
}

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, ChevronDown } from "lucide-react";

const STEPS = ["title", "source", "link", "description", "notes"];

function AddProblem() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back
  const [source, setSource] = useState("leetcode");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, [step]);

  const required = { title, description, notes };
  const isRequired = STEPS[step] in required;
  const currentValue = { title, source, link, description, notes }[STEPS[step]];

  const fail = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const goNext = () => {
    if (isRequired && !String(currentValue).trim()) return fail();
    if (step === STEPS.length - 1) return submit();
    setDir(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setDir(-1);
    setStep((s) => s - 1);
  };

  const submit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const newProblem = {
        title,
        source,
        problemLink: link,
        content: description,
        myNotes: notes,
        pattern: "Two Pointers",
        reasoning: "Replace this with Gemini analysis.",
        createdAt: new Date().toISOString(),
      };
      console.log(newProblem);
      setAnalyzing(false);
      setDone(true);
    }, 2600);
  };

  const reset = () => {
    setTitle("");
    setSource("leetcode");
    setLink("");
    setDescription("");
    setNotes("");
    setStep(0);
    setDir(1);
    setDone(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      goNext();
    }
  };

  const verdict = analyzing ? "RUNNING…" : done ? "ACCEPTED" : "DRAFT";
  const verdictColor = analyzing
    ? "text-amber-500"
    : done
    ? "text-emerald-500"
    : "text-slate-400";

  return (
    <div className="min-h-screen w-full bg-[#FAFBFA] text-[#14171C] flex flex-col font-sans selection:bg-emerald-200">
      {/* top bar */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-6 sm:py-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 font-mono text-xs sm:text-sm tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> dashboard
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest text-slate-400">
            <span className="text-[#14171C] font-semibold">
              {String(done ? STEPS.length : step + 1).padStart(2, "0")}
            </span>
            <span>/ {String(STEPS.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ease-out ${
                i < step || done
                  ? "w-6 bg-emerald-500"
                  : i === step
                  ? "w-8 bg-[#14171C]"
                  : "w-3 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* main stage */}
      <div className="flex-1 flex items-center px-6 sm:px-16">
        <div className="w-full max-w-3xl mx-auto">
          {!done ? (
            <div
              key={step}
              className={`transition-all duration-500 ease-out ${
                shake ? "animate-[wiggle_0.4s_ease-in-out]" : ""
              }`}
              style={{
                animation: `${
                  dir === 1 ? "slideUp" : "slideDown"
                } 0.45s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {/* Step 1 — Title */}
              {step === 0 && (
                <Question
                  index="01"
                  label="Give it a recognizable name"
                  title="What's the problem called?"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Two Sum"
                    className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-3xl sm:text-4xl font-light pb-4 focus:outline-none placeholder:text-slate-300 transition-colors"
                  />
                </Question>
              )}

              {/* Step 2 — Source */}
              {step === 1 && (
                <Question
                  index="02"
                  label="Where did you find it"
                  title="Which judge is this from?"
                >
                  <div className="relative">
                    <select
                      ref={inputRef}
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      onKeyDown={handleKey}
                      className="w-full appearance-none bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-2xl sm:text-3xl pb-4 focus:outline-none transition-colors"
                    >
                      <option value="leetcode">LeetCode</option>
                      <option value="codeforces">Codeforces</option>
                      <option value="striver">Striver A2Z</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1 w-6 h-6 text-slate-400 pointer-events-none" />
                  </div>
                </Question>
              )}

              {/* Step 3 — Link */}
              {step === 2 && (
                <Question
                  index="03"
                  label="Optional — paste the original URL"
                  title="Got a link to it?"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="https://leetcode.com/problems/…"
                    className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl font-light pb-4 focus:outline-none placeholder:text-slate-300 transition-colors"
                  />
                </Question>
              )}

              {/* Step 4 — Description */}
              {step === 3 && (
                <Question
                  index="04"
                  label="Paste the full problem statement"
                  title="What's the problem asking?"
                >
                  <textarea
                    ref={inputRef}
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Given an array of integers…"
                    className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl resize-none pb-4 focus:outline-none placeholder:text-slate-300 transition-colors"
                  />
                </Question>
              )}

              {/* Step 5 — Notes */}
              {step === 4 && (
                <Question
                  index="05"
                  label="How did you actually solve it"
                  title="Walk through your approach."
                >
                  <textarea
                    ref={inputRef}
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Two pointers from both ends, shrink the window when…"
                    className="w-full bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 text-xl sm:text-2xl resize-none pb-4 focus:outline-none placeholder:text-slate-300 transition-colors"
                  />
                </Question>
              )}

              {/* controls */}
              <div className="flex items-center gap-4 mt-14">
                <button
                  onClick={goNext}
                  disabled={analyzing}
                  className="group flex items-center gap-2 bg-[#14171C] hover:bg-emerald-600 disabled:opacity-50 text-white font-medium text-base px-7 py-3.5 rounded-lg transition-colors duration-300"
                >
                  {analyzing ? (
                    <span className="font-mono text-sm tracking-wide">
                      analyzing…
                    </span>
                  ) : (
                    <>
                      {step === STEPS.length - 1 ? "Submit" : "OK"}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {step > 0 && !analyzing && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> back
                  </button>
                )}

                <span className="text-slate-300 text-sm font-mono hidden sm:inline">
                  press Enter ↵
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{ animation: "slideUp 0.5s cubic-bezier(0.16,1,0.3,1)" }}
              className="text-center sm:text-left"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </span>
                <span className="font-mono text-sm tracking-widest text-emerald-600">
                  ACCEPTED
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold italic leading-tight">
                Logged &ldquo;{title}&rdquo;
              </h1>
              <p className="text-slate-500 text-xl mt-3">
                Filed under {source} — pattern tagging runs in the background.
              </p>
              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 bg-[#14171C] hover:bg-emerald-600 text-white font-medium text-base px-7 py-3.5 rounded-lg transition-colors duration-300"
                >
                  Add another <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> back to dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* bottom status rail */}
      <div className="px-6 sm:px-12 py-6 flex items-center justify-between border-t border-slate-100">
        <span className={`font-mono text-xs tracking-widest ${verdictColor}`}>
          STATUS: {verdict}
        </span>
        <span className="font-mono text-xs text-slate-300 hidden sm:inline">
          add-problem.tsx
        </span>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

function Question({ index, label, title, children }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-emerald-600 text-sm sm:text-base font-semibold">
          {index}
        </span>
        <span className="text-slate-400 text-sm sm:text-base">{label}</span>
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold italic leading-tight mb-10">
        {title}
      </h1>
      {children}
    </div>
  );
}

export default AddProblem;
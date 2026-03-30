"use client";

import { useState } from "react";
import Script from "next/script";

const GA_ID = "G-LB6PM2KDRR";

const faqData = [
  {
    question: "How do I know if I have sciatica?",
    answer:
      "True sciatica involves pain radiating from the lower back through the buttock and down one leg (rarely both), often with tingling, numbness, or weakness. Pain that only affects the lower back is not sciatica — it's more likely a muscle strain or disc issue.",
  },
  {
    question: "How long does sciatica last?",
    answer:
      "Acute sciatica (under 6 weeks) typically resolves with conservative treatment in 4–6 weeks. Chronic sciatica (6+ weeks) requires more structured physiotherapy. Without treatment, about 50% of cases improve within 4 weeks.",
  },
  {
    question: "What is the fastest way to relieve sciatica pain?",
    answer:
      "Short-term relief: gentle movement (walking, stretching), anti-inflammatory medication, and heat/ice alternation. The McKenzie method (repeated back extensions) helps many people significantly. Avoid prolonged bed rest — it worsens outcomes.",
  },
  {
    question: "What is piriformis syndrome vs sciatica?",
    answer:
      "Piriformis syndrome compresses the sciatic nerve at the hip muscle level, causing similar symptoms but typically without lower back pain. It's often triggered by sitting on hard surfaces or running. Targeted piriformis stretches usually resolve it.",
  },
  {
    question: "When should I see a doctor for sciatica?",
    answer:
      "Immediately if you experience bladder or bowel problems, severe weakness, or pain after a fall. Otherwise, see a GP if pain hasn't improved after 4–6 weeks of home treatment or is significantly impacting your daily life.",
  },
];

const questions = [
  {
    q: "Where is your pain primarily located?",
    options: ["Lower back only", "One buttock and/or leg", "Both legs", "It varies day to day"],
  },
  {
    q: "How would you describe the pain?",
    options: ["Sharp or shooting", "Burning or tingling", "Dull ache", "Numbness"],
  },
  {
    q: "What makes the pain worse?",
    options: ["Sitting for long periods", "Bending forward", "Standing or walking", "All of the above"],
  },
  {
    q: "How long have you had these symptoms?",
    options: ["Less than 2 weeks", "2–8 weeks", "2–6 months", "More than 6 months"],
  },
  {
    q: "Do you experience any weakness in your leg or foot?",
    options: ["No weakness", "Mild — occasional unsteadiness", "Noticeable — difficulty with stairs", "Significant — foot drop or dragging"],
  },
  {
    q: "Was there a recent trigger?",
    options: ["Lifting or twisting injury", "Long period of sitting", "Pregnancy", "No obvious cause"],
  },
];

interface AssessmentResult {
  condition: string;
  likelihood: string;
  description: string;
  actions: string[];
  urgentWarning: boolean;
}

function getResult(answers: Record<number, number>): AssessmentResult {
  const location = answers[0];
  const character = answers[1];
  const aggravator = answers[2];
  const duration = answers[3];
  const weakness = answers[4];

  if (weakness === 3) {
    return {
      condition: "Possible nerve compression requiring urgent attention",
      likelihood: "Urgent",
      description:
        "Significant leg or foot weakness alongside sciatica-type symptoms may indicate serious nerve compression. This warrants prompt medical evaluation.",
      actions: [
        "See your GP or attend A&E as soon as possible",
        "Do not delay if you have numbness in the groin or loss of bladder/bowel control",
        "Avoid heavy lifting and strenuous activity until assessed",
        "Keep a note of when symptoms started and any progression",
      ],
      urgentWarning: true,
    };
  }

  if (location === 1 && (character === 0 || character === 1) && (aggravator === 0 || aggravator === 3)) {
    return {
      condition: "Likely true sciatica",
      likelihood: "High",
      description:
        "Your symptoms are consistent with true sciatica — nerve irritation or compression in the lower spine causing pain that radiates down one leg. This is commonly caused by a disc bulge or herniation pressing on the sciatic nerve.",
      actions: [
        "See a physiotherapist for a full assessment and targeted exercises",
        "Try gentle nerve glide exercises (nerve flossing) to improve mobility",
        "Avoid prolonged sitting — take standing breaks every 20-30 minutes",
        "Use ice on your lower back for 15-20 minutes several times daily",
        duration >= 2 ? "Book a GP appointment — chronic sciatica may need imaging" : "Monitor for 2-4 weeks — most acute sciatica resolves with conservative treatment",
        "Walking is often helpful — aim for short, frequent walks",
      ],
      urgentWarning: false,
    };
  }

  if (location === 1 && character === 2 && aggravator === 0) {
    return {
      condition: "Possible piriformis syndrome",
      likelihood: "Moderate",
      description:
        "Your symptoms suggest piriformis syndrome — a condition where the piriformis muscle in your buttock irritates the sciatic nerve. This is different from true sciatica in that the compression happens in the buttock, not the spine.",
      actions: [
        "Try piriformis stretching exercises — figure-4 stretch is most effective",
        "Use a tennis ball or foam roller on the piriformis muscle",
        "Avoid sitting on hard surfaces and crossing your legs",
        "A physiotherapist can confirm the diagnosis with specific tests",
        "Strengthening your glutes can help take pressure off the piriformis",
        "Heat therapy on the buttock area often provides relief",
      ],
      urgentWarning: false,
    };
  }

  return {
    condition: "Possible referred pain or muscular issue",
    likelihood: "Moderate",
    description:
      "Your symptom pattern doesn't follow a classic sciatica pattern. The pain may be referred from your lower back, sacroiliac joint, or hip rather than direct sciatic nerve compression. This is actually good news — it's often easier to treat.",
    actions: [
      "See a physiotherapist for a thorough assessment — they can pinpoint the source",
      "Try gentle lower back and hip stretches daily",
      "Improve your posture, especially when sitting at a desk",
      "Stay active — walking and swimming are excellent low-impact options",
      "Consider whether stress or tension may be contributing to your symptoms",
      duration >= 2 ? "See your GP if symptoms have persisted beyond 6 weeks" : "Give conservative treatment 4-6 weeks before seeking further evaluation",
    ],
    urgentWarning: false,
  };
}

export default function SciaticaAssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (idx: number) => {
    setAnswers({ ...answers, [step]: idx });
    setStep(step + 1);
  };

  const showResult = step >= questions.length;
  const result = showResult ? getResult(answers) : null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>

      <meta property="og:title" content="Sciatica Self-Assessment Tool — Check Your Symptoms" />
      <meta property="og:description" content="Answer 6 questions to assess your sciatica symptoms and get personalised guidance on next steps for pain relief." />
      <meta property="og:image" content="https://sciaticaspot.com/images/sciatica-assessment-og.jpg" />
      <meta property="og:url" content="https://sciaticaspot.com/tools/sciatica-assessment" />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sciatica Self-Assessment Tool — Check Your Symptoms" />
      <meta name="twitter:description" content="Answer 6 questions to assess your sciatica symptoms and get personalised guidance on next steps for pain relief." />
      <link rel="canonical" href="https://sciaticaspot.com/tools/sciatica-assessment" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Sciatica Self-Assessment Tool — Check Your Symptoms",
            author: { "@type": "Person", name: "Dr. Emma Clarke" },
            datePublished: "2025-06-01",
            dateModified: "2026-03-01",
            publisher: {
              "@type": "Organization",
              name: "Sciatica Spot",
              url: "https://sciaticaspot.com",
            },
            description: "Answer 6 questions to assess your sciatica symptoms and get personalised guidance on next steps for pain relief.",
          }),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2">
            Sciatica Self-Assessment Tool
          </h1>

          <p className="text-center text-gray-700 font-bold mb-4 max-w-xl mx-auto">
            Not sure if your pain is sciatica, piriformis syndrome, or something else? Answer 6 quick questions about your symptoms, pain location, and triggers to get an instant assessment with personalised next steps — created by a physiotherapist.
          </p>

          <p className="text-center text-sm text-gray-500 mb-2">
            By Dr. Emma Clarke, Physiotherapist | Last updated March 2026
          </p>

          <p className="text-center text-xs text-gray-400 mb-8">
            This page contains affiliate links. We may earn a commission at no extra cost to you.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional for diagnosis and treatment.
            </p>
          </div>

          {!showResult && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                {questions.map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-teal-600" : "bg-gray-200"}`} />
                ))}
              </div>

              <p className="text-sm text-teal-600 font-medium mb-1">Question {step + 1} of {questions.length}</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{questions[step].q}</h2>

              <div className="space-y-3">
                {questions[step].options.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left px-5 py-4 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-colors text-gray-800 font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                  &larr; Back
                </button>
              )}
            </div>
          )}

          {showResult && result && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="text-center mb-6">
                <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-3 ${
                  result.urgentWarning
                    ? "bg-red-100 text-red-800"
                    : result.likelihood === "High"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-teal-100 text-teal-800"
                }`}>
                  {result.likelihood} likelihood
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{result.condition}</h2>
              </div>

              <p className="text-gray-700 mb-6">{result.description}</p>

              {result.urgentWarning && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800 font-semibold">
                    If you are experiencing numbness in the groin, loss of bladder or bowel control, or rapidly worsening weakness, seek emergency medical attention immediately.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Recommended next steps</h3>
                <ul className="space-y-2">
                  {result.actions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-teal-600 mt-0.5 shrink-0">&#10003;</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <a
                  href="https://www.amazon.com/s?k=lumbar+support+pillow+sciatica&tag=theforge05-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 inline-block"
                >
                  Shop Lumbar Support Pillows &rarr;
                </a>
                <a
                  href="https://www.amazon.com/s?k=tens+machine+back+pain+relief&tag=theforge05-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 inline-block"
                >
                  Shop TENS Machines for Pain Relief &rarr;
                </a>
              </div>

              <button
                onClick={() => { setStep(0); setAnswers({}); }}
                className="w-full py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          )}

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((f, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{f.question}</h3>
                  <p className="text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h2>
            <div className="space-y-3">
              <a href="/sciatica-exercises-for-pain-relief" className="block text-teal-600 hover:text-teal-800 hover:underline font-medium">
                Best Sciatica Exercises for Pain Relief &rarr;
              </a>
              <a href="/piriformis-syndrome-vs-sciatica" className="block text-teal-600 hover:text-teal-800 hover:underline font-medium">
                Piriformis Syndrome vs Sciatica — How to Tell the Difference &rarr;
              </a>
              <a href="https://plantarfasciitisguides.com" className="block text-teal-600 hover:text-teal-800 hover:underline font-medium">
                Plantar Fasciitis Recovery Guide &rarr;
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

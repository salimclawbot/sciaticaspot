const visuals: Record<string, { src: string; alt: string }> = {
  "acupuncture-for-sciatica": { src: "/images/articles/acupuncture-for-sciatica-hero.webp", alt: "Acupuncture consultation using sterile sealed supplies and a spine model" },
  "best-car-seat-cushion-sciatica": { src: "/images/articles/best-car-seat-cushion-sciatica-hero.webp", alt: "Car seat cushions with wedge, contour, and coccyx cutout shapes" },
  "best-mattress-for-sciatica-2026": { src: "/images/articles/best-mattress-for-sciatica-2026-hero.webp", alt: "Side sleeper using a knee pillow on a pressure-relieving mattress" },
  "best-mattress-for-sciatica": { src: "/images/articles/best-mattress-for-sciatica-hero.webp", alt: "Sleep specialist comparing mattress firmness samples and construction" },
  "best-office-chair-sciatica": { src: "/images/articles/best-office-chair-sciatica-hero.webp", alt: "Ergonomic office chair adjustment for neutral seated posture" },
  "best-seat-cushions-for-sciatica-2026": { src: "/images/articles/best-seat-cushions-for-sciatica-2026-hero.webp", alt: "Seat cushion shapes and foam constructions compared on different chairs" },
  "best-sleeping-position-for-sciatica": { src: "/images/articles/best-sleeping-position-for-sciatica-hero.webp", alt: "Side, back, and semi-reclined sleeping positions with pillow support" },
  "can-a-chiropractor-help-sciatica": { src: "/images/articles/can-a-chiropractor-help-sciatica-hero.webp", alt: "Chiropractor explaining spinal anatomy before care" },
  "can-yoga-cure-sciatica": { src: "/images/articles/can-yoga-cure-sciatica-hero.webp", alt: "Supported yoga practice guided by an instructor" },
  "cold-vs-heat-therapy-for-sciatica": { src: "/images/articles/cold-vs-heat-therapy-for-sciatica-hero.webp", alt: "Wrapped cold pack and warm compress with a timer" },
  "does-walking-help-sciatica": { src: "/images/articles/does-walking-help-sciatica-hero.webp", alt: "Adult taking a measured walk on a flat path with rest benches" },
  "how-long-does-sciatica-last": { src: "/images/articles/how-long-does-sciatica-last-hero.webp", alt: "Adult planning a gradual sciatica recovery timeline" },
  "sciatica-during-pregnancy": { src: "/images/articles/sciatica-during-pregnancy-hero.webp", alt: "Prenatal physiotherapist guiding safe movement during pregnancy" },
  "sciatica-exercises-to-avoid": { src: "/images/articles/sciatica-exercises-to-avoid-hero.webp", alt: "Physiotherapist explaining loaded exercises to avoid during a sciatica flare" },
  "sciatica-exercises": { src: "/images/articles/sciatica-exercises-hero.webp", alt: "Adult performing a controlled nerve glide under physiotherapist supervision" },
  "sciatica-flare-up-triggers": { src: "/images/articles/sciatica-flare-up-triggers-hero.webp", alt: "Adult and physiotherapist reviewing common lifting and sitting flare triggers" },
  "sciatica-from-sitting-too-long": { src: "/images/articles/sciatica-from-sitting-too-long-hero.webp", alt: "Ergonomic specialist correcting prolonged sitting at a home desk" },
  "sciatica-home-treatment-7-day-plan": { src: "/images/articles/sciatica-home-treatment-7-day-plan-hero.webp", alt: "Adult organizing a seven-day home management plan" },
  "sciatica-stretches-for-immediate-relief-with-photos": { src: "/images/articles/sciatica-stretches-for-immediate-relief-with-photos-hero.webp", alt: "Physiotherapist guiding a gentle standing hip and hamstring stretch" },
  "sciatica-stretches-for-immediate-relief": { src: "/images/articles/sciatica-stretches-for-immediate-relief-hero.webp", alt: "Adult performing a supported seated glute stretch" },
  "sciatica-stretches-immediate-relief": { src: "/images/articles/sciatica-stretches-immediate-relief-hero.webp", alt: "Adult practicing a gentle supine knee-to-chest mobility exercise" },
  "sciatica-stretches-relief": { src: "/images/articles/sciatica-stretches-relief-hero.webp", alt: "Physiotherapist guiding a side-lying piriformis mobility exercise" },
  "sciatica-surgery-when-is-it-necessary": { src: "/images/articles/sciatica-surgery-when-is-it-necessary-hero.webp", alt: "Spine surgeon and adult reviewing lumbar imaging together" },
  "sciatica-surgery-when-necessary": { src: "/images/articles/sciatica-surgery-when-necessary-hero.webp", alt: "Rehabilitation specialist explaining treatment pathways and walking assessment" },
  "sciatica-vs-piriformis-syndrome": { src: "/images/articles/sciatica-vs-piriformis-syndrome-hero.webp", alt: "Clinician comparing spine nerve and deep hip muscle models" },
};

export function getArticleVisual(slug: string, title: string) {
  return visuals[slug] ?? { src: "/editorial-hero.png", alt: title };
}

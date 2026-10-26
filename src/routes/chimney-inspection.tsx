import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImgAsset from "@/assets/chimney-tech.jpg.asset.json";
import job1 from "@/assets/IMG_8609.jpg.asset.json";
import job2 from "@/assets/IMG_8612.jpg.asset.json";
import job3 from "@/assets/IMG_0519.jpg.asset.json";
import job4 from "@/assets/IMG_0520.jpg.asset.json";
import job5 from "@/assets/IMG_2498.jpg.asset.json";
import job6 from "@/assets/IMG_2594.jpg.asset.json";
import teamImgAsset from "@/assets/chimney-team.jpg.asset.json";
import badgeAsset from "@/assets/certified-chimney-sweep.svg.asset.json";
import { collectStep, sendLead, type LeadFields } from "@/lib/lead-submit";

export const Route = createFileRoute("/chimney-inspection")({
  head: () => ({
    meta: [
      { title: "Chimney Inspection Columbus OH | $69 | ChimCrew" },
      {
        name: "description",
        content:
          "Get a professional chimney inspection for $69 in Columbus, OH. Structure, crown, flashing, flue and safety checks by local, insured ChimCrew technicians.",
      },
      {
        property: "og:title",
        content: "Chimney Inspection Columbus OH | $69 | ChimCrew",
      },
      {
        property: "og:description",
        content:
          "Find out what condition your chimney is in before small problems turn into expensive repairs. Local ChimCrew pros, $69 inspection in Columbus, OH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const PHONE = "+13803247646";
const PHONE_DISPLAY = "(380) 324-7646";

const REVIEWS = [
  {
    name: "Jema",
    meta: "Local Guide",
    time: "17 hours ago",
    color: "oklch(0.68 0.17 45)",
    text: "Old unserviced chimney for decades... David was very communicative and I never felt left out. John showed up and had the chimney cleaned, lined, and capped in a matter of hours. The price I was quoted never changed.",
  },
  {
    name: "Sanjib Nath",
    meta: "3 reviews",
    time: "23 hours ago",
    color: "oklch(0.55 0.12 250)",
    text: "Dylan gave me a great inspected and also the best price - never expected, it's simply awesome and I recommend this to others",
  },
  {
    name: "Jeremy Freeman",
    meta: "2 reviews",
    time: "a day ago",
    color: "oklch(0.5 0.05 60)",
    text: "Professional, knowledgeable and not pushing services I didn't need. Would recommend them and use them again.",
  },
  {
    name: "Ali",
    meta: "5 reviews · 1 photo",
    time: "a day ago",
    color: "oklch(0.6 0.09 200)",
    text: "John and team were excellent!",
  },
  {
    name: "Steve McElhatten II",
    meta: "7 reviews",
    time: "2 days ago",
    color: "oklch(0.62 0.16 30)",
    text: "The job was done very efficiently and the technician was polite and courteous.",
  },
  {
    name: "Chloe Fout",
    meta: "3 reviews",
    time: "3 days ago",
    color: "oklch(0.6 0.09 200)",
    text: "John did such an amazing job!",
  },
  {
    name: "K-Ann Andrews",
    meta: "7 reviews",
    time: "a week ago",
    color: "oklch(0.55 0.1 165)",
    text: "Daniel and Dillon were on time, courteous and professional. They explained exactly what was going on with my chimney and showed me the pictures. I would definitely recommend and use this company again.",
  },
  {
    name: "Donna Rieger",
    meta: "2 reviews",
    time: "a week ago",
    color: "oklch(0.52 0.19 350)",
    text: "Was very impressed with the two young guys that came out for the chimney inspection. They were super friendly and knowledgeable. Was also impressed with the drone technology they used to photograph the problems with the top of the chimney. We understand exactly what the repairs they will be doing. Great to work with.",
  },
  {
    name: "Jennifer Henderson",
    meta: "6 reviews",
    time: "a week ago",
    color: "oklch(0.68 0.17 45)",
    text: "Chimcrew showed up at the scheduled time, looked professional, did a thorough job and was able to show me images of their inspection. They took care not to leave any trace of ash or soot, and left the area clean. Would definitely recommend them.",
  },
  {
    name: "Jason Fairbanks",
    meta: "4 reviews · 2 photos",
    time: "2 weeks ago",
    color: "oklch(0.5 0.05 60)",
    text: "Had a fantastic inspection today performed by Dylan. Very courteous and professional gentleman!",
  },
];

function Stars() {
  return (
    <span className="inline-flex text-star" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

function CallButton({
  children = "Call ChimCrew",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`tel:${PHONE}`}
      className={`inline-flex items-center justify-center rounded-md bg-call px-5 py-3 text-base font-semibold text-call-foreground ${className}`}
    >
      {children}
    </a>
  );
}

function ClaimButton({ children = "Book My $69 Inspection", className = "" }) {
  return (
    <a
      href="#book"
      className={`inline-flex items-center justify-center rounded-md bg-cta px-5 py-3 text-base font-semibold text-cta-foreground ${className}`}
    >
      {children}
    </a>
  );
}

const SERVICES = [
  "Chimney Inspection",
  "Chimney Cleaning & Sweep",
  "Chimney Repair",
  "Gas Fireplace Repair",
  "Masonry & Tuckpointing",
  "Chimney Caps & Crowns",
  "Waterproofing & Leak Repair",
];

const TIME_SLOTS = [
  { label: "Morning", hint: "8–11 AM" },
  { label: "Midday", hint: "11 AM–2 PM" },
  { label: "Afternoon", hint: "2–5 PM" },
  { label: "Evening", hint: "5–7 PM" },
];

const STEPS = ["1. Service", "2. Contact", "3. Address"];

function Field({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-left">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label} {required && <span className="text-cta">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-md border bg-background px-3 py-3 text-base outline-none focus:border-cta";

function BookingForm({ sent, onSent }: { sent: boolean; onSent: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [service, setService] = useState(SERVICES[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning");
  const [consent, setConsent] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const leadFields = useRef<LeadFields>({});

  const advance = (form: HTMLFormElement) => {
    if (!form.reportValidity()) return;
    leadFields.current = { ...leadFields.current, ...collectStep(form) };
    setStep(step + 1);
  };

  return (
    <div id="book" className="rounded-md border bg-background p-4 md:p-6">
      <p className="text-center text-[11px] font-semibold tracking-widest text-muted-foreground">
        CHIMCREW · 60-SECOND BOOKING
      </p>
      <h2 className="mt-1 text-center text-xl uppercase md:text-2xl">
        Book Your $69 Chimney Inspection
      </h2>
      <p className="mt-2 flex items-center justify-center gap-2 text-center text-sm font-semibold text-foreground">
        <span>⭐</span>
        <span>4.9 on Google · 174+ Reviews</span>
      </p>

      {sent ? (
        <p className="mt-4 text-sm">
          Thanks! We received your request and will call you shortly. Need it sooner?{" "}
          <a href={`tel:${PHONE}`} className="font-semibold text-cta">
            {PHONE_DISPLAY}
          </a>
        </p>
      ) : (
        <>
          {/* Progress */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {STEPS.map((s, i) => (
              <div key={s}>
                <div
                  className={`h-1 rounded-full ${i <= step ? "bg-cta" : "bg-muted-foreground/25"}`}
                />
                <p
                  className={`mt-2 text-center text-[10px] font-semibold uppercase tracking-widest ${
                    i <= step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>

          <form
            className="mt-4 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              leadFields.current = { ...leadFields.current, ...collectStep(e.currentTarget) };
              void sendLead(leadFields.current, {
                page: "chimney-inspection",
                service,
                date,
                time,
                consent,
              });
              navigate({ to: "/thank-you" });
            }}
          >
            {step === 0 && (
              <>
                <Field label="Service Needed" required>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={inputCls}
                  >
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Field label="Appointment Date" required>
                      <input
                        required
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <p className="mt-1 text-xs text-muted-foreground">Sun–Fri · Closed Saturdays</p>
                  </div>
                  <Field label="Appointment Time" required>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => setTime(t.label)}
                          className={`rounded-md border px-2 py-2 text-center text-sm ${
                            time === t.label
                              ? "border-cta bg-cta text-cta-foreground"
                              : "bg-background"
                          }`}
                        >
                          <span className="block font-semibold">{t.label}</span>
                          <span className="block text-[11px] opacity-80">{t.hint}</span>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <Field label="Full Name" required>
                  <input required name="name" autoComplete="name" className={inputCls} />
                </Field>
                <Field label="Phone Number" required>
                  <input required type="tel" name="phone" autoComplete="tel" className={inputCls} />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={inputCls}
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field label="Street Address" required>
                  <input required name="street" placeholder="123 Main St" className={inputCls} />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="City (optional)">
                    <input name="city" placeholder="Columbus" className={inputCls} />
                  </Field>
                  <Field label="ZIP Code" required>
                    <input
                      required
                      name="zip"
                      inputMode="numeric"
                      placeholder="45402"
                      autoComplete="postal-code"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field label="Note (optional)">
                  <textarea
                    name="note"
                    rows={3}
                    placeholder="Anything we should know?"
                    className={inputCls}
                  />
                </Field>
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    By checking this box, I consent to receive text messages related to orders,
                    service appointments, or other relevant information. Reply STOP at any time to
                    opt out. Message and data rates may apply.
                  </span>
                </label>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    required
                    checked={notRobot}
                    onChange={(e) => setNotRobot(e.target.checked)}
                  />
                  <span>I'm not a robot</span>
                </label>
              </>
            )}

            <div className={step > 0 ? "grid grid-cols-[auto_1fr] gap-2" : ""}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-md border px-4 py-3 text-sm font-semibold"
                >
                  ← Back
                </button>
              )}
              <button
                type={step < 2 ? "button" : "submit"}
                onClick={step < 2 ? (e) => advance(e.currentTarget.form!) : undefined}
                className="rounded-md bg-cta px-5 py-3 text-base font-semibold text-cta-foreground"
              >
                {step < 2 ? "Continue →" : "Book My $69 Inspection"}
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              No card. No spam. Appointment confirmation email within 10 minutes.
            </p>
            <CallButton className="w-full md:hidden" />
          </form>
        </>
      )}
    </div>
  );
}

function Landing() {
  const [sent, setSent] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = document.body.scrollHeight * 0.07;
      setShowSticky(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="pb-20 md:pb-0">
      {/* HERO */}
      <section className="relative bg-surface px-4 pt-6 pb-8 md:bg-transparent md:py-24">
        {/* Desktop background image */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          <img
            src={heroImgAsset.url}
            alt="ChimCrew technician working on a Columbus, Ohio home"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-6xl md:grid md:grid-cols-2 md:items-center md:gap-12">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-cta md:text-sm">
              CHIMNEY INSPECTION IN COLUMBUS, OH
            </p>
            <h1 className="mt-3 text-3xl leading-tight md:text-5xl md:text-white">
              Chimney Inspection in Columbus{" "}
              <span className="block text-4xl text-cta md:text-6xl">$69 Inspection</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg md:text-white/85">
              Know the condition of your chimney with a professional inspection from a local Columbus
              chimney team.
            </p>
            <ul className="mt-5 space-y-1.5 text-sm font-semibold md:text-base md:text-white">
              <li>✓ Local Columbus Chimney Pros</li>
              <li>✓ Same-Day &amp; Next-Day Availability</li>
              <li>✓ Experienced &amp; Insured Technicians</li>
            </ul>
          </div>

          {/* Form */}
          <div className="mt-6 md:mt-0">
            <BookingForm sent={sent} onSent={() => setSent(true)} />
          </div>

          {/* Mobile image only */}
          <div className="mt-6 flex items-center justify-center md:mt-0 md:hidden">
            <img
              src={heroImgAsset.url}
              width={1024}
              height={768}
              alt="ChimCrew technician working on a Columbus, Ohio home"
              className="w-[60%] rounded-md object-cover md:h-auto"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE CHECK */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl">What We Check</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Chimney Structure & Masonry", "Look for cracks, damage and deterioration."],
              ["Crown & Chimney Cap", "Check for cracks, gaps and missing caps."],
              ["Flashing & Signs of Water Damage", "Find leaks and water intrusion early."],
              ["Fireplace & Visible Flue Areas", "Check the firebox and accessible flue."],
              ["Visible Safety Concerns", "Identify hazards before they become problems."],
              ["Clear Repair Recommendations if Needed", "Honest, easy-to-understand guidance."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-md border p-4">
                <h3 className="text-lg">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <ClaimButton className="mt-6 w-full md:w-auto" />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-surface px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl">Trusted by Columbus Homeowners</h2>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">4.9</span>
            <Stars />
            <span>Based on 174+ Google reviews</span>
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(showAllReviews ? REVIEWS : REVIEWS.slice(0, 3)).map((r) => (
              <div key={r.name} className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium text-cta-foreground"
                    style={{ background: r.color }}
                    aria-hidden="true"
                  >
                    {r.name[0]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.meta}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Stars />
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                  <span className="rounded border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    NEW
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllReviews((v) => !v)}
            className="mt-6 w-full rounded-md border px-5 py-3 text-base font-semibold md:w-auto"
          >
            {showAllReviews ? "Show less reviews" : `Show all ${REVIEWS.length} reviews`}
          </button>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl">More ChimCrew Services</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Real ChimCrew jobs across the Columbus area.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                img: job4.url,
                alt: "ChimCrew technician servicing a gas fireplace inside a home",
                title: "Gas Fireplace Repair",
                desc: "Pilot light, ignition, flame and gas fireplace troubleshooting.",
              },
              {
                img: job3.url,
                alt: "ChimCrew technician inspecting a chimney from a ladder",
                title: "Chimney Inspection",
                desc: "Professional chimney safety inspections.",
              },
              {
                img: job5.url,
                alt: "ChimCrew technician servicing a chimney cap and crown",
                title: "Chimney Repair",
                desc: "Leaks, flashing, crowns, caps, liners, masonry and more.",
              },
              {
                img: job2.url,
                alt: "ChimCrew technician working on a brick chimney",
                title: "Masonry & Tuckpointing",
                desc: "Brick, mortar and chimney masonry repairs.",
              },
              {
                img: job1.url,
                alt: "ChimCrew technician installing a chimney cap on a Columbus roof",
                title: "Chimney Caps & Crowns",
                desc: "Repair, replacement and installation.",
              },
              {
                img: job6.url,
                alt: "ChimCrew technician sealing a chimney crown",
                title: "Waterproofing & Leak Repair",
                desc: "Help prevent and repair chimney water intrusion.",
              },
            ].map(({ img, alt, title, desc }) => (
              <div key={title} className="overflow-hidden rounded-md border">
                <img
                  src={img}
                  alt={alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-base">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={`tel:${PHONE}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-call px-5 py-3 text-base font-semibold text-call-foreground md:hidden md:w-auto"
          >
            Need Another Chimney Service? Call ChimCrew
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-surface px-4 py-10">
        <div className="mx-auto max-w-5xl md:grid md:grid-cols-2 md:items-center md:gap-10">
          <div>
            <h2 className="text-2xl">Your Local Chimney Inspection Team</h2>
            <p className="mt-3 text-base text-muted-foreground">
              ChimCrew is a local team of chimney and fireplace professionals serving Columbus-area
              homeowners. We perform chimney inspections, cleaning, repairs and fireplace service
              every day. We keep our recommendations straightforward, so you always know what your
              chimney needs and what it doesn&apos;t. Clean, professional service from start to
              finish.
            </p>
            <ul className="mt-4 grid gap-1 text-sm font-semibold sm:grid-cols-3 md:grid-cols-1">
              <li>✓ Local Service Team</li>
              <li>✓ Experienced Technicians</li>
              <li>✓ Residential Chimney Specialists</li>
            </ul>
          </div>
          <img
            src={teamImgAsset.url}
            width={1024}
            height={768}
            alt="ChimCrew local technician ready to serve Columbus homeowners"
            loading="lazy"
            className="mt-6 w-full rounded-md object-cover md:mt-0"
          />
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <img
              src={badgeAsset.url}
              width={120}
              height={120}
              alt="Certified Chimney Sweep badge"
              loading="lazy"
              className="h-28 w-auto"
            />
            <p className="text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Certified Chimney Sweep
              <br />
              <span className="font-normal">Trusted, trained professionals serving Columbus, OH</span>
            </p>
          </div>
          <h2 className="mt-8 text-2xl">Serving Columbus & Surrounding Communities</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            ChimCrew proudly serves homeowners throughout Columbus and the surrounding Central Ohio
            communities.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground sm:grid-cols-3 md:grid-cols-4">
            {[
              "Columbus",
              "Dublin",
              "Westerville",
              "Worthington",
              "Hilliard",
              "Upper Arlington",
              "Gahanna",
              "Reynoldsburg",
              "Grove City",
              "Pickerington",
              "Powell",
              "New Albany",
              "Bexley",
              "Whitehall",
              "Canal Winchester",
              "Groveport",
              "Blacklick",
              "Lewis Center",
              "Pataskala",
              "Delaware",
            ].map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <ClaimButton className="mt-6 w-full md:w-auto">Book My $69 Inspection</ClaimButton>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand px-4 py-10 text-brand-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl">Get Your $69 Chimney Inspection</h2>
          <p className="mt-2 text-base opacity-90">
            Know your chimney's condition before small problems become expensive repairs.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href="#book"
              className="rounded-md bg-cta px-5 py-3 text-base font-semibold text-cta-foreground md:col-span-2"
            >
              Book My $69 Inspection
            </a>
            <a
              href={`tel:${PHONE}`}
              className="rounded-md bg-call px-5 py-3 text-base font-semibold text-call-foreground md:hidden"
            >
              Call ChimCrew
            </a>
          </div>
          <p className="mt-4 text-sm opacity-80">Serving Columbus, OH and surrounding communities.</p>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t bg-background p-2 transition-transform duration-300 md:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={`tel:${PHONE}`}
          className="rounded-md bg-call py-3 text-center text-sm font-semibold text-call-foreground"
        >
          Call ChimCrew
        </a>
        <a
          href="#book"
          className="rounded-md bg-cta py-3 text-center text-sm font-semibold text-cta-foreground"
        >
          $69 Inspection
        </a>
      </div>
    </main>
  );
}

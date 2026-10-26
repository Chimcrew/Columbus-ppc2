import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/chimcrew-logo.png.asset.json";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | ChimCrew Chimney Services" },
      {
        name: "description",
        content:
          "Thanks for reaching out to ChimCrew. We received your request and will call you shortly to schedule your service.",
      },
      { property: "og:title", content: "Thank You | ChimCrew Chimney Services" },
      {
        property: "og:description",
        content:
          "Thanks for reaching out to ChimCrew. We received your request and will call you shortly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYou,
});

const PHONE = "+13803247646";
const PHONE_DISPLAY = "(380) 324-7646";

function ThankYou() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <img
          src={logoAsset.url}
          alt="ChimCrew Chimney Repair & Inspection USA"
          width={200}
          height={80}
          className="mx-auto h-16 w-auto object-contain"
        />
        <h1 className="mt-6 text-3xl font-extrabold text-foreground md:text-4xl">
          Thank You! Your request is in. 🎉
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We received your request and a local ChimCrew team member will call you shortly to
          confirm your appointment.
        </p>
        <div className="mt-8 rounded-md border bg-background p-5">
          <p className="text-sm font-semibold text-foreground">Need us sooner?</p>
          <a
            href={`tel:${PHONE}`}
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-call px-6 py-3 text-lg font-bold text-call-foreground"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
import { submitLead } from "./leads.functions";

export type LeadFields = Record<string, string>;

export type LeadContext = {
  page: string;
  service: string | undefined;
  date: string;
  time: string;
  consent: boolean;
};

/** Reads every named text field currently rendered in the form step. */
export function collectStep(form: HTMLFormElement): LeadFields {
  const out: LeadFields = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value === "string") out[key] = value.trim();
  }
  return out;
}

/** Sends the lead to the automation webhook and stores it in the database. */
export async function sendLead(fields: LeadFields, ctx: LeadContext): Promise<void> {
  try {
    await submitLead({
      data: {
        page: ctx.page,
        service: ctx.service ?? "",
        preferred_date: ctx.date,
        preferred_time: ctx.time,
        name: fields["name"] ?? "",
        phone: fields["phone"] ?? "",
        email: fields["email"] ?? "",
        street: fields["street"] ?? "",
        city: fields["city"] ?? "",
        zip: fields["zip"] ?? "",
        note: fields["note"] ?? "",
        sms_consent: ctx.consent,
      },
    });
  } catch (error) {
    // Never block the visitor's thank-you redirect on a delivery failure.
    console.error("Lead submission failed", error);
  }
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  page: z.string().max(120),
  service: z.string().max(200).default(""),
  preferred_date: z.string().max(60).default(""),
  preferred_time: z.string().max(60).default(""),
  name: z.string().max(200).default(""),
  phone: z.string().max(60).default(""),
  email: z.string().max(200).default(""),
  street: z.string().max(300).default(""),
  city: z.string().max(120).default(""),
  zip: z.string().max(20).default(""),
  note: z.string().max(2000).default(""),
  sms_consent: z.boolean().default(false),
});

const WEBHOOK_URL = "https://hook.us2.make.com/kk2at8hjg7911l1ednliuiu75x5qefo3";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    let webhookStatus = "pending";

    // Send each value as a separate field to the automation webhook.
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          submitted_at: new Date().toISOString(),
        }),
      });
      webhookStatus = res.ok ? "sent" : `failed_${res.status}`;
    } catch (error) {
      console.error("Lead webhook failed", error);
      webhookStatus = "error";
    }

    // Always persist the lead so it is never lost if the automation fails.
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin
        .from("leads")
        .insert({ ...data, webhook_status: webhookStatus });
      if (error) console.error("Lead insert failed", error);
    } catch (error) {
      console.error("Lead storage failed", error);
    }

    return { ok: true, webhookStatus };
  });

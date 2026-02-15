import * as z from "zod";

export const auditSchema = z.object({
  // Step 1 — Identity
  industry: z.string({ required_error: "Select your industry" }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  businessName: z.string().min(2, "Business name is required"),

  // Step 2 — Visual Authority
  competitorReason: z.string().min(5, "Please describe the main reason"),
  contentHours: z.string({ required_error: "Select time spent" }),
  assetScore: z.string({ required_error: "Rate your visual content" }),

  // Step 3 — Creative & Conversion
  contentLibrary: z.string({ required_error: "Select content type" }),
  leadNextStep: z.string({ required_error: "Select lead's next step" }),
  paidTraffic: z.string({ required_error: "Select yes or no" }),
  cpl: z.string().optional(),

  // Step 4 — Industry-Specific + Routing
  industrySpecific: z.string({ required_error: "Please answer this question" }),
  interest: z.string({ required_error: "Select a service interest" }),
  primaryMarket: z.string({ required_error: "Select your primary market" }),

  // Step 5 — Final Hook
  techStack: z.array(z.string()).min(1, "Select at least one tech stack item"),
  adLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  additionalNotes: z.string().optional(),
});

export type AuditFormValues = z.infer<typeof auditSchema>;

// Which fields belong to which step (for per-step validation)
export const stepFields: Record<number, (keyof AuditFormValues)[]> = {
  1: ["industry", "name", "email", "businessName"],
  2: ["competitorReason", "contentHours", "assetScore"],
  3: ["contentLibrary", "leadNextStep", "paidTraffic"],
  4: ["industrySpecific", "interest", "primaryMarket"],
  5: ["techStack"],
};

export const serviceInterestOptions = [
  { label: "LNL Creative: Aesthetic Scaling", value: "Aesthetic Scaling" },
  { label: "LNL Creative: Cinematic Listing Stories", value: "Cinematic Listing Stories" },
  { label: "LNL Automations: Workflow Architecture", value: "Workflow Architecture" },
  { label: "LNL Automations: Lead Capture Systems", value: "Lead Capture Systems" },
  { label: "Full Ecosystem Buildout", value: "Full Ecosystem Buildout" },
  { label: "30-Minute Efficiency Audit", value: "30-Minute Efficiency Audit" },
];

export const techStackOptions = [
  { label: "Clio", value: "clio", group: "CRM" },
  { label: "MyCase", value: "mycase", group: "CRM" },
  { label: "Jobber", value: "jobber", group: "CRM" },
  { label: "Housecall Pro", value: "housecall-pro", group: "CRM" },
  { label: "GoHighLevel", value: "gohighlevel", group: "CRM" },
  { label: "Mailchimp", value: "mailchimp", group: "Marketing" },
  { label: "Constant Contact", value: "constant-contact", group: "Marketing" },
  { label: "Podium", value: "podium", group: "Marketing" },
  { label: "Calendly", value: "calendly", group: "Scheduling" },
  { label: "Acuity", value: "acuity", group: "Scheduling" },
  { label: "Google Calendar", value: "google-calendar", group: "Scheduling" },
  { label: "Make.com", value: "make", group: "LNL Favorites" },
  { label: "Zapier", value: "zapier", group: "LNL Favorites" },
  { label: "Airtable", value: "airtable", group: "LNL Favorites" },
  { label: "Other / None", value: "other", group: "Other" },
];

export const contentHoursOptions = [
  { label: "0–2 hours", value: "0-2" },
  { label: "3–5 hours", value: "3-5" },
  { label: "6–10 hours", value: "6-10" },
  { label: "11–20 hours", value: "11-20" },
  { label: "20+ hours", value: "20+" },
];

export const marketOptions = [
  { label: "Raleigh / Durham, NC", value: "raleigh" },
  { label: "Columbus, OH", value: "columbus" },
  { label: "Moscow, ID", value: "moscow" },
];

export const leadNextStepOptions = [
  { label: "DM", value: "dm" },
  { label: "Link in Bio", value: "link-in-bio" },
  { label: "Phone Call", value: "phone" },
  { label: "Website Form", value: "website-form" },
  { label: "Other", value: "other" },
];

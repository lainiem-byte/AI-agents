import { UseFormReturn } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AuditFormValues,
  serviceInterestOptions,
  techStackOptions,
  contentHoursOptions,
  marketOptions,
  leadNextStepOptions,
} from "@/lib/auditSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const inputClass =
  "bg-background/50 border-primary/10 focus:border-primary/50 transition-colors";

interface StepProps {
  form: UseFormReturn<AuditFormValues>;
}

// ─── Step 1: Identity ───────────────────────────────────────
export function Step1Identity({ form }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-display font-bold text-[#D4AF37] tracking-wide">
        STEP 1: IDENTITY
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Let's start with the basics so we can prepare your custom audit.
      </p>

      <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="medspa">Med Spa</SelectItem>
                <SelectItem value="realtor">Real Estate</SelectItem>
                <SelectItem value="law">Law</SelectItem>
                <SelectItem value="home-services">Home Services</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} className={inputClass} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="john@company.com"
                {...field}
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Acme Inc."
                {...field}
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// ─── Step 2: Visual Authority ───────────────────────────────
export function Step2VisualAuthority({ form }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-display font-bold text-[#D4AF37] tracking-wide">
        STEP 2: VISUAL AUTHORITY
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Help us diagnose your creative gaps.
      </p>

      <FormField
        control={form.control}
        name="competitorReason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What is the #1 reason a potential client chooses a competitor over
              you after visiting your online presence?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the main reason..."
                {...field}
                className={cn(inputClass, "min-h-[80px]")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contentHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Hours/week spent on content instead of closing deals?
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {contentHoursOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="assetScore"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Scale 1–10: How well does your visual content reflect the
              high-end nature of your services?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-wrap gap-2 pt-2"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <FormItem key={i + 1} className="flex items-center space-x-0">
                    <FormControl>
                      <RadioGroupItem
                        value={String(i + 1)}
                        className="peer sr-only"
                        id={`score-${i + 1}`}
                      />
                    </FormControl>
                    <label
                      htmlFor={`score-${i + 1}`}
                      className={cn(
                        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors",
                        field.value === String(i + 1)
                          ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                          : "border-primary/10 text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {i + 1}
                    </label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// ─── Step 3: Creative & Conversion ──────────────────────────
export function Step3CreativeConversion({ form }: StepProps) {
  const paidTraffic = form.watch("paidTraffic");

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-display font-bold text-[#D4AF37] tracking-wide">
        STEP 3: CREATIVE & CONVERSION
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Let's understand your conversion engine.
      </p>

      <FormField
        control={form.control}
        name="contentLibrary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Do you have a cinematic video library, or are you relying on
              static/stock?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-3 pt-2"
              >
                {[
                  { label: "Cinematic Library", value: "library" },
                  { label: "Static Photos", value: "static" },
                  { label: "Stock Imagery", value: "stock" },
                  { label: "Mix of Everything", value: "mix" },
                ].map((opt) => (
                  <FormItem key={opt.value} className="flex items-center space-x-0">
                    <FormControl>
                      <RadioGroupItem
                        value={opt.value}
                        className="peer sr-only"
                        id={`library-${opt.value}`}
                      />
                    </FormControl>
                    <label
                      htmlFor={`library-${opt.value}`}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-sm font-medium transition-colors",
                        field.value === opt.value
                          ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                          : "border-primary/10 text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {opt.label}
                    </label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="leadNextStep"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              When a lead likes your content, what is their exact next step to
              book?
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select next step" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {leadNextStepOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paidTraffic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Are you currently running paid traffic to your creative assets?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4 pt-2"
              >
                {[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ].map((opt) => (
                  <FormItem key={opt.value} className="flex items-center space-x-0">
                    <FormControl>
                      <RadioGroupItem
                        value={opt.value}
                        className="peer sr-only"
                        id={`traffic-${opt.value}`}
                      />
                    </FormControl>
                    <label
                      htmlFor={`traffic-${opt.value}`}
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-md border px-6 py-2.5 text-sm font-medium transition-colors",
                        field.value === opt.value
                          ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                          : "border-primary/10 text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {opt.label}
                    </label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {paidTraffic === "yes" && (
        <FormField
          control={form.control}
          name="cpl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your current Cost Per Lead (CPL)?</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. $25"
                  {...field}
                  className={inputClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

// ─── Step 4: Industry-Specific + Routing ────────────────────
export function Step4IndustryRouting({ form }: StepProps) {
  const industry = form.watch("industry");

  const industryQuestion =
    industry === "medspa"
      ? "Do you have professional Before & After content that complies with platform regulations while still looking high-end?"
      : industry === "realtor"
      ? "Do you have a systemized way to turn a single property listing into 10+ pieces of short-form content?"
      : industry === "law"
      ? "Do you have a systemized intake process that captures leads 24/7 without manual follow-up?"
      : "Do you have automated scheduling and follow-up for service calls?";

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-display font-bold text-[#D4AF37] tracking-wide">
        STEP 4: INDUSTRY & ROUTING
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Industry-specific diagnostics and service matching.
      </p>

      <FormField
        control={form.control}
        name="industrySpecific"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{industryQuestion}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4 pt-2"
              >
                {[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                  { label: "Partially", value: "partially" },
                ].map((opt) => (
                  <FormItem key={opt.value} className="flex items-center space-x-0">
                    <FormControl>
                      <RadioGroupItem
                        value={opt.value}
                        className="peer sr-only"
                        id={`industry-${opt.value}`}
                      />
                    </FormControl>
                    <label
                      htmlFor={`industry-${opt.value}`}
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium transition-colors",
                        field.value === opt.value
                          ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                          : "border-primary/10 text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {opt.label}
                    </label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Interest</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select a service package" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {serviceInterestOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="primaryMarket"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Market</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select a market" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {marketOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// ─── Step 5: Final Hook ─────────────────────────────────────
export function Step5FinalHook({ form }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-display font-bold text-[#D4AF37] tracking-wide">
        STEP 5: FINAL DETAILS
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Last step — help our architects prepare for your call.
      </p>

      <FormField
        control={form.control}
        name="techStack"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Current Tech Stack</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "h-auto min-h-10 justify-between bg-background/50 border-primary/10 hover:bg-background/80 hover:text-primary-foreground",
                      !field.value || field.value.length === 0
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    <span className="truncate text-left">
                      {field.value?.length > 0
                        ? techStackOptions
                            .filter((opt) => field.value.includes(opt.value))
                            .map((opt) => opt.label)
                            .join(", ")
                        : "Select tools"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[260px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search tools..." />
                  <CommandList>
                    <CommandEmpty>No tool found.</CommandEmpty>
                    {["CRM", "Marketing", "Scheduling", "LNL Favorites", "Other"].map(
                      (group) => (
                        <CommandGroup key={group} heading={group}>
                          {techStackOptions
                            .filter((opt) => opt.group === group)
                            .map((tool) => (
                              <CommandItem
                                value={tool.label}
                                key={tool.value}
                                onSelect={() => {
                                  const current = field.value || [];
                                  const isSelected = current.includes(tool.value);
                                  if (isSelected) {
                                    field.onChange(
                                      current.filter((v) => v !== tool.value)
                                    );
                                  } else {
                                    field.onChange([...current, tool.value]);
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(tool.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tool.label}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      )
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="adLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Upload a link to your most recent ad or post{" "}
              <span className="text-muted-foreground">(optional)</span>
            </FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://instagram.com/p/..."
                {...field}
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Anything else we should know?{" "}
              <span className="text-muted-foreground">(optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about specific challenges, goals, or questions..."
                {...field}
                className={cn(inputClass, "min-h-[80px]")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

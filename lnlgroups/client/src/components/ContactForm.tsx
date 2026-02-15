import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
const techStackOptions = [
  // CRM
  { label: "Clio", value: "clio", group: "CRM" },
  { label: "MyCase", value: "mycase", group: "CRM" },
  { label: "Jobber", value: "jobber", group: "CRM" },
  { label: "Housecall Pro", value: "housecall-pro", group: "CRM" },
  { label: "GoHighLevel", value: "gohighlevel", group: "CRM" },
  // Marketing / Communication
  { label: "Mailchimp", value: "mailchimp", group: "Marketing" },
  { label: "Constant Contact", value: "constant-contact", group: "Marketing" },
  { label: "Podium", value: "podium", group: "Marketing" },
  // Scheduling
  { label: "Calendly", value: "calendly", group: "Scheduling" },
  { label: "Acuity", value: "acuity", group: "Scheduling" },
  { label: "Google Calendar", value: "google-calendar", group: "Scheduling" },
  // Automation
  { label: "Make.com", value: "make", group: "Automation" },
  { label: "Zapier", value: "zapier", group: "Automation" },
  { label: "Airtable", value: "airtable", group: "Automation" },
  // Other
  { label: "Other / None", value: "other", group: "Other" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  businessName: z.string().min(2, "Business name is required"),
  primaryMarket: z.string({
    required_error: "Please select a primary market",
  }),
  interest: z.string({
    required_error: "Please select a service interest",
  }),
  techStack: z.array(z.string()).min(1, "Select at least one tech stack item"),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fading, setFading] = useState(false);

  const closeModal = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        closeModal();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, closeModal]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      primaryMarket: "",
      interest: "",
      techStack: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      const lead = await response.json();
      console.log("Lead created:", lead);

      setShowSuccess(true);
      form.reset();
    } catch (error) {
      alert("Submission failed. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    {showSuccess && (
      <div className={`fixed inset-0 bg-black/95 flex justify-center items-center z-[9999] transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-[#0a0a0a] border border-[#333] p-10 max-w-[500px] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
          <h2 className="text-[#D4AF37] text-xl tracking-[2px] font-bold mb-4">ARCHITECTING YOUR GROWTH...</h2>
          <p className="text-gray-300 mb-8">
            The <strong className="text-white">LNL Automation Engine</strong> has prioritized your inquiry. Your data is being analyzed against our industry benchmarks.
          </p>
          <div className="space-y-5">
            <div className="flex gap-4 text-left">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Step 1: Intake Analysis</strong><br/>Reviewing your tech stack for immediate "leakage."</p>
            </div>
            <div className="flex gap-4 text-left">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Step 2: Auditor Assignment</strong><br/>Preparing your custom 30-minute growth roadmap.</p>
            </div>
            <div className="flex gap-4 text-left">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Step 3: Priority Connection</strong><br/>Check your inbox in &lt; 10 mins for your booking link.</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-full bg-[#D4AF37] text-black font-bold py-4 mt-8 cursor-pointer hover:bg-[#c9a432] transition-colors"
          >
            ACKNOWLEDGED
          </button>
        </div>
      </div>
    )}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="bg-background/50 border-primary/10 focus:border-primary/50 transition-colors" />
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
                  <Input placeholder="john@company.com" {...field} className="bg-background/50 border-primary/10 focus:border-primary/50 transition-colors" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} className="bg-background/50 border-primary/10 focus:border-primary/50 transition-colors" />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background/50 border-primary/10 focus:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select a service package" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Aesthetic Scaling">LNL Creative: Aesthetic Scaling</SelectItem>
                  <SelectItem value="Cinematic Listing Stories">LNL Creative: Cinematic Listing Stories</SelectItem>
                  <SelectItem value="Workflow Architecture">LNL Automations: Workflow Architecture</SelectItem>
                  <SelectItem value="Lead Capture Systems">LNL Automations: Lead Capture Systems</SelectItem>
                  <SelectItem value="Full Ecosystem Buildout">Full Ecosystem Buildout</SelectItem>
                  <SelectItem value="30-Minute Efficiency Audit">30-Minute Efficiency Audit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="primaryMarket"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Market</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50 border-primary/10 focus:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select a market" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="raleigh">Raleigh / Durham, NC</SelectItem>
                    <SelectItem value="columbus">Columbus, OH</SelectItem>
                    <SelectItem value="moscow">Moscow, ID</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                          !field.value || field.value.length === 0 ? "text-muted-foreground" : "text-foreground"
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
                        {["CRM", "Marketing", "Scheduling", "Automation", "Other"].map((group) => (
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
                                      field.onChange(current.filter((v) => v !== tool.value));
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
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-6 rounded-xl transition-all"
          style={{ textRendering: 'geometricPrecision' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Submit Inquiry"
          )}
        </Button>
      </form>
    </Form>
    </>
  );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { auditSchema, stepFields, type AuditFormValues } from "@/lib/auditSchema";
import {
  Step1Identity,
  Step2VisualAuthority,
  Step3CreativeConversion,
  Step4IndustryRouting,
  Step5FinalHook,
} from "./AuditSteps";
import AuditSuccessModal from "./AuditSuccessModal";

interface AuditFormProps {
  initialIndustry?: string;
}

const TOTAL_STEPS = 5;

export default function AuditForm({ initialIndustry }: AuditFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      industry: initialIndustry || "",
      name: "",
      email: "",
      businessName: "",
      competitorReason: "",
      contentHours: "",
      assetScore: "",
      contentLibrary: "",
      leadNextStep: "",
      paidTraffic: "",
      cpl: "",
      industrySpecific: "",
      interest: "",
      primaryMarket: "",
      techStack: [],
      adLink: "",
      additionalNotes: "",
    },
  });

  async function validateCurrentStep(): Promise<boolean> {
    const fields = stepFields[currentStep];
    if (!fields) return true;
    const result = await form.trigger(fields);
    return result;
  }

  async function handleNext() {
    const valid = await validateCurrentStep();
    if (valid && currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  }

  async function onSubmit(values: AuditFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to submit audit");
      setShowSuccess(true);
      form.reset();
      setCurrentStep(1);
    } catch {
      alert("Submission failed. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmitClick() {
    const valid = await validateCurrentStep();
    if (valid) {
      form.handleSubmit(onSubmit)();
    }
  }

  const stepComponent = (() => {
    switch (currentStep) {
      case 1: return <Step1Identity form={form} />;
      case 2: return <Step2VisualAuthority form={form} />;
      case 3: return <Step3CreativeConversion form={form} />;
      case 4: return <Step4IndustryRouting form={form} />;
      case 5: return <Step5FinalHook form={form} />;
      default: return null;
    }
  })();

  return (
    <>
      {showSuccess && (
        <AuditSuccessModal
          industry={form.getValues("industry")}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i + 1 <= currentStep ? "bg-[#D4AF37]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-right">
            Step {currentStep} of {TOTAL_STEPS}
          </p>

          {/* Current step */}
          {stepComponent}

          {/* Navigation */}
          <div className="flex gap-4 pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 border-primary/20 hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#D4AF37] hover:bg-[#c9a432] text-black font-bold py-6"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmitClick}
                disabled={isSubmitting}
                className="flex-1 bg-[#D4AF37] hover:bg-[#c9a432] text-black font-bold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Audit"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

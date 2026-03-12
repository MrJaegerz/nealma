import { cn } from "@/lib/utils";

interface BookingStepperProps {
  currentStep?: number;
}

const steps = [
  "Choisir un soin",
  "Choisir un creneau",
  "Vos coordonnees",
  "Confirmation",
] as const;

export function BookingStepper({ currentStep = 1 }: BookingStepperProps) {
  return (
    <div className="mx-auto mb-10 flex max-w-2xl overflow-hidden rounded-lg border border-nealma-border">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={step}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-r border-nealma-border px-2 py-3 text-xs sm:text-sm last:border-r-0",
              isActive
                ? "bg-nealma-400 font-semibold text-white"
                : isCompleted
                  ? "bg-nealma-50 text-nealma-400"
                  : "bg-nealma-bg text-nealma-text-light"
            )}
          >
            <span className="hidden sm:inline">{stepNumber}.</span> {step}
          </div>
        );
      })}
    </div>
  );
}

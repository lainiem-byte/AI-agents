import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";

interface ProtectedToolboxProps {
  children: React.ReactNode;
  locationName: string;
}

export default function ProtectedToolbox({ children, locationName }: ProtectedToolboxProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#008080]/20"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#008080]/10 mb-6">
            <Lock className="w-8 h-8 text-[#008080]" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            {locationName} Community Outreach Toolbox
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            This internal sales tool is available exclusively for LNL team members. 
            Please sign in to access outreach scripts and community connection resources.
          </p>
          <Button
            onClick={() => window.location.href = "/api/login"}
            className="rounded-full bg-[#008080] hover:bg-[#008080]/90 text-white px-8"
            data-testid="button-login-toolbox"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Team Sign In
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

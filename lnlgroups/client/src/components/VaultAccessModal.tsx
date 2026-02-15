import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VaultAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VaultAccessModal({ isOpen, onClose }: VaultAccessModalProps) {
  const [clientId, setClientId] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    setError("");
    setIsUnlocking(true);

    try {
      const response = await fetch("/api/vault/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, accessKey })
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        if (data.redirectUrl.startsWith("http")) {
          window.open(data.redirectUrl, "_blank");
        } else {
          window.location.href = data.redirectUrl;
        }
        onClose();
        setClientId("");
        setAccessKey("");
      } else {
        setError(data.error || "Invalid credentials. Please verify your Client ID and Access Key.");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleScrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1A1A1D] border border-white/10 text-white p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A86C] via-[#FFD700] to-[#C9A86C]" />
        
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#C9A86C]/10 flex items-center justify-center border border-[#C9A86C]/30">
              <ShieldCheck className="w-8 h-8 text-[#C9A86C]" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Accessing The LNL Vault
          </DialogTitle>
          <p className="text-center text-gray-400 text-sm mt-2">
            Enter your architectural credentials to access your mined assets and system logic.
          </p>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Client Identifier</label>
            <Input
              type="text"
              placeholder="Client Identifier"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A86C]/50 focus:ring-[#C9A86C]/20"
              data-testid="input-client-id"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Secure Access Key</label>
            <Input
              type="password"
              placeholder="Secure Access Key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A86C]/50 focus:ring-[#C9A86C]/20"
              data-testid="input-access-key"
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <Button
            onClick={handleUnlock}
            disabled={!clientId || !accessKey || isUnlocking}
            className="w-full h-12 rounded-full bg-[#C9A86C] hover:bg-[#C9A86C]/90 text-black font-semibold text-base mt-4"
            style={{ boxShadow: '0 0 30px rgba(201, 168, 108, 0.3)' }}
            data-testid="button-unlock-vault"
          >
            {isUnlocking ? (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 animate-pulse" /> Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" /> Unlock Vault
              </span>
            )}
          </Button>

          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              Not a client?{" "}
              <button
                onClick={handleScrollToContact}
                className="text-[#C9A86C] hover:text-[#FFD700] underline underline-offset-2 transition-colors"
                data-testid="link-apply-audit"
              >
                Apply for an Audit to receive your Vault credentials.
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type VaultIndustry = "medspa" | "realtor" | "law" | "home-services";

export interface VaultClient {
  name: string;
  industry: VaultIndustry;
  notionUrl: string;
}

// Industry vault landing pages — clients are redirected here after auth
// New client entries are added by the vault credential generation workflow
export const vaultClients: Record<string, VaultClient> = {
  "DEMO_MEDSPA": {
    name: "Demo Med Spa",
    industry: "medspa",
    notionUrl: "https://www.notion.so/3f5c3ac39e9d44e1b89558c89eb299bb"
  },
  "DEMO_REALTOR": {
    name: "Demo Real Estate",
    industry: "realtor",
    notionUrl: "https://www.notion.so/81c5f71a1492451bb9afa5a95b1bd39f"
  },
  "DEMO_LAW": {
    name: "Demo Law Firm",
    industry: "law",
    notionUrl: "https://www.notion.so/3952b5325c5345d1a972d33e2a54c74b"
  },
  "DEMO_HOME": {
    name: "Demo Home Services",
    industry: "home-services",
    notionUrl: "https://www.notion.so/ef81056d84554e1f9cbdb46a949b6535"
  }
};

export function validateVaultAccess(clientId: string, accessKey: string): VaultClient | null {
  const combinedKey = `${clientId.toUpperCase()}_${accessKey.toUpperCase()}`;
  const directKey = accessKey.toUpperCase();
  
  return vaultClients[combinedKey] || vaultClients[directKey] || null;
}

export type VaultIndustry = "medspa" | "realtor" | "law" | "home-services";

export interface VaultClient {
  name: string;
  industry: VaultIndustry;
  notionUrl: string;
}

export const vaultClients: Record<string, VaultClient> = {
  "RALEIGH_MED": {
    name: "Raleigh Medical",
    industry: "medspa",
    notionUrl: "https://notion.so/PLACEHOLDER_RALEIGH_MED"
  },
  "COLUMBUS_RE": {
    name: "Columbus Real Estate",
    industry: "realtor",
    notionUrl: "https://notion.so/PLACEHOLDER_COLUMBUS_RE"
  },
  "DEMO": {
    name: "Demo Client",
    industry: "medspa",
    notionUrl: ""
  }
};

export function validateVaultAccess(clientId: string, accessKey: string): VaultClient | null {
  const combinedKey = `${clientId.toUpperCase()}_${accessKey.toUpperCase()}`;
  const directKey = accessKey.toUpperCase();
  
  return vaultClients[combinedKey] || vaultClients[directKey] || null;
}

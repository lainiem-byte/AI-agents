export interface VaultClient {
  name: string;
  redirectUrl: string;
}

export const vaultClients: Record<string, VaultClient> = {
  "RALEIGH_MED": {
    name: "Raleigh Medical",
    redirectUrl: "https://drive.google.com/drive/folders/PLACEHOLDER_RALEIGH_MED"
  },
  "COLUMBUS_RE": {
    name: "Columbus Real Estate",
    redirectUrl: "https://notion.so/PLACEHOLDER_COLUMBUS_RE"
  },
  "DEMO": {
    name: "Demo Client",
    redirectUrl: "/portfolio/creatives"
  }
};

export function validateVaultAccess(clientId: string, accessKey: string): VaultClient | null {
  const combinedKey = `${clientId.toUpperCase()}_${accessKey.toUpperCase()}`;
  const directKey = accessKey.toUpperCase();
  
  return vaultClients[combinedKey] || vaultClients[directKey] || null;
}

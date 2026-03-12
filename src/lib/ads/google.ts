const GOOGLE_ADS_API_BASE = "https://googleads.googleapis.com/v17";

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export async function googleAdsFetch(
  customerId: string,
  query: string
) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `${GOOGLE_ADS_API_BASE}/customers/${customerId}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!res.ok) {
    throw new Error(`Google Ads API error: ${res.status}`);
  }

  return res.json();
}

export async function getCampaigns(customerId: string) {
  return googleAdsFetch(
    customerId,
    `SELECT campaign.id, campaign.name, campaign.status,
     metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
     FROM campaign
     WHERE segments.date DURING LAST_30_DAYS
     ORDER BY metrics.impressions DESC`
  );
}

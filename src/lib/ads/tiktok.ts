const TIKTOK_API_BASE = "https://business-api.tiktok.com/open_api/v1.3";

async function tiktokFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${TIKTOK_API_BASE}${path}`, {
    ...options,
    headers: {
      "Access-Token": process.env.TIKTOK_ACCESS_TOKEN!,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`TikTok Ads API error: ${res.status}`);
  }

  return res.json();
}

export async function getCampaigns(advertiserId: string) {
  return tiktokFetch(
    `/campaign/get/?advertiser_id=${advertiserId}&page_size=50`
  );
}

export async function getCampaignMetrics(
  advertiserId: string,
  campaignIds: string[],
  startDate: string,
  endDate: string
) {
  const params = new URLSearchParams({
    advertiser_id: advertiserId,
    report_type: "BASIC",
    data_level: "AUCTION_CAMPAIGN",
    dimensions: '["campaign_id"]',
    metrics:
      '["impressions","clicks","spend","conversions","cpc","cpm","ctr"]',
    start_date: startDate,
    end_date: endDate,
    filtering: JSON.stringify([
      { field_name: "campaign_ids", filter_type: "IN", filter_value: campaignIds },
    ]),
  });

  return tiktokFetch(`/report/integrated/get/?${params}`);
}

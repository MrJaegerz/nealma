"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdsChart } from "@/components/dashboard/ads-chart";

interface Campaign {
  label: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

export default function TikTokAdsPage() {
  const [advertiserId, setAdvertiserId] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCampaigns() {
    if (!advertiserId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/ads/tiktok?advertiserId=${encodeURIComponent(advertiserId)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors du chargement");
        return;
      }

      const list = data?.data?.list || [];
      setCampaigns(
        list.map(
          (c: {
            campaign_name: string;
            metrics: {
              impressions: string;
              clicks: string;
              spend: string;
              conversions: string;
            };
          }) => ({
            label: c.campaign_name,
            impressions: parseInt(c.metrics?.impressions) || 0,
            clicks: parseInt(c.metrics?.clicks) || 0,
            cost: parseFloat(c.metrics?.spend) || 0,
            conversions: parseFloat(c.metrics?.conversions) || 0,
          })
        )
      );
    } catch {
      setError("Impossible de se connecter à TikTok Ads");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        TikTok Ads
      </h1>

      <div className="flex gap-4 items-end mb-8">
        <div className="flex-1 max-w-xs">
          <Label htmlFor="advertiserId">Advertiser ID</Label>
          <Input
            id="advertiserId"
            placeholder="Votre ID annonceur TikTok"
            value={advertiserId}
            onChange={(e) => setAdvertiserId(e.target.value)}
          />
        </div>
        <Button
          onClick={loadCampaigns}
          disabled={loading || !advertiserId}
        >
          {loading ? "Chargement..." : "Charger les campagnes"}
        </Button>
      </div>

      {error && (
        <p className="text-destructive mb-4">{error}</p>
      )}

      {campaigns.length > 0 && (
        <AdsChart data={campaigns} platform="tiktok" />
      )}

      {!loading && campaigns.length === 0 && !error && (
        <p className="text-muted-foreground text-center py-16">
          Entrez votre Advertiser ID pour charger vos campagnes TikTok Ads.
        </p>
      )}
    </div>
  );
}

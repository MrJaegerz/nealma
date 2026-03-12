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

export default function GoogleAdsPage() {
  const [customerId, setCustomerId] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCampaigns() {
    if (!customerId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/ads/google?customerId=${encodeURIComponent(customerId)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors du chargement");
        return;
      }

      const results = data?.[0]?.results || [];
      setCampaigns(
        results.map(
          (r: {
            campaign: { name: string };
            metrics: {
              impressions: string;
              clicks: string;
              costMicros: string;
              conversions: string;
            };
          }) => ({
            label: r.campaign.name,
            impressions: parseInt(r.metrics.impressions) || 0,
            clicks: parseInt(r.metrics.clicks) || 0,
            cost: (parseInt(r.metrics.costMicros) || 0) / 1_000_000,
            conversions: parseFloat(r.metrics.conversions) || 0,
          })
        )
      );
    } catch {
      setError("Impossible de se connecter à Google Ads");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        Google Ads
      </h1>

      <div className="flex gap-4 items-end mb-8">
        <div className="flex-1 max-w-xs">
          <Label htmlFor="customerId">Customer ID</Label>
          <Input
            id="customerId"
            placeholder="123-456-7890"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <Button
          onClick={loadCampaigns}
          disabled={loading || !customerId}
        >
          {loading ? "Chargement..." : "Charger les campagnes"}
        </Button>
      </div>

      {error && (
        <p className="text-destructive mb-4">{error}</p>
      )}

      {campaigns.length > 0 && (
        <AdsChart data={campaigns} platform="google" />
      )}

      {!loading && campaigns.length === 0 && !error && (
        <p className="text-muted-foreground text-center py-16">
          Entrez votre Customer ID pour charger vos campagnes Google Ads.
        </p>
      )}
    </div>
  );
}

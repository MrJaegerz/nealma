"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CampaignMetric {
  label: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

interface AdsChartProps {
  data: CampaignMetric[];
  platform: "google" | "tiktok";
}

const eurFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const numberFormatter = new Intl.NumberFormat("fr-FR");

function computeCTR(clicks: number, impressions: number): string {
  if (impressions === 0) return "0,00 %";
  return ((clicks / impressions) * 100).toFixed(2).replace(".", ",") + " %";
}

function computeCPA(cost: number, conversions: number): string {
  if (conversions === 0) return "\u2014";
  return eurFormatter.format(cost / conversions);
}

export function AdsChart({ data, platform }: AdsChartProps) {
  const totals = data.reduce(
    (acc, row) => ({
      impressions: acc.impressions + row.impressions,
      clicks: acc.clicks + row.clicks,
      cost: acc.cost + row.cost,
      conversions: acc.conversions + row.conversions,
    }),
    { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
  );

  const platformLabel = platform === "google" ? "Google Ads" : "TikTok Ads";

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Campagnes {platformLabel}
      </h3>

      {data.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Aucune donn&eacute;e de campagne disponible.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campagne</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">Clics</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">Co&ucirc;t</TableHead>
              <TableHead className="text-right">Conversions</TableHead>
              <TableHead className="text-right">CPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell className="text-right">
                  {numberFormatter.format(row.impressions)}
                </TableCell>
                <TableCell className="text-right">
                  {numberFormatter.format(row.clicks)}
                </TableCell>
                <TableCell className="text-right">
                  {computeCTR(row.clicks, row.impressions)}
                </TableCell>
                <TableCell className="text-right">
                  {eurFormatter.format(row.cost)}
                </TableCell>
                <TableCell className="text-right">
                  {numberFormatter.format(row.conversions)}
                </TableCell>
                <TableCell className="text-right">
                  {computeCPA(row.cost, row.conversions)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">
                {numberFormatter.format(totals.impressions)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {numberFormatter.format(totals.clicks)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {computeCTR(totals.clicks, totals.impressions)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {eurFormatter.format(totals.cost)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {numberFormatter.format(totals.conversions)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {computeCPA(totals.cost, totals.conversions)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function ServicesChart({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  const total = useMemo(
    () => data.reduce((acc, d) => acc + d.count, 0),
    [data],
  );

  const chartData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        fill: COLORS[i % COLORS.length],
      })),
    [data],
  );

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      count: { label: "R\u00e9servations" },
    };
    data.forEach((d, i) => {
      config[d.name] = {
        label: d.name,
        color: COLORS[i % COLORS.length],
      };
    });
    return config;
  }, [data]);

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-heading">
          R&eacute;partition par service
        </CardTitle>
        <CardDescription>R&eacute;servations par type de service</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px] w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy as number) + 24}
                          className="fill-muted-foreground"
                        >
                          R&eacute;servations
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

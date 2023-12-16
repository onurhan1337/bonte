import { Card, DonutChart, Title } from "@tremor/react";

import { valueFormatter } from "@/lib/utils";

interface DonationsDonutChartProps {
  data: {
    donations: {
      name: string;
      amount: number;
      isAnonymous: boolean;
    }[];
  };
}

export default function DonationsDonutChart({
  data,
}: DonationsDonutChartProps) {
  return (
    <Card className="max-h-[250px]">
      <Title>Donations</Title>
      <DonutChart
        className="mt-6"
        data={data.donations.map((donation) => {
          return {
            name: donation.isAnonymous ? "Anonymous" : donation.name,
            amount: donation.amount,
          };
        })}
        category="amount"
        index="name"
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
}

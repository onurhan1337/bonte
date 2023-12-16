import { Card, List, ListItem, Text, Bold } from "@tremor/react";
import { sliceText, valueFormatter } from "@/lib/utils";

interface TopDonationsListProps {
  foundationAmountPairs: [string, number][];
}

export default function TopDonationsList({
  foundationAmountPairs,
}: TopDonationsListProps) {
  return (
    <Card className="max-h-[250px]">
      <Text>Top Donated Foundations</Text>
      <List className="mt-6 overflow-y-scroll max-h-[160px] px-4">
        {foundationAmountPairs.map(([foundation, amount]) => (
          <ListItem
            key={foundation}
            className="flex flex-col sm:flex-row justify-between items-center"
          >
            <Text>{sliceText(foundation, 30)}</Text>
            <Bold>{valueFormatter(amount)}</Bold>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

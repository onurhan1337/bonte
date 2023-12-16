import useSWR from "swr";
import { useSession } from "next-auth/react";

import fetcher from "../../lib/utils";
import { Donation } from "interfaces";
import Container from "@/components/container";
import DonationTable from "@/components/donation/table";
import { LoadingDots } from "@/components/shared/icons";
import TopDonationsList from "@/components/donation/top-donations-list";
import DonationsDonutChart from "@/components/donation/donut-chart";

type GroupedDonations = {
  [foundation: string]: number;
};

type Data = {
  donations: Donation[];
};

export default function DonationsIndex() {
  const { data: session } = useSession();

  const { data, isValidating } = useSWR<Data>(
    session ? `api/donation/${session.user.id}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  if (!session) {
    return (
      <Container>
        <h1>Donations Index</h1>
        <p>You must be signed in to view this page</p>
      </Container>
    );
  }

  if (isValidating) {
    return (
      <Container>
        <div className="flex items-center justify-center">
          <LoadingDots />
        </div>
      </Container>
    );
  }

  if (data && data.donations && data.donations.length > 0) {
    // Group donations by foundation and sum the amounts
    const groupedDonations = data.donations.reduce<GroupedDonations>(
      (acc, donation) => {
        if (acc[donation.foundation]) {
          acc[donation.foundation] += donation.amount;
        } else {
          acc[donation.foundation] = donation.amount;
        }
        return acc;
      },
      {}
    );

    // Convert the grouped donations object to an array of foundation and amount pairs
    const foundationAmountPairs = Object.entries(groupedDonations);

    return (
      <Container>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
          <div className="col-span-1">
            <DonationsDonutChart data={data} />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <TopDonationsList foundationAmountPairs={foundationAmountPairs} />
          </div>
        </div>
        <DonationTable donations={data.donations} />
      </Container>
    );
  } else {
    return (
      <Container>
        <p>There are no donations</p>
      </Container>
    );
  }
}

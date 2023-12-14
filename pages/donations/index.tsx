import useSWR from "swr";
import fetcher from "../../lib/utils";
import Container from "@/components/container";
import { useSession } from "next-auth/react";
import DonationTable from "@/components/donation/table";
import { Donation } from "interfaces";
import { LoadingDots } from "@/components/shared/icons";

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

  return (
    <Container>
      <div className="pb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Donations
        </h3>
      </div>
      {data && data.donations && data.donations.length > 0 ? (
        <DonationTable donations={data.donations} />
      ) : (
        <p>There are no donations</p>
      )}
    </Container>
  );
}

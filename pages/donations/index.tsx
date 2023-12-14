import useSWR from "swr";
import fetcher, { getUserId } from "../../lib/utils";

export default function DonationsIndex() {

  const { data: donations, error } = useSWR(
    `http://localhost:3001/donation/1`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      <h1>Donations Index</h1>
      <pre>{JSON.stringify(donations, null, 2)}</pre>
    </div>
  );
}

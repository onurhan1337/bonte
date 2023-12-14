import useSWR from "swr";
import fetcher, { getUserId } from "../../lib/utils";
import { useAuth0 } from "@auth0/auth0-react";

export default function DonationsIndex() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  const userId = getUserId(user.sub);

  const { data: donations, error } = useSWR(
    `http://localhost:3001/donation/${userId}`,
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

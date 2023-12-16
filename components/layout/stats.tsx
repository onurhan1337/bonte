import useSWR from "swr";
import fetcher from "../../lib/utils";

interface Stat {
  id: number;
  name: string;
  value: string | number;
}

interface Data {
  totalDonations: number;
  totalDonors: number;
}

export default function StatsSection() {
  const { data } = useSWR<Data>("/api/donation", fetcher);

  if (!data) return null;

  const stats: Stat[] = [
    {
      id: 1,
      name: "Toplam Bağış",
      value: `${data.totalDonations} ₺`,
    },
    {
      id: 2,
      name: "Toplam Bağışçı",
      value: data.totalDonors,
    },
    {
      id: 3,
      name: "Toplam Kuruluş",
      value: 12,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat: Stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

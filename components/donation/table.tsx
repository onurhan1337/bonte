import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Donation } from "interfaces";

const TABLE_HEADERS = [
  "ID",
  "Name",
  "Email",
  "Amount",
  "Anonymous",
  "Foundation",
  "Message",
];

const DonationTable = ({ donations }: { donations: Donation[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent donations.</TableCaption>
      <TableHeader>
        <TableRow>
          {TABLE_HEADERS.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{donation.id}</TableCell>
            <TableCell>{donation.name}</TableCell>
            <TableCell>{donation.email}</TableCell>
            <TableCell>{donation.amount} &#x20BA;</TableCell>
            <TableCell>
              {donation.isAnonymous ? <BadgeOfAnonymous /> : "No"}
            </TableCell>
            <TableCell>{donation.foundation}</TableCell>
            <TableCell>{donation.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DonationTable;

const BadgeOfAnonymous = () => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Anonymous
    </span>
  );
};

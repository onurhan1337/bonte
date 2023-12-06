import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import DonationForm from "./form";

const DonationFormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center py-1.5 px-3 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 text-zinc-50" />
          <p className="ml-2">Bağış Yap</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bağış Yap</DialogTitle>
          <DialogContent>
            <p>Aşağıdaki formu doldurarak bağışta bulunabilirsiniz.</p>
          </DialogContent>
        </DialogHeader>
        <DonationForm />
      </DialogContent>
    </Dialog>
  );
};

export default DonationFormDialog;
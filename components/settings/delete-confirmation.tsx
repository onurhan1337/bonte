import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingDots } from "@/components/shared/icons";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/router";

const DeleteConfirmationDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setOpen(false);

      if (!res.ok) {
        throw new Error("Failed to delete the user");
      }

      if (res.ok) {
        toast({
          title: "Başarılı",
          description: "Hesabınız başarıyla silindi.",
        });

        router.reload();
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
      aria-label="Delete project"
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Hesabı Sil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex w-full items-center justify-between gap-2">
          <XCircleIcon color="#EF4444" size={24} />
          <DialogTitle>
            İşlemi gerçekleştirmek istediğinizden emin misiniz?
          </DialogTitle>
          <DialogDescription>
            Bu işlem geri alınamaz. Bu işlem sonucunda bağış bilgileriniz
            silinecektir.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onDelete} variant={"destructive"} disabled={loading}>
            {loading ? <LoadingDots color="#FFFFFF" /> : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;

import { useSession } from "next-auth/react";

import Container from "@/components/shared/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FoundationCreateForm from "@/components/admin/form";
import AdminFoundationsList from "@/components/admin/list";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <p className="text-center">
          Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.
        </p>
      </div>
    );
  }

  // check if user email is in the admin return true
  const isAdmin = session?.user?.email === "onurhandtr@gmail.com";

  return isAdmin ? (
    <Container>
      <h1 className="text-xl font-normal text-zinc-800">Admin Page</h1>
      <Tabs defaultValue="list">
        <div className="flex w-auto flex-col items-center justify-center py-2">
          <TabsList className="flex w-auto max-w-screen-sm items-center justify-center">
            <TabsTrigger value="create">Kurum Ekle</TabsTrigger>
            <TabsTrigger value="list">Kurum Listesi</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="create">
          <FoundationCreateForm />
        </TabsContent>
        <TabsContent value="list">
          <AdminFoundationsList />
        </TabsContent>
      </Tabs>
    </Container>
  ) : (
    <div>
      <h1>Access Denied</h1>
    </div>
  );
}

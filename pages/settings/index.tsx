import Head from "next/head";
import { useSession } from "next-auth/react";

import Container from "../../components/shared/container";
import DeleteConfirmationDialog from "@/components/settings/delete-confirmation";
import SettingsForm from "@/components/settings/form";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Ayarlar | Bonte</title>
      </Head>

      <Container>
        {session ? (
          <>
            <SettingsForm />
            <AccountDelete userId={session.user.id} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold text-gray-900">
              Kullanıcı bilgilerinizi görüntülemek için <u>giriş yapın.</u>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}

const AccountDelete = ({ userId }: { userId: string }) => {
  return (
    <div className="my-6 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Hesabı Sil
        </h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>
              Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri
              alınamaz. Bu işlem sonucunda bağış bilgileriniz silinecektir.
            </p>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <DeleteConfirmationDialog id={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

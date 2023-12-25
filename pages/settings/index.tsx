import Head from "next/head";
import { useSession } from "next-auth/react";

import Container from "../../components/shared/container";
import AccountDelete from "@/components/settings/delete";
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

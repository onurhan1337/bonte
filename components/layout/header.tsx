import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

import Container from "../shared/container";
import DonationFormDialog from "../donation/dialog";
import { useSignInModal } from "./sign-in-modal";

export default function Header() {
  const { data: session } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <header className="py-6">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="space-x-4">
            <Link href="/">Anasayfa</Link>
            <Link href="/foundations">Kurumlar</Link>
          </div>
          {session ? (
            <div className="flex items-center space-x-4">
              <DonationFormDialog />
              <UserDropdown avatar={session?.user?.image} />
            </div>
          ) : (
            <button
              type="button"
              className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
              onClick={() =>
                setShowSignInModal((showSignInModal) => !showSignInModal)
              }
            >
              Giriş Yap
            </button>
          )}
        </nav>
      </Container>
      <SignInModal />
    </header>
  );
}

const UserDropdown = ({ avatar }: { avatar: string | null | undefined }) => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="py-1.5">
          <img
            src={avatar || "https://i.pravatar.cc/300"}
            width={40}
            height={40}
            className="rounded-full"
            alt="avatar"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm w-full text-left`}
                  onClick={() => router.push("/donations")}
                >
                  Bağışlarım
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm w-full text-left`}
                  onClick={() => router.push("/settings")}
                >
                  Ayarlar
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm w-full text-left`}
                >
                  Çıkış
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

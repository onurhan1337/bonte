import { Fragment } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Container from "../components/container";
import Image from "next/image";

export default function Header() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <header className="py-6">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="space-x-4">
            <Link href="/">Anasayfa</Link>
            <Link href="/foundations">Kurumlar</Link>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="inline-flex items-center py-1.5 px-3 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 text-zinc-50" />
                <Link href="/donate">Bağış Yap</Link>
              </button>
              <UserDropdown avatar={user.picture} />
            </div>
          ) : (
            <button
              type="button"
              className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
              onClick={() =>
                loginWithRedirect({ redirectUri: window.location.origin })
              }
            >
              Log In
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
}

const UserDropdown = ({ avatar }: { avatar: string }) => {
  const { logout } = useAuth0();

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="py-1.5">
          <Image
            src={`/api/avatar?url=${avatar}`}
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
                >
                  Ayarlar
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
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

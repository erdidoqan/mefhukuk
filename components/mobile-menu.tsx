"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function MobileMenu({
  menuItems,
}: {
  menuItems: Array<{ id: string; href: string; scroll: boolean; text: string }>;
}) {
  return (
    <Popover className="relative lg:hidden">
      <Popover.Button className="flex h-full items-center outline-none">
        <Bars3Icon className="h-6 w-6" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -right-4 z-20 mt-5 flex w-screen max-w-max px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-x-6 p-4 hover:bg-gray-50"
                >
                  <div>
                    <Popover.Button
                      as={Link}
                      key={item.id}
                      href={item.href}
                      scroll={item.scroll}
                      className="font-semibold text-gray-900"
                    >
                      {item.text}
                      <span className="absolute inset-0" />
                    </Popover.Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

import * as React from 'react';
import { Transition } from "@headlessui/react";
import clsx from 'clsx';

interface IItemProps {
  set: (id?: number, delay?: number) => void,
  isActive: boolean;
}

export function Item({ set, isActive }: IItemProps) {
  return (
   <div>
          <button
            className="p-3 text-xl"
            onMouseEnter={() => set(1, 150)}
            onClick={() => set(1)}
            onKeyDown={(e) => {
              e.key === "Escape" && set(undefined);
            }}
          >
            <strong>Oferta</strong>
          </button>
          <Transition
            show={isActive}
            as={React.Fragment}
            enter="transition duration-300"
            leave="transition duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                "bg-green-500 absolute w-full left-0 top-0 text-6xl font-bold  p-10 p-10",
                "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
                {
                  "translate-y-32 --z-10": isActive,
                  "translate-y-32 -z-20": !isActive,
                }
              )}
            >
              Oferta menu
              <hr />
              <div className="flex gap-10">
                <a href="">001</a>
                <a href="">002</a>
                <a href="">003</a>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptas officiis recusandae, ex ut totam quam, impedit
                distinctio repellendus provident quisquam voluptatum saepe
                aspernatur dolorem Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Voluptas officiis recusandae, ex ut totam
                quam, impedit distinctio repellendus provident quisquam
                voluptatum saepe aspernatur dolorem Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Voluptas officiis recusandae, ex
                ut totam quam, impedit distinctio repellendus provident quisquam
                voluptatum saepe aspernatur dolorem Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Voluptas officiis recusandae, ex
                ut totam quam, impedit distinctio repellendus provident quisquam
                voluptatum saepe aspernatur dolorem Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Voluptas officiis recusandae, ex
                ut totam quam, impedit distinctio repellendus provident quisquam
                voluptatum saepe aspernatur dolorem
              </p>
            </div>
          </Transition>
        </div>)
}
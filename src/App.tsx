import * as React from "react";
import "./styles.css";
import { clsx } from "clsx";
import { Transition } from "@headlessui/react";
import { useWindowSize } from "./useWindowSize";
import { useValue } from "./useValue";
import { Item } from './Item'

export default function App() {
  const { set, value } = useValue(undefined);
  const { height } = useWindowSize();
  return (
    <div
      className="mx-auto container mb-20 relative text-white"
      onMouseLeave={() => set(undefined, 500)}
      onMouseEnter={() => set(value)}
      style={{
        // @ts-expect-error
        "--menu-window-height": `calc(${height}px - 8rem)`,
      }}
    >
      <div className="h-32 bg-blue-500 w-full flex border">
        <Item isActive={value === 1} set={set} />
        <div>
          <button
            className="p-3 text-xl"
            onMouseEnter={() => set(2, 150)}
            onClick={() => set(2)}
            onKeyDown={(e) => {
              e.key === "Escape" && set(undefined);
            }}
          >
            <strong>Sklep</strong>
          </button>
          <Transition
            show={value === 2}
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
                "bg-pink-500 absolute w-full left-0 top-0 text-6xl font-bold  p-10",
                "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
                {
                  "translate-y-32 --z-10": value === 2,
                  "translate-y-32 -z-20": value !== 2,
                }
              )}
            >
              Sklep menu
              <hr />
              <div className="flex gap-10">
                <a href="">001</a>
                <a href="">002</a>
                <a href="">003</a>
              </div>
            </div>
          </Transition>
        </div>
        <div>
          <button
            className="p-3 text-xl"
            onMouseEnter={() => set(3, 150)}
            onClick={() => set(3)}
            onKeyDown={(e) => {
              e.key === "Escape" && set(undefined);
            }}
          >
            <strong>Kontakt</strong>
          </button>
          <Transition
            show={value === 3}
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
                "bg-green-500 absolute w-full left-0 top-0 text-6xl font-bold p-10",
                "flex orange-col overflow-auto lg:max-h-[var(--menu-window-height)]",
                {
                  "translate-y-32 --z-10": value === 3,
                  "translate-y-32 -z-20": value !== 3,
                }
              )}
            >
              Kontakt menu
              <hr />
              <div className="flex gap-10">
                <a href="">001</a>
                <a href="">002</a>
                <a href="">003</a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

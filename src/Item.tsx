import * as React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

interface IItemProps {
  id: number;
  set: (id?: number, delay?: number) => void;
  isActive: boolean;
  title: string;
}

export const Item = React.memo(
  React.forwardRef<HTMLButtonElement, React.PropsWithChildren<IItemProps>>(
    ItemComponent
  )
);

function ItemComponent(
  { id, set, isActive, title, children }: React.PropsWithChildren<IItemProps>,
  forwardRef: React.RefAttributes<HTMLButtonElement>["ref"]
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const beforeLeave = React.useCallback(() => {
    if (ref.current) {
      ref.current.querySelectorAll("a").forEach((el) => {
        el.setAttribute("tabindex", "-1");
      });
    }
  }, []);

  React.useEffect(() => {});

  return (
    <div>
      <button
        ref={forwardRef}
        className="p-3 text-xl"
        onMouseEnter={() => set(id, 150)}
        onClick={() => set(id)}
        onKeyDown={(e) => {
          e.key === "Escape" && set(undefined);
        }}
      >
        <strong>{title}</strong>
      </button>
      <Transition
        show={isActive}
        as={React.Fragment}
        enter="transition duration-300"
        leave="transition duration-500"
        beforeLeave={beforeLeave}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={ref}
          className={clsx(
            "bg-green-500 absolute w-full left-0 top-0 text-6xl font-bold  p-10 p-10",
            "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
            {
              "translate-y-24 --z-10": isActive,
              "translate-y-24 -z-20": !isActive,
            }
          )}
        >
          {children}
        </div>
      </Transition>
    </div>
  );
}

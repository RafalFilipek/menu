import * as React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { getTabbableCandidates } from "./getTabbableCandidates";

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
  forwardRef: React.ForwardedRef<HTMLButtonElement>
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const makeNodesNotTabbable = React.useCallback(() => {
    if (ref.current) {
      for (const node of getTabbableCandidates(ref.current)) {
        node.setAttribute("tabindex", "-1");
      }
    }
  }, []);

  React.useEffect(() => {});

  return (
    <div>
      <button
        ref={forwardRef}
        className="p-3 text-xl text-left block w-full sm:inline-block"
        onMouseEnter={() => set(id, 150)}
        onClick={() => set(id)}
      >
        <strong>{title}</strong>
      </button>
      <Transition
        show={isActive}
        as={React.Fragment}
        enter="transition-all duration-300 max-h-0 overflow-hidden"
        leave="transition-all duration-300 max-h-[500px]"
        enterFrom="sm:opacity-0 max-h-0"
        enterTo="sm:opacity-100 max-h-[500px]"
        leaveFrom="sm:opacity-100 max-h-[500px]"
        leaveTo="sm:opacity-0 max-h-0"
        beforeLeave={makeNodesNotTabbable}
      >
        <div
          ref={ref}
          className={clsx(
            "bg-green-500 sm:absolute w-full left-0 top-0 text-6xl font-bold p-10 ",
            "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
            {
              "sm:translate-y-24 z-10": isActive,
              "sm:translate-y-24 z-20": !isActive,
            }
          )}
        >
          {children}
        </div>
      </Transition>
    </div>
  );
}

import * as React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { getTabbableCandidates } from "./getTabbableCandidates";
import { SHOW_ANIMATION_DELAY } from "./consts";
import { INavigationItemProps } from "./types";

export const Item = React.memo(
  React.forwardRef<
    HTMLButtonElement,
    React.PropsWithChildren<INavigationItemProps>
  >(ItemComponent)
);

function ItemComponent(
  {
    id,
    setActive,
    abortActivation,
    isActive,
    title,
    children,
    sections,
  }: React.PropsWithChildren<INavigationItemProps>,
  forwardRef: React.ForwardedRef<HTMLButtonElement>
) {
  // We store reference to the div that contains the menu items
  // We need this to manage tabbable nodes inside the submenu
  const ref = React.useRef<HTMLDivElement>(null);

  // This function makes all tabbable nodes inside the submenu unfocusable
  // We call it before the submenu is hidden
  const makeNodesNotTabbable = React.useCallback(() => {
    if (ref.current) {
      for (const node of getTabbableCandidates(ref.current)) {
        node.setAttribute("tabindex", "-1");
      }
    }
  }, []);

  return (
    <div>
      <button
        ref={forwardRef}
        className="p-3 text-xl text-left block w-full sm:inline-block"
        // onMouseEnter we want to show the submenu after a delay
        onMouseEnter={() => setActive(id, SHOW_ANIMATION_DELAY)}
        // onMouseLeave we want to abort current activation
        // This allows user to move between menu items without submenu being shown
        onMouseLeave={() => {
          abortActivation();
        }}
        // onClick we toggle the submenu immediately
        onClick={() => (isActive ? setActive(undefined) : setActive(id))}
      >
        <strong>{title}</strong>
      </button>
      {/**
       * We use Transition component to show/hide the submenu
       * Inside `enter`, `leave` etc. props we can specify CSS classes
       * that will be applied to the submenu when it is shown/hidden
       *
       * Cool part is that we can apply different classes for different screen sizes
       */}
      <Transition
        show={isActive}
        as={React.Fragment}
        enter="sm:transition-all sm:duration-300 overflow-hidden"
        leave="sm:transition-all sm:duration-300"
        enterFrom="sm:opacity-0"
        enterTo="sm:opacity-100"
        leaveFrom="sm:opacity-100"
        leaveTo="sm:opacity-0"
        beforeLeave={makeNodesNotTabbable}
      >
        <div
          ref={ref}
          className={clsx(
            "bg-green-500 sm:absolute w-full left-0 top-0 text-6xl font-bold p-10 ",
            "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
            // @this can probably be simplified by moving the logic to the parent component
            {
              "sm:translate-y-24 z-10": isActive,
              "sm:translate-y-24 z-20": !isActive,
            }
          )}
        >
          {sections.map((section, index) => {
            return (
              <div key={index}>
                <h2>{section.title}</h2>
                {section.columns.map((column, index) => {
                  return (
                    <div key={index} className="border">
                      {column.map((item, index) => {
                        return (
                          <a key={index} href={item.title}>
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Transition>
    </div>
  );
}

import * as React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { getTabbableCandidates } from "./getTabbableCandidates";
import { SHOW_ANIMATION_DELAY } from "./consts";
import { INavigationItemProps } from "./types";
import { GlobeIcon } from "lucide-react";
import { Section } from "./Section";

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
    type,
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

  const [activeSectionId, setActiveSectionId] = React.useState<
    string | undefined
  >();

  return (
    <div
      className={clsx({ "sm:hidden": type === "MOBILE_EXCLUSIVE_EXPANDER" })}
    >
      <button
        ref={forwardRef}
        className="p-3 text-left block w-full sm:inline-block group-[.navigation-white]:text-black"
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
        leave="sm:transition-all sm:duration-500"
        enterFrom="sm:opacity-0"
        enterTo="sm:opacity-100"
        leaveFrom="sm:opacity-100"
        leaveTo="sm:opacity-0"
        beforeLeave={makeNodesNotTabbable}
      >
        <div
          ref={ref}
          className={clsx(
            "bg-white text-black w-full flex flex-wrap flex-col overflow-auto",
            "sm:absolute sm:left-0 sm:top-full sm:flex-row sm:max-h-[var(--menu-window-height)]"
          )}
        >
          {sections.map((section, index) => {
            return (
              <Section
                id={section.id}
                isActive={section.id === activeSectionId}
                setSection={setActiveSectionId}
                key={index}
                title={section.title}
                columns={section.columns}
              />
            );
          })}
        </div>
      </Transition>
    </div>
  );
}

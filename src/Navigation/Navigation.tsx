import * as React from "react";
import { useWindowSize } from "./useWindowSize";
import { useDelayValue } from "./useDelayValue";
import { Item } from "./Item";
import {
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
  GlobeIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { HIDE_ANIMATION_DELAY_ON_MOUSE_OUTSIDE } from "./consts";
import { INavigationProps } from "./types";

export function Navigation({ menu, sideMenu, theme }: INavigationProps) {
  const {
    set,
    value: activeSubmenuId,
    cancel,
  } = useDelayValue<string | undefined>(undefined);
  /**
   * We need window height to calculate the max height of the submenu.
   * This value will be passed to the submenu as a CSS variable.
   */
  const { height } = useWindowSize();

  /**
   * On mobile, we want to manually control the expanded state of the submenu.
   * This state is ignored on desktop as we set css classes only for mobile.
   */
  const [isExpanded, setIsExpanded] = React.useState(false);

  /**
   * In order to manage focus, we need to store a ref to each menu item.
   * This refs will point to the button that opens the submenu.
   */
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | undefined>>(
    {}
  );

  /**
   * We want to close the submenu when the user presses the escape key.
   * This effect adds a keyup event listener to the document and closes the submenu
   * when the escape key is pressed.
   */
  React.useEffect(() => {
    function callback(event: KeyboardEvent) {
      if (
        event.code !== "Escape" ||
        activeSubmenuId === undefined ||
        !itemRefs.current
      ) {
        return;
      }
      const currentButton = itemRefs.current[activeSubmenuId];
      if (currentButton) {
        currentButton.focus();
      }
      set(undefined, 0);
    }
    document.addEventListener("keyup", callback);
    return () => {
      document.removeEventListener("keyup", callback);
    };
  }, [activeSubmenuId, set]);

  return (
    <div
      className={clsx(
        "mx-auto container relative text-white group flex flex-col sm:flex-row",
        {
          "navigation-black bg-black text-white": theme === "BLACK",
          "navigation-white bg-white text-black": theme === "WHITE",
        }
      )}
      // We want to close the submenu when the user moves outside of navigation.
      // We use a delay to prevent the submenu from closing when the user moves back
      onMouseLeave={() => set(undefined, HIDE_ANIMATION_DELAY_ON_MOUSE_OUTSIDE)}
      // If user moves back to the navigation, we want to restore current submenu (if exists).
      onMouseEnter={() => set(activeSubmenuId)}
      // We pass the window height to the submenu as a CSS variable. This way we can
      // minimize the number of re-renders and props drilling.
      style={{
        // @ts-expect-error --menu-window-height is a custom CSS variable
        "--menu-window-height": `calc(${height}px - 8rem)`,
      }}
    >
      {/**
       * This element is only visible on mobile. It contains a button that opens the submenu.
       */}
      <div
        className="
          flex justify-end p-2 sm:hidden bg-blue-500

        "
      >
        <button onClick={() => setIsExpanded((v) => !v)}>
          <MenuIcon />
        </button>
      </div>
      <div
        className={clsx(
          {
            hidden: !isExpanded,
          },
          "py-5 sm:h-24 w-full sm:flex bg-green-500"
        )}
      >
        {menu.map((item) => {
          if (item.type === "LINK") {
            return (
              <a key={item.id} href={item.href}>
                {item.title}
              </a>
            );
          }
          return (
            <Item
              key={item.id}
              type={item.type}
              id={item.id}
              isActive={activeSubmenuId === item.id}
              setActive={set}
              abortActivation={cancel}
              title={item.title}
              sections={item.items}
              ref={(ref) => {
                if (ref) {
                  itemRefs.current[item.id] = ref;
                }
              }}
            />
          );
        })}
      </div>
      <div className="hidden sm:flex justify-end p-2 bg-blue-500">
        {sideMenu.map((item, index) => {
          if (item.type === "LINK") {
            return (
              <a key={index} href={item.href}>
                <GlobeIcon />
              </a>
            );
          }
          if (item.type === "SEARCH") {
            return <SearchIcon key={index} />;
          }
          if (item.type === "CART") {
            return <ShoppingCartIcon key={index} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

import * as React from "react";
import { useWindowSize } from "./useWindowSize";
import { useDelayValue } from "./useDelayValue";
import { Item } from "./Item";
import { MenuIcon } from "lucide-react";
import { clsx } from "clsx";
import { HIDE_ANIMATION_DELAY_ON_MOUSE_OUTSIDE } from "./consts";
import { INavigationProps } from "./types";

export function Navigation({ menu }: INavigationProps) {
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
  const [isExpanded, setIsExpanded] = React.useState(true);

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
      className="mx-auto container mb-20 relative text-white"
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
      <div className="bg-blue-500 flex justify-end p-2 sm:hidden">
        <button onClick={() => setIsExpanded((v) => !v)}>
          <MenuIcon />
        </button>
      </div>
      <div
        className={clsx(
          {
            hidden: !isExpanded,
          },
          "py-5 sm:h-24 bg-blue-500 w-full sm:flex"
        )}
      >
        {menu.map((item) => {
          return (
            <Item
              id={item.id}
              isActive={activeSubmenuId === item.id}
              setActive={set}
              abortActivation={cancel}
              title={item.title}
              ref={(ref) => {
                if (ref) {
                  itemRefs.current[item.id] = ref;
                }
              }}
            >
              wait {item.id}
            </Item>
          );
        })}
      </div>
    </div>
  );
}

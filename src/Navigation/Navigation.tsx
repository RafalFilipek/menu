import * as React from "react";
import { useDelayValue } from "./useDelayValue";
import { MenuIcon } from "lucide-react";

import { INavigationProps } from "./types";
import { SideMenu } from "./SideMenu";
import { Menu } from "./Menu";
import { NavigationContainer } from "./NavigationContainer";

export function Navigation({ menu, sideMenu, theme }: INavigationProps) {
  const {
    set,
    value: activeSubmenuId,
    cancel,
  } = useDelayValue<string | undefined>(undefined);

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

  const setMenuItemRef = React.useCallback(
    (id: string, ref: HTMLButtonElement | null) => {
      if (ref) {
        itemRefs.current[id] = ref;
      }
    },
    []
  );

  return (
    <NavigationContainer
      activeSubmenuId={activeSubmenuId}
      set={set}
      theme={theme}
    >
      {/**
       * This element is only visible on mobile. It contains a button that opens the submenu.
       */}
      <div className="flex justify-end p-2 sm:hidden">
        <button onClick={() => setIsExpanded((v) => !v)}>
          <MenuIcon />
        </button>
      </div>
      <Menu
        items={menu}
        isExpanded={isExpanded}
        activeSubmenuId={activeSubmenuId}
        cancel={cancel}
        set={set}
        setRef={setMenuItemRef}
      />
      <SideMenu items={sideMenu} />
    </NavigationContainer>
  );
}

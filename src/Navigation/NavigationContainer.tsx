import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import { HIDE_ANIMATION_DELAY_ON_MOUSE_OUTSIDE } from "./consts";
import { INavigationContainerProps } from "./types";
import { useWindowSize } from "./useWindowSize";

export function NavigationContainer({
  children,
  theme,
  activeSubmenuId,
  setIsExpanded,
  set,
}: React.PropsWithChildren<INavigationContainerProps>) {
  /**
   * We need window height to calculate the max height of the submenu.
   * This value will be passed to the submenu as a CSS variable.
   */
  const { height } = useWindowSize();

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
      <div className="flex justify-end p-2 sm:hidden">
        <button onClick={() => setIsExpanded((v) => !v)}>
          <MenuIcon />
        </button>
      </div>
      {children}
    </div>
  );
}

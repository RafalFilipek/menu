import {
  UseDelayCancelValueFunction,
  UseDelayValueSetFunction,
} from "./useDelayValue";

/**
 * Single item in a navigation section
 */
interface INavigationSectionItem {
  title: string;
  href: string;
  badge?: { title: string };
  iconType?: string;
}

/**
 * Navigation section
 */
interface INavigationSection {
  title?: string;
  columns: INavigationSectionItem[][];
}

/**
 * Navigation item that can be represented as a link or as an expander
 * with a list of sections.
 */
type INavigationItem =
  | { type: "LINK"; id: string; title: string; href: string }
  | {
      type: "EXPANDER";
      id: string;
      title: string;
      items: INavigationSection[];
    }
  | {
      type: "MOBILE_EXCLUSIVE_EXPANDER";
      id: string;
      title: string;
      items: INavigationSection[];
    };

/**
 * This type contains the items that are shown on the right side of the navigation
 */
type INavigationSideItem =
  | { type: "SEARCH"; iconType: string }
  | { type: "CART"; iconType: string }
  | { type: "LINK"; href: string; title: string; iconType: string };

// === PROPS ===

export interface INavigationItemProps {
  id: string;
  setActive: UseDelayValueSetFunction;
  abortActivation: () => void;
  isActive: boolean;
  title: string;
  sections: INavigationSection[];
  type: "EXPANDER" | "MOBILE_EXCLUSIVE_EXPANDER";
}

type ITheme = "BLACK" | "WHITE";

export interface INavigationProps {
  currentMarket: string;
  markets: { id: string; title: string }[];
  menu: INavigationItem[];
  sideMenu: INavigationSideItem[];
  theme: ITheme;
}

export interface INavigationContainerProps {
  theme: ITheme;
  set: UseDelayValueSetFunction;
  activeSubmenuId: string | undefined;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface INavigationMenuProps {
  isExpanded: boolean;
  activeSubmenuId: string | undefined;
  items: INavigationItem[];
  set: UseDelayValueSetFunction;
  cancel: UseDelayCancelValueFunction;
  setRef: (id: string, ref: HTMLButtonElement | null) => void;
}

export interface INavigationSideMenuProps {
  items: INavigationSideItem[];
  menuRef: React.RefObject<HTMLDivElement>;
}

import * as React from "react";
import { Divide, GlobeIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { INavigationSideMenuProps } from "./types";
import clsx from "clsx";

interface INavigationSideBarSearchItemProps {
  menuRef: React.RefObject<HTMLDivElement>;
}

function SearchItem(props: INavigationSideBarSearchItemProps) {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const toggle = React.useCallback(() => {
    if (isSearchVisible) {
      setIsSearchVisible(false);
    } else {
      setIsSearchVisible(true);
      recalculateSearchPosition();
    }
  }, [props.menuRef, isSearchVisible]);

  const recalculateSearchPosition = React.useCallback(() => {
    if (isSearchVisible) {
      return;
    }
    requestAnimationFrame(() => {
      const searchEl = searchRef.current;
      const menuEl = props.menuRef.current;
      if (searchEl && menuEl) {
        searchEl.style.setProperty(
          "--navigation-menu-container-width",
          menuEl.getBoundingClientRect().width + "px"
        );
        searchEl.style.setProperty(
          "--navigation-menu-container-left",
          menuEl.offsetLeft + "px"
        );
      }
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", recalculateSearchPosition);

    return () => {
      window.removeEventListener("resize", recalculateSearchPosition);
    };
  }, []);

  return (
    <>
      <div
        ref={searchRef}
        className={clsx(
          {
            hidden: !isSearchVisible,
          },
          "min-h-full absolute bg-red-500 overflow-hidden",
          "w-[var(--navigation-menu-container-width)]",
          "top-0",
          "left-[var(--navigation-menu-container-left)]"
        )}
      >
        {isSearchVisible && (
          <div>
            search <button onClick={toggle}>x</button>
            <div className="h-32 w-full p-2 bg-blue-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
              iste inventore repudiandae quam ipsum doloremque sit? Odio
              maiores, est facere voluptatem repellat maxime, natus quasi illo
              rem at possimus doloribus.
            </div>
          </div>
        )}
      </div>

      <SearchIcon onClick={toggle} />
    </>
  );
}

export function SideMenu({ items, menuRef }: INavigationSideMenuProps) {
  return (
    <div className="hidden sm:flex justify-end gap-2">
      {items.map((item, index) => {
        if (item.type === "LINK") {
          return (
            <a key={index} href={item.href}>
              <GlobeIcon />
            </a>
          );
        }
        if (item.type === "SEARCH") {
          return <SearchItem key={index} menuRef={menuRef} />;
        }
        if (item.type === "CART") {
          return <ShoppingCartIcon key={index} />;
        }
        return null;
      })}
    </div>
  );
}

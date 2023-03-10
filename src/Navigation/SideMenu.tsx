import { GlobeIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { INavigationSideMenuProps } from "./types";

export function SideMenu({ items }: INavigationSideMenuProps) {
  return (
    <div className="hidden sm:flex justify-end p-2">
      {items.map((item, index) => {
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
  );
}

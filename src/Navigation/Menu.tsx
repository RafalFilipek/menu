import * as React from "react";
import clsx from "clsx";
import { Item } from "./Item";
import { INavigationMenuProps } from "./types";

export const Menu = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<INavigationMenuProps>
>(function MenuComponent(
  { isExpanded, items, activeSubmenuId, set, cancel, setRef, children },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        {
          hidden: !isExpanded,
        },
        "py-5 sm:h-24 w-full sm:flex"
      )}
    >
      <div className={clsx("border-green-500 border-2 sm:flex w-full")}>
        {items.map((item) => {
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
              ref={(ref) => setRef(item.id, ref)}
            />
          );
        })}
      </div>
      <div>{children}</div>
    </div>
  );
});

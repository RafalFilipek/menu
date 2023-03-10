import clsx from "clsx";
import { Item } from "./Item";
import { INavigationMenuProps } from "./types";

export function Menu({
  isExpanded,
  items,
  activeSubmenuId,
  set,
  cancel,
  setRef,
}: INavigationMenuProps) {
  return (
    <div
      className={clsx(
        {
          hidden: !isExpanded,
        },
        "py-5 sm:h-24 w-full sm:flex "
      )}
    >
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
  );
}

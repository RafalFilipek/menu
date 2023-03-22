import clsx from "clsx";
import { GlobeIcon } from "lucide-react";
import { INavigationMenuSectionProps } from "./types";

export function Section({
  columns,
  title,
  setSection,
  isActive,
  id,
}: INavigationMenuSectionProps) {
  const columnsCount = columns.length;

  return (
    <div
      className={clsx("relative", {
        "sm:w-1/4": columnsCount == 1,
        "sm:w-2/4": columnsCount == 2,
        "sm:w-3/4": columnsCount == 3,
        "sm:w-full": columnsCount == 4,
      })}
    >
      <h2
        className={clsx("font-bold border-b border-gray-400 mt-6", {
          "sm:w-full": columnsCount == 1,
          "sm:w-1/2": columnsCount == 2,
          "sm:w-1/3": columnsCount == 3,
          "sm:w-1/4": columnsCount == 4,
        })}
      >
        <button
          onClick={() => setSection(id)}
          className="absolute sm:hidden inset-0"
        ></button>
        {title}
      </h2>
      <div
        className={clsx("sm:flex flex-col sm:flex-row sm:gap-5 pb-10", {
          hidden: !isActive,
        })}
      >
        {columns.map((column, index) => {
          return (
            <ul key={index} className="w-full">
              {column.map((item, index) => {
                return (
                  <li key={index} className="flex gap-2">
                    {item.iconType && <GlobeIcon />}
                    <a href={item.title}>{item.title}</a>
                    {item.badge && (
                      <span className="bg-yellow-200 rounded-lg">
                        {item.badge.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

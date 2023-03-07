import "./styles.css";
import * as React from "react";
import { useWindowSize } from "./useWindowSize";
import { useValue } from "./useValue";
import { Item } from "./Item";
import { Menu } from "lucide-react";
import { clsx } from "clsx";

export default function App() {
  const { set, value } = useValue(undefined);
  const { height } = useWindowSize();
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div
      className="mx-auto container mb-20 relative text-white"
      onMouseLeave={() => set(undefined, 500)}
      onMouseEnter={() => set(value)}
      style={{
        // @ts-expect-error
        "--menu-window-height": `calc(${height}px - 8rem)`,
      }}
    >
      <div className="bg-blue-500 flex justify-end p-2 sm:hidden">
        <button onClick={() => setIsExpanded((v) => !v)}>
          <Menu />
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
        <Item
          id={1}
          isActive={value === 1}
          set={set}
          title="Oferta"
          ref={(ref) => {
            console.log(ref);
          }}
        >
          <div className="flex gap-5 flex-wrap">
            <a href="#">001</a>
            <a href="#">002</a>
            <a href="#">003</a>
            <a href="#">001</a>
            <a href="#">002</a>
            <a href="#">003</a>
            <a href="#">001</a>
            <a href="#">002</a>
            <a href="#">003</a>
            <a href="#">001</a>
            <a href="#">002</a>
            <a href="#">003</a>
          </div>
        </Item>
        <Item id={2} isActive={value === 2} set={set} title="Sklep">
          <div className="flex gap-5">
            <a href="#">004</a>
            <a href="#">005</a>
            <a href="#">006</a>
          </div>
        </Item>
        <Item id={3} isActive={value === 3} set={set} title="Kontat">
          <div className="flex gap-5">
            <a href="#">007</a>
            <a href="#">008</a>
            <a href="#">009</a>
          </div>
        </Item>
      </div>
    </div>
  );
}

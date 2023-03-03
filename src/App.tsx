import * as React from "react";
import "./styles.css";
import { clsx } from "clsx";
import { Transition } from "@headlessui/react";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });
  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function useValue(value: any) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  const timeoutId = React.useRef<number | undefined>(undefined);
  const set = React.useCallback((value: any, delay?: number) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (delay === undefined) {
      setDebouncedValue(value);
      return;
    }

    timeoutId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [timeoutId]);

  return {
    value: debouncedValue,
    set,
  };
}

export default function App() {
  const { set, value } = useValue(undefined);
  const { height } = useWindowSize();
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
      <div className="h-32 bg-blue-500 w-full flex border">
        <div>
          <button onMouseEnter={() => set(1, 150)} onClick={() => set(1)}>
            <strong>Oferta</strong>
          </button>
          <Transition
            show={value === 1}
            as={React.Fragment}
            enter="transition duration-300"
            leave="transition duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                "bg-green-500 absolute w-full left-0 top-0 text-6xl font-bold",
                "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
                {
                  "translate-y-32 --z-10": value === 1,
                  "translate-y-32 -z-20": value !== 1,
                }
              )}
            >
              Oferta menu
              <hr />
              <div className="flex gap-10">
                <a href="">001</a>
                <a href="">002</a>
                <a href="">003</a>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptas officiis recusandae, ex ut totam quam, impedit
                distinctio repellendus provident quisquam voluptatum saepe
                aspernatur dolorem
              </p>
            </div>
          </Transition>
        </div>
        <div>
          <button onMouseEnter={() => set(2, 150)} onClick={() => set(2)}>
            <strong>Sklep</strong>
          </button>
          <Transition
            show={value === 2}
            as={React.Fragment}
            enter="transition duration-300"
            leave="transition duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                "bg-pink-500 absolute w-full left-0 top-0 text-6xl font-bold",
                "flex flex-col overflow-auto lg:max-h-[var(--menu-window-height)]",
                {
                  "translate-y-32 --z-10": value === 2,
                  "translate-y-32 -z-20": value !== 2,
                }
              )}
            >
              Sklep menu
              <hr />
              <div className="flex gap-10">
                <a href="">001</a>
                <a href="">002</a>
                <a href="">003</a>
              </div>
            </div>
          </Transition>
        </div>
        <div>
          <button onMouseEnter={() => set(3, 150)} onClick={() => set(3)}>
            <strong>Kontakt</strong>
          </button>
          <Transition
            show={value === 3}
            as={React.Fragment}
            enter="transition duration-300"
            leave="transition duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                "bg-green-500 absolute w-full left-0 top-0 text-6xl font-bold",
                "flex orange-col overflow-auto lg:max-h-[var(--menu-window-height)]",
                {
                  "translate-y-32 --z-10": value === 3,
                  "translate-y-32 -z-20": value !== 3,
                }
              )}
            >
              Kontakt menu
              <hr />
              <div className="flex gap-10">
                <a href="">001</a>
                <a href="">002</a>
                <a href="">003</a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

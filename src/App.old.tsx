import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  Cake,
  Phone,
  Car,
  Album,
  Camera,
  Chrome,
} from "lucide-react";
import { Transition } from "@headlessui/react";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import "./styles.css";

const machine = createMachine(
  {
    predictableActionArguments: true,
    initial: "collapsed",
    tsTypes: {} as import("./App.typegen").Typegen0,
    schema: {
      context: {} as { activeId?: number },
      events: {} as
        | { type: "OPEN"; id: number }
        | { type: "CLOSE" }
        | { type: "READY" },
    },
    context: {
      activeId: undefined,
    },
    tags: [],
    states: {
      collapsed: {
        on: {
          OPEN: {
            target: "opening",
            actions: ["setActiveElement"],
          },
        },
      },
      opening: {
        tags: ["animate"],
        on: {
          READY: {
            target: "expanded",
          },
          CLOSE: {
            target: "closing",
            actions: ["setActiveElement"],
          },
          OPEN: {
            target: "switching",
            actions: ["setActiveElement"],
          },
        },
      },
      switching: {
        on: {
          CLOSE: {
            target: "closing",
            actions: ["setActiveElement"],
          },
          OPEN: {
            actions: ["setActiveElement"],
          },
          READY: {
            target: "expanded",
          },
        },
      },
      closing: {
        tags: ["animate"],
        on: {
          READY: {
            target: "collapsed",
          },
          OPEN: {
            target: "opening",
            actions: ["setActiveElement"],
          },
        },
      },
      expanded: {
        on: {
          OPEN: {
            target: "switching",
            actions: ["setActiveElement"],
          },
          CLOSE: {
            target: "closing",
            actions: ["setActiveElement"],
          },
        },
      },
    },
  },
  {
    actions: {
      setActiveElement: assign({
        activeId: (_, event) => {
          if (event.type === "OPEN") {
            return event.id;
          }
          if (event.type === "CLOSE") {
            return undefined;
          }
        },
      }),
    },
  }
);

function Market() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className="relative">
      {isExpanded && (
        <div className="fixed inset-0 bg-black opacity-10 top-20" />
      )}
      <button
        className="flex px-2.5 flex-row gap-2.5 items-center h-10 z-1"
        onClick={() => setIsExpanded((v) => !v)}
      >
        <strong>Klient Indywiduany</strong>{" "}
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isExpanded && (
        <>
          <div className="absolute text-black bg-white">
            <ul className="font-bold">
              <li className="h-10 p-2 border-b border-gray-300">Firmy</li>
              <li className="h-10 p-2 border-b border-gray-300">
                Duże Firmy i Instytucje
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

interface IMenuItemProps {
  title: string;
  id: number;
  onClick: (id: number) => void;
  afterEnter: () => void;
  afterLeave: () => void;
  isActive: boolean;
  animateEnter: boolean;
  animateLeave: boolean;
}

function MenuItem({
  afterEnter,
  afterLeave,
  title,
  isActive,
  onClick,
  id,
  animateEnter,
  animateLeave,
}: IMenuItemProps) {
  return (
    <div
      style={{
        // @ts-expect-error
        "--animate-duration-enter": animateEnter ? "150" : "0ms",
        "--animate-delay-enter": animateEnter ? "150" : "0ms",
        "--animate-duration-leave": animateLeave ? "150" : "0ms",
        "--animate-delay-leave": animateLeave ? "150" : "0ms",
      }}
    >
      <button
        className="h-20 outline"
        onFocus={() => {
          onClick(id);
        }}
        onMouseEnter={() => {
          onClick(id);
        }}
      >
        <strong>{title}</strong>
      </button>

      <Transition
        appear={true}
        as={React.Fragment}
        afterEnter={afterEnter}
        afterLeave={afterLeave}
        show={isActive}
        enter="transform transition delay-[var(--animate-delay-enter)] duration-[var(--animate-duration-enter)]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform delay-[var(--animate-delay-leave)] duration-[var(--animate-duration-leave)] transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute left-0 right-0 text-black bg-gray-200">
          <div className="container mx-auto flex p-4">
            {id}
            {id < 3 && (
              <>
                <button autoFocus className="focus:text-red-500">
                  <Cake className="w-20 h-20 stroke-current" />
                </button>
                <button className="focus:text-red-500">
                  <Phone className="w-20 h-20" />
                </button>
                <button className="focus:text-red-500">
                  <Car className="w-20 h-20" />
                </button>
              </>
            )}
            {id > 2 && (
              <>
                <button autoFocus className="focus:text-red-500">
                  <Album className="w-20 h-20" />
                </button>
                <button className="focus:text-red-500">
                  <Camera className="w-20 h-20" />
                </button>
                <button className="focus:text-red-500">
                  <Chrome className="w-20 h-20" />
                </button>
              </>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
}

function Menu() {
  const [{ context, value, tags }, send] = useMachine(machine);
  // const [activeId, setActiveId] = React.useState<undefined | number>();

  const { activeId } = context;

  // console.log("active", activeId);

  console.log(context, value);

  const onItemClick = React.useCallback(
    (id: number) => {
      // console.log("onItemClick", activeId, id);
      send({ type: "OPEN", id });
    },
    [activeId]
  );

  const onHide = React.useCallback(() => {
    // console.log("onHide");
    send({ type: "CLOSE" });
  }, []);

  const onStateChangeReady = React.useCallback(() => {
    // console.log("onHide");
    send({ type: "READY" });
  }, []);

  return (
    <div className="flex outline-red-500" onPointerLeave={onHide}>
      <MenuItem
        animateEnter={tags.has("animate")}
        animateLeave={tags.has("animate")}
        title="Oferta"
        id={1}
        isActive={activeId === 1}
        onClick={onItemClick}
        afterEnter={onStateChangeReady}
        afterLeave={onStateChangeReady}
      />
      <MenuItem
        animateEnter={tags.has("animate")}
        animateLeave={tags.has("animate")}
        title="Sklep"
        id={2}
        isActive={activeId === 2}
        onClick={onItemClick}
        afterEnter={onStateChangeReady}
        afterLeave={onStateChangeReady}
      />
      <MenuItem
        animateEnter={tags.has("animate")}
        animateLeave={tags.has("animate")}
        title="Pomoc"
        id={3}
        isActive={activeId === 3}
        onClick={onItemClick}
        afterEnter={onStateChangeReady}
        afterLeave={onStateChangeReady}
      />
      <MenuItem
        animateEnter={tags.has("animate")}
        animateLeave={tags.has("animate")}
        title="Kontakt"
        id={4}
        isActive={activeId === 4}
        onClick={onItemClick}
        afterEnter={onStateChangeReady}
        afterLeave={onStateChangeReady}
      />
    </div>
  );
}

function Header() {
  return (
    <nav
      style={{
        // @ts-expect-error
        "--container-max-width": "1280px",
      }}
    >
      <div
        className="
        bg-whtie text-black
        dark:bg-black dark:text-white
        soutline
        mx-auto max-w-[var(--container-max-width)]
        flex flex-row px-5 gap-5 items-center
        h-20
      "
      >
        <div className="logo">
          <img
            src="https://orange.binaries.pl/binaries/o/map/ak/html/pwa_logo/Master_Logo_RGB.svg"
            className="contain"
            alt="Logo Orange.pl"
            width={40}
          />
        </div>
        {/* <Market /> */}
        <Menu />
      </div>
    </nav>
  );
}

function Test() {
  const [count, setCount] = React.useState(2);

  return (
    <div
      className="transition-[height] max-h-52 border"
      onClick={() => {
        setCount((i) => i + 1);
      }}
    >
      {Array.from({ length: count })
        .fill(0)
        .map((_, i) => {
          return (
            <div key={i}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur beatae repellendus ad, accusamus perferendis dolorem
              ipsa earum commodi quod quos, nemo cumque dolorum ducimus, ipsum
              quasi. Laboriosam expedita voluptate architecto?
            </div>
          );
        })}
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col gap-40">
      <div className="dark">
        <Header />
        {/* <Test /> */}
      </div>
      {/* <div>
        <Header />
      </div> */}
    </div>
  );
}

interface INavigationSectionItem {
  title: string;
  badge?: { title: string };
}

interface INavigationSection {
  title?: string;
  columns: INavigationSectionItem[][];
}

type INavigationItem =
  | { type: "LINK"; id: string; title: string; href: string }
  | {
      type: "EXPANDER";
      id: string;
      title: string;
      items: INavigationSection[];
    };

export interface INavigationProps {
  currentMarket: string;
  markets: { id: string; title: string }[];
  menu: INavigationItem[];
}

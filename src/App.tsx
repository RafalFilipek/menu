import "./styles.css";
import { Navigation } from "./Navigation/Navigation";

const navigationProps: React.ComponentProps<typeof Navigation> = {
  currentMarket: "B2C",
  markets: [
    {
      id: "B2C",
      title: "Klient Indywidualny",
    },
    {
      id: "SOHO",
      title: "Firmy",
    },
    {
      id: "KORPO",
      title: "Duże Firmy i Instytucje",
    },
  ],
  menu: [
    { type: "EXPANDER", id: "OfertaNode", title: "Oferta", items: [] },
    { type: "LINK", id: "SklepNode", title: "Sklep", href: "/sklep" },
  ],
};

export default function App() {
  return <Navigation {...navigationProps} />;
}

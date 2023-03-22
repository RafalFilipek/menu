import "./styles.css";
import { Navigation } from "./Navigation/Navigation";

const navigationProps: React.ComponentProps<typeof Navigation> = {
  currentMarket: "B2C",
  theme: "BLACK",
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
    {
      type: "EXPANDER",
      id: "OfertaNode",
      title: "Oferta",
      items: [
        {
          id: "a",
          title: "Abonament komórkowy",
          columns: [
            [
              {
                id: "a",
                title: "Plany komórkowe",
                href: "/plany-komorkow",
                badge: { title: "hello" },
              },
              {
                id: "b",
                title: "Nowy numer",
                href: "/nowy-numer",
                iconType: "lol",
              },
              { id: "c", title: "Przeduż umowę", href: "/przedluz-umowe" },
              { id: "d", title: "Przenieś numer", href: "/przenies-numer" },
            ],
          ],
        },
      ],
    },
    {
      type: "EXPANDER",
      id: "SklepNode",
      title: "Sklep",
      items: [
        {
          id: "a",
          title: "Telefony i urządzenia",
          columns: [
            [
              {
                id: "a",
                title: "Smartfony z abonamentem",
                href: "/smartfony-z-abonamentem",
              },
              {
                id: "b",
                title: "Smartfony bez abonamentu",
                href: "/smartfony-bez-abonamentu",
              },
              {
                id: "c",
                title: "Outlet",
                href: "/outlet",
              },
              {
                id: "d",
                title: "Laptopy i konsole ",
                href: "/laptopy-i-konsole",
              },
              {
                id: "e",
                title: "Modemy i routery",
                href: "/modemy-i-routery",
              },
            ],
            [
              {
                id: "a",
                title: "Smartwatche i smartbandy ",
                href: "/smartwatche-i-smartbandy",
              },
              { id: "b", title: "Urządzenia smart", href: "/urządzenia-smart" },
              {
                id: "c",
                title: "Telewizory i audio ",
                href: "/telewizory-i-audio",
              },
              {
                id: "d",
                title: "Pojazdy elektryczne",
                href: "/pojazdy-elektryczne",
              },
              { id: "e", title: "Porównywarka", href: "/porównywarka" },
            ],
          ],
        },
        {
          id: "b",
          title: "Akcesoria",
          columns: [
            [
              { id: "a", title: "Słuchawki", href: "/słuchawki" },
              {
                id: "b",
                title: "Głośniki Bluetooth",
                href: "/Głośniki Bluetooth",
              },
              { id: "c", title: "Etui na telefon", href: "/Etui na telefon" },
              { id: "d", title: "Szkła ochronne", href: "/Szkła ochronne" },
              {
                id: "e",
                title: "Wszystkie akcesoria",
                href: "/Wszystkie akcesoria",
              },
            ],
          ],
        },
        {
          id: "c",
          title: "Strefa marek",
          columns: [
            [
              { id: "a", title: "Samsung", href: "/Samsung" },
              { id: "b", title: "Apple", href: "/Apple" },
              { id: "c", title: "Xiaomi", href: "/Xiaomi" },
              { id: "d", title: "Realme", href: "/Realme" },
              { id: "e", title: "Oppo", href: "/Oppo" },
            ],
          ],
        },
        {
          id: "d",
          title: "Telefony i urządzenia",
          columns: [
            [
              {
                id: "a",
                title: "Smartfony z abonamentem",
                href: "/smartfony-z-abonamentem",
              },
              {
                id: "b",
                title: "Smartfony bez abonamentu",
                href: "/smartfony-bez-abonamentu",
              },
              { id: "c", title: "Outlet", href: "/outlet" },
              {
                id: "d",
                title: "Laptopy i konsole ",
                href: "/laptopy-i-konsole",
              },
              { id: "e", title: "Modemy i routery", href: "/modemy-i-routery" },
            ],
            [
              {
                id: "a",
                title: "Smartwatche i smartbandy ",
                href: "/smartwatche-i-smartbandy",
              },
              { id: "b", title: "Urządzenia smart", href: "/urządzenia-smart" },
              {
                id: "c",
                title: "Telewizory i audio ",
                href: "/telewizory-i-audio",
              },
              {
                id: "d",
                title: "Pojazdy elektryczne",
                href: "/pojazdy-elektryczne",
              },
              { id: "e", title: "Porównywarka", href: "/porównywarka" },
            ],
          ],
        },
        {
          id: "e",
          title: "Akcesoria",
          columns: [
            [
              { id: "a", title: "Słuchawki", href: "/słuchawki" },
              {
                id: "b",
                title: "Głośniki Bluetooth",
                href: "/Głośniki Bluetooth",
              },
              { id: "c", title: "Etui na telefon", href: "/Etui na telefon" },
              { id: "d", title: "Szkła ochronne", href: "/Szkła ochronne" },
              {
                id: "e",
                title: "Wszystkie akcesoria",
                href: "/Wszystkie akcesoria",
              },
            ],
          ],
        },
        {
          id: "f",
          title: "Strefa marek",
          columns: [
            [
              { id: "a", title: "Samsung", href: "/Samsung" },
              { id: "b", title: "Apple", href: "/Apple" },
              { id: "c", title: "Xiaomi", href: "/Xiaomi" },
              { id: "d", title: "Realme", href: "/Realme" },
              { id: "e", title: "Oppo", href: "/Oppo" },
            ],
          ],
        },
      ],
    },
    { type: "LINK", id: "KontaktNode", title: "Kontakt", href: "/kontakt" },
    {
      type: "MOBILE_EXCLUSIVE_EXPANDER",
      id: "OfertaMobileNode",
      title: "Mobile exclusive",
      items: [
        {
          id: "a",
          title: "Abonament komórkowy",
          columns: [
            [
              {
                id: "a",
                title: "Plany komórkowe",
                href: "/plany-komorkowe ",
                iconType: "globe",
              },
              {
                id: "b",
                title: "Nowy numer",
                href: "/nowy-numer",
                iconType: "globe",
              },
              {
                id: "c",
                title: "Przeduż umowę",
                href: "/przedluz-umowe",
                iconType: "globe",
              },
              {
                id: "d",
                title: "Przenieś numer",
                href: "/przenies-numer",
                iconType: "globe",
              },
            ],
          ],
        },
      ],
    },
  ],
  sideMenu: [
    { type: "SEARCH", iconType: "search" },
    { type: "LINK", href: "/link", title: "link", iconType: "globe" },
  ],
};

export default function App() {
  return (
    <>
      <div className="mb-20 p-2">
        <Navigation {...navigationProps} theme="BLACK" />
        <img
          className="container mx-auto"
          src="https://www.orange.pl/medias/sys_master/root/images/h8f/hdd/12326283706398/kv-desktop-0603.jpg"
        />
      </div>
      <div className="p-2">
        <Navigation {...navigationProps} theme="WHITE" />
        <img
          className="container mx-auto"
          src="https://www.orange.pl/medias/sys_master/root/images/h8f/hdd/12326283706398/kv-desktop-0603.jpg"
        />
      </div>
    </>
  );
}

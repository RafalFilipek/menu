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
          title: "Abonament komórkowy",
          columns: [
            [
              {
                title: "Plany komórkowe",
                href: "/plany-komorkow",
                badge: { title: "hello" },
              },
              { title: "Nowy numer", href: "/nowy-numer", iconType: "lol" },
              { title: "Przeduż umowę", href: "/przedluz-umowe" },
              { title: "Przenieś numer", href: "/przenies-numer" },
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
          title: "Telefony i urządzenia",
          columns: [
            [
              {
                title: "Smartfony z abonamentem",
                href: "/smartfony-z-abonamentem",
              },
              {
                title: "Smartfony bez abonamentu",
                href: "/smartfony-bez-abonamentu",
              },
              { title: "Outlet", href: "/outlet" },
              { title: "Laptopy i konsole ", href: "/laptopy-i-konsole" },
              { title: "Modemy i routery", href: "/modemy-i-routery" },
            ],
            [
              {
                title: "Smartwatche i smartbandy ",
                href: "/smartwatche-i-smartbandy",
              },
              { title: "Urządzenia smart", href: "/urządzenia-smart" },
              { title: "Telewizory i audio ", href: "/telewizory-i-audio" },
              { title: "Pojazdy elektryczne", href: "/pojazdy-elektryczne" },
              { title: "Porównywarka", href: "/porównywarka" },
            ],
          ],
        },
        {
          title: "Akcesoria",
          columns: [
            [
              { title: "Słuchawki", href: "/słuchawki" },
              { title: "Głośniki Bluetooth", href: "/Głośniki Bluetooth" },
              { title: "Etui na telefon", href: "/Etui na telefon" },
              { title: "Szkła ochronne", href: "/Szkła ochronne" },
              { title: "Wszystkie akcesoria", href: "/Wszystkie akcesoria" },
            ],
          ],
        },
        {
          title: "Strefa marek",
          columns: [
            [
              { title: "Samsung", href: "/Samsung" },
              { title: "Apple", href: "/Apple" },
              { title: "Xiaomi", href: "/Xiaomi" },
              { title: "Realme", href: "/Realme" },
              { title: "Oppo", href: "/Oppo" },
            ],
          ],
        },
        {
          title: "Telefony i urządzenia",
          columns: [
            [
              {
                title: "Smartfony z abonamentem",
                href: "/smartfony-z-abonamentem",
              },
              {
                title: "Smartfony bez abonamentu",
                href: "/smartfony-bez-abonamentu",
              },
              { title: "Outlet", href: "/outlet" },
              { title: "Laptopy i konsole ", href: "/laptopy-i-konsole" },
              { title: "Modemy i routery", href: "/modemy-i-routery" },
            ],
            [
              {
                title: "Smartwatche i smartbandy ",
                href: "/smartwatche-i-smartbandy",
              },
              { title: "Urządzenia smart", href: "/urządzenia-smart" },
              { title: "Telewizory i audio ", href: "/telewizory-i-audio" },
              { title: "Pojazdy elektryczne", href: "/pojazdy-elektryczne" },
              { title: "Porównywarka", href: "/porównywarka" },
            ],
          ],
        },
        {
          title: "Akcesoria",
          columns: [
            [
              { title: "Słuchawki", href: "/słuchawki" },
              { title: "Głośniki Bluetooth", href: "/Głośniki Bluetooth" },
              { title: "Etui na telefon", href: "/Etui na telefon" },
              { title: "Szkła ochronne", href: "/Szkła ochronne" },
              { title: "Wszystkie akcesoria", href: "/Wszystkie akcesoria" },
            ],
          ],
        },
        {
          title: "Strefa marek",
          columns: [
            [
              { title: "Samsung", href: "/Samsung" },
              { title: "Apple", href: "/Apple" },
              { title: "Xiaomi", href: "/Xiaomi" },
              { title: "Realme", href: "/Realme" },
              { title: "Oppo", href: "/Oppo" },
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
          title: "Abonament komórkowy",
          columns: [
            [
              {
                title: "Plany komórkowe",
                href: "/plany-komorkowe ",
                iconType: "globe",
              },
              { title: "Nowy numer", href: "/nowy-numer", iconType: "globe" },
              {
                title: "Przeduż umowę",
                href: "/przedluz-umowe",
                iconType: "globe",
              },
              {
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

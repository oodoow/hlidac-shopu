/**
 * @typedef { import("./types").ItemDetails } ItemDetails
 * @typedef { import("./types").ShopDefinition } ShopDefinition
 * @typedef { import("./types").ShopParams } ShopParams
 */

/**
 * Lookup of supported Shops
 * @type {Map<string, ShopDefinition>}
 */
export const shops = new Map([
  [
    "aaaauto",
    {
      name: "AAAAuto.cz",
      currency: "CZK",
      logo: "aaaauto_logo",
      url: "https://www.aaaauto.cz/",
      viewBox: "0 0 99 20",
      parse(url) {
        return {
          itemId: url.searchParams.get("id"),
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "aaaauto_sk",
    {
      name: "AAAAuto.sk",
      currency: "EUR",
      logo: "aaaauto_sk_logo",
      url: "https://www.aaaauto.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.searchParams.get("id"),
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "alza",
    {
      name: "Alza.cz",
      currency: "CZK",
      logo: "alza_logo",
      url: "https://www.alza.cz/",
      viewBox: "0 0 60 19",
      parse(url) {
        return {
          itemId:
            url.pathname.match(/d(\d+)\./)?.[1] ?? url.searchParams?.get("dq"),
          itemUrl:
            url.pathname
              .substr(1)
              .match(/[^/]+$/)?.[0]
              .replace(".htm", "") ?? url.pathname.substr(1)
        };
      }
    }
  ],
  [
    "alza_sk",
    {
      name: "Alza.sk",
      currency: "EUR",
      logo: "alza_sk_logo",
      url: "https://www.alza.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId:
            url.pathname.match(/d(\d+)\./)?.[1] ?? url.searchParams?.get("dq"),
          itemUrl:
            url.pathname
              .substr(1)
              .match(/[^/]+$/)?.[0]
              .replace(".htm", "") ?? url.pathname.substr(1)
        };
      }
    }
  ],
  [
    "benu",
    {
      name: "Benu.cz",
      currency: "CZK",
      logo: "benu_logo",
      url: "https://www.benu.cz/",
      viewBox: "0 0 67 18",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "czc",
    {
      name: "CZC.cz",
      currency: "CZK",
      logo: "czc_logo",
      url: "https://www.czc.cz/",
      viewBox: "0 0 55 13",
      parse(url) {
        return {
          itemId: url.pathname.match(/\/(\d+)a?\//)?.[1].replace("a", ""),
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "datart",
    {
      name: "Datart.cz",
      currency: "CZK",
      logo: "datart_logo",
      url: "https://www.datart.cz/",
      viewBox: "0 0 98 13",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).match(/([^/]+)\.html$/)?.[1]
        };
      }
    }
  ],
  [
    "datart_sk",
    {
      name: "Datart.sk",
      currency: "EUR",
      logo: "datart_sk_logo",
      url: "https://www.datart.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).match(/([^/]+)\.html$/)?.[1]
        };
      }
    }
  ],
  [
    "dm",
    {
      key: "dm_cz",
      name: "DM.cz",
      currency: "CZK",
      logo: "dm_cz_logo",
      url: "https://www.dm.cz/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-p(\d+)\.html$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "dm_sk",
    {
      name: "DM.sk",
      currency: "EUR",
      logo: "dm_sk_logo",
      url: "https://www.dm.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-p(\d+)\.html$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "dm_de",
    {
      name: "DM.de",
      currency: "EUR",
      logo: "dm_de_logo",
      url: "https://www.dm.de/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-p(\d+)\.html$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "dm_at",
    {
      name: "DM.at",
      currency: "EUR",
      logo: "dm_at_logo",
      url: "https://www.dm.at/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-p(\d+)\.html$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "dm_pl",
    {
      name: "DM.pl",
      currency: "PLN",
      logo: "dm_pl_logo",
      url: "https://www.dm.pl/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-p(\d+)\.html$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "dm_hu",
    {
      name: "DM.hu",
      currency: "HUF",
      logo: "dm_hu_logo",
      url: "https://www.dm.hu/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-p(\d+)\.html$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "iglobus",
    {
      key: "globus_cz",
      name: "iGlobus.cz",
      currency: "CZK",
      logo: "iglobus_logo",
      url: "https://www.iglobus.cz/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl:
            url.hash.match(/#(.+)/)?.[1] ??
            url.pathname.match(/\/[^/]+\/([^/]+)$/)?.[1]
        };
      }
    }
  ],
  [
    "itesco",
    {
      name: "iTesco.cz",
      currency: "CZK",
      logo: "itesco_logo",
      url: "https://www.itesco.cz/",
      viewBox: "0 0 55 18",
      parse(url) {
        return {
          itemId: url.pathname.match(/(\d+)$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "itesco_sk",
    {
      name: "iTesco.sk",
      currency: "EUR",
      logo: "itesco_sk_logo",
      url: "https://www.itesco.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/(\d+)$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "kasa",
    {
      name: "Kasa.cz",
      currency: "CZK",
      logo: "kasa_logo",
      url: "https://www.kasa.cz/",
      viewBox: "0 0 70 18",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "kosik",
    {
      name: "Košík.cz",
      currency: "CZK",
      logo: "kosik_logo",
      url: "https://www.kosik.cz/",
      viewBox: "0 0 71 22",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/[^/]+$/)?.[0]
        };
      }
    }
  ],
  [
    "lekarna",
    {
      name: "Lékárna.cz",
      currency: "CZK",
      logo: "lekarna_logo",
      url: "https://www.lekarna.cz/",
      viewBox: "0 0 79 20",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).match(/(?:[^/]+\/)?([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "mall",
    {
      name: "Mall.cz",
      currency: "CZK",
      logo: "mall_logo",
      url: "https://www.mall.cz/",
      viewBox: "0 0 68 19",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).match(/[^/]+$/)?.[0]
        };
      }
    }
  ],
  [
    "mall_sk",
    {
      name: "Mall.sk",
      currency: "EUR",
      logo: "mall_sk_logo",
      url: "https://www.mall.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).match(/[^/]+$/)?.[0]
        };
      }
    }
  ],
  [
    "mironet",
    {
      name: "Mironet.cz",
      currency: "CZK",
      logo: "mironet_logo",
      url: "https://www.mironet.cz/",
      viewBox: "0 0 59 20",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.replace(/\//g, "")
        };
      }
    }
  ],
  [
    "mountfield",
    {
      name: "Mountfield.cz",
      currency: "CZK",
      logo: "mountfield_logo",
      url: "https://www.mountfield.cz/",
      viewBox: "0 0 64 11",
      parse(url) {
        return {
          itemId: url.pathname.match(/-([^-]+)$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "mountfield_sk",
    {
      name: "Mountfield.sk",
      currency: "EUR",
      logo: "mountfield_sk_logo",
      url: "https://www.mountfield.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: url.pathname.match(/-([^-]+)$/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "notino",
    {
      name: "Notino.cz",
      currency: "CZK",
      logo: "notino_logo",
      url: "https://www.notino.cz/",
      viewBox: "0 0 68 13",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).replace(/\//g, "")?.[1]
        };
      }
    }
  ],
  [
    "notino_sk",
    {
      name: "Notino.sk",
      currency: "EUR",
      logo: "notino_sk_logo",
      url: "https://www.notino.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.substr(1).replace(/\//g, "")?.[1]
        };
      }
    }
  ],
  [
    "okay",
    {
      name: "Okay.cz",
      currency: "CZK",
      logo: "okay_logo",
      url: "https://www.okay.cz/",
      viewBox: "0 0 53 20",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "okay_sk",
    {
      name: "Okay.sk",
      currency: "EUR",
      logo: "okay_sk_logo",
      url: "https://www.okay.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "pilulka",
    {
      name: "Pilulka.cz",
      currency: "CZK",
      logo: "pilulka_logo",
      url: "https://www.pilulka.cz/",
      viewBox: "0 0 86 20",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "pilulka_sk",
    {
      name: "Pilulka.sk",
      currency: "EUR",
      logo: "pilulka_sk_logo",
      url: "https://www.pilulka.sk/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "prozdravi",
    {
      name: "Prozdraví.cz",
      currency: "CZK",
      logo: "prozdravi_logo",
      url: "https://www.prozdravi.cz/",
      viewBox: "0 0 91 20",
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "rohlik",
    {
      name: "Rohlík.cz",
      currency: "CZK",
      logo: "rohlik_logo",
      url: "https://www.rohlik.cz/",
      viewBox: "0 0 51 28",
      parse(url) {
        return {
          itemId:
            url.searchParams.get("productPopup")?.match(/^(\d+)/)?.[1] ??
            url.pathname.substr(1).match(/^(\d+)/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ],
  [
    "sleky",
    {
      name: "sLéky.cz",
      currency: "CZK",
      logo: "sleky_logo",
      url: "https://www.sleky.cz/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.match(/\/([^/]+)/)?.[1]
        };
      }
    }
  ],
  [
    "tetadrogerie",
    {
      key: "teta_cz",
      name: "Teta Drogerie",
      currency: "CZK",
      logo: "teta_cz_logo",
      url: "https://www.tetadrogerie.cz/",
      viewBox: null,
      parse(url) {
        return {
          itemId: null,
          itemUrl: url.pathname.replace("/eshop/katalog/", "")
        };
      }
    }
  ],
  [
    "tsbohemia",
    {
      name: "TSBohemia.cz",
      currency: "CZK",
      logo: "tsbohemia_logo",
      url: "https://www.tsbohemia.cz/",
      viewBox: "0 0 115 15",
      parse(url) {
        return {
          itemId: url.pathname.match(/d(\d+)\.html/)?.[1],
          get itemUrl() {
            return this.itemId;
          }
        };
      }
    }
  ]
]);

/**
 * Gets supported Shops as array of tuples of key and shop definition
 * @return {[string, ShopDefinition][]}
 */
export function shopsEntriesArray() {
  return Array.from(shops.entries());
}

export function shopsArray() {
  return Array.from(shops.values());
}

/**
 * Creates internal name representation for lookups and DB key composition.
 * @param {string} s URL like string
 * @returns {string}
 */
export function shopName(s) {
  const url = new URL(s);
  const domainParts = url.host.split(".");
  const domain = domainParts.pop();
  const shopName = domainParts.pop();
  return domain !== "cz" ? `${shopName}_${domain}` : shopName;
}

/**
 * @param {string} detailUrl
 * @returns {ItemDetails | null}
 */
export function parseItemDetails(detailUrl) {
  const name = shopName(detailUrl);
  let shop = shops.get(name);
  if (!shop) return null;
  const { key, currency, name: title, parse } = shop;
  return { key: key ?? name, title, currency, ...parse(new URL(detailUrl)) };
}

/**
 * @param {ShopParams} params
 * @returns {string}
 */
export function shopHost(params) {
  const url = new URL(decodeURIComponent(params?.url));
  return url.hostname;
}

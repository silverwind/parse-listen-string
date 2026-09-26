import {isIP} from "node:net";

export type ParseListenStringResult = {
  host?: string,
  port?: number,
  proto?: string,
  path?: string,
};

export function parseListenString(str: string | number): ParseListenStringResult | null {
  if (!str) {
    return null;
  }

  str = String(str);

  if (str.startsWith("unix:")) {
    return {path: str.substring("unix:".length), proto: "http"};
  } else if (str.startsWith("http+unix:")) {
    return {path: str.substring("http+unix:".length), proto: "http"};
  } else if (str.startsWith("https+unix:")) {
    return {path: str.substring("https+unix:".length), proto: "https"};
  } else if (str.startsWith("http://unix:")) {
    return {path: str.substring("http://unix:".length), proto: "http"};
  } else if (str.startsWith("https://unix:")) {
    return {path: str.substring("https://unix:".length), proto: "https"};
  }

  let proto = "http";
  if (str.startsWith("http://")) {
    str = str.substring("http://".length);
  } else if (str.startsWith("https://")) {
    proto = "https";
    str = str.substring("https://".length);
  }

  if (/^[0-9]+$/.test(str)) {
    return {host: "::", port: Number(str), proto};
  }

  let port = proto === "https" ? 443 : 80;
  if (isIP(str)) return {host: str, port, proto};

  const host = str.replace(/:[0-9]+$/, "").replace(/^\[/, "").replace(/\]$/, "");
  if (!isIP(host)) return null;

  const portNum = Number(str.substring(str.lastIndexOf(":") + 1));
  if (portNum >= 0) port = portNum;
  return {host, port, proto};
}

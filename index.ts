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

  if (typeof str === "number") {
    str = String(str);
  }

  // unix:/tmp/ssu.socket
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

  let proto: string = "http";
  if (str.startsWith("http://")) {
    str = str.substring("http://".length);
  } else if (str.startsWith("https://")) {
    proto = "https";
    str = str.substring("https://".length);
  }

  // <port>
  if (/^[0-9]+$/.test(str)) {
    return {host: "::", port: Number(str), proto};
  }

  let host: string;
  if (!isIP(str)) {
    host = str.replace(/:[0-9]+$/, "").replace(/^\[/, "").replace(/\]$/, "");
  } else {
    host = str.replace(/^\[/, "").replace(/\]$/, "");
  }

  // host must be an ip address at this point
  if (!isIP(host)) return null;

  // <ip>:<port>
  let port: number = proto === "https" ? 443 : 80;
  if (str !== host) {
    const portNum = Number(str.substring(str.lastIndexOf(":") + 1));
    if (typeof portNum === "number" && portNum >= 0) port = portNum;
  }

  return {host, port, proto};
}

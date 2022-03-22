import {isIP} from "is-ip";

export function parseListenString(str) {
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
    return {path: str.substring("https+unix:".length), proto: "http"};
  }

  let proto = "http";
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

  let host;
  if (!isIP(str)) {
    host = str.replace(/:[0-9]+$/, "").replace(/^\[/, "").replace(/\]$/, "");
  } else {
    host = str.replace(/^\[/, "").replace(/\]$/, "");
  }

  // host must be an ip address at this point
  if (!isIP(host)) return null;

  if (str !== host) {
    const port = Number(str.substring(str.lastIndexOf(":") + 1));
    if (port >= 0) {
      return {host, port, proto};
    }
  }

  return {host, port: proto === "https" ? 443 : 80, proto};
}

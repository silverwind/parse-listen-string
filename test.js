import {parseListenString} from "./index.js";

test("parseListenString", () => {
  expect(parseListenString("unix:/tmp/service.socket")).toEqual({path: "/tmp/service.socket", proto: "http"});
  expect(parseListenString("http+unix:/tmp/service.socket")).toEqual({path: "/tmp/service.socket", proto: "http"});
  expect(parseListenString("https+unix:/tmp/service.socket")).toEqual({path: "/tmp/service.socket", proto: "https"});
  expect(parseListenString(80)).toEqual({host: "::", port: 80, proto: "http"});
  expect(parseListenString("80")).toEqual({host: "::", port: 80, proto: "http"});
  expect(parseListenString("::1")).toEqual({host: "::1", port: 80, proto: "http"});
  expect(parseListenString("[::1]")).toEqual({host: "::1", port: 80, proto: "http"});
  expect(parseListenString("[::]:80")).toEqual({host: "::", port: 80, proto: "http"});
  expect(parseListenString("[::1]:80")).toEqual({host: "::1", port: 80, proto: "http"});
  expect(parseListenString("0.0.0.0:80")).toEqual({host: "0.0.0.0", port: 80, proto: "http"});
  expect(parseListenString("1.2.3.4:80")).toEqual({host: "1.2.3.4", port: 80, proto: "http"});

  expect(parseListenString("http://0.0.0.0")).toEqual({host: "0.0.0.0", port: 80, proto: "http"});
  expect(parseListenString("http://0.0.0.0:80")).toEqual({host: "0.0.0.0", port: 80, proto: "http"});
  expect(parseListenString("http://[::]")).toEqual({host: "::", port: 80, proto: "http"});
  expect(parseListenString("http://[::]:80")).toEqual({host: "::", port: 80, proto: "http"});
  expect(parseListenString("http://[::1]:80")).toEqual({host: "::1", port: 80, proto: "http"});
  expect(parseListenString("http://0.0.0.0")).toEqual({host: "0.0.0.0", port: 80, proto: "http"});
  expect(parseListenString("http://0.0.0.0:80")).toEqual({host: "0.0.0.0", port: 80, proto: "http"});
  expect(parseListenString("http://1.2.3.4")).toEqual({host: "1.2.3.4", port: 80, proto: "http"});
  expect(parseListenString("http://1.2.3.4:80")).toEqual({host: "1.2.3.4", port: 80, proto: "http"});

  expect(parseListenString("https://0.0.0.0")).toEqual({host: "0.0.0.0", port: 443, proto: "https"});
  expect(parseListenString("https://0.0.0.0:443")).toEqual({host: "0.0.0.0", port: 443, proto: "https"});
  expect(parseListenString("https://[::]")).toEqual({host: "::", port: 443, proto: "https"});
  expect(parseListenString("https://[::]:443")).toEqual({host: "::", port: 443, proto: "https"});
  expect(parseListenString("https://[::1]:443")).toEqual({host: "::1", port: 443, proto: "https"});
  expect(parseListenString("https://0.0.0.0")).toEqual({host: "0.0.0.0", port: 443, proto: "https"});
  expect(parseListenString("https://0.0.0.0:443")).toEqual({host: "0.0.0.0", port: 443, proto: "https"});
  expect(parseListenString("https://1.2.3.4")).toEqual({host: "1.2.3.4", port: 443, proto: "https"});
  expect(parseListenString("https://1.2.3.4:443")).toEqual({host: "1.2.3.4", port: 443, proto: "https"});

  expect(parseListenString()).toEqual(null);
  expect(parseListenString("")).toEqual(null);
  expect(parseListenString("0.0.0.0::443")).toEqual(null);
  expect(parseListenString("256.0.0.0:443")).toEqual(null);
  expect(parseListenString("256.0.0.0:443")).toEqual(null);
  expect(parseListenString(":::1:443")).toEqual(null);
  expect(parseListenString("::10000:443")).toEqual(null);
});

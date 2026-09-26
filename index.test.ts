import {parseListenString} from "./index.ts";

test("parseListenString", () => {
  for (const [expected, inputs] of [
    [{path: "/tmp/service.socket", proto: "http"}, ["unix:/tmp/service.socket", "http+unix:/tmp/service.socket", "http://unix:/tmp/service.socket"]],
    [{path: "/tmp/service.socket", proto: "https"}, ["https+unix:/tmp/service.socket"]],
    [{host: "::", port: 80, proto: "http"}, [80, "80", "[::]:80", "http://[::]", "http://[::]:80"]],
    [{host: "::1", port: 80, proto: "http"}, ["::1", "[::1]", "[::1]:80", "http://[::1]:80"]],
    [{host: "0.0.0.0", port: 80, proto: "http"}, ["0.0.0.0:80", "http://0.0.0.0", "http://0.0.0.0:80"]],
    [{host: "1.2.3.4", port: 80, proto: "http"}, ["1.2.3.4:80", "http://1.2.3.4", "http://1.2.3.4:80"]],
    [{host: "::", port: 443, proto: "http"}, [443, "443", ":::443", "[::]:443"]],
    [{host: "::1", port: 443, proto: "http"}, ["[::1]:443"]],
    [{host: "0.0.0.0", port: 443, proto: "http"}, ["0.0.0.0:443"]],
    [{host: "1.2.3.4", port: 443, proto: "http"}, ["1.2.3.4:443"]],
    [{host: "::", port: 443, proto: "https"}, ["https://[::]", "https://[::]:443"]],
    [{host: "::1", port: 443, proto: "https"}, ["https://[::1]:443"]],
    [{host: "0.0.0.0", port: 443, proto: "https"}, ["https://0.0.0.0", "https://0.0.0.0:443"]],
    [{host: "1.2.3.4", port: 443, proto: "https"}, ["https://1.2.3.4", "https://1.2.3.4:443"]],
    [null, ["", "0.0.0.0::443", "256.0.0.0:443", ":::1:443", "::10000:443"]],
  ] as const) {
    for (const input of inputs) expect(parseListenString(input)).toEqual(expected);
  }
  expect(() => parseListenString(true as unknown as string)).toThrow(TypeError);
});

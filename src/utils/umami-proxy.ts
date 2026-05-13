const UMAMI_ORIGIN = "https://umami.app.jimvd.xyz";

export const proxyUmami = (request: Request, upstreamPath: string) => {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(upstreamPath, UMAMI_ORIGIN);
  upstreamUrl.search = incomingUrl.search;

  return fetch(new Request(upstreamUrl.toString(), request));
};

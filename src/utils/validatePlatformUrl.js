const PLATFORM_DOMAINS = {
  Github: ["github.com"],
  Twitter: ["twitter.com", "x.com"],
  Linkedln: ["linkedin.com"],
  Youtube: ["youtube.com", "youtu.be"],
  Facebook: ["facebook.com"],
  Twitch: ["twitch.tv"],
  "Dev.to": ["dev.to"],
  Codewars: ["codewars.com"],
  Codepen: ["codepen.io"],
  freeCodeCamp: ["freecodecamp.org"],
  GitLab: ["gitlab.com"],
  Hashnode: ["hashnode.com"],
  StackOverflow: ["stackoverflow.com"],
};

const normalizeHostname = (hostname) => hostname.toLowerCase().replace(/^www\./, "");

export function validatePlatformUrl(url, platform) {
  if (!platform) {
    return { isValid: false, error: "Please choose a platform" };
  }

  if (!url) {
    return { isValid: false, error: "Can't be empty" };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { isValid: false, error: "Please check the URL" };
  }

  if (parsedUrl.protocol !== "https:") {
    return { isValid: false, error: "URL must start with https://" };
  }

  const expectedDomains = PLATFORM_DOMAINS[platform];
  if (!expectedDomains?.length) {
    return { isValid: true, error: "" };
  }

  const hostname = normalizeHostname(parsedUrl.hostname);
  const matchesPlatform = expectedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );

  if (!matchesPlatform) {
    return { isValid: false, error: `Enter a valid ${platform} URL` };
  }

  return { isValid: true, error: "" };
}

export default validatePlatformUrl;

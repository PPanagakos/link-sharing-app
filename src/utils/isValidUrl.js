function isValidUrl(url) {
  const pattern = new RegExp(
    "^https:\\/\\/" + // Require 'https://' at the start
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
      "(\\#[-a-z\\d_]*)?$", // Fragment locator
    "i" // Case insensitive
  );
  return pattern.test(url);
}

export default isValidUrl;

const lang =
  navigator.language == "pl" || navigator.language == "pl-PL" ? "pl" : "en";

module.exports = {
  prefix: "localhost:3001",
  username: "monitor",
  pass: "test",
  lang: require(`../public/localization/${lang}.json`),
  getStreamPort: "localhost:3001",
  streamPrefix: "localhost",
};

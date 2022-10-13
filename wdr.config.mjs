export default {
  concurrency: 10,
  concurrentBrowsers: 3,
  nodeResolve: true,
  timeout: "3000",
  playwright: true,
  browsers: ["chromium", "firefox", "webkit"],
};

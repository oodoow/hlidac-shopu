const Apify = require("apify");
const { handleStart, handleList, handleSubList } = require("./src/routes");

const {
  utils: { log }
} = Apify;

async function uploadToKeboola(tableName) {
  /** @type {ApifyEnv} */
  const env = await Apify.getEnv();
  /** @type {ActorRun} */
  const run = await Apify.call(
    "blackfriday/uploader",
    {
      datasetId: env.defaultDatasetId,
      upload: true,
      actRunId: env.actorRunId,
      tableName
    },
    {
      waitSecs: 25
    }
  );
  log.info(`Keboola upload called: ${run.id}`);
}

Apify.main(async () => {
  const input = await Apify.getInput();
  const proxyConfigurationOptions =
    input && input.proxyConfiguration
      ? input.proxyConfiguration
      : {
          groups: ["CZECH_LUMINATI"]
        };
  const maxConcurrency =
    input && input.maxConcurrency ? input.maxConcurrency : 10;
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({
    url: "https://www.knihydobrovsky.cz/kategorie"
  });
  await requestQueue.addRequest({
    url: "https://www.knihydobrovsky.cz/e-knihy",
    userData: { label: "SUBLIST" }
  });
  await requestQueue.addRequest({
    url: "https://www.knihydobrovsky.cz/audioknihy",
    userData: { label: "SUBLIST" }
  });
  await requestQueue.addRequest({
    url: "https://www.knihydobrovsky.cz/hry",
    userData: { label: "SUBLIST" }
  });
  await requestQueue.addRequest({
    url: "https://www.knihydobrovsky.cz/papirnictvi",
    userData: { label: "SUBLIST" }
  });
  await requestQueue.addRequest({
    url: "https://www.knihydobrovsky.cz/darky",
    userData: { label: "SUBLIST" }
  });

  const categoryCount = {};

  const proxyConfiguration = await Apify.createProxyConfiguration(
    proxyConfigurationOptions
  );

  const crawler = new Apify.CheerioCrawler({
    requestQueue,
    proxyConfiguration,
    // Be nice to the websites.
    // Remove to unleash full power.
    maxConcurrency,
    handlePageFunction: async context => {
      const {
        url,
        userData: { label }
      } = context.request;
      log.info("Page opened.", { label, url });
      switch (label) {
        case "LIST":
          return handleList(context, categoryCount, requestQueue);
        case "SUBLIST":
          return handleSubList(context, requestQueue);
        default:
          return handleStart(context, requestQueue);
      }
    }
  });

  log.info("Starting the crawl.");
  await crawler.run();
  log.info("Crawl finished.");
  log.info("kategorie", categoryCount);
  const totalCount = Object.entries(categoryCount).reduce(
    (acc, x) => acc + parseInt(x[1], 10),
    1
  );
  await Apify.pushData({ totalCount });

  try {
    await uploadToKeboola("knihydobrovsky_count");
    log.info("upload to Keboola finished");
  } catch (err) {
    log.warning("upload to Keboola failed");
    log.error(err);
  }
});

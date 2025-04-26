module.exports = {
    reporters: [
      "default",
      ["jest-html-reporter", {
        pageTitle: "Test Report",
        outputPath: "./test/reports/report.html"
      }]
    ]
  };
  
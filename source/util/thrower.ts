import { ESLint } from "eslint";

export default (
  lintResults: ESLint.LintResult[],
  messageType: "error" | "warning"
) => {
  const countProperty: "errorCount" | "warningCount" = `${messageType}Count`;
  let filesWithMessages = 0;
  let totalMessages = 0;

  for (const lintResult of lintResults) {
    if (lintResult[countProperty] > 0) {
      filesWithMessages += 1;
      totalMessages += lintResult[countProperty];
    }
  }

  if (totalMessages) {
    throw new Error(`ESLint found ${totalMessages} ${messageType}(s) in ${filesWithMessages} file(s)!`);
  }
};

import Client from "@triply/client.js/build/src/App";
const { exec } = require("child_process");
const client = Client.get({
  token: process.env.TRIPLY_API_TOKEN,
  url: process.env.TRIPLY_API_URL
});
async function run() {
  await exec('for file in ../*.graphql; do\n  curl -X POST -H "Content-Type: application/json" -H "Accept: application/ld+json" --data-binary @$file https://labs.kadaster.nl/enhancer > $file.jsonld\ndone', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  await exec('for file in ../*.graphql.jsonld; do\n  jsonld format -q $file > $file.nq\ndone', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
run().catch(e => {
  console.error(e);
  process.exit(1);
});

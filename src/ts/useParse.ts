import Parse from "parse";

export function useParse() {

  function parseInitialize() {
    Parse.initialize(process.env.PARSE_APP_ID!, process.env.PARSE_JS_ID!);  // Replace with your App ID and JS Key
    Parse.serverURL = process.env.PARSE_SERVER_URL!
  }

  async function callCloudHello(name: string){
    const r = await Parse.Cloud.run("hello", {name});
    console.log(r)
    return r
  }

  async function callCloudOpenAI(intro: string, prompt: string, outro: string){
    return await Parse.Cloud.run("callOpenAI", {intro, prompt, outro});
  }

  return {
    parseInitialize,
    callCloudHello,
    callCloudOpenAI
  }

}

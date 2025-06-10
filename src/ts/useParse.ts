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

  async function callGetUrl(url: string){
    const r = await Parse.Cloud.run("getUrl", {url: url});
    console.log(r)
    return r
  }

  async function callCloudOpenAI(prompt: string){
    const r = await Parse.Cloud.run("callOpenAI", {prompt: prompt});
    console.log(r)
    return r
  }

  return {
    parseInitialize,
    callCloudHello,
    callGetUrl,
    callCloudOpenAI
  }

}

import OpenAI from "openai";
import { openAIkey } from "./constants";

const openai = new OpenAI({
  apiKey: openAIkey,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});

export default openai;

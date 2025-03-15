import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import axios from 'axios';

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const {
    data
  } = await axios.get("https://askubuntu.com/questions/784175/allowing-outbound-connection-via-ufw")

  console.log(data)

  const result = streamText({
    model: google("gemini-2.0-flash-exp"),
    messages,
  });

  return result.toDataStreamResponse();
}   
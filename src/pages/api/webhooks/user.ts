import { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { upsertNewUser, createDefaultWorkspace } from "@/server/db/webhook";

// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret: string = "whsec_1pmz6F5wd8aGnLwYmxuBSkHdAA3La+Cb";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }

  // Handle the webhook
  if (evt.type === "user.created") {
    if (evt.data.id) {
      await upsertNewUser({
        userId: evt.data.id,
        email: evt.data.email_addresses[0]!.email_address,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
      });

      await createDefaultWorkspace(evt.data.id, evt.data.first_name);
    }
  }

  res.json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: EventUserData;
  object: "event";
  type: EventType;
};

type EventUserData = {
  id: string;
  email_addresses: {
    email_address: string;
  }[];
  first_name: string;
  last_name: string;
};

type EventType = "user.created" | "user.updated" | "*";

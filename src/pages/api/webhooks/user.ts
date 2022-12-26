import { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { trpc } from "@/utils/trpc";
import { prisma } from "@/server/db/client";

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
  console.log(evt.data);
  if (evt.type === "user.created") {
    // const mutation = trpc.users.upsertUser.useMutation();
    // await mutation({
    //   userId: evt.data.id,
    //   email: evt.data.email_addresses[0].email_address,
    //   firstName: evt.data.first_name,
    //   lastName: evt.data.last_name,
    // });

    type PrismaUser = {
      userId: string;
      email: string;
      firstName: string;
      lastName: string;
    };

    const user: PrismaUser = {
      userId: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
    };

    await prisma.user.upsert({
      where: {
        userId: user.userId,
      },
      update: user,
      create: user,
    });
  }

  res.json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";

import { writeFile } from "node:fs/promises";
import { runNewsAggregation } from "../../src/news/aggregator/runNewsAggregation";

export default async function handler(request: Request) {
  let nextRun: string | undefined;

  try {
    const body = await request.json();
    nextRun = typeof body?.next_run === "string" ? body.next_run : undefined;
  } catch {
    nextRun = undefined;
  }

  const drafts = await runNewsAggregation(8);
  const payload = {
    generatedAt: new Date().toISOString(),
    nextRun,
    draftCount: drafts.length,
    drafts
  };

  await writeFile("/tmp/dood-news-drafts.json", JSON.stringify(payload, null, 2), "utf-8");

  console.log(`[Plantao Doodverse] ${drafts.length} rascunhos gerados. Publicacao automatica desativada.`);

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
}

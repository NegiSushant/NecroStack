import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import {
  necroWorkflow,
  resurrectSingleRelic,
  resurrectAllCryptRelics,
} from "@/lib/agent/necroGraph";

export async function POST(req: NextRequest) {
  try {
    let body: { relicId?: number; stream?: boolean } = {};
    body = await req.json();
    const { relicId, stream = false } = body;

    let targetRelics: any[] = [];
    if (relicId !== undefined && relicId !== null) {
      const single = await prismaClient.dead_relics.findUnique({
        where: { id: Number(relicId) },
      });
      if (!single) {
        return NextResponse.json(
          {
            success: false,
            error: `Relic with ID #${relicId} not found in Crypt.`,
          },
          { status: 404 },
        );
      }
      targetRelics = [single];
    } else {
      targetRelics = await prismaClient.dead_relics.findMany({
        where: { status: "IN_CRYPT" },
        orderBy: { id: "asc" },
      });

      if (targetRelics.length === 0) {
        targetRelics = await prismaClient.dead_relics.findMany({
          orderBy: { id: "asc" },
        });
      }
    }

    if (targetRelics.length === 0) {
      return NextResponse.json(
        { success: false, error: "No relics found in the Crypt to resurrect." },
        { status: 400 },
      );
    }

    // Mode A: Real-Time Server-Sent Events (SSE) Stream
    if (stream) {
      const encoder = new TextEncoder();

      const customReadable = new ReadableStream({
        async start(controller) {
          const sendEvent = (data: Record<string, any>) => {
            if (req.signal?.aborted) return;
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
              );
            } catch {
              // Client disconnected or stream closed
            }
          };

          try {
            sendEvent({
              type: "ritual_start",
              totalRelics: targetRelics.length,
            });

            for (const relic of targetRelics) {
              sendEvent({
                type: "relic_start",
                relicId: relic.id,
                filename: relic.filename,
                sourceLanguage: relic.source_language,
                abandonedYear: relic.abandoned_year,
                eraCategory: relic.era_category,
              });

              // Indicate Step 1 active
              sendEvent({
                type: "node_active",
                relicId: relic.id,
                step: 1,
                node: "performForensicAutopsy",
                label:
                  "1. Performing Forensic Autopsy & Extracting Edge-Case Soul",
              });

              let latestScore = 0;
              let latestStatus: "SOUL_PRESERVED" | "MUTATION_DETECTED" =
                "MUTATION_DETECTED";

              // Stream node transitions through the 4-node LangGraph workflow
              const streamEvents = await necroWorkflow.stream(
                { relicId: relic.id },
                { streamMode: "updates" },
              );

              for await (const update of streamEvents) {
                if ("performForensicAutopsy" in update) {
                  const data = (update as any).performForensicAutopsy;
                  sendEvent({
                    type: "node_complete",
                    relicId: relic.id,
                    step: 1,
                    node: "performForensicAutopsy",
                    label:
                      "1. Performing Forensic Autopsy & Extracting Edge-Case Soul",
                    logs: data.executionLogs || [],
                    data: {
                      causesCount: data.autopsyCausesOfDeath?.length || 0,
                      invariantsCount: data.soulInvariantsList?.length || 0,
                    },
                  });

                  // Indicate Step 2 active
                  sendEvent({
                    type: "node_active",
                    relicId: relic.id,
                    step: 2,
                    node: "consultMigrationGrimoire",
                    label:
                      "2. Searching PostgreSQL pgvector Migration Grimoire",
                  });
                } else if ("consultMigrationGrimoire" in update) {
                  const data = (update as any).consultMigrationGrimoire;
                  sendEvent({
                    type: "node_complete",
                    relicId: relic.id,
                    step: 2,
                    node: "consultMigrationGrimoire",
                    label:
                      "2. Searching PostgreSQL pgvector Migration Grimoire",
                    logs: data.executionLogs || [],
                    data: {
                      grimoireMatchesCount: data.grimoirePatterns?.length || 0,
                    },
                  });

                  // Indicate Step 3 active
                  sendEvent({
                    type: "node_active",
                    relicId: relic.id,
                    step: 3,
                    node: "reanimateIntoTypeScript",
                    label:
                      "3. Reanimating into Modern TypeScript with Local Gemma",
                  });
                } else if ("reanimateIntoTypeScript" in update) {
                  const data = (update as any).reanimateIntoTypeScript;
                  latestScore = data.soulPreservationScore ?? 0;
                  latestStatus = data.resurrectionStatus ?? "MUTATION_DETECTED";

                  sendEvent({
                    type: "node_complete",
                    relicId: relic.id,
                    step: 3,
                    node: "reanimateIntoTypeScript",
                    label:
                      "3. Reanimating into Modern TypeScript with Local Gemma",
                    logs: data.executionLogs || [],
                    data: {
                      soulPreservationScore: latestScore,
                      resurrectionStatus: latestStatus,
                    },
                  });

                  // Indicate Step 4 active
                  sendEvent({
                    type: "node_active",
                    relicId: relic.id,
                    step: 4,
                    node: "verifyVitalSignsAndSave",
                    label:
                      "4. Verifying Edge-Case Vital Signs & Writing Maintainer Tribute",
                  });
                } else if ("verifyVitalSignsAndSave" in update) {
                  const data = (update as any).verifyVitalSignsAndSave;
                  sendEvent({
                    type: "node_complete",
                    relicId: relic.id,
                    step: 4,
                    node: "verifyVitalSignsAndSave",
                    label:
                      "4. Verifying Edge-Case Vital Signs & Writing Maintainer Tribute",
                    logs: data.executionLogs || [],
                    data: {
                      reanimatedModuleId: data.reanimatedModuleId,
                      maintainerTribute: data.maintainerTribute,
                    },
                  });
                }
              }

              sendEvent({
                type: "relic_complete",
                relicId: relic.id,
                filename: relic.filename,
                resurrectionStatus: latestStatus,
                soulPreservationScore: latestScore,
              });
            }

            sendEvent({
              type: "ritual_complete",
              totalProcessed: targetRelics.length,
            });

            controller.close();
          } catch (err: any) {
            console.error("[SSE /api/necro/resurrect] Stream error:", err);
            sendEvent({
              type: "error",
              message:
                err?.message ||
                "An unexpected error occurred during resurrection streaming.",
            });
            controller.close();
          }
        },
      });

      return new Response(customReadable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    // Mode B: Standard JSON Response
    if (relicId !== undefined && relicId !== null) {
      const result = await resurrectSingleRelic(Number(relicId));
      return NextResponse.json({ success: true, result });
    }

    const results = await resurrectAllCryptRelics();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("[POST /api/necro/resurrect] Error executing ritual:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to execute resurrection ritual",
      },
      { status: 500 },
    );
  }
}

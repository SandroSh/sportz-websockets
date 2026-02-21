import { Router } from "express";
import {
  createCommentarySchema,
  listCommentaryQuerySchema,
} from "../validation/commentary.js";
import { db } from "../database/db.js";
import { commentary } from "../database/schema.js";
import { matchIdParamSchema } from "../validation/matches.js";
import { MAX_LIMIT } from "../constants.js";
import { eq, desc } from "drizzle-orm";

export const commentaryRouter = Router({ mergeParams: true });

commentaryRouter.get("/", async (req, res) => {
  const paramsResult = matchIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res.status(400).json({
      error: "Invalid query parameters",
      details: paramsResult.error.issues,
    });
  }
  const queryResult = listCommentaryQuerySchema.safeParse(req.query);
  if (!queryResult.success) {
    return res.status(400).json({
      error: "Invalid query parameters",
      details: queryResult.error.issues,
    });
  }
  try {
    const { id: matchId } = paramsResult.data;
    const { limit = MAX_LIMIT } = queryResult.data;

    const safeLimit = Math.min(limit, MAX_LIMIT);

    const results = await db
      .select()
      .from(commentary)
      .where(eq(commentary.matchId, matchId))
      .orderBy(desc(commentary.createdAt))
      .limit(safeLimit)
      
    return res.status(200).json({data: results})

  } catch (error) {
    console.error("Failed to fetch commentary", error);
    res.status(500).json({ error: "Failed to fetch commentary" });
  }
});

commentaryRouter.post("/", async (req, res) => {
  const param = matchIdParamSchema.safeParse(req.params);

  if (!param.success) {
    return res.status(400).json({
      error: "Invalid match ID",
      details: param.error.issues,
    });
  }
  const bodyResult = createCommentarySchema.safeParse(req.body);
  if (!bodyResult.success) {
    return res.status(400).json({
      error: "Invalid commentary payload",
      details: bodyResult.error.issues,
    });
  }
  try {
    const [event] = await db
      .insert(commentary)
      .values({
        matchId: param.data.id,
        ...bodyResult.data,
      })
      .returning();
      
    if(res.app.broadcastCommentary){
      res.app.locals.broadcastCommentary(event.matchId, event)
    }

    return res.status(201).json({ data: event });
  } catch (error) {
    return res.status(500).json({
      error: "Faild to create commentary",
    });
  }
});

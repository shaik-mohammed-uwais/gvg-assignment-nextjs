import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { answers } = body;

    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Validate each answer object
    for (const ans of answers) {
      if (
        typeof ans.question !== "string" ||
        typeof ans.selected !== "string" ||
        typeof ans.correct !== "string"
      ) {
        return NextResponse.json(
          { error: "Invalid answer object" },
          { status: 400 }
        );
      }
    }

    const created = await prisma.answer.createMany({
      data: answers.map((ans) => ({
        question: ans.question,
        selected: ans.selected,
        correct: ans.correct,
      })),
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.log("Error submitting answers:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

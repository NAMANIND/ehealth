import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      include: { tags: true },
    });
    return NextResponse.json(user?.tags || []);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user tags" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { tagId } = await request.json();
    const user = await prisma.user.update({
      where: { id: params.userId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
      include: { tags: true },
    });
    return NextResponse.json(user.tags);
  } catch {
    return NextResponse.json(
      { error: "Failed to add tag to user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { tagId } = await request.json();
    const user = await prisma.user.update({
      where: { id: params.userId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
      include: { tags: true },
    });
    return NextResponse.json(user.tags);
  } catch {
    return NextResponse.json(
      { error: "Failed to remove tag from user" },
      { status: 500 }
    );
  }
}

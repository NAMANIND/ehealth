import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userInfoStr = cookieStore.get("user_info")?.value;

    if (!userInfoStr) {
      return new NextResponse(null, { status: 401 });
    }

    const userInfo = JSON.parse(userInfoStr);
    return NextResponse.json({ userInfo });
  } catch (error) {
    console.error("Error getting user info:", error);
    return new NextResponse(null, { status: 500 });
  }
}

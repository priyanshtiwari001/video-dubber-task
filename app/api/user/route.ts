import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const res = await fetch(
      "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(await request.json()),
      }
    );

    if (!res.ok) {
      console.error("Failed to create user:", res.statusText);
      return NextResponse.json({
        message: "Failed to create user",
        status: res.status,
        statusText: res.statusText,
      });
    }

    const data = await res.json();
    return NextResponse.json({
      message: "User created successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: "Failed to create user",
      error: error,
    });
  }
}

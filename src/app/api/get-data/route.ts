import { client } from "@/sanity/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Parse incoming JSON data
    const res = await client.fetch("*[_type == 'post']");
    // Make a POST request to the Sanity API

    // Check if the response is okay
    if (!res) {
      const errorResponse = await res; // Get the error details
      return NextResponse.json(
        { message: "Error creating post", error: errorResponse },
        { status: res.status }
      );
    }

    // Return success response
    return NextResponse.json({ message: "Success", res }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

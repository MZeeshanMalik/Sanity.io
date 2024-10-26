import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse incoming JSON data
    const { name, phone_number } = await request.json();

    // Make a POST request to the Sanity API
    const res = await fetch(
      "https://dpnkd70x.api.sanity.io/v1/data/mutate/production",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer ski4rROmZvF0CPfW6W2TXTkrgxWXT0dG5bpQjforVo2uIHBvQ1ZYzQrU6sUW3uzMzZ2d7bOJdixLaXnWRsDzfkUJBIdJ3MwkNMqgu5Yym0BcfMMaoXIdgz1CBmyWERKRC9SWWT0zl79CvrRdXRM4Vio0l4mp8XejK5oDQCh82Wef0ws9tNKe",
        },
        body: JSON.stringify({
          mutations: [
            {
              createOrReplace: {
                _id: `post-${Date.now()}`,
                _type: "post",
                name,
                phone_number,
              },
            },
          ],
        }),
      }
    );

    // Check if the response is okay
    if (!res.ok) {
      const errorResponse = await res.json(); // Get the error details
      return NextResponse.json(
        { message: "Error creating post", error: errorResponse },
        { status: res.status }
      );
    }

    // Parse the response JSON
    const data = await res.json();

    // Return success response
    return NextResponse.json(
      { message: "Post created successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

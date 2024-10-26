/* eslint-disable @next/next/no-img-element */
"use client";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import axios from "axios";
import { SanityDocument } from "next-sanity";
import { useState, useEffect } from "react";

const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(client).image(source);

export default function Home() {
  const [posts, setPosts] = useState<SanityDocument[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPost = await axios.get("/api/get-data");
        const fetchedPosts = fetchedPost.data.res;

        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  async function handleSubmit() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post("/api/sendform", {
        name,
        phone_number,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  // Render loading message while loading is true
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <input
        className="border-2 border-black rounded-4"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        className="border-2 border-black rounded-4 mt-3"
        onChange={(e) => setPhoneNumber(e.target.value)} // Use string for phone numbers
        placeholder="Enter your phone number"
      />
      <button className="bg-green-500 p-3 rounded mt-3" onClick={handleSubmit}>
        Submit
      </button>
      {posts && (
        <table className="mt-4 border-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{post.name}</td>
                <td>{post.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {posts &&
        posts.map((post, index) => (
          <div key={index}>
            {post.image && (
              <div className="w-56 h-96 mt-10">
                <img
                  src={urlFor(post.image).width(550).height(310).url()}
                  alt={post.title || "Sanity Image"}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

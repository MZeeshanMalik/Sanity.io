/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/components/Footer";
import axios from "axios";
import { SanityDocument } from "next-sanity";
import { useState, useEffect } from "react";

// Toast component for success or error messages
const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => (
  <div
    className={`fixed bottom-4 left-4 p-4 rounded-md shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
  >
    {message}
  </div>
);

export default function Home() {
  const [posts, setPosts] = useState<SanityDocument[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts
  async function fetchPosts() {
    setLoading(true);
    try {
      const fetchedPost = await axios.get("/api/get-data");
      const fetchedPosts = fetchedPost.data.res;
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission
  async function handleSubmit() {
    // Validate input fields
    if (!name || !phone_number) {
      setToast({ message: "Please fill out all fields first.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubmitLoading(true);
    try {
      const res = await axios.post("/api/sendform", { name, phone_number });
      console.log("Response:", res.data);
      setToast({ message: "Entry added successfully!", type: "success" });
      fetchPosts(); // Refetch posts
      setName(""); // Clear input fields
      setPhoneNumber("");
    } catch (error) {
      setToast({ message: "Failed to add entry!", type: "error" });
      console.error("Error creating post:", error);
    } finally {
      setSubmitLoading(false);
      setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <nav className="w-full py-4 bg-blue-600 shadow-md">
        <h1 className="text-2xl text-center font-semibold text-white">
          Sanity Showcase Project
        </h1>
        <p className="text-center text-white text-sm italic">
          Made with Sanity and Next.js
        </p>
      </nav>

      <div className="flex flex-col items-center mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <input
              className="w-80 p-3 border-2 border-blue-300 rounded-md shadow-sm outline-none focus:border-blue-500 mb-4"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              value={name}
            />
            <input
              className="w-80 p-3 border-2 border-blue-300 rounded-md shadow-sm outline-none focus:border-blue-500 mb-4"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              value={phone_number}
            />
            <button
              className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-400"
              onClick={handleSubmit}
              disabled={submitLoading || !name || !phone_number} // Disable if loading or fields are empty
            >
              {submitLoading ? (
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              ) : (
                "Submit"
              )}
            </button>

            {posts && (
              <div className="w-full flex justify-center mt-8">
                <table className="w-3/4 text-left bg-white border border-gray-200 shadow-md rounded-md">
                  <thead className="bg-blue-100 text-blue-900">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                        <td className="py-2 px-4 text-gray-700">{post.name}</td>
                        <td className="py-2 px-4 text-gray-700">
                          {post.phone_number}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <Footer />
    </div>
  );
}

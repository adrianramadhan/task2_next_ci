"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/post");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostDelete = async (postId, index) => {
    try {
      await axios.delete(`http://localhost:8080/api/post/${postId}`);
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="posts bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full lg:w-10/12">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <a
                  href="/create"
                  className=" bg-green-500 p-2 rounded-md shadow-md hover:bg-green-400 transition duration-300 ease-in-out"
                >
                  TAMBAH POST
                </a>
                <hr />
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-black">TITLE</th>
                        <th className="px-4 py-2 text-black">KONTEN</th>
                        <th className="px-4 py-2 text-black">AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => (
                        <tr key={post.id}>
                          <td className="border px-4 py-2 text-black">
                            {post.title}
                          </td>
                          <td className="border px-4 py-2 text-black">
                            {post.content}
                          </td>
                          <td className="border px-4 py-2 text-center ">
                            <button>
                              <a
                                href={`/edit/${post.id}`}
                                className="bg-blue-500 p-2 rounded-md mr-2"
                              >
                                EDIT
                              </a>
                            </button>
                            <button
                              onClick={() => handlePostDelete(post.id, index)}
                              className="bg-red-500 p-2 rounded-md ml-2"
                            >
                              HAPUS
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

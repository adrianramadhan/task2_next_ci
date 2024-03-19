"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.content) {
      setErrors([]);
      if (!post.title) {
        setErrors((prevErrors) => [...prevErrors, "Masukkan Title Post."]);
      }
      if (!post.content) {
        setErrors((prevErrors) => [...prevErrors, "Masukkan Konten Post."]);
      }
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/post", post);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="posts bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="w-full max-w-md mx-auto">
          {errors.length > 0 && (
            <div>
              {errors.map((error, index) => (
                <div
                  key={index}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              ))}
            </div>
          )}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h1 className="block text-gray-700 font-bold mb-2">
                TAMBAH POST
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  TITLE
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleInputChange}
                  placeholder="Masukkan Title"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="content"
                >
                  KONTEN
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="content"
                  name="content"
                  value={post.content}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Masukkan Konten"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  SIMPAN
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                >
                  RESET
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

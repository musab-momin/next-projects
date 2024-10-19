import Link from "next/link";
import React from "react";

const page = async () => {
  const response = await fetch("https://dummyjson.com/posts?limit=3");
  const { posts } = (await response.json()) ?? {};

  return (
    <div className="container">
      <h1 className="heading1">All Posts</h1>
      {posts.map((post: any, indx: number) => (
        <p className="para" key={indx}>
          <Link href={`/posts/${post?.id}`}>{post?.title}</Link>
        </p>
      ))}
    </div>
  );
};

export default page;

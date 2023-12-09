import Link from "next/link";
import React, { Suspense } from "react";

const Home = async () => {
  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const data = await response.json();

  return (
    <>
      <h1>All question</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ul>
          {data.results.map((quiz, indx) => (
            <li key={indx}>
              <Link href={`/quiz/${indx}`}>{quiz.question}</Link>
            </li>
          ))}
        </ul>
      </Suspense>
    </>
  );
};

export default Home;

import Link from "next/link";
import React from "react";

interface QuizePageProps {
  params: { id: string };
}

const QuizPage = ({ params }: QuizePageProps) => {
  return <div>Quiz no: {params.id}</div>;
};

export default QuizPage;

import React from "react";
import { Router, useRouter } from "next/router";

interface IButton {
  url: string;
  text: string;
}

const StatusButtonV2: React.FC<IButton> = ({ url, text }) => {
  const router = useRouter();

  return (
    <button
      className="btn btn-brand"
      onClick={() => {
        router.push(url);
      }}
    >
      {text}
    </button>
  );
};

export default StatusButtonV2;

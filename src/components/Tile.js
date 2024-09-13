"use client";

export default function Tile({ value, onClick }) {
  return (
    <button className="w-32 h-32 bg-[#009FD4] text-6xl m-1.5 cursor-pointer" onClick={onClick}>
      {value}
    </button>
  );
}

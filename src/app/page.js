import Board from "@/components/Board";

export default function Home() {
  return (
    <div className="flex flex-col text-center items-center">
      <h1 className="text-3xl p-4">Tik Tac Toe</h1>
      <Board />
    </div>
  );
}

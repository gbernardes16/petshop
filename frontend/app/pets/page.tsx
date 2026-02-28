import Link from "next/link";

export default function PetsPage() {
  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Lista de Pets 🐶🐱
        </h1>

        <Link
          href="/pets/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Pet
        </Link>
      </div>

      <div className="border p-4 rounded-lg shadow">
        <p>Nenhum pet cadastrado ainda.</p>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function NovoPetPage() {
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    tipo: "",
    raca: "",
    donoNome: "",
    donoEmail: "",
    donoTelefone: "",
    donoEndereco: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <main className="p-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Cadastrar Novo Pet 🐾
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="nome"
          placeholder="Nome do Pet"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="idade"
          placeholder="Idade"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="tipo"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="">Selecione o tipo</option>
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
        </select>

        <input
          type="text"
          name="raca"
          placeholder="Raça"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <hr className="my-4" />

        <input
          type="text"
          name="donoNome"
          placeholder="Nome do Dono"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="donoEmail"
          placeholder="Email do Dono"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="donoTelefone"
          placeholder="Telefone"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="donoEndereco"
          placeholder="Endereço"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Salvar
        </button>

      </form>
    </main>
  );
}   
"use client";

import {
    Shield,
    Users,
    Briefcase,
    Pencil,
} from "lucide-react";

import { useEffect, useState } from "react";

interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    permissao: string;
}

export default function Dashboard() {
    const [usuarios, setUsuarios] = useState<
        Usuario[]
    >([]);

    const [loading, setLoading] =
        useState(true);

    async function carregarUsuarios() {
        const response = await fetch(
            "/api/usuarios/list"
        );

        const data = await response.json();

        setUsuarios(data);
        setLoading(false);
    }

    async function atualizarUsuario(
        id: number,
        permissao: string,
        cargo: string
    ) {
        await fetch("/api/usuarios/update", {
            method: "PUT",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                id,
                permissao,
                cargo,
            }),
        });

        carregarUsuarios();
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-zinc-900 px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-500/20 p-3">
                        <Shield className="h-7 w-7 text-emerald-400" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">
                            FortSeg Dashboard
                        </h1>

                        <p className="text-sm text-zinc-400">
                            Controle de acessos e permissões
                        </p>
                    </div>
                </div>
            </header>

            {/* Conteúdo */}
            <section className="p-8">
                {/* Cards */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <Users className="h-8 w-8 text-emerald-400" />
                        </div>

                        <h2 className="text-4xl font-bold">
                            {usuarios.length}
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Colaboradores cadastrados
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <Shield className="h-8 w-8 text-blue-400" />
                        </div>

                        <h2 className="text-4xl font-bold">
                            {
                                usuarios.filter(
                                    (u) =>
                                        u.permissao === "ADMIN"
                                ).length
                            }
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Administradores
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <Briefcase className="h-8 w-8 text-yellow-400" />
                        </div>

                        <h2 className="text-4xl font-bold">
                            {
                                usuarios.filter(
                                    (u) =>
                                        u.permissao ===
                                        "COLABORADOR"
                                ).length
                            }
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Colaboradores comuns
                        </p>
                    </div>
                </div>

                {/* Tabela */}
                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
                    <div className="border-b border-zinc-800 px-6 py-4">
                        <h2 className="text-xl font-semibold">
                            Colaboradores
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-6 text-zinc-400">
                            Carregando...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-zinc-950">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-zinc-400">
                                            Nome
                                        </th>

                                        <th className="px-6 py-4 text-left text-zinc-400">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left text-zinc-400">
                                            Cargo
                                        </th>

                                        <th className="px-6 py-4 text-left text-zinc-400">
                                            Permissão
                                        </th>

                                        <th className="px-6 py-4 text-left text-zinc-400">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr
                                            key={usuario.id}
                                            className="border-t border-zinc-800"
                                        >
                                            <td className="px-6 py-4">
                                                {usuario.nome}
                                            </td>

                                            <td className="px-6 py-4 text-zinc-400">
                                                {usuario.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <input
                                                    defaultValue={
                                                        usuario.cargo
                                                    }
                                                    className="rounded-lg border border-zinc-700 bg-zinc-950 p-2"
                                                    id={`cargo-${usuario.id}`}
                                                />
                                            </td>

                                            <td className="px-6 py-4">
                                                <select
                                                    defaultValue={
                                                        usuario.permissao
                                                    }
                                                    className="rounded-lg border border-zinc-700 bg-zinc-950 p-2"
                                                    id={`permissao-${usuario.id}`}
                                                >
                                                    <option value="ADMIN">
                                                        ADMIN
                                                    </option>

                                                    <option value="GERENTE">
                                                        GERENTE
                                                    </option>

                                                    <option value="COLABORADOR">
                                                        COLABORADOR
                                                    </option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => {
                                                        const permissao =
                                                            (
                                                                document.getElementById(
                                                                    `permissao-${usuario.id}`
                                                                ) as HTMLSelectElement
                                                            ).value;

                                                        const cargo =
                                                            (
                                                                document.getElementById(
                                                                    `cargo-${usuario.id}`
                                                                ) as HTMLInputElement
                                                            ).value;

                                                        atualizarUsuario(
                                                            usuario.id,
                                                            permissao,
                                                            cargo
                                                        );
                                                    }}
                                                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400"
                                                >
                                                    <Pencil className="h-4 w-4" />

                                                    Salvar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
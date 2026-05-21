"use client";

import { useState } from "react";
import {
    ShieldPlus,
    User,
    Mail,
    Lock,
    Briefcase,
} from "lucide-react";

export default function RegisterPage() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        cargo: "",
        permissao: "COLABORADOR",
    });

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setMensagem("");
        setErro("");
        setLoading(true);

        try {
            const response = await fetch(
                "/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErro(data.erro);
                setLoading(false);
                return;
            }

            setMensagem(
                "Usuário cadastrado com sucesso!"
            );

            setForm({
                nome: "",
                email: "",
                senha: "",
                cargo: "",
                permissao: "COLABORADOR",
            });
        } catch (error) {
            setErro("Erro ao cadastrar");
        }

        setLoading(false);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
            <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
                <div className="mb-8 flex items-center gap-4">
                    <div className="rounded-2xl bg-emerald-500/20 p-4">
                        <ShieldPlus className="h-8 w-8 text-emerald-400" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Cadastro de Usuário
                        </h1>

                        <p className="text-zinc-400">
                            Gerencie colaboradores e acessos
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-5 md:grid-cols-2"
                >
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm text-zinc-300">
                            Nome completo
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-3">
                            <User className="h-5 w-5 text-zinc-500" />

                            <input
                                type="text"
                                className="w-full bg-transparent p-3 text-white outline-none"
                                placeholder="Digite o nome"
                                value={form.nome}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        nome: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Email
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-3">
                            <Mail className="h-5 w-5 text-zinc-500" />

                            <input
                                type="email"
                                className="w-full bg-transparent p-3 text-white outline-none"
                                placeholder="email@empresa.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Senha
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-3">
                            <Lock className="h-5 w-5 text-zinc-500" />

                            <input
                                type="password"
                                className="w-full bg-transparent p-3 text-white outline-none"
                                placeholder="********"
                                value={form.senha}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        senha: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Cargo
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-3">
                            <Briefcase className="h-5 w-5 text-zinc-500" />

                            <input
                                type="text"
                                className="w-full bg-transparent p-3 text-white outline-none"
                                placeholder="Ex: Analista"
                                value={form.cargo}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cargo: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Permissão
                        </label>

                        <select
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
                            value={form.permissao}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    permissao: e.target.value,
                                })
                            }
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
                    </div>

                    {erro && (
                        <div className="md:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            {erro}
                        </div>
                    )}

                    {mensagem && (
                        <div className="md:col-span-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                            {mensagem}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 rounded-xl bg-emerald-500 p-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
                    >
                        {loading
                            ? "Cadastrando..."
                            : "Cadastrar Usuário"}
                    </button>
                </form>
            </div>
        </main>
    );
}
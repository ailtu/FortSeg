"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setErro("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.erro);
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);

            router.push("/dashboard");
        } catch (error) {
            setErro("Erro ao realizar login");
        }

        setLoading(false);
    }

    return (
        <main className="flex min-h-screen bg-zinc-950">
            {/* Lado esquerdo */}
            <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-slate-950 via-zinc-900 to-zinc-950 p-10 text-white lg:flex">
                <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-500/20 p-3">
                        <ShieldCheck className="h-8 w-8 text-emerald-400" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">
                            FortSeg
                        </h1>

                        <p className="text-sm text-zinc-400">
                            Sistema de Controle de Acessos
                        </p>
                    </div>
                </div>

                <div className="space-y-5">
                    <h2 className="max-w-md text-5xl font-bold leading-tight">
                        Segurança inteligente para sua empresa.
                    </h2>

                    <p className="max-w-lg text-lg text-zinc-400">
                        Gerencie permissões, colaboradores e níveis
                        de acesso em um único ambiente seguro.
                    </p>
                </div>

                <div className="text-sm text-zinc-500">
                    © 2026 FortSeg. Todos os direitos reservados.
                </div>
            </section>

            {/* Lado direito */}
            <section className="flex w-full items-center justify-center p-6 lg:w-1/2">
                <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Entrar
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Acesse o painel administrativo do FortSeg.
                        </p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Email
                            </label>

                            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-3">
                                <Mail className="h-5 w-5 text-zinc-500" />

                                <input
                                    type="email"
                                    placeholder="seuemail@empresa.com"
                                    className="w-full bg-transparent p-3 text-white outline-none"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
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
                                    placeholder="••••••••"
                                    className="w-full bg-transparent p-3 text-white outline-none"
                                    value={senha}
                                    onChange={(e) =>
                                        setSenha(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {erro && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {erro}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-emerald-500 p-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
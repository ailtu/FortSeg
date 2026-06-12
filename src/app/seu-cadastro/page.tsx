"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function SeuCadastro() {
    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {
        const dados = localStorage.getItem("usuario");

        if (dados) {
            setUsuario(JSON.parse(dados));
        }
    }, []);

    if (!usuario) {
        return (
            <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                Carregando...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <header className="border-b border-zinc-800 bg-zinc-900 px-8 py-5">
                <h1 className="text-2xl font-bold">
                    Meu Cadastro
                </h1>

                <p className="text-sm text-zinc-400">
                    Informações do colaborador
                </p>
            </header>

            <section className="p-8">
                <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <div className="mb-10 flex flex-col items-center">

                        <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-emerald-500/20">
                            <User className="h-16 w-16 text-emerald-400" />
                        </div>

                        <h2 className="text-2xl font-bold">
                            {usuario.nome}
                        </h2>

                        <p className="text-zinc-400">
                            {usuario.cargo}
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Nome Completo
                            </label>

                            <input
                                disabled
                                value={usuario.nome}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Cargo
                            </label>

                            <input
                                disabled
                                value={usuario.cargo}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Local de Trabalho
                            </label>

                            <input
                                disabled
                                value="Recife - PE"
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                E-mail
                            </label>

                            <input
                                disabled
                                value={usuario.email}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
                            />
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
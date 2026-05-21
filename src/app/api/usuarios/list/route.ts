import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const usuarios = await prisma.usuario.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return Response.json(usuarios);
    } catch (error) {
        return Response.json(
            {
                erro: "Erro ao buscar usuários",
            },
            {
                status: 500,
            }
        );
    }
}
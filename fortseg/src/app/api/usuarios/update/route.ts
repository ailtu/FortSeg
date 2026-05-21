import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        const usuario = await prisma.usuario.update({
            where: {
                id: body.id,
            },
            data: {
                permissao: body.permissao,
                cargo: body.cargo,
            },
        });

        return Response.json(usuario);
    } catch (error) {
        return Response.json(
            {
                erro: "Erro ao atualizar usuário",
            },
            {
                status: 500,
            }
        );
    }
}
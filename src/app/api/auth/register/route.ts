import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const usuarioExistente =
            await prisma.usuario.findUnique({
                where: {
                    email: body.email,
                },
            });

        if (usuarioExistente) {
            return Response.json(
                {
                    erro: "Email já cadastrado",
                },
                {
                    status: 400,
                }
            );
        }

        const senhaHash = await bcrypt.hash(
            body.senha,
            10
        );

        const usuario = await prisma.usuario.create({
            data: {
                nome: body.nome,
                email: body.email,
                senha: senhaHash,
                cargo: body.cargo,
                permissao: body.permissao,
            },
        });

        return Response.json(usuario);
    } catch (error) {
        return Response.json(
            {
                erro: "Erro ao cadastrar usuário",
            },
            {
                status: 500,
            }
        );
    }
}
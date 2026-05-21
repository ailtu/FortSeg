import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const verifyResponse = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    secret:
                        process.env
                            .RECAPTCHA_SECRET_KEY!,
                    response: body.captchaToken,
                }),
            }
        );

        const captchaData =
            await verifyResponse.json();

        if (!captchaData.success) {
            return Response.json(
                {
                    erro: "reCAPTCHA inválido",
                },
                {
                    status: 400,
                }
            );
        }

        const usuario =
            await prisma.usuario.findUnique({
                where: {
                    email: body.email,
                },
            });

        if (!usuario) {
            return Response.json(
                {
                    erro:
                        "Usuário não encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        const senhaCorreta =
            await bcrypt.compare(
                body.senha,
                usuario.senha
            );

        if (!senhaCorreta) {
            return Response.json(
                {
                    erro: "Senha inválida",
                },
                {
                    status: 401,
                }
            );
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                permissao:
                    usuario.permissao,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        return Response.json({
            token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                cargo: usuario.cargo,
                permissao:
                    usuario.permissao,
            },
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                erro:
                    "Erro interno do servidor",
            },
            {
                status: 500,
            }
        );
    }
}
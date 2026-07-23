"use server"
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function fazerLogin(formData: FormData) {
  const senha = formData.get("senha") as string
  if (senha === "Adm@Lza2024") {
    cookies().set("lza_admin_session", "logado", {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24
    })
    revalidatePath('/admin')
  }
}

export async function fazerLogout() {
  cookies().delete("lza_admin_session")
  revalidatePath('/admin')
}

export async function criarEvento(formData: FormData) {
  const nome = formData.get("nome") as string
  const data = formData.get("data") as string
  const cidade = formData.get("cidade") as string
  const imagemUrl = formData.get("imagemUrl") as string
  const link = formData.get("link") as string
  const destaque = formData.get("destaque") === "on"

  if (destaque) {
    await prisma.evento.updateMany({ data: { destaque: false } })
  }

  await prisma.evento.create({
    data: { nome, data: new Date(data), cidade, imagemUrl, link, destaque, ativo: true }
  })
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deletarEvento(id: string) {
  await prisma.evento.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin')
}

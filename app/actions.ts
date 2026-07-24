"use server"
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function fazerLogin(formData: FormData) {
  const cadastro = formData.get("cadastro") as string
  const password = formData.get("password") as string
  const user = await prisma.user.findUnique({ where: { cadastroNum: cadastro } })
  if (user && user.password === password) {
    cookies().set("lza_admin_session", user.id, { httpOnly: true, secure: true, path: '/', maxAge: 60 * 60 * 24 })
    revalidatePath('/admin')
  }
}

export async function salvarEvento(formData: FormData) {
  const id = formData.get("id") as string
  const nome = formData.get("nome") as string
  const data = formData.get("data") as string
  const cidade = formData.get("cidade") as string
  const banner = formData.get("banner") as string
  const destaque = formData.get("destaque") === "on"
  const apoiado = formData.get("apoiado") === "on"

  if (destaque) { await prisma.evento.updateMany({ data: { destaque: false } }) }

  const dados = { nome, data: new Date(data), cidade, banner, destaque, apoiado, ativo: true }

  if (id) {
    await prisma.evento.update({ where: { id }, data: dados })
  } else {
    await prisma.evento.create({ data: dados })
  }
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deletarEvento(id: string) {
  await prisma.evento.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function fazerLogout() {
  cookies().delete("lza_admin_session")
  revalidatePath('/admin')
}

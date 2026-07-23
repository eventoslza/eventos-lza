"use server"
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function criarEvento(formData: FormData) {
  const nome = formData.get("nome") as string
  const data = formData.get("data") as string
  const cidade = formData.get("cidade") as string
  const imagemUrl = formData.get("imagemUrl") as string
  const link = formData.get("link") as string

  await prisma.evento.create({
    data: { nome, data: new Date(data), cidade, imagemUrl, link, ativo: true }
  })
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deletarEvento(id: string) {
  await prisma.evento.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin')
}

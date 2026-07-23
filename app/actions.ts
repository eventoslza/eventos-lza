export async function cadastrarAdmin(formData: FormData) {
  "use server"
  const nome = formData.get("nome") as string
  const username = formData.get("username") as string
  const cargo = formData.get("cargo") as string
  const nivel = formData.get("nivel") as string // SUPER, ADMIN, EDITOR
  const regNum = Math.floor(1000 + Math.random() * 9000).toString()

  await prisma.user.create({
    data: {
      nome,
      username,
      password: "SenhaPadraoLZA123", // Deverá ser trocada
      cargo,
      nivel,
      cadastroNum: regNum,
      status: "ATIVO"
    }
  })
  revalidatePath('/admin/usuarios')
}

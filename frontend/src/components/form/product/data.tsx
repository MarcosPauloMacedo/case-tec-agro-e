export const dataProductForm = {
  dialog: (typeDialog: "success" | "error" | "loading" | "question", isEdit: boolean) => {
    const messages = {
      success: {
        title: "Sucesso",
        message: isEdit ? "Produto editado com sucesso!" : "Produto criado com sucesso!",
      },
      error: {
        title: "Erro",
        message: isEdit ? "Erro ao editar o produto!" : "Erro ao criar o produto!",
      },
      loading: {
        title: "Carregando",
        message: isEdit ? "Atualizando produto..." : "Criando produto...",
      },
      question: {
        title: "Atenção",
        message: isEdit ? "Deseja editar o produto?" : "Deseja criar o produto?",
      },
    };

    return messages[typeDialog];
  },
};
export const dataProductList = {
  dialog(typeDialog: "success" | "error" | "loading" | "question") {
    const messages = {
      success: {
        title: "Sucesso",
        message: "Produto apagado com sucesso!",
      },
      error: {
        title: "Erro",
        message: "Erro ao apagar o produto!",
      },
      loading: {
        title: "Carregando",
        message: "Apagando produto...",
      },
      question: {
        title: "Atenção",
        message: "Deseja apagar o produto?",
      },
    };
    
    return messages[typeDialog];
  },
};

import type { Category } from "../types/category";
import { api } from "./api";

export const getCategories = async (): Promise<Category[]> =>  {
  try {
    const response = await api.get<{ categories: Category[] }>("/categories")
    console.log("DEBUG: Resposta da API de Categorias:", response.data);
    return response.data.categories;
  } catch(err) {
      console.error("Erro ao carregar categorias:", err);
      // eslint-disable-next-line preserve-caught-error
      throw new Error("Erro ao carregar categorias:");
  } 
};

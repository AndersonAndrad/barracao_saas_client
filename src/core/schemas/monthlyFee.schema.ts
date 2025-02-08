import { z } from "zod";

export const monthlyFeeCreateForm = z.object({
  dueDate: z.date(),
  amount: z.number(),
  userId: z.string().min(10, {
    message: 'Um usuário deve ser selecionado'
  })
});
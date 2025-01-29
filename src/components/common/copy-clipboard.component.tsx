import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyToClipbaordProps {
  payload: string | number;
}

export function CopyToClipboard({ payload }: CopyToClipbaordProps) {

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(String(payload));
    toast('Copiado com sucesso.')
  }

  return (
    <Copy onClick={() => copyToClipboard()} className="cursor-pointer" />
  )
}
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function LoginPage() {
  const resetPassword: boolean = false;

  return (
    <div className="flex w-full h-screen">
      <div className="w-[60%] bg-slate-400 flex-grow flex flex-col justify-center items-center gap-3">
        <h1 className="text-center text-6xl font-bold">Bem-vindo ao <br /> Gestor Hub</h1>
        <h6>Sistema de gerenciamento de organizocoes</h6>
      </div>
      <div className="w-[40%] bg-purple-300 flex-grow h-full">
        {!resetPassword &&
          <div className="flex flex-col gap-5 p-8">
            <header className="flex flex-col gap-3 justify-center items-center p-5">
              <h3 className="font-bold text-4xl">Login</h3>
              <h6 className="text-center text-sm">Bem - vindo ao Gestor Hub! <br /> Faca seu login para ter acesso a plataforma</h6>
            </header>

            {/* Form */}
            <div className="flex flex-col gap-2">
              <section className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <Input placeholder="Por favor me informe o seu email" />
              </section>
              <section className="flex flex-col gap-3">
                <label htmlFor="password">Senha</label>
                <Input />
              </section>
              <section className="flex gap-3 items-center">
                <Checkbox />
                <label htmlFor="">Me manter conectado</label>
              </section>
            </div>

            <section className="px-8 w-full bg-white">
              <Button className="w-full">Login</Button>
            </section>

          </div>
        }
      </div>
    </div>
  )
}
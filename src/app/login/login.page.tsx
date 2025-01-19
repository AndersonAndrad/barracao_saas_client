'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [continueConnected, setContinueConnected] = useState<boolean>(false);

  // reset password states
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const passwordNotMatch = (): boolean => {
    const formatedNewPassword: string = newPassword.replace(/\s+/g, '').trim();
    const formatedConfirmNewPassword: string = confirmNewPassword.replace(/\s+/g, '').trim();

    const notMatch: boolean = !!formatedNewPassword.length && !!formatedNewPassword.length && (formatedNewPassword !== formatedConfirmNewPassword);
    const notExists: boolean = !formatedNewPassword.length || !formatedConfirmNewPassword.length

    return notMatch && !notExists
  }

  const blockResetPassword = (): boolean => {
    const notExists: boolean = !!newPassword.length || !!confirmNewPassword.length;

    return passwordNotMatch() || !notExists;
  }

  const submitLogin = () => {
    const objToLogin = {
      email,
      password
    }

    console.log({ objToLogin });
  };

  const submitRecoveryPassword = () => { };

  return (
    <div className="flex w-full h-screen">
      <div className="w-[60%] bg-slate-400 flex-grow flex flex-col justify-center items-center gap-3">
        {/* When is login page */}
        {!resetPassword &&
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-6xl font-bold">Bem-vindo ao <br /> Gestor Hub</h1>
            <h6>Sistema de gerenciamento de organizocoes</h6>
          </div>
        }

        {/* When reset password */}
        {resetPassword &&
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-6xl font-bold">Voce esqueceu <br /> a sua senha?</h1>
            <h6 className="text-center">Sem problemas! Nós te ajudamos a recuperar o seu acesso, <br />
              siga as instruções para cadastrar uma nova senha.</h6>
          </div>
        }
      </div>
      <div className="w-[40%] flex-grow h-full">
        {/* When is login page */}
        {!resetPassword &&
          <div className="flex flex-col gap-5 p-8 h-full">
            <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
              <header className="flex flex-col gap-3 justify-center items-center p-5">
                <h3 className="font-bold text-4xl">Login</h3>
                <h6 className="text-center text-sm">Bem - vindo ao Gestor Hub! <br /> Faca seu login para ter acesso a plataforma</h6>
              </header>

              {/* Form */}
              <div className="flex flex-col w-full gap-2">
                <section className="flex flex-col gap-3">
                  <label htmlFor="email">Email</label>
                  <Input placeholder="Por favor me informe o seu email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
                </section>
                <section className="flex flex-col gap-3">
                  <label htmlFor="password">Senha</label>
                  <Input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                </section>
                <section className="flex gap-3 items-center">
                  <Checkbox id="continue-connected" />
                  <label htmlFor="continue-connected" className="cursor-pointer">Me manter conectado</label>
                </section>
              </div>

              <section className="px-8 w-full bg-white">
                <Button className="w-full" onClick={() => submitLogin()}>Login</Button>
              </section>
            </div>

            {/* @todo in the future implement to login with google and apple */}

            <Button variant={'link'} className="mt-auto" onClick={() => { setResetPassword(true) }}>
              <span className="w-full text-center underline">Esqueceu a senha ?</span>
            </Button>
          </div>
        }

        {/* When reset password */}
        {resetPassword &&
          <div className="flex flex-col gap-5 p-8 h-full">
            <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
              <header className="flex flex-col gap-3 justify-center items-center p-5">
                <h3 className="font-bold text-4xl text-center">Cadastre uma <br /> nova senha</h3>
                <h6 className="text-center text-sm">Cadastre uma nova senha para ter acesso a plataforma</h6>
              </header>

              {/* Form */}
              <div className="flex flex-col gap-2 w-full">
                <section className="flex flex-col gap-3">
                  <label htmlFor="newPassword">Nova senha</label>
                  <Input id='newPassword' placeholder="" type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                </section>
                <section className="flex flex-col gap-3">
                  <label htmlFor="confirmNewPassword">Confirme sua nova senha</label>
                  <Input id='confirmNewPassword' type="password" value={confirmNewPassword} onChange={event => setConfirmNewPassword(event.target.value)} />
                </section>
              </div>

              {passwordNotMatch() && <span className="w-full text-red-300">Error: as senhas não coincidem. Insira-os novamente.</span>}

              <section className="px-8 w-full flex gap-3 bg-white">
                <Button className="w-full" variant={'secondary'} onClick={() => setResetPassword(false)}>Voltar</Button>
                <Button className="w-full" disabled={blockResetPassword()} onClick={() => submitRecoveryPassword()}>Confirmar</Button>
              </section>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
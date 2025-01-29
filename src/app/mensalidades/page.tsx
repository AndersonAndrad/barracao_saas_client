'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { RegisterMonthlyFee } from "@/components/monthlyFee/register-monthly.component";
import { useState } from "react";

export default function MonthlyFee() {
  const [existsData, setExistsData] = useState<boolean>(false);

  return (
    <div className="h-full flex flex-col">
      <header className="w-full">
        <div className="w-full">
          <h1 className="text-2xl font-bold">Mensalidades</h1>
        </div>
        <div className="w-full flex justify-end">
          <RegisterMonthlyFee />
        </div>
      </header>

      {/* main */}
      <main className="flex-grow h-full overflow-auto">
        {/* not exists data */}
        {!existsData &&
          <div className="flex flex-col justify-center items-center gap-3 h-full">
            <h1 className="text-center font-bold text-sm">Nenhuma mensalidade cadastrada</h1>
            <span className="text-center text-xs">Você ainda não tem nenhuma mensalidade cadastrada, cadastre uma mensalidade</span>
            <RegisterMonthlyFee />
          </div>
        }
        {/* when exists data */}
        {existsData &&
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Valor pago</TableHead>
                <TableHead>Data de pagamento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        }
      </main>

      {/* footer */}
      <footer className="bg-orange-200">

      </footer>
    </div>
  )
}
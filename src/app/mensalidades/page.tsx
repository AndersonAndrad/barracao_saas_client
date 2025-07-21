'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { MonthlyFeeApi } from "@/apis/monthlyFee.api";
import { formatDate } from "@/common/utils/date.utils";
import { formatCurrencyBRL } from "@/common/utils/format.utils";
import { RegisterMonthlyFee } from "@/components/monthlyFee/register-monthly.component";
import type { MonthlyFee } from "@/core/interfaces/monthlyFee.interface";
import { MonthlyFeeStatus } from "@/core/interfaces/monthlyFee.interface";
import { useEffect, useState } from "react";

export default function MonthlyFee() {
  const monthlyFeeApi = new MonthlyFeeApi();

  const [monthlyFees, setMonthlyFees] = useState<MonthlyFee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [existsData, setExistsData] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const pageSize = 10;

  const fetchMonthlyFees = async (pageNum = 1) => {
    setLoading(true);
    try {
      const { items, total } = await monthlyFeeApi.find({ page: pageNum, size: pageSize });
      setMonthlyFees(items);
      setTotalItems(total);
      setExistsData(total > 0);
    } catch {
      setMonthlyFees([]);
      setTotalItems(0);
      setExistsData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyFees(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getStatusLabel = (status: MonthlyFeeStatus) => {
    switch (status) {
      case MonthlyFeeStatus.PAID:
        return "Pago";
      case MonthlyFeeStatus.OVERDUE:
        return "Vencido";
      case MonthlyFeeStatus.PENDING:
        return "Pendente";
      default:
        return "-";
    }
  };

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
        {/* Loading */}
        {loading && (
          <div className="flex flex-col justify-center items-center gap-3 h-full">
            <span className="text-center text-sm">Carregando mensalidades...</span>
          </div>
        )}
        {/* not exists data */}
        {!loading && !existsData && (
          <div className="flex flex-col justify-center items-center gap-3 h-full">
            <h1 className="text-center font-bold text-sm">Nenhuma mensalidade cadastrada</h1>
            <span className="text-center text-xs">Você ainda não tem nenhuma mensalidade cadastrada, cadastre uma mensalidade</span>
            <RegisterMonthlyFee />
          </div>
        )}
        {/* when exists data */}
        {!loading && existsData && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Valor a pagar</TableHead>
                <TableHead>Valor pago</TableHead>
                <TableHead>Data de pagamento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyFees.map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>{fee.user?.name ?? '-'}</TableCell>
                  <TableCell>{formatCurrencyBRL(fee.amount ?? 0)}</TableCell>
                  <TableCell>{formatCurrencyBRL(fee.amountPaid ?? 0)}</TableCell>
                  <TableCell>{fee.paymentDate ? formatDate(new Date(fee.paymentDate)) : '-'}</TableCell>
                  <TableCell>{getStatusLabel(fee.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>

      {/* footer */}
      <footer className="bg-orange-200">
        {/* Pagination (if needed) */}
        {existsData && totalItems > pageSize && (
          <div className="flex justify-center py-2">
            <button
              className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="px-2">Página {page} de {Math.ceil(totalItems / pageSize)}</span>
            <button
              className="px-2 py-1 mx-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(totalItems / pageSize)}
            >
              Próxima
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
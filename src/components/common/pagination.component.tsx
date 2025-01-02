import {Button} from "@/components/ui/button";

interface PaginationProps {
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
    const {currentPage, totalItems, onPageChange} = props;

    const counterPages: number = totalItems >= 10 ? Math.ceil(totalItems / 10) : 1;

    const disablePrevPageButton: boolean = currentPage === 1;
    const disableNextPageButton: boolean = counterPages === 1 || currentPage === counterPages;

    const nextPage = (): void => {
        if (currentPage < counterPages) onPageChange(currentPage + 1);
    };

    const prevPage = (): void => {
        if (currentPage >= counterPages) onPageChange(currentPage - 1);
    };

    return (
        <div className="w-full flex justify-between">
            <Button
                variant='ghost'
                disabled={disablePrevPageButton}
                onClick={() => prevPage()}
            >
                Anterior
            </Button>

            <span>{currentPage}/{counterPages}</span>

            <Button
                variant='ghost'
                disabled={disableNextPageButton}
                onClick={() => nextPage()}
            >
                Próxima
            </Button>
        </div>
    )
}
import {PageTemplateComponent} from "@/components/common/page-template.component";
import {NewBillComponent} from "@/components/bills/new-bill.component";

export default function Bills() {
    return (
        <PageTemplateComponent title='Contas'>
            <div className='flex flex-col gap-3'>
                <header className='flex justify-end'>
                    <NewBillComponent/>
                </header>
                <main></main>
                <footer></footer>
            </div>
        </PageTemplateComponent>
    );
}
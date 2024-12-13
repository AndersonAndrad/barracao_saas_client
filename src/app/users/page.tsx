import {PageTemplateComponent} from "@/components/common/page-template.component";
import {NewUserComponent} from "@/components/users/new-user.component";

export default function Page() {
    return (
        <PageTemplateComponent title='Macumbeirinhos(as)'>
            <div>
                <header className="flex justify-end">
                    <NewUserComponent/>
                </header>
                <main></main>
                <footer></footer>
            </div>
        </PageTemplateComponent>
    )
}
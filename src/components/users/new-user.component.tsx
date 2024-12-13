import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form"

export function NewUserComponent() {
    const submit = (): void => {

    }


    const formSchema = z.object({
        name: z.string().min(2, {message: "O nome do macumbeirinho(a) deve ter pelo menos 2 letras"}),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    })

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Novo macumbeirinho(a)<Plus/></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Um novo macumbeirinho(a) 🥰</SheetTitle>
                    <SheetDescription>
                        Aqui vão ser inseridos as informações básicas para registrar um(a) novo(a) macumbeirinho(a)
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>
                <SheetFooter>
                    <Button onClick={() => submit()}>Salvar</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
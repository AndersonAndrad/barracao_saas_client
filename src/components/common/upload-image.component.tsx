import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import {useState} from "react";

interface UploadImageProps {
    onPreview: any;
    onUpload: any;
    label?: string;
}

export function UploadImage(props: UploadImageProps) {
    const {onPreview, onUpload, label} = props;
    const [file, setFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>('');
    const [avatar, setAvatar] = useState('');


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;

        const [selectedFile] = event.target.files

        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;

            setPreview(result);
            onPreview(result);
        };

        reader.readAsDataURL(selectedFile);

        onUpload(selectedFile);
    };

    return (
        <>
            <Button variant="outline">
                <label className="cursor-pointer flex gap-3" htmlFor="uploadImage">
                    {label}
                    <Upload/>
                </label>
            </Button>
            <input
                onChange={handleFileChange}
                type="file" accept="image/*"
                id="uploadImage"
                className="opacity-0 w-0 h-0"
            />
        </>
    )
}
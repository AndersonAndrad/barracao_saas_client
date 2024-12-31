import {Button} from "@/components/ui/button";
import {Upload} from "lucide-react";
import {fileSizeInvalid} from "@/common/utils/file.utils";

interface UploadImageProps {
    onPreview: any;
    onUpload: any;
    label?: string;
}

export function UploadImage(props: UploadImageProps) {
    const {onPreview, onUpload, label} = props;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;


        const [selectedFile] = event.target.files

        if (fileSizeInvalid(selectedFile)) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            onPreview(reader.result as string);
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
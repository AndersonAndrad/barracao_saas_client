import {homeDescription, homeSubDescription, homeTitle} from "@/texts/home.text";

export default function Home() {
    const isMobile: boolean = false;

    const webPage = () => {
        return (
            <div className="h-full flex flex-col items-center justify-center pt-6 gap-3">
                <h1 className="text-2xl">{homeTitle}</h1>
                <h3 className="text-xs">{homeDescription}</h3>
                <h3 className="text-xs"><b>{homeSubDescription}</b></h3>
            </div>
        )
    }

    const mobilePage = () => {
        return (
            <div>
                mobilePage
            </div>
        )
    }

    return isMobile ? mobilePage() : webPage();
}
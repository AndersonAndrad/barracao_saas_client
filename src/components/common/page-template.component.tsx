import React from "react";

interface PageTemplateProps {
    children: React.ReactNode;
    title: string;
}

export function PageTemplateComponent({children, title}: PageTemplateProps) {
    return (
        <div className="flex flex-col h-full">
            <div>
                <h1 className='text-2xl font-bold'>{title}</h1>
            </div>
            <div className="h-full">
                {children}
            </div>
        </div>
    )
}
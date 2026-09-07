import { useEffect } from "react";

const useHead = (title: string, description?: string) => {
    useEffect(() => {
        const metaDescription = document.querySelector('meta[name="description"]');
        document.title = title + " - Sich";

        if(metaDescription) {
            metaDescription.setAttribute("content", description || "");
        }


    }, [title, description]);

}

export default useHead;
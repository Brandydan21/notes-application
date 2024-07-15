interface content{
    id: string | number,
    userId: string, 
    content: string
}

interface contentData{
    notes:content[];
}
export type {content,contentData}
export function countSkipped(
    page : number = 1,
    limit : number = 100,
) : number{
    return (page - 1) * limit;
}
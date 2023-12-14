//!!Example access string : "lembaga:read,write;berita:read,write,delete"
export function convertAccessToMap(access : string) :  Map<string, string[]> {
    const accessMap = new Map<string, string[]>();

    const accessArray = access.split(';');

    accessArray.forEach((accessString) => {
        const accessStringArray = accessString.split(':');
        const object = accessStringArray[0];
        if(accessStringArray.length != 1){
            const objectAccess = accessStringArray[1].split(',');
            accessMap.set(object, objectAccess);
        }
    });

    return accessMap;
}

export function convertAccessToString(accessMap : Map<string, string[]>) : string {
    let access = '';
    accessMap.forEach((value, key) => {
        access += `${key}:${value.join(',')};`;
    });
    return access;
}

export function checkAccess(accessMap : Map<string, string[]>, object : string, action : string) : boolean {
    const access = accessMap.get(object);
    if (access) {
        return access.includes(action);
    }
    return false;
}
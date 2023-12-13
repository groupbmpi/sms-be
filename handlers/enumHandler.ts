import { BaseHandler } from "./baseHandler";

export class EnumHandler extends BaseHandler{

    public getEnum(enumData : {
        [key : string] : string
    }) : string[]{
        const enumValues : string[] = []

        for(const key in enumData){
            enumValues.push(key)
        }

        return enumValues
    
    }
}
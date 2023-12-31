import nanoid from  'nanoid'

export function generateRandomNumber(len : number) : string{
    const baseCharPos = '0'.charCodeAt(0);

    let randomNum : string = "";

    for(let i=0;i<len;i++){
        randomNum += String.fromCharCode(baseCharPos + Math.floor(Math.random() * 10));
    }

    return randomNum;
}

export function generatePassword() : string{
    let newPass : string =  nanoid.nanoid();

    return newPass;
}

export function checkSuffixBcfEmail(email : string) : boolean{
    return email.endsWith("@bcf.or.id");
}
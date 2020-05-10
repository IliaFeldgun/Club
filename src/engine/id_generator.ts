import {v5 as uuidv5} from "uuid"

export function generateUuidv5(name: string, url: string) : string {
    return uuidv5(name, url)
}
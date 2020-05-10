import {v5 as uuidv5} from "uuid"

export function generateId(name: string, url: string) : string {
    return uuidv5(name, url)
}
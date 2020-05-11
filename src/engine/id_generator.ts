import * as uuid from "uuid"

export function generateId(name: string, namespace: string) : string {
    return uuid.v5(name, namespace)
}
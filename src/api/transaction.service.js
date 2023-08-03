import { memaQuery } from "@/core/mema-query/mema-query.lib"
import { URLSearchParams } from "url"

export class TransactionService {
    #BASE_URL = '/transaction'

    getAll(onSuccess) {
        return memaQuery({
            path: this.#BASE_URL +
            `?${new URLSearchParams({
                orderBy: 'desc'
            })}`,
            onSuccess
        })
    }
}
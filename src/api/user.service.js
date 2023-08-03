import { memaQuery } from "@/core/mema-query/mema-query.lib"

export class UserService {
    #BASE_URL = '/users'

    getAll(searchTerm, onSuccess) {
        return memaQuery({
            path: `${this.#BASE_URL}${
                searchTerm
                    ? `?${new URLSearchParams({
                        searchTerm
                    })}`
                    : ''
            }`,
            onSuccess
        })
    }
}
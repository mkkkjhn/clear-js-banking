import { memaQuery } from "@/core/mema-query/mema-query.lib"

export class StatisticService {
    #BASE_URL = '/statistics'

    main(onSuccess) {
        return memaQuery({
            path: this.#BASE_URL,
            onSuccess
        })
    }
}
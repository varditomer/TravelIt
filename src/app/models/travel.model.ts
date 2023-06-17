export interface Travel {
    _id: string,
    country: string,
    start_date: Date | null,
    end_date: Date | null,
    notes: string,
    flag: string
}

export interface Country {
    name: string,
    flag: string
}

export interface SortBy {
    column: string,
    ascending: boolean
}
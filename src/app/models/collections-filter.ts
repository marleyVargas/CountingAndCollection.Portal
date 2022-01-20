export class CollectionsFilter {
    constructor(
        public CreatedDateInit: Date,
        public CreatedDateFin: Date,
        public Station: string,
        public PageSize: number,
        public PageNumber: number
    ) {}
}


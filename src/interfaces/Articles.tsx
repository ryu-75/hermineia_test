export interface Articles {
    data?: {
      key?: string;
      title?: string;
      creators?: {
        firstName?: string;
        lastName?: string;
        }[];
      date?: string;
      url?: string;
      comment?: string;
      statut?: string;
    };
    key?: string;
}
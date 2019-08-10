export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    state: State;
    orderTotal?: number;
    latitude?: number;
    longitude?: number;
    orders?: any[];
}

export interface State {
    abbreviation: string;
    name: string;
}
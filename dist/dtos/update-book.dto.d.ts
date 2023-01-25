export declare class UpdateBookDTO {
    readonly nameBook: string;
    readonly identifiant: string;
    readonly location: string;
    readonly ISBN: string;
    readonly author: string;
    readonly pages: number;
    readonly faculty: string;
    edition: Date;
    readonly editor: string;
    isIssued: boolean;
    shouldBeReturned: boolean;
    bookType: string;
    issuedByFirstName: string;
    issuedByLastName: string;
    status: string;
    domain: any;
}

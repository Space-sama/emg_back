export declare enum Profession {
    Etudiant = "Etudiant",
    Professeur = "Professeur",
    Administratif = "Administratif"
}
export declare enum Sexe {
    Homme = "Homme",
    Femme = "Femme"
}
export interface User {
    _id?: String;
    firstName?: String;
    lastName?: String;
    CIN?: String;
    sexe?: String;
    profession?: String;
    phone?: String;
    email?: String;
    createdAt?: Date;
    updatedAt?: Date;
    status?: String;
    dateIssuedBook?: Date;
    dateRestitution?: Date;
    daysLeft?: Number;
    forTimeOf?: Number;
    shouldReturn?: Boolean;
    isReturned?: Boolean;
    dateReturned?: Date;
    hist_Book?: String;
    hist_ISBN?: String;
    hist_ID?: String;
    hist_LOC?: String;
    hist_Domain?: String;
    tentative?: Number;
    book?: any | [];
}

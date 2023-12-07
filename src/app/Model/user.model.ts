export enum UserRole {
    ADMIN = 'ADMIN',
    ETUDIANT = 'ETUDIANT',
}
export class User {
    id!: number;
    nom!: string;
    prenom!: string;
    image!: string;
    email!: string;
    password!: string;
    role!: UserRole;
    passwordResetToken!: string;
}

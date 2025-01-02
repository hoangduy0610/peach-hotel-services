import { User } from "@/entities/User.entity";

export class UserModal {
    id: number;
    email: string;
    password: string;
    // role: string;
    name: string;
    phone: string;
    address: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        // this.role = user.role;
        this.name = user.name;
        this.phone = user.phone;
        this.address = user.address
    }
}
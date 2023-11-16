export interface User {
    name : string,
    password : string,
    email : string,
    _id : string,
    token : string
}
export type LoginUser  = Pick<User, 'email' | 'password' >
export type RegisterUser = Pick<User, 'name' | 'email' | 'password'>
export interface ListUser {
    name: string,
    password: string,
    email: string,
    _id: string,
    payments: Payment[]
    memberships : MemberShip[]
}

export interface Admin {
    email: string,
    password: string,
    _id: string,
    token: string
}

export type AdminLogin = Pick<Admin, "email" | "password">

export interface MemberShip {
    _id: string,
    rate: number,
    operationHours: number
    expire: number,
    show : boolean,
    facilities: Facilities[]
}
export interface Facilities {
    _id : string
    facility: string,
}
export type NewFacility = Pick<Facilities, "facility">
export interface Facility {
    _id : string
    facility: string,
    checked : boolean
}

export interface NewPayment {
    user: string 
    membership: string 
    paymentId: string
    amount: number
}
export interface Payment {
    user : User,
    memberShip : MemberShip,
    paymentId : string
    rate: number,
    createdAt : Date
}

export type UserPros = {
    id: string;
    name: string;
    balance: number;
    cpf: string;
    password: string
}

export class User {
    private constructor(private props: UserPros){}
    

    public static create(name: string, cpf: string,password: string){
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            balance: 0,
            cpf,
            password
        })
    }

    public static with(props: UserPros){
        return new User(props)
    }

    public get id(){
        return this.props.id
    }

    public get name(){
        return this.props.name
    }

    public get balance(){
        return this.props.balance
    }

    public get cpf(){
        return this.props.cpf
    }
    
}
export interface IRepository{
    create( data: any): Promise<any>;

    save(data: any): Promise<any>;

    index(): Promise<any>;

    findById(id: string): Promise<any | undefined>;

    findByEmail(email: string): Promise<any | undefined>;

    findByName(name: string): Promise<any | undefined>
}
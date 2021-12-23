import { Product } from "src/product/product.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("user")
export class User extends BaseEntity {

    @PrimaryColumn()
    id: string

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    city: string;

    @Column()
    role: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @OneToMany(type => Product, product => product.user)
    products: Product[]
}
import { User } from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    price: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @ManyToOne(type => User, user => user.products)
    @JoinColumn({
        name: "user_id"
    })
    user: User;
}
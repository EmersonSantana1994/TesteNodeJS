import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teste {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicoAlvo: string;

  @Column()
  quantidadeEstrelas: number;

  @Column()
  email: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  dataCriacao: Date;

  @Column({ nullable: true })
  dataAtualizacao: Date;
}

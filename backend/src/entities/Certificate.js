import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Certificate",
  tableName: "certificates",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    issued_date: {
      type: "timestamp",
      createDate: true,
    },
    certificate_url: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
    },
    training: {
      type: "many-to-one",
      target: "TrainingProgram",
      joinColumn: { name: "training_id" },
    },
  },
});
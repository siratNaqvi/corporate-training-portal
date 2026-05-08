import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Enrollment",
  tableName: "enrollments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    status: {
      type: "varchar",
      default: "assigned",
    },
    progress: {
      type: "int",
      default: 0,
    },
    enrolled_at: {
      type: "timestamp",
      createDate: true,
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
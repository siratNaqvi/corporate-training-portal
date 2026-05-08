import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "TrainingProgram",
  tableName: "training_programs",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    description: {
      type: "text",
    },
    category: {
      type: "varchar",
    },
    department: {
      type: "varchar",
    },
    due_date: {
      type: "date",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    trainer: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "trainer_id" },
    },
  },
});
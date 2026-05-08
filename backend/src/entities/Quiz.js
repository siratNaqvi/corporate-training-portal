import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Quiz",
  tableName: "quizzes",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    question: {
      type: "text",
    },

    option_a: { type: "text" },
    option_b: { type: "text" },
    option_c: { type: "text" },
    option_d: { type: "text" },

    correct_answer: {
      type: "varchar",
    },
  },

  relations: {
    module: {
      type: "many-to-one",
      target: "CourseModule",
      joinColumn: { name: "module_id" },
      onDelete: "CASCADE",
    },
  },
});
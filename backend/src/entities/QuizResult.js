import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "QuizResult",
  tableName: "quiz_results",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    score: {
      type: "int",
    },
    submitted_at: {
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
    quiz: {
      type: "many-to-one",
      target: "Quiz",
      joinColumn: { name: "quiz_id" },
    }
  },
});
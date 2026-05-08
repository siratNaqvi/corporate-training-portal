import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "CourseModule",
  tableName: "course_modules",
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
      nullable: true,
    },

    content_type: {
      type: "varchar",
      default: "text", // text | video | file | mixed
    },

    content: {
      type: "text",
      nullable: true,
    },

    video_url: {
      type: "varchar",
      nullable: true,
    },

    file_url: {
      type: "varchar",
      nullable: true,
    },

    order_index: {
      type: "int",
    },

    duration_minutes: {
      type: "int",
      nullable: true,
    },

    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    training: {
      type: "many-to-one",
      target: "TrainingProgram",
      joinColumn: { name: "training_id" },
      onDelete: "CASCADE",
    },

    quizzes: {
      type: "one-to-many",
      target: "Quiz",
      inverseSide: "module",
    },
  },
});
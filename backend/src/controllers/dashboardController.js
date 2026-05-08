import AppDataSource from "../config/data-source.js";

export const getHRDashboard = async (req, res) => {
  try {
    // Total Employees
    const users = await AppDataSource.query(
      "SELECT COUNT(*) FROM users WHERE role='employee'"
    );

    // Active Programs (based on enrollments in progress)
    const activePrograms = await AppDataSource.query(
      "SELECT COUNT(DISTINCT training_id) FROM enrollments WHERE status='in-progress'"
    );

    // Overdue Trainings (based on due_date)
    const overdueTrainings = await AppDataSource.query(
      "SELECT COUNT(*) FROM training_programs WHERE due_date < NOW()"
    );

    // Completion Rate
    const totalEnrollments = await AppDataSource.query(
      "SELECT COUNT(*) FROM enrollments"
    );

    const completed = await AppDataSource.query(
      "SELECT COUNT(*) FROM enrollments WHERE status='completed'"
    );

    const total = parseInt(totalEnrollments[0].count);
    const done = parseInt(completed[0].count);

    const completionRate =
      total === 0 ? 0 : Math.round((done / total) * 100);

    res.json({
      totalEmployees: parseInt(users[0].count),
      activePrograms: parseInt(activePrograms[0].count),
      overdueTrainings: parseInt(overdueTrainings[0].count),
      completionRate,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: err.message });
  }
};
export const getDashboardDetails = async (req, res) => {
  try {
    const activity = await AppDataSource.query(`
      SELECT 
        e.id,
        e.status,
        e.progress,
        e.enrolled_at,
        u.name AS user_name,
        t.title AS training_title
      FROM enrollments e
      JOIN users u ON u.id = e.user_id
      JOIN training_programs t ON t.id = e.training_id
      ORDER BY e.enrolled_at DESC
      LIMIT 5
    `);

    const departmentStats = await AppDataSource.query(`
      SELECT 
        t.department,
        COUNT(e.id) AS total,
        SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) AS completed
      FROM training_programs t
      LEFT JOIN enrollments e ON e.training_id = t.id
      GROUP BY t.department
    `);

    res.json({
      activity,
      departmentStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
import AppDataSource from "../config/data-source.js";

export const getMyCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    const certs = await AppDataSource.query(
      `SELECT * FROM certificates WHERE user_id = $1`,
      [userId]
    );

    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
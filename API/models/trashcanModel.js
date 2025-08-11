import pool from "../config/db.js";


export const getAllTrashcansService = async () => {
    const result = await pool.query("SELECT * FROM trashcans");
    return (await result).rows;
};

export const getTrashcanByTrashcanIdService = async (trashcan_id) => {
    const result = await pool.query("SELECT * FROM trashcans where trashcan_id = $1", [trashcan_id]);
    return result.rows;
};

export const createTrashcanService = async (trashcan_id, is_full, date_time) => {
    const result = await pool.query("INSERT INTO trashcans(trashcan_id, is_full, date_time) VALUES ($1, $2, $3) RETURNING *", [trashcan_id, is_full, date_time]);
    return result.rows[0];
};

export const deleteTrashcanService = async (trashcan_id) => {
    const result = await pool.query("DELETE FROM trashcans WHERE trashcan_id = $1 RETURNING *", [trashcan_id]);
    return result.rows[0];
};
import pool from "../db";

export class BookingSlotModel {
  /////////////////////////////////////////////////////////
  // CREATE SLOTS
  /////////////////////////////////////////////////////////
  static async createSlots(barber_id: number, slots: string[]) {
    const queries = slots.map((slot) => {
      const now = new Date();
      const [hours, minutes] = slot.split(":").map(Number);

      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0,
      );

      return pool.query(
        `
        INSERT INTO booking_slots (barber_id, slot_time)
        VALUES ($1, $2)
        `,
        [barber_id, date],
      );
    });

    await Promise.all(queries);

    return { message: "Slots created successfully" };
  }

  /////////////////////////////////////////////////////////
  // GET SLOTS
  /////////////////////////////////////////////////////////
  static async getAllByBarber(barber_id: number) {
    const result = await pool.query(
      `
      SELECT *
      FROM booking_slots
      WHERE barber_id = $1
      ORDER BY slot_time ASC
      `,
      [barber_id],
    );

    return result.rows;
  }

  /////////////////////////////////////////////////////////
  // DELETE SLOT
  /////////////////////////////////////////////////////////
  static async deleteSlot(slot_id: number) {
    const result = await pool.query(
      `
      DELETE FROM booking_slots
      WHERE id = $1
      RETURNING *
      `,
      [slot_id],
    );

    return result.rows[0];
  }

  /////////////////////////////////////////////////////////
  // BOOK SLOT
  /////////////////////////////////////////////////////////
  static async bookSlot(
    slot_id: number,
    customer_name: string,
    customer_phone?: string,
  ) {
    const slotRes = await pool.query(
      `SELECT * FROM booking_slots WHERE id = $1`,
      [slot_id],
    );

    const slot = slotRes.rows[0];

    if (!slot) throw new Error("Slot not found");

    if (slot.is_booked) throw new Error("Slot already booked");

    const result = await pool.query(
      `
      UPDATE booking_slots
      SET is_booked = true,
          customer_name = $1,
          customer_phone = $2
      WHERE id = $3
      RETURNING *
      `,
      [customer_name, customer_phone || null, slot_id],
    );

    return result.rows[0];
  }
}

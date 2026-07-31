import pool from "../../src/config/db";
import { CustomerBarberBlockRepository } from "../../src/modules/customer-barber-blocks/customer-barber-block.repository";

describe("CustomerBarberBlockRepository Integration Tests", () => {
  let shopId: number;
  let userId: number;
  let barberId: number;
  let customerId: number;
  let blockId: number;

  beforeAll(async () => {
    const shop = await pool.query(
      `
      INSERT INTO shops (name, location)
      VALUES ($1,$2)
      RETURNING id
      `,
      [`Test Shop ${Date.now()}`, "Jenin"],
    );

    shopId = shop.rows[0].id;

    const user = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES ($1,$2,$3,'barber')
      RETURNING id
      `,
      ["Test Barber", `barber_${Date.now()}@test.com`, "password"],
    );

    userId = user.rows[0].id;

    const barber = await pool.query(
      `
      INSERT INTO barbers (
        user_id,
        shop_id
      )
      VALUES ($1,$2)
      RETURNING id
      `,
      [userId, shopId],
    );

    barberId = barber.rows[0].id;

    const customer = await pool.query(
      `
      INSERT INTO customers (
        name,
        phone
      )
      VALUES ($1,$2)
      RETURNING id
      `,
      ["Test Customer", `059${Date.now()}`],
    );

    customerId = customer.rows[0].id;
  });

  afterAll(async () => {
    if (blockId) {
      await CustomerBarberBlockRepository.deleteById(blockId);
    }

    await pool.query(
      `
      DELETE FROM customers
      WHERE id=$1
      `,
      [customerId],
    );

    await pool.query(
      `
      DELETE FROM barbers
      WHERE id=$1
      `,
      [barberId],
    );

    await pool.query(
      `
      DELETE FROM users
      WHERE id=$1
      `,
      [userId],
    );

    await pool.query(
      `
      DELETE FROM shops
      WHERE id=$1
      `,
      [shopId],
    );
  });

  it("should create block", async () => {
    const block = await CustomerBarberBlockRepository.create({
      customer_id: customerId,
      barber_id: barberId,
      reason: "Bad behavior",
    });

    expect(block).toBeDefined();
    expect(block.customer_id).toBe(customerId);
    expect(block.barber_id).toBe(barberId);
    expect(block.reason).toBe("Bad behavior");
    expect(block.is_active).toBeTrue();

    blockId = block.id;
  });

  it("should get block by id", async () => {
    const block = await CustomerBarberBlockRepository.getById(blockId);

    expect(block).toBeDefined();
    expect(block?.id).toBe(blockId);
  });

  it("should get active blocks by barber", async () => {
    const blocks =
      await CustomerBarberBlockRepository.getActiveByBarberId(barberId);

    expect(Array.isArray(blocks)).toBeTrue();

    const block = blocks.find((item) => item.id === blockId);

    expect(block).toBeDefined();
  });

  it("should get active blocks by customer", async () => {
    const blocks =
      await CustomerBarberBlockRepository.getActiveByCustomerId(customerId);

    expect(Array.isArray(blocks)).toBeTrue();

    const block = blocks.find((item) => item.id === blockId);

    expect(block).toBeDefined();
  });

  it("should get active block", async () => {
    const block = await CustomerBarberBlockRepository.getActiveBlock(
      customerId,
      barberId,
    );

    expect(block).toBeDefined();
    expect(block?.id).toBe(blockId);
  });

  it("should unblock customer", async () => {
    const block = await CustomerBarberBlockRepository.unblock(blockId);

    expect(block).toBeDefined();
    expect(block?.is_active).toBeFalse();
    expect(block?.unblocked_at).toBeDefined();
  });

  it("should not return active block after unblock", async () => {
    const block = await CustomerBarberBlockRepository.getActiveBlock(
      customerId,
      barberId,
    );

    expect(block).toBeUndefined();
  });

  it("should delete block", async () => {
    const deleted = await CustomerBarberBlockRepository.deleteById(blockId);

    expect(deleted).toBeDefined();
    expect(deleted?.id).toBe(blockId);
  });

  it("should return undefined after delete", async () => {
    const block = await CustomerBarberBlockRepository.getById(blockId);

    expect(block).toBeUndefined();
  });
});

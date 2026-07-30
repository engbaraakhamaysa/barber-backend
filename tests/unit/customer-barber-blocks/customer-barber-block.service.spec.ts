import { CustomerBarberBlockService } from "../../../src/modules/customer-barber-blocks/customer-barber-block.service";
import { CustomerBarberBlockRepository } from "../../../src/modules/customer-barber-blocks/customer-barber-block.repository";

describe("CustomerBarberBlockService", () => {
  const mockBlock = {
    id: 1,
    customer_id: 10,
    barber_id: 20,
    reason: "Bad behavior",
    is_active: true,
    blocked_at: new Date(),
    unblocked_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  let getActiveBlockSpy: any;

  beforeEach(() => {
    getActiveBlockSpy = spyOn(
      CustomerBarberBlockRepository,
      "getActiveBlock",
    ).and.returnValue(Promise.resolve(undefined));

    spyOn(CustomerBarberBlockRepository, "create").and.returnValue(
      Promise.resolve(mockBlock),
    );

    spyOn(CustomerBarberBlockRepository, "getById").and.returnValue(
      Promise.resolve(mockBlock),
    );

    spyOn(CustomerBarberBlockRepository, "getActiveByBarberId").and.returnValue(
      Promise.resolve([mockBlock]),
    );

    spyOn(
      CustomerBarberBlockRepository,
      "getActiveByCustomerId",
    ).and.returnValue(Promise.resolve([mockBlock]));

    spyOn(CustomerBarberBlockRepository, "unblock").and.returnValue(
      Promise.resolve(mockBlock),
    );

    spyOn(CustomerBarberBlockRepository, "deleteById").and.returnValue(
      Promise.resolve(mockBlock),
    );
  });

  it("should create customer barber block", async () => {
    const result = await CustomerBarberBlockService.create({
      customer_id: 10,
      barber_id: 20,
      reason: "Bad behavior",
    });

    expect(result.id).toBe(1);

    expect(CustomerBarberBlockRepository.create).toHaveBeenCalled();
  });

  it("should prevent duplicate active block", async () => {
    getActiveBlockSpy.and.returnValue(Promise.resolve(mockBlock));

    await expectAsync(
      CustomerBarberBlockService.create({
        customer_id: 10,
        barber_id: 20,
      }),
    ).toBeRejectedWithError("CUSTOMER_ALREADY_BLOCKED_BY_BARBER");
  });

  it("should get block by id", async () => {
    const result = await CustomerBarberBlockService.getById(1);

    expect(result?.id).toBe(1);
  });

  it("should get active blocks by barber", async () => {
    const result = await CustomerBarberBlockService.getActiveByBarberId(20);

    expect(result.length).toBe(1);
  });

  it("should get active blocks by customer", async () => {
    const result = await CustomerBarberBlockService.getActiveByCustomerId(10);

    expect(result.length).toBe(1);
  });

  it("should unblock customer", async () => {
    const result = await CustomerBarberBlockService.unblock(1);

    expect(result?.id).toBe(1);
  });

  it("should delete block", async () => {
    const result = await CustomerBarberBlockService.deleteById(1);

    expect(result?.id).toBe(1);
  });
});

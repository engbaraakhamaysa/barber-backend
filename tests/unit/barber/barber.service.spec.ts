import { BarberService } from "../../../src/modules/barbers/barber.service";
import { BarberRepository } from "../../../src/modules/barbers/barber.repository";

describe("BarberService", () => {
  const mockBarber = {
    id: 1,
    user_id: 10,
    shop_id: 5,
    name: "Ahmad",
    email: "ahmad@test.com",
    role: "barber" as const,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe("create", () => {
    it("should create barber with hashed password", async () => {
      spyOn(BarberRepository, "create").and.resolveTo(mockBarber);

      const result = await BarberService.create({
        shop_id: 5,
        name: "Ahmad",
        email: "ahmad@test.com",
        password: "123456",
      });

      expect(BarberRepository.create).toHaveBeenCalled();

      const call = (BarberRepository.create as jasmine.Spy).calls.mostRecent()
        .args[0];

      expect(call.password).not.toBe("123456");

      expect(result.id).toBe(1);
    });
  });

  describe("getById", () => {
    it("should return barber by id", async () => {
      spyOn(BarberRepository, "getById").and.resolveTo(mockBarber);

      const result = await BarberService.getById(1);

      expect(BarberRepository.getById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined if barber not found", async () => {
      spyOn(BarberRepository, "getById").and.resolveTo(undefined);

      const result = await BarberService.getById(99);

      expect(result).toBeUndefined();
    });
  });

  describe("getByShopId", () => {
    it("should return barbers by shop id", async () => {
      spyOn(BarberRepository, "getByShopId").and.resolveTo([mockBarber]);

      const result = await BarberService.getByShopId(5);

      expect(BarberRepository.getByShopId).toHaveBeenCalledWith(5);

      expect(result.length).toBe(1);
    });
  });

  describe("update", () => {
    it("should update barber without password", async () => {
      spyOn(BarberRepository, "update").and.resolveTo(mockBarber);

      const result = await BarberService.update(1, {
        name: "New Name",
      });

      expect(BarberRepository.update).toHaveBeenCalledWith(1, {
        name: "New Name",
      });

      expect(result?.id).toBe(1);
    });

    it("should update barber with hashed password", async () => {
      spyOn(BarberRepository, "update").and.resolveTo(mockBarber);

      await BarberService.update(1, {
        password: "newPassword",
      });

      const call = (BarberRepository.update as jasmine.Spy).calls.mostRecent()
        .args[1];

      expect(call.password).not.toBe("newPassword");
    });
  });

  describe("deleteById", () => {
    it("should delete barber", async () => {
      spyOn(BarberRepository, "deleteById").and.resolveTo(mockBarber);

      const result = await BarberService.deleteById(1);

      expect(BarberRepository.deleteById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined if barber does not exist", async () => {
      spyOn(BarberRepository, "deleteById").and.resolveTo(undefined);

      const result = await BarberService.deleteById(99);

      expect(result).toBeUndefined();
    });
  });
});

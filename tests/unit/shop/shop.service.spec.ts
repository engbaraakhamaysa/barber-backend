import { ShopService } from "../../../src/modules/shop/shop.service";
import { ShopRepository } from "../../../src/modules/shop/shop.repository";

describe("ShopService", () => {
  const mockShop = {
    id: 1,
    name: "Barber Shop",
    location: "Jenin",
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe("create", () => {
    it("should create a shop", async () => {
      spyOn(ShopRepository, "create").and.resolveTo(mockShop);

      const result = await ShopService.create({
        name: "Barber Shop",
        location: "Jenin",
      });

      expect(ShopRepository.create).toHaveBeenCalledWith({
        name: "Barber Shop",
        location: "Jenin",
      });

      expect(result.id).toBe(1);

      expect(result.name).toBe("Barber Shop");
    });
  });

  describe("getAll", () => {
    it("should return all shops", async () => {
      spyOn(ShopRepository, "getAll").and.resolveTo([mockShop]);

      const result = await ShopService.getAll();

      expect(ShopRepository.getAll).toHaveBeenCalled();

      expect(result.length).toBe(1);

      expect(result[0]?.name).toBe("Barber Shop");
    });
  });

  describe("getById", () => {
    it("should return shop by id", async () => {
      spyOn(ShopRepository, "getById").and.resolveTo(mockShop);

      const result = await ShopService.getById(1);

      expect(ShopRepository.getById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined if shop not found", async () => {
      spyOn(ShopRepository, "getById").and.resolveTo(undefined);

      const result = await ShopService.getById(99);

      expect(result).toBeUndefined();
    });
  });

  describe("update", () => {
    it("should update shop", async () => {
      spyOn(ShopRepository, "update").and.resolveTo(mockShop);

      const result = await ShopService.update(1, {
        name: "New Shop",
      });

      expect(ShopRepository.update).toHaveBeenCalledWith(1, {
        name: "New Shop",
      });

      expect(result?.id).toBe(1);
    });

    it("should return undefined if shop does not exist", async () => {
      spyOn(ShopRepository, "update").and.resolveTo(undefined);

      const result = await ShopService.update(99, {
        name: "Test",
      });

      expect(result).toBeUndefined();
    });
  });

  describe("deleteById", () => {
    it("should delete shop", async () => {
      spyOn(ShopRepository, "deleteById").and.resolveTo(mockShop);

      const result = await ShopService.deleteById(1);

      expect(ShopRepository.deleteById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined if shop does not exist", async () => {
      spyOn(ShopRepository, "deleteById").and.resolveTo(undefined);

      const result = await ShopService.deleteById(99);

      expect(result).toBeUndefined();
    });
  });
});

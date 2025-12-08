import InventoryItem from "../models/InventoryItem";
import inventoryService from "../services/InventoryService";

jest.mock('../models/InventoryItem');

describe('InventoryService.checkoutItem', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve lançar erro se o item não existir', async () => {
    (InventoryItem.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(
      inventoryService.checkoutItem(123, 5)
    ).rejects.toThrow('ITEM_NOT_FOUND');
  });

  // it('deve lançar erro se não tiver estoque suficiente', async () => {
  //   (InventoryItem.findByPk as jest.Mock).mockResolvedValue({
  //     quantity: 3,
  //     save: jest.fn(),
  //   });

  //   await expect(
  //     inventoryService.checkoutItem("123", 5)
  //   ).rejects.toThrow('INSUFFICIENT_STOCK');
  // });

  // it('deve fazer checkout com sucesso', async () => {
  //   const saveMock = jest.fn();

  //   (InventoryItem.findByPk as jest.Mock).mockResolvedValue({
  //     quantity: 10,
  //     save: saveMock,
  //   });

  //   const result = await inventoryService.checkoutItem("123", 5);

  //   expect(result.quantity).toBe(5); // 10 - 5
  //   expect(saveMock).toHaveBeenCalled();
  // });

});

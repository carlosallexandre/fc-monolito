import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacadeInterface, {
  PlaceOrderCheckoutFacadeInputDto,
  PlaceOrderCheckoutFacadeOutputDto,
} from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
  constructor(private placeOrderUseCase: PlaceOrderUseCase) {}

  placeOrder(
    input: PlaceOrderCheckoutFacadeInputDto
  ): Promise<PlaceOrderCheckoutFacadeOutputDto> {
    return this.placeOrderUseCase.execute(input);
  }
}

import { Model, model, property} from '@loopback/repository';

@model()
export class NewDeckDTO extends Model {

  @property()
  blockchainCards: number;

  @property()
  smartcontractsCards: number;

  @property()
  frontendCards: number;

  @property()
  blockchainDevs: number;

  @property()
  smartcontractsDevs: number;

  @property()
  frontendDevs: number;

  @property()
  internDevs: number;

  constructor(data?: Partial<NewDeckDTO>) {
    super(data);
  }
}
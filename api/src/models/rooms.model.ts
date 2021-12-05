import { Entity, model, property } from '@loopback/repository';

@model()
export class Rooms extends Entity {
  @property({
    id: true,
    type: 'string',
    defaultFn: 'uuid',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  player1: string;

  @property.array('string')
  devs1: string[];

  @property({
    type: 'string',
    required: true,
  })
  player2: string;

  @property.array('string')
  devs2: string[];

  constructor(data?: Partial<Rooms>) {
    super(data);
  }
}

export interface RoomsRelations {
  // describe navigational properties here
}

export type RoomsWithRelations = Rooms & RoomsRelations;

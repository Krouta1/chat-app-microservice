export type EventPayload = Record<string, unknown>;

export interface DomainEvent<TType extends string, TPayload extends EventPayload> {
  type: TType;
  payload: TPayload;
  occuredAt: string;
}

export interface EventMetaData {
  correlationId?: string;
  causationId?: string;
  verison?: number;
}

// sended from my service to other service
export interface OutboundEvent<
  TType extends string,
  TPayload extends EventPayload,
> extends DomainEvent<TType, TPayload> {
  metadata?: EventMetaData;
}

// event recieved by service
export interface InboundEvent<
  TType extends string,
  TPayload extends EventPayload,
> extends DomainEvent<TType, TPayload> {
  metadata: EventMetaData;
}

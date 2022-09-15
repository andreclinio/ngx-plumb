import { ConnectionDefinition } from "./connection-definition";

export class ConnectionExtreme {
  constructor(readonly nodeId: string, readonly endpointId: string) { }
}

export class ConnectionInstance {

  constructor(
    readonly source: ConnectionExtreme, readonly target: ConnectionExtreme, readonly definition: ConnectionDefinition) { }

  public static fromIds(params: { sourceNodeId: string, sourceEndpointId: string, targetNodeId: string, targetEndpointId: string , definition: ConnectionDefinition}): ConnectionInstance {
    return new ConnectionInstance(
      new ConnectionExtreme(params.sourceNodeId, params.sourceEndpointId),
      new ConnectionExtreme(params.targetNodeId, params.targetEndpointId),
      params.definition)
  }
}
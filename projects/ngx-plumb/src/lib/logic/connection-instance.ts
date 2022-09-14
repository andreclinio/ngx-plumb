
export class ConnectionExtreme {
  constructor(readonly nodeId: string, readonly endpointId: string) {}
}

export class ConnectionInstance {

  constructor(readonly source: ConnectionExtreme, readonly target: ConnectionExtreme) {  }
}
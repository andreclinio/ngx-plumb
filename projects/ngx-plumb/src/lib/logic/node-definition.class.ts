
import { EndpointOptions } from "@jsplumb/core"
import { AnchorId } from "@jsplumb/common"

export abstract class NodeDefinition {

  constructor(readonly id: string) { }

  abstract get draggable(): boolean;
  abstract get endpointDefinitions(): EnpointDefinition[];

}


export class StdNodeDefinition extends NodeDefinition {

  constructor(id: string, readonly draggable: boolean, readonly endpointDefinitions: EnpointDefinition[]) {
    super(id);
  }
}

export abstract class EnpointDefinition {

  constructor(readonly id: string) { }

  abstract get anchorId(): AnchorId;
  abstract get endpointOptions(): EndpointOptions;
}

export class StdEnpointDefinition {
  constructor(readonly id: string, readonly anchorId: AnchorId, readonly endpointOptions: EndpointOptions) { }
}


export class DummyNodeDefinition extends StdNodeDefinition {

  static instance: NodeDefinition = new DummyNodeDefinition();

  constructor() {
    super('dummy-node-definition', true, DummyNodeDefinition._endpoints());
  }

  private static _endpoints(): StdEnpointDefinition[] {
    const options = { endpoint: 'Dot', maxConnections: 11 };
    return [
      new StdEnpointDefinition('right', 'Right', options),
      new StdEnpointDefinition('left', 'Left', options),
      new StdEnpointDefinition('bottom', 'Bottom', options),
      new StdEnpointDefinition('top', 'Top', options),
    ];
  }
}

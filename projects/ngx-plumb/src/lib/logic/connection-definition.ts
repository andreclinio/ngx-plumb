import { ConnectorSpec, OverlaySpec } from "@jsplumb/common";
import { BezierConnector } from "@jsplumb/connector-bezier";

export abstract class ConnectionDefinition {

  constructor(readonly id: string) { }

  abstract get overlaySpecs(): OverlaySpec[];
  abstract get connectorSpec(): ConnectorSpec;

}

export class StdConnectionDefinition extends ConnectionDefinition {

  constructor(private params: { id: string, readonly overlaySpecs: OverlaySpec[], readonly connectorSpec: ConnectorSpec }) {
    super(params.id);
  }

  get overlaySpecs(): OverlaySpec[] {
    return this.params.overlaySpecs;
  }

  get connectorSpec(): ConnectorSpec {
    return this.params.connectorSpec;
  }
}

export class DummyConnectionDefinition extends StdConnectionDefinition {

  static instance: ConnectionDefinition = new DummyConnectionDefinition();

  constructor() {
    super({
      id: 'dummy-connection-definition',
      overlaySpecs: [{ type: 'PlainArrow', options: { location: 0.5 } }],
      connectorSpec: { type: BezierConnector.type, options: { curviness: 100 } }
    });
  }

}
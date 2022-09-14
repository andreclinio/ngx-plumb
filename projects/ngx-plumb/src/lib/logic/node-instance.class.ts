import { Box } from "./box.class";
import { NodeDefinition } from "./node-definition.class";

export class NodeInstance {

  constructor(readonly id: string, readonly nodeDefinition: NodeDefinition, readonly box: Box) {
    this.id = id;
    this.nodeDefinition = nodeDefinition;
    this.box = box ? box : Box.NONE;
  }
  
}

export class NodeDefinition {

  readonly id: string;
  
  static NONE: NodeDefinition = new NodeDefinition('no-definition');

  constructor(id: string){
    this.id = id;
  }

}
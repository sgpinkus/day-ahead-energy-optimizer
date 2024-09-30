import { v4 as uuid } from 'uuid';
import { reactive } from 'vue';
import { DefaultBasis } from './constants';

export type ComponentType = 'flexibleload' | 'profile';

export interface BaseComponent {
  type: ComponentType;
  name?: string;
}

export interface ProfileComponent extends BaseComponent {
  type: 'profile',
  data: number[],
}

export interface FlexibleLoadComponent extends BaseComponent {
  type: 'flexibleload',
  l: number | number[],
  h: number | number[],
  pl: number | number[],
  ph: number | number[],
}

export type Component = ProfileComponent | FlexibleLoadComponent;
export type ContainerComponent = Component & { id: string };

const prototypes: Record<ComponentType, Component> = {
  profile: {
    type: 'profile',
    data: Array.from(Array(48)).map(v => 0),
  },
  flexibleload: {
    type: 'flexibleload',
    l: 0,
    h: 1,
    pl: 1,
    ph: 0,
  },
}

export class Components {
  private components: Record<string, ContainerComponent> = {}

  addComponent(x: Component) {
    const id = uuid();
    this.components[id] = {
      id,
      ...x
    }
  }

  addComponentType(type: ComponentType) {
    this.addComponent(prototypes[type]);
  }

  getComponents() {
    return {...this.components};
  }

  deleteComponent(id: string) {
    delete this.components[id];
  }

  get length() {
    return Object.keys(this.components).length;
  }
}

export default reactive(new Components());
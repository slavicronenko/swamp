import { Environment } from './Environment';

const env = new Environment();

env.live();
(window as any).env = env;

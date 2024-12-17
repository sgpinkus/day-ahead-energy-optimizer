import { inject } from 'vue';
import { type Bus } from '@/model';
import { BusInjection } from '@/model/injectionKeys';
import { NotFoundError } from '@/errors';

export default function requireBus(): Bus {
  const bus: Bus | undefined = inject(BusInjection);
  if(!bus) throw new NotFoundError();
  return bus;
}


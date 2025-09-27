import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './types/db';
import { EventSource } from 'eventsource';

global.EventSource = EventSource as any;

export const pb = new PocketBase(process.env.API_URL) as TypedPocketBase;

export async function superuserLogin(pb: PocketBase) {
  await pb
    .collection('_superusers')
    .authWithPassword(
      process.env.PB_TYPEGEN_EMAIL,
      process.env.PB_TYPEGEN_PASSWORD
    );
}

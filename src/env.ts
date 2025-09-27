import { z } from 'zod';
import 'dotenv/config';

const envVars = z.object({
  API_URL: z.string(),
  PB_TYPEGEN_EMAIL: z.string(),
  PB_TYPEGEN_PASSWORD: z.string(),
});

envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}

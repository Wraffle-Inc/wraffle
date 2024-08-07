import { z } from "zod";

export const getDefaults = <Schema extends z.AnyZodObject>(schema: Schema) => {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
};

import { z } from 'zod';
import { strongEmailRegex } from '../../../shared/validation/email.validation';
import { nameSchema } from '../../../shared/validation/name.validation';
import { passwordSchema } from '../../../shared/validation/password.validation';
import { phoneNumberSchema } from '../../../shared/validation/phone.validaton';
const adminSchema = z.object({
    email: strongEmailRegex,
    password: passwordSchema,
    role: z.literal("admin"),
});
const clientSchema = z.object({
    name: nameSchema,
    email: strongEmailRegex,
    phone: phoneNumberSchema,
    password: passwordSchema,
    role: z.literal("client"),
});
export const userSchemas = {
    admin: adminSchema,
    client: clientSchema,
    // barber: barberSchema,
};
//# sourceMappingURL=user-signup.validation.schema.js.map
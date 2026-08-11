/**
 * Engineering disciplines — the four that build the machine.
 *
 * Everything the team does *around* the machine (media, PR, creative, finance,
 * sponsorship, operations) is modelled separately in `organization.ts`, because
 * it behaves like a network rather than a list.
 *
 * Names and descriptions live in the dictionaries under `departments`, so both
 * languages stay in sync. Adding one means adding an id here and the matching
 * entry in every dictionary.
 */
export const departmentIds = ['mechanical', 'cad', 'electrical', 'software'] as const;

export type DepartmentId = (typeof departmentIds)[number];

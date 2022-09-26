//LEMBRETE PARA FERNANDO: MUDAR A FORMA DE IMPORTAR O PrismaClient QUANDO FOR ALTERNAR ENTRE SUBIR O SERVIDOR E TESTAR

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// import pkg from "@prisma/client";

// const { PrismaClient } = pkg;
// export const prisma = new PrismaClient();
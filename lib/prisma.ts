import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

// Un singur client (și un singur pool) pe proces. Înainte, în producție nu se păstra
// pe global, așa că fiecare bucată de server (rută, pagină) își făcea propriul Pool și
// PrismaClient: memorie și conexiuni în plus.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
    const real = !!connectionString && (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://'));
    // Fallback la build: Prisma 7 cu engine "client" cere un adapter chiar și fără bază reală.
    const pool = new Pool({
        connectionString: real ? connectionString : 'postgresql://postgres:postgres@localhost:5432/postgres',
        max: Number(process.env.DB_POOL_MAX) || 5,
        idleTimeoutMillis: 30_000,
    });
    // Interogările se scriu în jurnal doar la cerere (PRISMA_LOG_QUERIES=1); altfel doar erorile.
    const log: ('query' | 'error' | 'warn')[] = process.env.PRISMA_LOG_QUERIES === '1' ? ['query', 'error', 'warn'] : ['error'];
    return new PrismaClient({ adapter: new PrismaPg(pool), log });
}

const prisma: PrismaClient = globalForPrisma.prisma ?? createClient();
globalForPrisma.prisma = prisma;

export { prisma };

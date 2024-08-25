import next from "next";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRES_URL: string;
            REDIS_PREFIX: string;
        }
    }
}
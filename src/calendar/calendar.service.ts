import { Injectable } from '@nestjs/common';
import { State } from 'src/shared/model';
import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

@Injectable()
export class CalendarService {
    private lrange: (key: string, start: number, stop: number) => Promise<string[]>;
    private hgtall: (key: string) => Promise<{[key: string]: string}>;
    private client: RedisClient;

    constructor() {
        this.client = createClient();
        this.lrange = promisify(this.client.lrange).bind(this.client);
        this.hgtall = promisify(this.client.hgetall).bind(this.client);
    }

    getCalendarStates(user: string, queryMonth: number, queryYear: number): Promise<string[]> {
        const currentDate = new Date();
        const month = queryMonth || currentDate.getMonth();
        const year = queryYear || currentDate.getFullYear();
        const key = `${user}:${month}:${year}`;
        return this.lrange(key, 0, -1);
        // return this.hgtall(key);
    }

    async crateCalendarState(user: string, state: State): Promise<void> {
        const startDate = new Date(state.startDate);
        const key = `${user}:${startDate.getMonth()}:${startDate.getFullYear()}`;
        this.client.rpush(key,  JSON.stringify(state));
        // this.client.hmset(key, state);
    }
}

import { Injectable } from '@nestjs/common';
import { dataSource } from 'src/core/database/database.provider';
import { Awaria } from 'src/core/database/entities';

@Injectable()
export class AwariaService {
    async awariaList() {
        const awarie = await dataSource
            .createQueryBuilder()
            .select("awaria")
            .from(Awaria, "awaria").getMany();
        return awarie;
    }
}

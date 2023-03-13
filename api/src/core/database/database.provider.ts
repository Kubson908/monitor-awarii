import { Awaria, Pracownik, Raport, Stanowisko } from './entities'

import { DataSource } from "typeorm"



const dataSource = new DataSource({
    type: "mssql",
    host: "uwm-team-project.database.windows.net",
    port: 1433,
    database: "Team_Project_DB",
    username: "root1",
    password: "JSp70mnwksno",
    entities: [Awaria, Pracownik, Raport, Stanowisko],
    synchronize: true,

})
  
export { dataSource }
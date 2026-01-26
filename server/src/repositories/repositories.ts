
class Repositories {
      constructor(private Database: any){
        this.Database = Database;
      }

    async selectAllBoards(){
        const result = await this.Database.query('SELECT * FROM boards');
        return result.rows;
    }
}

export default Repositories;
 // Database connection configuration using PostgreSQL Pool
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});
const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully!');
        client.release();
        
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); 
    }
}
export default connectDB;
export  {pool} ;
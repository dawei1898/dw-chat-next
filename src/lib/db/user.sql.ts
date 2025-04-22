import {db} from "@/lib/db/db";
import {User, user} from "@/lib/db/schema";
import {desc, eq, sql} from "drizzle-orm";


export async function selectUsers(): Promise<Array<User>> {
    try {
        return await db.select().from(user).orderBy(desc(user.updatedAt));
    } catch (error) {
        console.error('Failed to getUserList.', error);
        throw error;
    }
}

export async function insertUser(data: {name: string, email?: string, password?: string}): Promise<number | null> {
    try {
         const {rowCount} = await db.insert(user)
             .values({
                 name: data.name,
                 email: data.email,
                 password: data.password
             });
         return rowCount;
    } catch (error) {
        console.error('Failed to insertUser.', error);
        throw error;
    }
}

export async function updateUserById(data: {id: bigint, name: string, email?: string, password?: string}): Promise<number | null> {
    try {
        const {rowCount} = await db.update(user)
            .set({
                name: data.name,
                email: data.email,
                password: data.password,
                updatedAt: sql`NOW()`
            })
            .where(eq(user.id, data.id));
        return rowCount;
    } catch (error) {
        console.error('Failed to updateUser.', error);
        throw error;
    }
}

export async function deleteUserById(id: bigint): Promise<number | null> {
    try {
        const {rowCount} = await db.delete(user).where(eq(user.id, id));
        return rowCount;
    } catch (error) {
        console.error('Failed to deleteUser.', error);
        throw error;
    }
}